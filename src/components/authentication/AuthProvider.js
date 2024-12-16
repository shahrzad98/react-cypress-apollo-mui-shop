import React, { useEffect, useMemo, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import AuthContext from './AuthContext';
import {
  CLEAR_COOKIE,
  GET_COOKIE,
  GET_USER_INFO
} from '../../constant/mutations/mutations';
import { Grid } from '@mui/material';
import { ReactComponent as Logo } from '../../static/svg/Logo.svg';

const AuthProvider = ({ children }) => {
  const [getUserInfo, { error, data }] = useLazyQuery(GET_USER_INFO);
  const [getCookie] = useMutation(GET_COOKIE);
  const [clearCookie] = useMutation(CLEAR_COOKIE);

  const [loading, setLoading] = useState(true);
  const [errorLogin, setErrorLogin] = useState('');

  useEffect(() => {
    (async () => {
      await getUserInfo()
        .then(() => {})
        .catch(() => {});
      setLoading(false);
    })();
  }, [getUserInfo]);

  const value = useMemo(
    () => ({
      loading,
      errorLogin: errorLogin,
      isLoggedIn: !error,
      user: data?.user?.getUserInfo || null,
      login: async ({ username, password }, callback) => {
        await getCookie({
          variables: {
            content: { username, password }
          },
          onCompleted: async () => {
            await getUserInfo();
            callback?.();
          },
          onError: () => {
            setErrorLogin('اطلاعات کاربری اشتباه است');
            callback?.();
          }
        });
      },
      logout: async callback => {
        await clearCookie();
        callback?.();
      },
      hasActivePackage: data?.user?.getUserRead?.has_active_purchase_package,
      packageExpireDate:
        data?.user?.getUserRead?.my_store[0].ecommerce?.expire_date
    }),
    [clearCookie, getCookie, getUserInfo, error, data, loading, errorLogin]
  );

  const liteLoading = (
    <Grid
      style={{ height: '100vh' }}
      container
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Logo style={{ width: '180px' }} />
    </Grid>
  );

  return (
    <>
      {/* <InitialLoading show={loading} /> */}
      <AuthContext.Provider value={value}>
        {loading ? liteLoading : children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;

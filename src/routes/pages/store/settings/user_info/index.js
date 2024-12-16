import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as StoreSVG } from '../../svg/user.svg';
// import { ReactComponent as KeySVG } from '../../svg/key.svg';
import { ReactComponent as LogOutSVG } from '../../svg/logout.svg';
import { useQuery } from '@apollo/client';
import { GET_STORE_INFO } from '../../../../../constant/queries/settings';
import EditStoreDrawer from './edit';
import { ToastContainer } from 'react-toastify';
import LogoutModal from '../../../home/logoutModal';
import useAuth from '../../../../../components/authentication/useAuth';
import { formatDate } from '../../../../../utils/helpers';

const StoreInfo = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(10);
  const [selectedStore, setSelectedStore] = useState({});
  const { data, refetch } = useQuery(GET_STORE_INFO);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (selectedStore?.id) {
      let storeInfoFields = [
        selectedStore?.first_name,
        selectedStore?.last_name,
        selectedStore?.phone_number,
        selectedStore?.national_code,
        selectedStore?.birthday,
        selectedStore?.email,
        selectedStore?.sheba_number
      ];
      let count = 0;
      for (let index = 0; index < storeInfoFields.length; index++) {
        if (storeInfoFields[index]) {
          count++;
        }
      }

      setPercentage(((count * 100) / 7).toFixed());
    }
  }, [selectedStore]);

  useEffect(() => {
    if (data) {
      setSelectedStore(data?.user?.getUserRead?.my_store[0]);
    }
  }, [data]);

  const logouthandler = () => {
    auth.logout(() => window.location.replace('/login'));
  };
  const [logoutModal, setLogoutModal] = useState(false);

  window.onpopstate = function () {
    navigate('/store/settings');
  };
  history.pushState({}, '');

  return (
    <>
      <Style container>
        <Grid justifyContent="space-between" container>
          <Grid onClick={() => navigate('/store/settings')} className="header">
            <i className="df-arrow" />
            <h1>اطلاعات شخصی</h1>
          </Grid>
          <Button
            onClick={() => setSearchParams({ modal: 'edit' })}
            variant="text"
            color="primary"
            startIcon={<i className="df-edit" />}
          >
            ویرایش
          </Button>
        </Grid>
        <Grid alignContent="flex-start" mt={3} container className="content">
          <Grid justifyContent="center" container>
            <Grid className="progressCont">
              <CircularProgressbarWithChildren
                value={percentage}
                strokeWidth={4}
                counterClockwise
                styles={{
                  path: {
                    stroke:
                      percentage > 74
                        ? '#02E061'
                        : percentage > 24
                        ? '#FFC72A'
                        : '#EA002A',
                    strokeLinecap: 'round',
                    transformOrigin: 'center center'
                  },
                  trail: {
                    stroke: '#d6d6d6',
                    strokeLinecap: 'round',
                    transformOrigin: 'center center',
                    width: '1px'
                  },
                  text: {
                    fill: '#f88',
                    fontSize: '16px'
                  },
                  background: {
                    fill: '#3e98c7'
                  }
                }}
              >
                <div
                  style={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: '#DAD6E966',
                    borderRadius: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: selectedStore?.logo?.image
                      ? 'center'
                      : 'flex-end',
                    overflow: 'hidden'
                  }}
                >
                  <StoreSVG className="svg" />
                </div>
              </CircularProgressbarWithChildren>
            </Grid>
          </Grid>
          <Grid mt={3} alignItems="center" container className="text-progress">
            <Grid item className="line" xs={4}></Grid>
            <Grid container justifyContent="center" item xs={4}>
              <h2>{percentage} % کامل شده</h2>
            </Grid>
            <Grid item className="line" xs={4}></Grid>
          </Grid>
          <Grid
            style={{ borderBottom: '.5px solid #C9C3E0' }}
            pb={3}
            mt={2}
            container
          >
            <Grid container>
              <Grid item xs={6} className="right-odd-row">
                <h5>نام</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>{selectedStore?.first_name || '----------'}</h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-even-row">
                <h5>نام خانوادگی</h5>
              </Grid>
              <Grid item xs={6} className="left-even-row">
                <h6>{selectedStore?.last_name || '----------'}</h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-odd-row">
                <h5>شماره موبایل</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>
                  {selectedStore?.phone_number?.replace('+98', '0') ||
                    '----------'}
                </h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-even-row">
                <h5>کد ملی</h5>
              </Grid>
              <Grid item xs={6} className="left-even-row">
                <h6>{selectedStore.national_code || '----------'}</h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-odd-row">
                <h5>تاریخ تولد</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>{formatDate(selectedStore?.birthday) || '----------'}</h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-even-row">
                <h5>ایمیل</h5>
              </Grid>
              <Grid item xs={6} className="left-even-row">
                <h6 style={{ fontSize: '12px' }}>
                  {selectedStore.email || '----------'}
                </h6>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6} className="right-even-row">
                <h5>شماره شبا</h5>
              </Grid>
              <Grid item xs={6} className="left-even-row">
                <h6 style={{ fontSize: '12px' }}>
                  {selectedStore.sheba_number || '----------'}
                </h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-odd-row">
                <h5>رمز عبور</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>**********</h6>
              </Grid>
            </Grid>
          </Grid>
          <Grid mt={3} container>
            <Grid
              // style={{ borderLeft: '0.5px solid #C9C3E0' }}
              className="button_cont"
              item
              xs={12}
            >
              <Button
                style={{ color: '#9185BE' }}
                onClick={() => setLogoutModal(true)}
                variant="text"
                color="primary"
                fullWidth
                startIcon={<LogOutSVG />}
              >
                خروج از حساب
              </Button>
            </Grid>
            {/* <Grid className="button_cont" item xs={6}>
              <Button
                variant="text"
                color="primary"
                fullWidth
                startIcon={<KeySVG />}>
                تغییر رمز عبور
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
        <EditStoreDrawer
          setLogoutModal={setLogoutModal}
          refetch={refetch}
          setSearchParams={setSearchParams}
          selectedStore={selectedStore}
          open={searchParams.get('modal') === 'edit'}
          close={() => setSearchParams({})}
        />
        <ToastContainer />
      </Style>
      {logoutModal && (
        <LogoutModal
          logout={logouthandler}
          close={() => setLogoutModal(false)}
        />
      )}
    </>
  );
};

export default StoreInfo;

import React from 'react';
import styled from '@emotion/styled';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Card, Stack, Typography } from '@mui/material';
import { ReactComponent as Diamond } from '../../static/svg/smallDiamond.svg';
import { ReactComponent as Warning } from '../../static/svg/smallWarning.svg';
import useAuth from '../authentication/useAuth';

const Style = styled('div')({
  position: 'fixed',
  width: '100%',
  background: '#fff',
  zIndex: '999',
  bottom: '0',
  left: '0',
  boxShadow: '0 -2px 8px 0 rgb(72 52 147 / 8%)',
  '& ul': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
    padding: '0 1.5rem',
    margin: '0',
    '& li': {
      flex: '1 1',
      '& a': {
        display: 'flex',
        padding: '12px 0',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#9FA6B9',
        fontSize: '12px',
        fontWeight: 'normal',
        transition: '.3s',
        position: 'relative',
        '& i': {
          fontSize: '20px',
          marginBottom: '4px'
        },
        '&::before': {
          content: '""',
          background: '#483493',
          width: '30px',
          filter: 'blur(2px)',
          height: '20px',
          position: 'absolute',
          bottom: '-35px',
          transition: '.3s',
          borderRadius: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        },
        '&.active': {
          color: '#483493',
          fontWeight: 'bold',
          '&::before': {
            bottom: '-22px'
          },
          '& i': {
            color: '#483493',
            fontWeight: 'bold'
          }
        }
      }
    }
  }
});

const PackageBanner = styled(Card)({
  backgroundColor: '#fff',
  boxShadow: '0px -2px 16px rgba(72, 52, 147, 0.08)',
  position: 'fixed',
  bottom: '75px',
  width: '100%',
  padding: '12px',
  button: {
    fontSize: '14px'
  }
});

const Navigation = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const remainingPackageDays = parseInt(
    (new Date(auth.packageExpireDate).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24)
  );
  // console.log(auth.hasActivePackage, 'auth.hasActivePackage');
  return (
    <>
      {auth.hasActivePackage && remainingPackageDays < 15 && (
        <PackageBanner>
          {remainingPackageDays > 0 ? (
            <Stack direction="row" justifyContent="flex-start" mb={3}>
              <Diamond />
              <Typography fontSize="14px" ml={1}>
                {remainingPackageDays} روز تا پایان مدت اعتبار پکیج شما باقی
                مانده است !
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="flex-start" mb={3}>
              <Warning />
              <Typography fontSize="14px" ml={1}>
                مدت اعتبار پکیج شما به پایان رسیده است !
              </Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="flex-end">
            <Button>بعدا یادآوری کن!</Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/store/settings/package')}
            >
              اطلاعات پکیج
            </Button>
          </Stack>
        </PackageBanner>
      )}
      <Style>
        <ul>
          <li>
            <NavLink
              end
              data-cy="home_nav_btn"
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="df-home" />
              خانه
            </NavLink>
          </li>
          <li>
            <NavLink
              data-cy="orders"
              to="/orders"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="df-orders" />
              سفارش
            </NavLink>
          </li>
          <li>
            <NavLink
              data-cy="products"
              to="/products"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="df-product" />
              محصول
            </NavLink>
          </li>
          <li>
            <NavLink
              data-cy="settings"
              to="/store"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <i className="df-store" />
              فروشگاه
            </NavLink>
          </li>
        </ul>
      </Style>
    </>
  );
};

export default Navigation;

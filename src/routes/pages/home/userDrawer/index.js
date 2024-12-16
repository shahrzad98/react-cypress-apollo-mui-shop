import { Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as LogoutSVG } from './svg/logout.svg';
import { ReactComponent as SettingSvg } from './svg/settings.svg';

const UserDrawer = ({ open, close, logout }) => {
  const navigate = useNavigate();

  return (
    <Style onClose={close} anchor="bottom" open={open}>
      <Grid container justifyContent="center">
        <div className="divider"></div>
      </Grid>
      <Grid container>
        <Button
          onClick={() => {
            close();
            logout();
          }}
          className="btn mt-32"
          startIcon={<LogoutSVG />}
        >
          خروج از حساب
        </Button>
      </Grid>
      <Grid container>
        <Button
          onClick={() => {
            close();
            navigate('/store/settings');
          }}
          data-cy="settingStoreBtn"
          className="btn"
          startIcon={<SettingSvg />}
        >
          تنظیمات فروشگاه
        </Button>
      </Grid>
    </Style>
  );
};

export default UserDrawer;

import { Button, Grid } from '@mui/material';
import React from 'react';
import { Style } from './style';

const LogoutModal = ({ close, logout }) => {
  return (
    <Style onClick={close}>
      <Grid onClick={e => e.stopPropagation()} className="content" container>
        <i onClick={close} className="df-close close" />
        <Grid container>
          <h4>آیا از خروج از حساب خود اطمینان دارید؟</h4>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            onClick={close}
            className="btn"
            variant="text"
            color="primary">
            انصراف
          </Button>
          <Button
            onClick={logout}
            style={{ border: '1px solid #483493' }}
            className="btn"
            variant="outlined"
            color="primary">
            خروج
          </Button>
        </Grid>
      </Grid>
    </Style>
  );
};

export default LogoutModal;

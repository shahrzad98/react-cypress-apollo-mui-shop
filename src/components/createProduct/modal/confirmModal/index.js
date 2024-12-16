import { Button, Grid } from '@mui/material';
import React from 'react';
import { Style } from './style';

const ConfirmModal = ({ close, submit, text }) => {
  return (
    <Style onClick={close}>
      <Grid onClick={e => e.stopPropagation()} className="content" container>
        <i onClick={close} className="df-close close" />
        <Grid mt={2} container>
          <h4>{text}</h4>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            style={{ border: 'none' }}
            onClick={close}
            className="btn"
            variant="text"
            data-cy="cencel_btn"
            color="primary"
          >
            خیر
          </Button>
          <Button
            onClick={submit}
            style={{ border: '1px solid #483493' }}
            className="btn"
            variant="outlined"
            data-cy="confirm_btn"
            color="primary"
          >
            بله
          </Button>
        </Grid>
      </Grid>
    </Style>
  );
};

export default ConfirmModal;

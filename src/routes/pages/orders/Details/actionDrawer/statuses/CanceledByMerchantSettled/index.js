import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { ReactComponent as FailedSVG } from '../WaitingForApproval/svg/failed.svg';

const CanceledByMerchantSettled = ({ close }) => {
  const Style = styled(Grid)`
    p {
      margin-top: 24px;
    }

    button {
      margin-top: 50px;
    }
  `;

  return (
    <Style container>
      <Grid container>
        <h3>درخواست رد شده</h3>
      </Grid>
      <Grid justifyContent="center" container>
        <FailedSVG style={{ marginRight: '-50px' }} />
      </Grid>
      <Grid container>
        <p>درخواست مشتری برای ثبت سفارش، بدلیل عدم تایید شما رد شده است.</p>
      </Grid>
      <Button onClick={close} fullWidth color="primary" variant="contained">
        متوجه شدم
      </Button>
    </Style>
  );
};

export default CanceledByMerchantSettled;

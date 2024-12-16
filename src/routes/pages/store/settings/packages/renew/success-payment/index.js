import { Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as SuccessSVG } from './svg/success.svg';

const SuccessPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  if (searchParams.get('type') === 'package') {
    return (
      <Style container>
        <Grid className="header" container>
          <h1>خرید پکیج</h1>
        </Grid>
        <Grid alignContent="flex-start" mt={3} className="content" container>
          <Grid mt={12} container justifyContent="center">
            <SuccessSVG />
          </Grid>
          <Grid mt={7} container justifyContent="center">
            <h2>پرداخت موفق</h2>
          </Grid>
          <Grid mt={2} container justifyContent="center">
            <p>
              عملیات خرید ، موفقیت آمیز بوده و پکیج جدید برای شما فعال شده است.
            </p>
          </Grid>
          <Grid mt={8} container justifyContent="space-between">
            <Grid item pr={1} xs={6}>
              <Button
                onClick={() => navigate('/')}
                fullWidth
                variant="outlined"
              >
                صفحه اصلی
              </Button>
            </Grid>
            <Grid item pl={1} xs={6}>
              <Button
                onClick={() => navigate('/store/settings/package')}
                fullWidth
                variant="contained"
              >
                مشاهده پکیج
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Style>
    );
  }

  if (searchParams.get('type') === 'sms') {
    return (
      <Style container>
        <Grid className="header" container>
          <h1>خرید پیامک</h1>
        </Grid>
        <Grid alignContent="flex-start" mt={3} className="content" container>
          <Grid mt={12} container justifyContent="center">
            <SuccessSVG />
          </Grid>
          <Grid mt={7} container justifyContent="center">
            <h2>پرداخت موفق</h2>
          </Grid>
          <Grid mt={2} container justifyContent="center">
            <p>
              عملیات خرید ، موفقیت آمیز بوده و اعتبار پیامکی شما افزایش یافت.{' '}
            </p>
          </Grid>
          <Grid mt={8} container justifyContent="space-between">
            <Grid item pr={1} xs={6}>
              <Button
                onClick={() => navigate('/')}
                fullWidth
                variant="outlined"
              >
                صفحه اصلی
              </Button>
            </Grid>
            <Grid item pl={1} xs={6}>
              <Button
                onClick={() => navigate('/store/settings/sms')}
                fullWidth
                variant="contained"
              >
                مشاهده اعتبار
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Style>
    );
  }
};

export default SuccessPayment;

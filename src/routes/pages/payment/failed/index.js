import { Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as SuccessSVG } from './svg/failed.svg';

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
            <h2>پرداخت ناموفق</h2>
          </Grid>
          <Grid mt={2} container justifyContent="center">
            <p>متاسفانه ، پرداخت شما برای خرید پکیج ناموفق بوده. </p>
          </Grid>
          <Grid container justifyContent="center">
            <p>
              اگر طی این فرآیند مبلغی از حساب شما کسر شده باشد ، تا 72 ساعت
              آینده به حساب شما بازگردانده می شود.
            </p>
          </Grid>
          <Grid mt={8} container justifyContent="space-between">
            <Grid item pr={1} xs={6}>
              <Button
                onClick={() => navigate('/store/settings/package/renew')}
                fullWidth
                variant="outlined"
              >
                بازگشت
              </Button>
            </Grid>
            <Grid item pl={1} xs={6}>
              <Button
                onClick={() => navigate('/store/settings/package/renew')}
                fullWidth
                variant="contained"
              >
                پرداخت دوباره
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
            <h2>پرداخت ناموفق</h2>
          </Grid>
          <Grid mt={2} container justifyContent="center">
            <p>متاسفانه ، پرداخت شما برای خرید پیامک ناموفق بوده. </p>
          </Grid>
          <Grid container justifyContent="center">
            <p>
              اگر طی این فرآیند مبلغی از حساب شما کسر شده باشد ، تا 72 ساعت
              آینده به حساب شما بازگردانده می شود.
            </p>
          </Grid>
          <Grid mt={8} container justifyContent="space-between">
            <Grid item pr={1} xs={6}>
              <Button
                onClick={() => navigate('/store/settings/sms/charge')}
                fullWidth
                variant="outlined"
              >
                بازگشت
              </Button>
            </Grid>
            <Grid item pl={1} xs={6}>
              <Button
                onClick={() => navigate('/store/settings/sms/charge')}
                fullWidth
                variant="contained"
              >
                پرداخت دوباره
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Style>
    );
  }

  if (searchParams.get('type') === 'wallet') {
    return (
      <Style container>
        <Grid className="header" container>
          <h1>افزایش اعتبار کیف پول</h1>
        </Grid>
        <Grid alignContent="flex-start" mt={3} className="content" container>
          <Grid mt={12} container justifyContent="center">
            <SuccessSVG />
          </Grid>
          <Grid mt={7} container justifyContent="center">
            <h2>پرداخت ناموفق</h2>
          </Grid>
          <Grid mt={2} container justifyContent="center">
            <p>
              متاسفانه ، پرداخت شما برای افزایش اعتبار کیف پول ناموفق بوده.{' '}
            </p>
          </Grid>
          <Grid container justifyContent="center">
            <p>
              اگر طی این فرآیند مبلغی از حساب شما کسر شده باشد ، تا 72 ساعت
              آینده به حساب شما بازگردانده می شود.
            </p>
          </Grid>
          <Grid mt={8} container justifyContent="space-between">
            <Grid item xs={12}>
              <Button
                onClick={() => navigate('/store/settings/wallet')}
                fullWidth
                variant="contained"
              >
                بازگشت به کیف پول
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Style>
    );
  } else {
    return <div>404</div>;
  }
};

export default SuccessPayment;

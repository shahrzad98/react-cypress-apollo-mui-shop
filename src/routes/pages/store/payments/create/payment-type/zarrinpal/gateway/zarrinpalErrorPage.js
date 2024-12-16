import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { Button, Grid, Typography } from '@mui/material';
import { StyledGrid } from '../style';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';

const ZarrinpalErrorPage = ({ retryHandle }) => {
  const navigate = useNavigate();
  return (
    <StyledGrid container>
      <ToastContainer />
      <Grid className="header">
        <Grid
          className="back-link"
          onClick={() => navigate('/store/payment/create/zarrinpal/otp')}
        >
          <i className="df-arrow" />
          <h1>زرین پال</h1>
        </Grid>
      </Grid>
      <Grid width={1} mt={4}>
        <Typography color="#DA1E28" textAlign="center" letterSpacing={-0.5}>
          متاسفانه ارتباط با زرین پال با مشکل مواجه شده است.
        </Typography>
        <Stack direction="row" justifyContent="center">
          <Button
            size="small"
            sx={{ my: 4, py: 0 }}
            variant="outlined"
            onClick={() => retryHandle()}
          >
            تلاش مجدد
          </Button>
        </Stack>
      </Grid>
    </StyledGrid>
  );
};

export default ZarrinpalErrorPage;

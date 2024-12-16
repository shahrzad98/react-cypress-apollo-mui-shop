import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import OtpInput from 'react-otp-input';
import persianJs from 'persianjs';
import { useEffect, useRef, useState } from 'react';
import { StyledGrid } from '../style';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ResendSvg } from '../../../../../../../../static/svg/resend.svg';
import { toast, ToastContainer } from 'react-toastify';

import { ReactComponent as SuccessSVG } from '../../../../../../../../components/createProduct/svg/success.svg';
import { InfoOutlined } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import {
  CREATE_ZARRINPAL,
  VERIFY_ZARRINPAL_OTP
} from '../../../../../../../../constant/mutations/payment';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [wrongOtp, setWrongOtp] = useState(false);
  const [progress, setProgress] = useState(100);
  const navigate = useNavigate();
  const [createZarrinpal, { loading: createLoading }] =
    useMutation(CREATE_ZARRINPAL);
  const [verifyOTP, { loading: verifyLoading }] =
    useMutation(VERIFY_ZARRINPAL_OTP);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
    const timer = setInterval(
      () => setProgress(state => (state > 0 ? state - 5 : null)),
      1000
    );
    return () => clearInterval(timer);
  }, []);
  const { first_name, last_name, phone_number } = JSON.parse(
    localStorage.getItem('user')
  );
  async function resendCode() {
    await createZarrinpal({
      variables: {
        content: {
          first_name: first_name,
          last_name: last_name,
          phone_number: phone_number
        }
      },
      onCompleted: () => {
        toast('کد با موفقیت ارسال شد.', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          closeButton: false,
          icon: <SuccessSVG />
        });
        setProgress(100);
      },
      onError: () => {
        toast('مشکلی پیش آمده دوباره تلاش کنید', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          closeButton: false,
          icon: <InfoOutlined />,
          style: { backgroundColor: '#EA002A33', color: '#EA002A' }
        });
      }
    });
  }

  async function verifyOTPHandle() {
    await verifyOTP({
      variables: {
        content: { token: parseInt(otp), phone_number: phone_number }
      },
      onCompleted: () => {
        navigate('/store/payment/create/zarrinpal/gateway');
      },
      onError: () => {
        setWrongOtp(true);
      }
    });
  }

  return (
    <StyledGrid container>
      <ToastContainer />
      <Grid className="header">
        <Grid
          className="back-link"
          onClick={() => navigate('/store/payment/create/zarrinpal')}
        >
          <i className="df-arrow" />
          <h1>زرین پال</h1>
        </Grid>
        <Typography fontWeight={500} letterSpacing={-0.5}>
          کد تایید ارسال شده به شماره {phone_number} را وارد کنید.
        </Typography>
      </Grid>
      <Card className="container" sx={{ height: '70vh' }}>
        <Grid mt={1} container>
          <OtpInput
            hasErrored={wrongOtp}
            errorStyle={{ borderColor: '#EA002A' }}
            focusStyle={{
              border: '2px solid #483493',
              outline: 'none'
            }}
            containerStyle={{
              flexDirection: 'row-reverse',
              width: '100%',
              maxWidth: '330px',
              justifyContent: 'space-between'
            }}
            inputStyle={{
              width: '44px',
              height: '44px',
              border: '1px solid #9185BE',
              borderRadius: '12px'
            }}
            ref={inputRef.current}
            shouldAutoFocus
            value={otp}
            onChange={e => {
              setWrongOtp(false);
              if (e) {
                const newVal = persianJs(e).toEnglishNumber().toString();
                setOtp(newVal);
              } else {
                setOtp('');
              }
            }}
            numInputs={6}
          />
          {wrongOtp && (
            <Typography mt="12px" color="#EA002A">
              کد وارد شده صحیح نیست.
            </Typography>
          )}
        </Grid>
        {progress ? (
          <Stack direction="row" alignItems="center" mt={3}>
            <Box mr={1}>
              <Box>
                <CircularProgress
                  size={16}
                  variant="determinate"
                  value={progress}
                />
              </Box>
            </Box>
            <Typography variant="body1" width="40px">
              {' '}
              00:{progress / 5}
            </Typography>
            <Typography color="#483493">تا درخواست مجدد کد</Typography>
          </Stack>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            mt={3}
            onClick={resendCode}
          >
            <Box mr={1}>
              <ResendSvg />
            </Box>
            <Typography color="#483493">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                ارسال مجدد کد
                {createLoading && (
                  <CircularProgress color="info" size={15} sx={{ ml: 1 }} />
                )}
              </Stack>
            </Typography>
          </Stack>
        )}
      </Card>
      <Grid container className="submitButton">
        <Button
          fullWidth
          onClick={verifyOTPHandle}
          data-cy="accept"
          variant="contained"
        >
          تایید
          {verifyLoading && (
            <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />
          )}
        </Button>
      </Grid>
    </StyledGrid>
  );
};

export default Otp;

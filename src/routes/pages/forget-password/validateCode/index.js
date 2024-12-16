import React, { useState } from 'react';
import { Style } from './style';
import { ReactComponent as Logo } from '../../../../static/svg/Logo.svg';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import useTimer from '../../../../utils/useTimer';
import OtpInput from 'react-otp-input';
import persianJs from 'persianjs';
import { useMutation } from '@apollo/client';
import {
  CHANGE_PASSWORD_REGISTER,
  CHECK_OTP_CODE,
  GET_OPT_SMS
} from '../../../../constant/mutations/user';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as SuccessSVG } from '../../../../components/createProduct/svg/success.svg';
import {
  InfoOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined
} from '@mui/icons-material';

const ForgetPassword = () => {
  const { start, stop, seconds, reset } = useTimer(60, true);
  const [getOtpSms, { loading }] = useMutation(GET_OPT_SMS);
  const [checkOtp, { loading: checkLoading }] = useMutation(CHECK_OTP_CODE);
  const [changePassword, { loading: changePasswordLoading }] = useMutation(
    CHANGE_PASSWORD_REGISTER
  );

  const getTimeParts = s => {
    const hours = Math.trunc(s / (60 * 60));
    const minutes = Math.trunc((s % (60 * 60)) / 60);
    const seconds = (s % (60 * 60)) % 60;

    return {
      hours,
      minutes,
      seconds
    };
  };

  const [otp, setOtp] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const checkHandler = () => {
    checkOtp({
      variables: {
        content: {
          phone_number: searchParams?.get('phone_number'),
          token: +otp
        }
      },
      onCompleted: () => {
        setStep(2);
      },
      onError: () => {
        toast('کد وارد شده اشتباه است.', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          // closeOnClick: true,
          draggable: true,
          closeButton: false,
          icon: <InfoOutlined />,
          style: { backgroundColor: '#EA002A33', color: '#EA002A' }
        });
      }
    });
  };

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    newPassword: ''
  });
  const [visible, setVisible] = useState({
    password: false,
    newPassword: false
  });

  return (
    <Style alignContent="flex-start" container>
      <Grid alignContent="flex-start" container justifyContent="center" mt={12}>
        <Logo style={{ width: '170px' }} />
      </Grid>
      {step === 1 ? (
        <>
          <Grid justifyContent="center" mt={6} container>
            <h1>بازیابی کلمه عبور</h1>
          </Grid>
          <Grid mt={4} container justifyContent="center">
            <p>کد تایید ارسال شده را وارد کنید.</p>
          </Grid>
          <Grid mt={3} container>
            <OtpInput
              focusStyle={{
                border: '2px solid #483493',
                outline: 'none'
              }}
              containerStyle={{
                flexDirection: 'row-reverse',
                width: '100%',
                justifyContent: 'space-between'
              }}
              inputStyle={{
                width: '44px',
                height: '44px',
                border: '1px solid #9185BE',
                borderRadius: '12px'
              }}
              shouldAutoFocus
              value={otp}
              onChange={e => {
                if (e) {
                  const newVal = persianJs(e).toEnglishNumber().toString();
                  setOtp(newVal);
                } else {
                  setOtp('');
                }
              }}
              numInputs={5}
            />
          </Grid>

          <Grid mt={4} item xs={12} className="codeExpireWrapper">
            <>
              <Grid item xs={9}>
                <span className="remainTime">زمان باقی مانده تا انقضاء کد</span>
              </Grid>

              <Grid item xs={3} container justifyContent="flex-end">
                {loading ? (
                  <CircularProgress />
                ) : seconds < 1 ? (
                  <a
                    className="resendBtn"
                    onClick={() => {
                      getOtpSms({
                        variables: {
                          content: {
                            phone_number: searchParams.get('phone_number'),
                            is_forget_password: true
                          }
                        },
                        onCompleted: () => {
                          stop();
                          reset();
                          start();
                          toast('کد برای شما ارسال شد.', {
                            position: 'bottom-center',
                            autoClose: 2000,
                            hideProgressBar: true,
                            // closeOnClick: true,
                            draggable: true,
                            closeButton: false,
                            icon: <SuccessSVG />
                          });
                        }
                      });
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    ارسال مجدد
                  </a>
                ) : (
                  <p className="resendBtn" variant="subtitle1" gutterBottom>
                    {getTimeParts(seconds).seconds} :{' '}
                    {getTimeParts(seconds).minutes}
                  </p>
                )}
              </Grid>
            </>
          </Grid>

          <Grid mt={5} container>
            <Button
              disabled={checkLoading}
              onClick={() => checkHandler()}
              variant="contained"
              color="primary"
              fullWidth
            >
              {checkLoading ? <CircularProgress /> : 'تایید و ادامه'}
            </Button>
          </Grid>
          <Grid mt={2} container>
            <Button
              onClick={() => navigate(-1)}
              variant="text"
              color="primary"
              fullWidth
            >
              بازگشت
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <Grid mt={12} container justifyContent="center">
            <p>کلمه عبور جدید خور را وارد کنید.</p>
          </Grid>
          <Grid mt={4} container>
            <TextField
              error={errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment:
                  visible.password === true ? (
                    <IconButton
                      onClick={() => {
                        setVisible(visible => ({
                          ...visible,
                          password: false
                        }));
                      }}
                    >
                      <VisibilityOutlined />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setVisible(visible => ({
                          ...visible,
                          password: true
                        }));
                      }}
                    >
                      <VisibilityOffOutlined />
                    </IconButton>
                  )
              }}
              value={password}
              onChange={e => {
                setErrors({});
                if (e.target.value) {
                  const newVal = persianJs(e.target.value)
                    .toEnglishNumber()
                    .toString();
                  setPassword(newVal);
                } else {
                  setPassword('');
                }
              }}
              fullWidth
              variant="outlined"
              type={visible.password ? 'text' : 'password'}
              label="کلمه عبور جدید"
            />
          </Grid>
          <Grid mt={2} container>
            <TextField
              error={errors.newPassword}
              helperText={errors.newPassword}
              value={newPassword}
              onChange={e => {
                if (e.target.value) {
                  const newVal = persianJs(e.target.value)
                    .toEnglishNumber()
                    .toString();
                  setNewPassword(newVal);
                } else {
                  setNewPassword('');
                }
              }}
              InputProps={{
                endAdornment:
                  visible.newPassword === true ? (
                    <IconButton
                      onClick={() => {
                        setVisible(visible => ({
                          ...visible,
                          newPassword: false
                        }));
                      }}
                    >
                      <VisibilityOutlined />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setVisible(visible => ({
                          ...visible,
                          newPassword: true
                        }));
                      }}
                    >
                      <VisibilityOffOutlined />
                    </IconButton>
                  )
              }}
              fullWidth
              variant="outlined"
              type={visible.newPassword ? 'text' : 'password'}
              label="تکرار کلمه عبور جدید"
            />
          </Grid>
          <Grid mt={5} container>
            <Button
              disabled={changePasswordLoading}
              onClick={() => {
                if (!password) {
                  setErrors(errors => ({
                    ...errors,
                    password: 'کلمه عبور جدید را وارد کنید'
                  }));
                  return;
                }
                if (password?.length < 8) {
                  setErrors(errors => ({
                    ...errors,
                    password: 'کلمه عبور باید حداقل ۸ کاراکتر باشد'
                  }));
                  return;
                }
                if (password !== newPassword) {
                  setErrors(errors => ({
                    ...errors,
                    newPassword: 'تکرار کلمه عبور مطابقت ندارد'
                  }));
                }
                changePassword({
                  variables: {
                    content: {
                      token: +otp,
                      phone_number: searchParams.get('phone_number'),
                      password: password
                    }
                  },
                  onCompleted: () => {
                    toast('کلمه عبور شما با موفقیت تغییر کرد.', {
                      position: 'bottom-center',
                      autoClose: 2000,
                      hideProgressBar: true,
                      // closeOnClick: true,
                      draggable: true,
                      closeButton: false,
                      icon: <SuccessSVG />
                    });
                    setTimeout(() => {
                      navigate('/');
                    }, 1000);
                  },
                  onError: () => {
                    toast('کد منقضی شده است.', {
                      position: 'bottom-center',
                      autoClose: 2000,
                      hideProgressBar: true,
                      // closeOnClick: true,
                      draggable: true,
                      closeButton: false,
                      icon: <InfoOutlined />,
                      style: { backgroundColor: '#EA002A33', color: '#EA002A' }
                    });
                  }
                });
              }}
              fullWidth
              color="primary"
              variant="contained"
            >
              {changePasswordLoading ? <CircularProgress /> : 'تایید'}
            </Button>
          </Grid>
        </>
      )}
      <ToastContainer />
    </Style>
  );
};

export default ForgetPassword;

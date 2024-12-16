import React, { useState } from 'react';
import { Style } from './style';
import { ReactComponent as Logo } from '../../../static/svg/Logo.svg';
import { Button, Grid, TextField } from '@mui/material';
import persianJs from 'persianjs';
import { useMutation } from '@apollo/client';
import { GET_OPT_SMS } from '../../../constant/mutations/user';
import { useNavigate } from 'react-router-dom';
const mobileRegex = /^(\+98|0)?9\d{9}$/g;

const ForgetPassword = () => {
  const [value, setValue] = useState('');
  const [getOtpSms] = useMutation(GET_OPT_SMS);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <Style alignContent="flex-start" container>
      <Grid alignContent="flex-start" container justifyContent="center" mt={12}>
        <Logo style={{ width: '170px' }} />
      </Grid>
      <Grid justifyContent="center" mt={6} container>
        <h1>بازیابی رمز عبور</h1>
      </Grid>
      <Grid mt={4} container justifyContent="center">
        <p>لطفا شماره موبایلت رو برای ارسال پیامک وارد کن.</p>
      </Grid>
      <Grid mt={5} container>
        <TextField
          error={error}
          helperText={error}
          name="phone_number"
          fullWidth
          label="شماره تلفن همراه"
          variant="outlined"
          value={value}
          onChange={e => {
            setError('');
            if (e.target.value) {
              const newVal = persianJs(e.target.value)
                .toEnglishNumber()
                .toString();
              setValue(newVal);
            } else {
              setValue('');
            }
          }}
        />
      </Grid>
      <Grid mt={5} container>
        <Button
          onClick={() => {
            if (!value) {
              setError('لطفا شماره موبایل را وارد کنید.');
              return false;
            }
            if (!value.match(mobileRegex)) {
              setError('لطفا شماره موبایل را به درستی وارد کنید.');
              return false;
            }
            if (value.match(mobileRegex)) {
              getOtpSms({
                variables: {
                  content: {
                    is_forget_password: true,
                    phone_number: value
                  }
                },
                onCompleted: () =>
                  navigate(`/forget-password/validate?phone_number=${value}`)
              });
            }
          }}
          variant="contained"
          color="primary"
          fullWidth
        >
          تایید و ادامه
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
    </Style>
  );
};

export default ForgetPassword;

import { Close } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import persianJs from 'persianjs';
import React, { useEffect, useState } from 'react';
import { Style } from './style';

const FillDataModal = ({ close, initialNC, initialSHN, onSubmit }) => {
  const [nationalCode, setNationalCode] = useState('');
  const [shebaNumber, setShebaNumber] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialNC) {
      setNationalCode(initialNC);
    }
    if (initialSHN) {
      setShebaNumber(initialSHN);
    }
  }, [initialNC, initialSHN]);

  const submitHandler = () => {
    if (shebaNumber?.length !== 24) {
      setErrors({ shebaNumber: 'شماره شبا باید ۲۴ رقم باشد.' });
      return false;
    }
    if (nationalCode?.length !== 10) {
      setErrors({ nationalCode: 'شماره ملی باید ۱۰ رقم باشد.' });
      return false;
    }
    if (!shebaNumber) {
      setErrors({ shebaNumber: 'لطفا شماره شبا را وارد کنید' });
      return false;
    }
    if (!nationalCode) {
      setErrors({ nationalCode: 'لطفا کد ملی را وارد کنید.' });
      return false;
    }
    onSubmit();
  };

  return (
    <Style
      container
      justifyContent="center"
      alignItems="center"
      onClick={close}
    >
      <Grid
        onClick={e => e.stopPropagation()}
        alignContent="start"
        container
        className="content"
      >
        <Grid justifyContent="space-between" alignItems="center" container>
          {' '}
          <h3>تکمیل اطلاعات</h3>
          <IconButton onClick={close} className="icon_btn">
            <Close />
          </IconButton>
        </Grid>
        <Grid mt={4} mb={3} container>
          <p>برای خرید پکیج، اطلاعات زیر را وارد کنید.</p>
        </Grid>
        <Grid container>
          <h4>کد ملی</h4>
        </Grid>
        <Grid mt={1} container>
          <TextField
            error={errors?.nationalCode}
            helperText={errors?.nationalCode}
            placeholder="کد ملی خود را وارد کنید."
            fullWidth
            value={nationalCode}
            onChange={e => {
              setErrors({ ...errors, nationalCode: '' });
              if (e.target.value) {
                const newVale = persianJs(e.target.value)
                  .toEnglishNumber()
                  .toString();
                setNationalCode(newVale);
              } else {
                setNationalCode('');
              }
            }}
          />
        </Grid>
        <Grid mt={2} container>
          <h4>شماره شبا</h4>
        </Grid>
        <Grid mt={1} container>
          <TextField
            error={errors?.shebaNumber}
            helperText={errors?.shebaNumber}
            placeholder="شماره شبا را وارد کنید."
            fullWidth
            value={shebaNumber}
            onChange={e => {
              setErrors({ ...errors, shebaNumber: '' });
              if (e.target.value) {
                const newVale = persianJs(e.target.value)
                  .toEnglishNumber()
                  .toString();
                setShebaNumber(newVale);
              } else {
                setShebaNumber('');
              }
            }}
          />
        </Grid>
        <Grid justifyContent="flex-end" container mt={8} mb={2}>
          <Button onClick={close} style={{ width: '110px' }} variant="text">
            انصراف
          </Button>
          <Button
            onClick={submitHandler}
            style={{ width: '110px' }}
            variant="contained"
          >
            ثبت
          </Button>
        </Grid>
      </Grid>
    </Style>
  );
};

export default FillDataModal;

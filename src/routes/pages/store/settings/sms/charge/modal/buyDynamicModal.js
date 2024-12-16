import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import persianJs from 'persianjs';
import React, { useEffect, useState } from 'react';

const Style = styled(Grid)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  .content {
    height: auto;
    width: 90vw;
    background-color: #fff;
    border-radius: 10px;
    padding: 16px;
    button {
      width: 110px;
    }
    h4 {
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
      margin: 0;
    }
    h5 {
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      color: #000;
    }
    h6 {
      font-size: 16px;
      font-weight: 400;
      color: #6a6f80;
    }
    .smsCount {
      height: 48px;
      border-radius: 10px;
      background-color: #f3f3f3;
      padding: 0 12px;
      color: #828282;
    }
  }
`;

const BuyDynamicModal = ({ onClose, payHandler, loading, smsCost }) => {
  const [value, setValue] = useState('');
  const [count, setCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (+value > +smsCost) {
      setCount((+value / +smsCost).toFixed());
    } else {
      setCount(0);
    }
  }, [value]);

  return (
    <Style
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
      container
    >
      <Grid onClick={e => e.stopPropagation()} className="content">
        <Grid justifyContent="space-between" container>
          <h4>خرید پیامک با مبلغ دلخواه</h4>
          <Close onClick={onClose} />
        </Grid>
        <Grid mt={4} container>
          <h5>لطفا مبلغ مورد نظر خود را برای افزایش اعتبار پیامک وارد کنید.</h5>
        </Grid>
        <Grid container mt={3}>
          <h6>مبلغ</h6>
        </Grid>
        <Grid mt={1} container>
          <TextField
            data-cy="input_cost"
            error={error}
            helperText={error}
            value={value}
            InputProps={{
              endAdornment: <p>تومان</p>
            }}
            onChange={e => {
              setError('');
              if (e.target.value) {
                const newValue = persianJs(e.target.value)
                  .toEnglishNumber()
                  .toString();
                setValue(newValue);
              } else {
                setValue('');
              }
            }}
            fullWidth
          />
        </Grid>
        <Grid
          data-cy="result_count"
          justifyContent="flex-start"
          alignItems="center"
          mt={2}
          container
          className="smsCount"
        >
          {count} پیامک
        </Grid>
        <Grid justifyContent="flex-end" container mt={8}>
          <Button onClick={onClose} variant="text">
            بازگشت
          </Button>
          <Button
            data-cy="sbmit_count"
            disabled={loading}
            onClick={() => {
              if (!value) {
                setError('لطفا مبلغ را وارد کنید.');
                return false;
              }

              if (+value < 5000) {
                setError('حداقل مبلغ خرید، ۵۰۰۰ تومان میباشد');
                return false;
              }
              if (+value < smsCost) {
                setError(`حداقل مبلغ هر پیامک ${smsCost} تومان است`);
                return false;
              }
              if (isNaN(+value)) {
                setError('مبلغ را به درستی وارد کنید.');
                return false;
              }
              payHandler({
                count: +count,
                cost: +value
              });
            }}
            variant="contained"
          >
            {loading ? (
              <CircularProgress
                style={{ width: '24px', height: '24px', color: '#FFF' }}
              />
            ) : (
              'تایید'
            )}
          </Button>
        </Grid>
      </Grid>
    </Style>
  );
};

export default BuyDynamicModal;

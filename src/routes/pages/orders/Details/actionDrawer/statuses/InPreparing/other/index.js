import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { arrayOfNumber } from '../../../../../../../../utils/helpers';
import { ReactComponent as SuccessSvg } from '../../WaitingForApproval/svg/success.svg';
import { ReactComponent as WarningSvg } from '../../WaitingForApproval/svg/warning.svg';

const Style = styled(Grid)`
  .MuiList-root {
    max-height: 300px;
  }
  .df-arrow {
    margin-top: 16px;
    font-size: 19px;
    color: #000;
    margin-right: 12px;
  }

  i {
    color: #9185be;
    margin-top: 0;
    margin-bottom: 16px;
  }
  .menu {
    max-height: 350px;
    .MuiMenu-paper {
      padding: 0;
      max-height: 300px;
    }
  }
  .icon {
    color: #9185be;
  }
  .smsCont {
    .MuiSelect-outlined.MuiSelect-outlined {
      padding: 22px 11px 13px;
    }
  }
  .space {
    height: 0.5px;
    background-color: #c9c3e0;
    margin: 16px 0;
  }
  button {
    display: flex;
    align-items: center;
  }
  .edit-btn {
    padding: 0;
    height: 20px;
    font-size: 14px;
    color: #483493;
    i {
      font-size: 14px;
      color: #483493;
    }
    span {
      display: inline;
    }
  }

  .right-odd-row {
    padding-left: 16px;
    display: flex;
    align-items: center;
    height: 48px;
    border-radius: 16px 0 0 16px;
    background-color: #f3f3f3;
  }
  .left-odd-row {
    padding-left: 16px;
    display: flex;
    align-items: center;
    height: 48px;
    border-radius: 0 16px 16px 0;
    background-color: #f3f3f3;
    border-left: 1px solid #fff;
  }
  .right-even-row {
    padding-left: 16px;
    display: flex;
    align-items: center;
    height: 48px;
    border-radius: 16px 0 0 16px;
    background-color: #fff;
  }
  .left-even-row {
    padding-left: 16px;
    display: flex;
    align-items: center;
    height: 48px;
    border-radius: 0 16px 16px 0;
    background-color: #fff;
    border-left: 1px solid #f3f3f3;
  }
  .address-container {
    border-left: 2px solid #f1f1f1;
    padding-left: 12px;
    margin-top: 30px;
    h6 {
      margin-top: 8px;
    }
    h4 {
      color: #6a6f80;
      font-size: 14px;
      font-weight: 300;
      margin: 0;
    }
  }
  h5 {
    margin: 0;
    color: #adaaba;
    font-size: 14px;
    font-weight: 300;
  }
  h6 {
    color: #6a6f80;
    font-size: 14px;
    font-weight: 300;
    margin: 0;
  }
  .button-cont {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0px 4px 20px rgba(72, 52, 147, 0.12);
  }
  .edint-input-cont {
    margin-bottom: 16px;
  }
  a {
    color: #483493;
  }
`;

const OtherPost = ({
  order,
  close,
  sendOrder,
  step,
  setStep,
  updateSendOrder
}) => {
  const [info, setInfo] = useState({
    weight: Math.ceil(sendOrder?.weight / 1000) * 1000 || 1
  });
  const [errors, setErrors] = useState({});
  function handleChange({ target }) {
    setErrors({});
    if (target.name == 'weight') {
      setInfo(prevInfo => ({
        ...prevInfo,
        weight: target.value * 1000
      }));
    } else {
      setInfo(prevInfo => ({
        ...prevInfo,
        [target.name]: target.value
      }));
    }
  }

  const submitHandler = () => {
    let now = new Date().getTime();
    let preparingTime = new Date(order?.prepare_deadline).getTime();
    if (preparingTime - now > 86400000 && step === 1) {
      setStep(2);
    } else {
      let body = {
        weight: info?.weight,
        ...(sendOrder?.receiver_first_name && {
          receiver_first_name: sendOrder?.receiver_first_name
        }),
        ...(sendOrder?.receiver_last_name && {
          receiver_last_name: sendOrder?.receiver_last_name
        }),
        ...(sendOrder?.receiver_phone_number && {
          receiver_phone_number: sendOrder?.receiver_phone_number
        }),
        address: {
          ...(sendOrder?.address?.longitude && {
            longitude: sendOrder?.address?.longitude
          }),
          ...(sendOrder?.address?.latitude && {
            latitude: sendOrder?.address?.latitude
          }),
          ...(sendOrder?.address?.address && {
            address: sendOrder?.address?.address
          }),
          ...(sendOrder?.address?.postal_code && {
            postal_code: sendOrder?.address?.postal_code
          }),
          ...(sendOrder?.address?.city && {
            city: sendOrder?.address?.city
          }),
          ...(sendOrder?.address?.province && {
            province: sendOrder?.address?.province
          })
        }
      };
      updateSendOrder({
        variables: {
          updateOrderSendId: +order?.id,
          content: body
        },
        onCompleted: () => setStep(3),
        onError: () => {}
      });
    }
  };

  const renderTitle = () => {
    switch (step) {
      case 1: {
        return (
          <Grid alignItems="center" container>
            <i onClick={close} className="df-arrow" />
            <h3 onClick={close}>ارسال سفارش</h3>
          </Grid>
        );
      }
      case 2: {
        return (
          <Grid alignItems="center" container>
            <i onClick={() => setStep(1)} className="df-arrow" />
            <h3 onClick={() => setStep(1)}>ارسال زود هنگام سفارش</h3>
          </Grid>
        );
      }
      case 3: {
        return (
          <Grid alignItems="center" container>
            <h3>ارسال موفق</h3>
          </Grid>
        );
      }
      default:
        return;
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1: {
        return (
          <Grid container>
            <Grid container>
              <h2>اطلاعات مرسوله - پیک</h2>
            </Grid>
            <Grid container>
              <p>
                وزن در نظر گرفته شده برای سفارش به صورت زیر است، در صورت نیاز
                میتوانید آن را تغییر دهید..
              </p>
            </Grid>
            <Grid container>
              <Grid mb={2} item xs={12}>
                {' '}
                <TextField
                  data-cy="select_weight"
                  error={errors.weight}
                  helperText={errors.weight}
                  variant="outlined"
                  select
                  fullWidth
                  label="وزن بسته‌بندی"
                  style={{ minHeight: '60px' }}
                  name="weight"
                  value={Math.ceil(info?.weight / 1000)}
                  onChange={handleChange}
                  SelectProps={{
                    MenuProps: { className: 'menu' },
                    classes: { icon: 'icon' }
                  }}
                >
                  {arrayOfNumber(1, 20).map((item, i) => (
                    <MenuItem
                      data-cy={`select_weight_option${i}`}
                      key={i}
                      value={item}
                    >
                      <Typography
                        style={{ margin: 0 }}
                        variant="inherit"
                        noWrap
                      >
                        {`${i} تا ${item} کیلوگرم`}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        );
      }
      case 2: {
        return (
          <Grid container>
            <Grid justifyContent="center" container>
              <WarningSvg style={{ marginRight: '-40px' }} />
            </Grid>
            <Grid mt={4} container>
              <p>
                هنوز{' '}
                {Math.ceil(
                  (new Date(order?.prepare_deadline).getTime() -
                    new Date().getTime()) /
                    86400000
                )}{' '}
                روز تا پایان زمان آماده سازی سفارش باقی مانده. لطفا در صورت
                تمایل به ارسال زودتر سفارش ، با مشتری هماهنگ کنید.
              </p>
            </Grid>
            <Grid container>
              <h2>اطلاعات مشتری</h2>
            </Grid>
            <Grid
              style={{ marginTop: 0 }}
              container
              className="address-container"
            >
              <Grid container justifyContent="space-between">
                <h5>نام و نام خانوادگی</h5>
                <h4>
                  {sendOrder?.receiver_first_name}{' '}
                  {sendOrder?.receiver_last_name}
                </h4>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <h5>شماره تلفن</h5>
                <h4>{sendOrder?.receiver_phone_number?.replace('+98', '0')}</h4>
              </Grid>
            </Grid>
          </Grid>
        );
      }
      case 3: {
        return (
          <Grid container>
            <Grid container justifyContent="center">
              <SuccessSvg />
            </Grid>
            <Grid mt={3} container>
              <p>
                اطلاعات ارسال با موفقیت ثبت شد. وضعیت سفارش مشتری، در حال ارسال
                قرار می گیرد.{' '}
              </p>
            </Grid>
          </Grid>
        );
      }
      default:
        return;
    }
  };

  const renderFooter = () => {
    switch (step) {
      case 1: {
        return (
          <Grid mt={6} container>
            <Button
              data-cy="submit_send_btn"
              onClick={submitHandler}
              variant="contained"
              color="primary"
              fullWidth
            >
              تایید و ارسال
            </Button>
          </Grid>
        );
      }
      case 2:
        return (
          <Grid mt={6} container>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={submitHandler}
            >
              تایید و ارسال
            </Button>
          </Grid>
        );
      case 3:
        return (
          <Grid mt={6} container>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => {
                close();
              }}
            >
              متوجه شدم
            </Button>
          </Grid>
        );
      default:
        return;
    }
  };

  return (
    <Style container>
      {renderTitle()}
      {renderContent()}
      {renderFooter()}
    </Style>
  );
};

export default OtherPost;

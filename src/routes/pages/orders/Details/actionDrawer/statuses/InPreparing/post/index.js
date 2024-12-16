import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Radio,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import {
  arrayOfNumber,
  formatNumber
} from '../../../../../../../../utils/helpers';
import { Help } from '@mui/icons-material';
import { ReactComponent as SuccessSvg } from '../../WaitingForApproval/svg/success.svg';
import { ReactComponent as UnSuccessSvg } from '../../WaitingForApproval/svg/unsuccess.svg';
import NeshanShowingMap from '../../../../../../../../components/shared/mapNeshan/showingMap';

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
    maxheight: 350px;
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
    alignitems: center;
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

const Post = ({ order, close, sendOrder, step, setStep }) => {
  const [isEdit, setisEdit] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showingInfo, setShowingInfo] = useState({
    is_sms_service_active: sendOrder?.is_sms_service_active,
    weight: sendOrder?.weigth || 0,
    receiver_phone_number: sendOrder?.receiver_phone_number || '',
    receiver_last_name: sendOrder?.receiver_last_name || '',
    receiver_first_name: sendOrder?.receiver_first_name || '',
    address: {
      address: sendOrder?.address.address || '',
      city: sendOrder?.address.city || '',
      province: sendOrder?.address.province || '',
      postal_code: sendOrder?.address.postal_code || ''
    }
  });
  const [info, setInfo] = useState({
    is_sms_service_active: sendOrder?.is_sms_service_active,
    weight: sendOrder?.weigth || 0,
    receiver_phone_number: showingInfo?.receiver_phone_number || '',
    receiver_last_name: showingInfo?.receiver_last_name || '',
    receiver_first_name: showingInfo?.receiver_first_name || '',
    address: {
      address: showingInfo?.address.address || '',
      city: showingInfo?.address.city || '',
      province: showingInfo?.address.province || '',
      postal_code: showingInfo?.address.postal_code || ''
    }
  });
  const [errors, setErrors] = useState({});

  function handleChange({ target }) {
    setErrors({});
    let addressTargets = ['postal_code', 'address', 'province', 'city'];
    if (target.name == 'weight') {
      setInfo(prevInfo => ({
        ...prevInfo,
        weight: target.value * 1000
      }));
    } else if (addressTargets.some(item => item == target.name)) {
      setInfo(prevInfo => ({
        ...prevInfo,
        address: {
          ...prevInfo.address,
          [target.name]: target.value
        }
      }));
      if (target.name == 'province') {
        setInfo(prevInfo => ({
          ...prevInfo,
          address: {
            ...prevInfo.address,
            city: ''
          }
        }));
      }
    } else {
      setInfo(prevInfo => ({
        ...prevInfo,
        [target.name]: target.value
      }));
    }
  }

  const renderTitle = () => {
    switch (step) {
      case 1: {
        if (isEdit) {
          return (
            <Grid alignItems="center" container>
              <i onClick={() => setisEdit(false)} className="df-arrow" />
              <h3 onClick={() => setisEdit(false)}>ویرایش اطلاعات گیرنده</h3>
            </Grid>
          );
        } else {
          return (
            <Grid alignItems="center" container>
              <i onClick={close} className="df-arrow" />
              <h3 onClick={close}>ارسال سفارش</h3>
            </Grid>
          );
        }
      }
      case 2: {
        return (
          <Grid alignItems="center" container>
            <i onClick={() => setStep(1)} className="df-arrow" />
            <h3 onClick={() => setStep(1)}>ارسال سفارش</h3>
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
      case 4: {
        return (
          <Grid alignItems="center" container>
            <h3>ارسال ناموفق</h3>
          </Grid>
        );
      }
      default:
        return;
    }
  };

  const map = useMemo(() => {
    return (
      <Grid container style={{ height: '120px', marginTop: '24px' }}>
        <NeshanShowingMap
          latLng={[order?.address?.latitude, order?.address?.longitude]}
        />
      </Grid>
    );
  }, [order]);

  const renderContent = () => {
    switch (step) {
      case 1: {
        if (isEdit) {
          return (
            <Grid container>
              <Grid container>
                <p>
                  در صورت ویرایش اطلاعات گیرنده ، هزینه ارسال ممکن است تغییر
                  کند.
                </p>
              </Grid>
              <Grid className="edint-input-cont" container>
                <TextField
                  error={errors?.receiver_first_name}
                  helperText={errors?.receiver_first_name}
                  value={info?.receiver_first_name}
                  onChange={e =>
                    setInfo(info => ({
                      ...info,
                      receiver_first_name: e.target.value
                    }))
                  }
                  variant="outlined"
                  label="نام"
                  fullWidth
                />
              </Grid>
              <Grid className="edint-input-cont" container>
                <TextField
                  error={errors?.receiver_last_name}
                  helperText={errors?.receiver_last_name}
                  value={info?.receiver_last_name}
                  onChange={e =>
                    setInfo(info => ({
                      ...info,
                      receiver_last_name: e.target.value
                    }))
                  }
                  variant="outlined"
                  label="نام خانوادگی"
                  fullWidth
                />
              </Grid>
              <Grid className="edint-input-cont" container>
                <TextField
                  error={errors?.receiver_phone_number}
                  helperText={errors?.receiver_phone_number}
                  value={info?.receiver_phone_number}
                  onChange={e =>
                    setInfo(info => ({
                      ...info,
                      receiver_phone_number: e.target.value
                    }))
                  }
                  variant="outlined"
                  label="شماره موبایل"
                  fullWidth
                />
              </Grid>
              <Grid className="edint-input-cont" container>
                <TextField
                  error={errors?.address}
                  helperText={errors?.address}
                  value={info?.address?.address}
                  onChange={e =>
                    setInfo(info => ({
                      ...info,
                      address: {
                        ...info.address,
                        address: e.target.value
                      }
                    }))
                  }
                  variant="outlined"
                  label="آدرس"
                  fullWidth
                />
              </Grid>
              <Grid className="edint-input-cont" container>
                <TextField
                  error={errors?.postal_code}
                  helperText={errors?.postal_code}
                  value={info?.address?.postal_code}
                  onChange={e =>
                    setInfo(info => ({
                      ...info,
                      address: {
                        ...info.address,
                        postal_code: e.target.value
                      }
                    }))
                  }
                  variant="outlined"
                  label="کد پستی"
                  fullWidth
                />
              </Grid>
              <Grid mt={-3} container>
                {order?.address?.latitude && map}
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid container>
              <Grid container>
                <h2>اطلاعات مرسوله - پست</h2>
              </Grid>
              <Grid container>
                <p>
                  پس از انتخاب موارد زیر با استفاده از دکمه &quot;تایید
                  اطلاعات&quot; می توانید هزینه ارسال پست را مشاهده کنید.
                </p>
              </Grid>
              <Grid container>
                <Grid mb={2} item xs={12}>
                  {' '}
                  <TextField
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
                      <MenuItem key={i} value={item}>
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
                <Grid className={'smsCont'} item xs={12}>
                  {' '}
                  <FormControl variant="filled" style={{ width: '100%' }}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      error={!!errors.is_sms_service_active}
                      displayEmpty
                      name="is_sms_service_active"
                      InputLabelProps={{ style: { pointerEvents: 'auto' } }}
                      label={
                        <div>
                          وضعیت پیامک به مشتری
                          <Tooltip
                            open={showTooltip}
                            onOpen={() => setShowTooltip(true)}
                            onClose={() => setShowTooltip(false)}
                            title={
                              <Grid container spacing={1}>
                                <Grid item>
                                  <h2 style={{ margin: '15px 0' }}>
                                    وضعیت پیامک به مشتری
                                  </h2>
                                  <p>
                                    منظور اطلاع رسانی وضعیت های سفارش در حال
                                    ارسال از طریق پیامک ، به مشتری می باشد.{' '}
                                  </p>
                                </Grid>
                              </Grid>
                            }
                            placement="bottom-start"
                          >
                            <Help onClick={() => setShowTooltip(true)} />
                          </Tooltip>
                        </div>
                      }
                      style={{ minHeight: '60px' }}
                      value={info?.is_sms_service_active}
                      onChange={handleChange}
                      SelectProps={{
                        MenuProps: { className: 'menu' },
                        renderValue: value =>
                          value === true ? (
                            <Typography style={{ margin: 0 }}>فعال</Typography>
                          ) : (
                            <Typography style={{ margin: 0 }}>
                              غیر فعال
                            </Typography>
                          )
                      }}
                    >
                      <MenuItem value>
                        <Radio
                          checked={info?.is_sms_service_active === true}
                          name="radio-button-demo"
                          inputProps={{ 'aria-label': 'C' }}
                        />
                        <Typography variant="inherit" noWrap>
                          فعال
                        </Typography>
                      </MenuItem>
                      <MenuItem value={false}>
                        <Radio
                          checked={info?.is_sms_service_active === false}
                          name="radio-button-demo"
                          inputProps={{ 'aria-label': 'C' }}
                        />
                        <Typography variant="inherit" noWrap>
                          غیرفعال
                        </Typography>
                      </MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container className="space"></Grid>
              <Grid
                container
                mb={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <h2 style={{ marginBottom: 0 }}>اطلاعات گیرنده</h2>
                <Button
                  onClick={() => setisEdit(2)}
                  className="edit-btn"
                  startIcon={<i className="df-edit" />}
                  variant="text"
                  color="primary"
                >
                  ویرایش
                </Button>{' '}
              </Grid>
              <Grid container>
                <Grid item xs={6} className="right-odd-row">
                  <h5>نام و نام خانوادگی</h5>
                </Grid>
                <Grid item xs={6} className="left-odd-row">
                  <h6>
                    {showingInfo?.receiver_first_name}{' '}
                    {showingInfo?.receiver_last_name}
                  </h6>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="right-even-row">
                  <h5>شماره موبایل</h5>
                </Grid>
                <Grid item xs={6} className="left-even-row">
                  <h6>
                    {showingInfo.receiver_phone_number?.replace('+98', '0')}
                  </h6>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="right-odd-row">
                  <h5>شهر و استان</h5>
                </Grid>
                <Grid item xs={6} className="left-odd-row">
                  <h6>
                    {showingInfo?.address?.province}
                    {' - '}
                    {showingInfo?.address?.city}
                  </h6>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="right-even-row">
                  <h5>کد پستی</h5>
                </Grid>
                <Grid item xs={6} className="left-even-row">
                  <h6>{showingInfo?.address?.postal_code}</h6>
                </Grid>
              </Grid>
              <Grid container className="address-container">
                <Grid container>
                  <h5>آدرس</h5>
                </Grid>
                <Grid container>
                  <h6>{showingInfo?.address?.address}</h6>
                </Grid>
              </Grid>
              <Grid container>{map}</Grid>
              <Grid container className="space"></Grid>
              <Grid
                container
                mb={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <h2 style={{ marginBottom: 0 }}>اطلاعات ارسال کننده</h2>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="right-odd-row">
                  <h5>نام و نام خانوادگی</h5>
                </Grid>
                <Grid item xs={6} className="left-odd-row">
                  <h6>
                    {sendOrder?.merchant_data?.first_name}{' '}
                    {sendOrder?.merchant_data?.last_name}
                  </h6>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="right-even-row">
                  <h5>شماره موبایل</h5>
                </Grid>
                <Grid item xs={6} className="left-even-row">
                  <h6>
                    {sendOrder?.merchant_data?.phone_number?.replace(
                      '+98',
                      '0'
                    )}
                  </h6>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="right-odd-row">
                  <h5>شهر و استان</h5>
                </Grid>
                <Grid item xs={6} className="left-odd-row">
                  <h6>
                    {sendOrder?.merchant_data?.address?.province}
                    {' - '}
                    {sendOrder?.merchant_data?.address?.city}
                  </h6>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="right-even-row">
                  <h5>کد پستی</h5>
                </Grid>
                <Grid item xs={6} className="left-even-row">
                  <h6> {sendOrder?.merchant_data?.address?.postal_code}</h6>
                </Grid>
              </Grid>
              <Grid mb={10} container className="address-container">
                <Grid container>
                  <h5>آدرس</h5>
                </Grid>
                <Grid container>
                  <h6> {sendOrder?.merchant_data?.address?.address}</h6>
                </Grid>
              </Grid>
            </Grid>
          );
        }
      }
      case 2: {
        return (
          <Grid container>
            <Grid container>
              <h2>اطلاعات مرسوله - پست</h2>
            </Grid>
            <Grid container>
              <p>جزییات هزینه ارسال مرسوله شما به شرح زیر است.</p>
            </Grid>
            <Grid
              justifyContent="space-between"
              style={{ marginTop: 0 }}
              container
              className="address-container"
            >
              <h5>هزینه ارسال پست</h5>
              <h4>{formatNumber(50000)} تومان</h4>
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
                قرار می گیرد.
              </p>
            </Grid>
            <Grid container className="address-container">
              <Grid container justifyContent="space-between">
                <h5>کد رهگیری پست</h5>
                <h4>12345678</h4>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <h5>پشتیبانی پست</h5>
                <h4>12345678</h4>
              </Grid>
            </Grid>
            <Grid mt={3} container>
              <p>از طریق لینک زیر می توانید وضعیت سفارش خود را پیگیری کنید.</p>
            </Grid>
            <Grid justifyContent="flex-end" container>
              <a
                dir="ltr"
                target="_blank"
                rel="noreferrer"
                href={order?.tracking_url}
              >
                {order?.tracking_url}
              </a>
            </Grid>
          </Grid>
        );
      }
      case 4: {
        return (
          <Grid container>
            <Grid container justifyContent="center">
              <UnSuccessSvg />
            </Grid>
            <Grid mt={3} container>
              <p>
                متاسفانه سایت پست با مشکلی مواجه شده است.لطفا چند لحظه بعد
                دوباره تلاش کنید.می توانید برای راهنمایی بیشتر با پشتیبانی تماس
                بگیرید.
              </p>
            </Grid>
            <Grid container className="address-container">
              <Grid mt={2} container justifyContent="space-between">
                <h5>پشتیبانی پست</h5>
                <h4>12345678</h4>
              </Grid>
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
        if (isEdit) {
          return (
            <Grid mt={8} container>
              <Grid container>
                <Button
                  onClick={() => {
                    setShowingInfo(info);
                    setisEdit(false);
                  }}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  ثبت
                </Button>
              </Grid>
              <Grid mt={1} container>
                <Button
                  onClick={() => setisEdit(false)}
                  variant="text"
                  color="primary"
                  fullWidth
                >
                  انصراف
                </Button>
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid className="button-cont" container>
              <Button
                onClick={() => setStep(2)}
                variant="contained"
                color="primary"
                fullWidth
              >
                تایید اطلاعات
              </Button>
            </Grid>
          );
        }
      }
      case 2:
        return (
          <Grid mt={6} container>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => setStep(3)}
            >
              پرداخت و ارسال
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
      case 4:
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

export default Post;

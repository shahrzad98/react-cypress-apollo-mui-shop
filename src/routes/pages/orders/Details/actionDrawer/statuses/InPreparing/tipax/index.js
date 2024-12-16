import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import {
  arrayOfNumber,
  formatNumber,
  redirectToAP,
  redirectToSEP
} from '../../../../../../../../utils/helpers';
import { Info, InfoOutlined } from '@mui/icons-material';
import { ReactComponent as SuccessSvg } from '../../WaitingForApproval/svg/success.svg';
import { ReactComponent as UnSuccessSvg } from '../../WaitingForApproval/svg/unsuccess.svg';
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER_SEND } from '../../../../../../../../constant/mutations/orders';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as WalletSVG } from './svg/wallet.svg';
import { ReactComponent as RefreshSVG } from './svg/refresh.svg';
import NeshanShowingMap from '../../../../../../../../components/shared/mapNeshan/showingMap';
import { CHARGE_WALLET } from '../../../../../../../../constant/mutations/store';

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
    align-items: center;
    i {
      margin: 0;
    }
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
      color: #000;
      font-size: 14px;
      font-weight: 300;
      margin: 0;
      display: flex;
      align-items: center;
      i {
        margin-bottom: 0;
      }
    }
    button {
      height: 10px;
      padding: 0;
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

  .error-cont {
    background-color: #ee3b4f18;
    border-radius: 10px;
    padding: 12px;
    margin-top: 24px;
    h5 {
      margin: 0;
      color: #ee3b4f;
      font-size: 14px;
      font-weight: 300;
      margin-left: 10px;
    }
    svg {
      color: #ee3b4f;
    }
  }
  .warning-cont {
    background-color: #ffc72a18;
    border-radius: 10px;
    padding: 12px;
    margin-top: 24px;
    h5 {
      margin: 0;
      color: #ffc72a;
      font-size: 14px;
      font-weight: bold;
      margin-left: 10px;
    }
    svg {
      color: #ffc72a;
    }
  }
  a {
    color: #6a6f80;
    text-decoration: none;
  }
`;

const DigiExpress = ({
  order,
  refetchOrder,
  close,
  sendOrder,
  step,
  setStep
}) => {
  // const { data: postexCartoons } = useQuery(GET_POSTEX_INSURANCES);
  const [isEdit, setisEdit] = useState(false);
  const [showingInfo, setShowingInfo] = useState({
    receiver_phone_number: sendOrder?.receiver_phone_number || '',
    receiver_last_name: sendOrder?.receiver_last_name || '',
    receiver_first_name: sendOrder?.receiver_first_name || '',
    weight: Math.ceil(sendOrder?.weight / 1000) * 1000 || 1,
    address: {
      address: sendOrder?.address.address || '',
      city: sendOrder?.address.city || '',
      province: sendOrder?.address.province || '',
      postal_code: sendOrder?.address.postal_code || '',
      latitude: order?.address?.lat || '',
      longitude: order?.address?.lng || ''
    }
  });
  const [info, setInfo] = useState({
    receiver_phone_number: showingInfo?.receiver_phone_number || '',
    receiver_last_name: showingInfo?.receiver_last_name || '',
    receiver_first_name: showingInfo?.receiver_first_name || '',
    weight: Math.ceil(sendOrder?.weight / 1000) * 1000 || 1,
    address: {
      address: showingInfo?.address.address || '',
      city: showingInfo?.address.city || '',
      province: showingInfo?.address.province || '',
      postal_code: showingInfo?.address.postal_code || '',
      latitude: showingInfo?.address?.latitude || '',
      longitude: showingInfo?.address?.longitude || ''
    }
  });

  const [errors, setErrors] = useState({});

  const [chargeWallet, { data: chargeData, loading: chargeLoading }] =
    useMutation(CHARGE_WALLET);

  useEffect(() => {
    if (chargeData?.store.chargeWallet.charge_result === false) {
      if (chargeData?.store.chargeWallet.gateway_type === 'AsanPardakht') {
        redirectToAP(chargeData?.store.chargeWallet.token);
      } else if (chargeData?.store.chargeWallet.gateway_type === 'SEP') {
        redirectToSEP(chargeData?.store.chargeWallet.token);
      }
    }
  }, [chargeData?.store]);

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

  const [updateOrderSend, { loading: orderSendLoading }] =
    useMutation(UPDATE_ORDER_SEND);
  const payHandler = () => {
    chargeWallet({
      variables: {
        content: {
          amount: +sendOrder?.approximate_post_cost - sendOrder?.wallet_balance
        }
      }
    });
  };

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
            <h3 onClick={() => setStep(1)}>اطلاعات ارسال</h3>
          </Grid>
        );
      }
      case 3: {
        return (
          <Grid alignItems="center" container>
            <i onClick={() => setStep(2)} className="df-arrow" />
            <h3 onClick={() => setStep(2)}>حساب کاربری تیپاکس</h3>
          </Grid>
        );
      }
      case 4: {
        return (
          <Grid alignItems="center" container>
            <h3>ارسال موفق</h3>
          </Grid>
        );
      }
      case 5: {
        return (
          <Grid alignItems="center" container>
            <h3>ارسال ناموفق</h3>
          </Grid>
        );
      }
      case 6: {
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

  const map = () => {
    return (
      <Grid container style={{ height: '120px', marginTop: '24px' }}>
        <NeshanShowingMap latLng={[order?.address?.lat, order?.address?.lng]} />
      </Grid>
    );
  };

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
                {order?.address?.lat && order?.address?.lng && map}
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid container>
              <Grid
                mb={3}
                style={{
                  backgroundColor: '#EDF5FF',
                  borderRight: '4px solid #0F62FE',
                  borderRadius: '4px',
                  padding: '8px'
                }}
                alignItems="center"
                container
              >
                <Grid item xs={1}>
                  <Info style={{ color: '#0F62FE' }} />
                </Grid>
                <Grid item xs={11}>
                  <p style={{ margin: 0 }}>
                    اگر درخواست ارسال را تا قبل از ساعت 13:00 ثبت کنید ، پیک
                    تیپاکس از ساعت 14:00 تا 18:00 همان روز و در غیر این صورت
                    فردای آن روز از ساعت 14:00 تا 18:00 برای تحویل مرسوله مراجعه
                    می کند.
                  </p>
                </Grid>
              </Grid>
              <Grid container>
                <h2>اطلاعات مرسوله - تیپاکس</h2>
              </Grid>

              <Grid container>
                <p>
                  پس از انتخاب موارد زیر با استفاده از دکمه &quot;تایید
                  اطلاعات&quot; می توانید هزینه ارسال تیپاکس را مشاهده کنید.
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
              <Grid container>{order?.address?.lat && map}</Grid>
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
              <h2>اطلاعات مرسوله - تیپاکس</h2>
            </Grid>
            <Grid container>
              <p>
                جزییات هزینه ارسال مرسوله شما به شرح زیر است. لطفا هزینه ارسال
                را با شارژ کیف پول خود مطابقت دهید.
              </p>
            </Grid>
            <Grid mt={3} container className="address-container">
              <Grid mt={2} justifyContent="space-between" container>
                <h5>شارژ کیف پول شما</h5>
                <h4>{formatNumber(sendOrder?.wallet_balance)} تومان</h4>
              </Grid>
              <Grid mt={2} justifyContent="space-between" container>
                <h5>هزینه ارسال تیپاکس</h5>
                {sendOrder?.approximate_post_cost == -2 ? (
                  <h4 style={{ color: '#EA002A' }}>
                    <RefreshSVG onClick={() => refetchOrder()} />
                    مشکلی پیش آمده
                  </h4>
                ) : (
                  <h4>
                    <RefreshSVG onClick={() => refetchOrder()} />{' '}
                    {formatNumber(sendOrder?.approximate_post_cost)} تومان
                  </h4>
                )}
              </Grid>
            </Grid>
            {sendOrder?.approximate_post_cost !== -2 && (
              <Grid mt={1} container justifyContent="flex-end">
                <Button
                  disabled={
                    sendOrder?.approximate_post_cost == -2 || chargeLoading
                  }
                  onClick={payHandler}
                  style={{ color: '#483493', paddingLeft: 0 }}
                  startIcon={<WalletSVG />}
                  color="primary"
                  variant="text"
                >
                  شارژ کیف پول
                </Button>
              </Grid>
            )}
            {sendOrder?.approximate_post_cost < sendOrder?.wallet_balance &&
              sendOrder.approximate_post_cost !== -2 && (
                <Grid
                  style={{ flexWrap: 'nowrap' }}
                  container
                  className="error-cont"
                >
                  <InfoOutlined />
                  <h5>
                    مبلغ هزینه ارسال بیشتر از شارژ کیف پول شما می باشد. لطفا کیف
                    پول خود را شارژ کنید.
                  </h5>
                </Grid>
              )}
          </Grid>
        );
      }

      case 4: {
        return (
          <Grid container>
            <Grid container justifyContent="center">
              <SuccessSvg />
            </Grid>
            <Grid mt={3} container>
              <p>
                اطلاعات ارسال با موفقیت ثبت شد. وضعیت سفارش مشتری، در حال ارسال
                قرار میگیرد
              </p>
            </Grid>
            <Grid
              style={{ marginTop: '10px' }}
              container
              className="address-container"
            >
              <Grid container justifyContent="space-between">
                <h5> کد رهگیری تیپاکس</h5>
                <h4>
                  {sendOrder?.post_tracking_number}{' '}
                  <i style={{ marginRight: '5px' }} className="df-edit" />
                </h4>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <h5> پشتیبانی تیپاکس</h5>
                <h4>
                  {order?.shipping_support_number?.replace('+98', 0)}{' '}
                  <i style={{ marginRight: '5px' }} className="df-edit" />
                </h4>
              </Grid>
              <Grid mt={3} container>
                <p>
                  از طریق لینک زیر می توانید وضعیت سفارش خود را پیگیری کنید.
                </p>
              </Grid>
              <Grid container justifyContent="flex-end">
                <a
                  href="https://tipaxco.com/tracking"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://tipaxco.com/tracking
                </a>
              </Grid>
            </Grid>
          </Grid>
        );
      }
      case 5: {
        return (
          <Grid container>
            <Grid container justifyContent="center">
              <UnSuccessSvg />
            </Grid>
            <Grid mt={3} container>
              <p>
                متاسفانه سایت تیپاکس با مشکلی مواجه شده است.لطفا چند لحظه بعد
                دوباره تلاش کنید.می توانید برای راهنمایی بیشتر با پشتیبانی تماس
                بگیرید.
              </p>
            </Grid>
            <Grid container className="address-container">
              <Grid mt={2} container justifyContent="space-between">
                <h5>پشتیبانی تیپاکس</h5>
                <h4>{order?.shipping_support_number?.replace('+98', '0')}</h4>
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
              disabled={
                orderSendLoading ||
                sendOrder?.approximate_post_cost < sendOrder?.wallet_balance ||
                sendOrder.approximate_post_cost === -2
              }
              color="primary"
              variant="contained"
              fullWidth
              onClick={async () => {
                await updateOrderSend({
                  variables: {
                    updateOrderSendId: order?.id,
                    content: {
                      address: {
                        address: info?.address?.address,
                        latitude: info?.address?.latitude,
                        longitude: info?.address?.longitude
                      },
                      receiver_first_name: info.receiver_first_name,
                      receiver_last_name: info.receiver_last_name,
                      receiver_phone_number: info.receiver_phone_number
                    }
                  },
                  onCompleted: () => {
                    setStep(4);
                  },
                  onError: () => {
                    toast('مشکلی پیش آمده دوباره تلاش کنید', {
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
            >
              {orderSendLoading ? (
                <CircularProgress
                  style={{ width: '24px', height: '24px', color: '#FFF' }}
                />
              ) : (
                'تایید و ارسال'
              )}
            </Button>
          </Grid>
        );
      case 3:
        return <Grid mt={6} container></Grid>;
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
      <ToastContainer />
    </Style>
  );
};

export default DigiExpress;

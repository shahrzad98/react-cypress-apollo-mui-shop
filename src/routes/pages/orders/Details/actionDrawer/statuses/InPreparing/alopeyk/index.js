import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Radio,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import {
  formatNumber,
  redirectToAP,
  redirectToSEP
} from '../../../../../../../../utils/helpers';
import { Info, InfoOutlined } from '@mui/icons-material';
import { ReactComponent as SuccessSvg } from '../../WaitingForApproval/svg/success.svg';
import { useMutation, useQuery } from '@apollo/client';
import { CHANGE_POSTEX_PASSWORD } from '../../../../../../../../constant/mutations/mutations';
import Modal from './modal';
import { GET_WEBSOCKET_NOTIF } from '../../../../../../../../constant/queries/home';
import {
  UPDATE_ORDER_SEND,
  CANCEL_SHIPPING,
  CHARGE_ALOPEYK_WALLET
} from '../../../../../../../../constant/mutations/orders';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as WalletSVG } from './svg/wallet.svg';
import { ReactComponent as RefreshSVG } from './svg/refresh.svg';
import { ReactComponent as SuccessSvg2 } from '../../../../../../../../components/createProduct/svg/success.svg';
import { ReactComponent as UserSVG } from './svg/user.svg';
import { ReactComponent as SafirSVG } from './svg/safir.svg';
import { ReactComponent as PhoneSVG } from './svg/phone.svg';
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

const PEYK_TYPES = [
  {
    name: 'موتور',
    desc: 'تا ۲۵ کیلوگرم',
    value: 1
  },
  {
    name: 'وانت',
    desc: '۲۰۰ تا ۵۰۰ کیلوگرم',
    value: 2
  },
  {
    name: 'نیسان',
    desc: '۵۰۰ کیلوگرم تا ۲ تن',
    value: 3
  }
];

const AloPeyk = ({ order, refetchOrder, close, sendOrder, step, setStep }) => {
  // const { data: postexCartoons } = useQuery(GET_POSTEX_INSURANCES);
  const [safirData, setSafirData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPassword] = useState('');
  const [showingInfo, setShowingInfo] = useState({
    peyk_type: 1,
    receiver_phone_number: sendOrder?.receiver_phone_number || '',
    receiver_last_name: sendOrder?.receiver_last_name || '',
    receiver_first_name: sendOrder?.receiver_first_name || '',
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
    peyk_type: 1,
    receiver_phone_number: showingInfo?.receiver_phone_number || '',
    receiver_last_name: showingInfo?.receiver_last_name || '',
    receiver_first_name: showingInfo?.receiver_first_name || '',
    address: {
      address: showingInfo?.address.address || '',
      city: showingInfo?.address.city || '',
      province: showingInfo?.address.province || '',
      postal_code: showingInfo?.address.postal_code || '',
      latitude: showingInfo?.address?.latitude || '',
      longitude: showingInfo?.address?.longitude || ''
    }
  });
  const [cancelShipping, { loading: cancelLoading }] =
    useMutation(CANCEL_SHIPPING);
  const { data } = useQuery(GET_WEBSOCKET_NOTIF);
  const ws = useRef(null);
  useEffect(() => {
    if (data?.notification?.getTokenPanel?.token) {
      let WebSocketUrl =
        window.location.hostname.includes('.apps.') ||
        window.location.hostname.includes('localhost')
          ? token => `wss://backend.apps.digify.shop/ws/notif/?token=${token}`
          : token => `wss://backend.digify.shop/ws/notif/?token=${token}`;
      try {
        ws.current = new WebSocket(
          WebSocketUrl(data?.notification?.getTokenPanel?.token)
        );
        ws.current.onopen = () => {};
        ws.current.onclose = () => {};

        return () => {
          ws.current.close();
        };
      } catch (error) {
        () => {};
      }
    }
  }, [data?.notification?.getTokenPanel?.token]);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      const message = JSON.parse(e.data);
      if (message.action_id == 120) {
        if (message.status === 'expired') {
          setStep(2);
          setShowModal(false);
          setNotFound(true);
        }
        if (message.status === 'accepted') {
          setStep(4);
          setSafirData(message);
          setShowModal(false);
          toast('سفیر یافت شد', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            // closeOnClick: true,
            draggable: true,
            closeButton: false,
            icon: <SuccessSvg2 />
          });
        }
      }
    };
  }, [ws.current]);

  const [errors, setErrors] = useState({});

  function handleChange({ target }) {
    setErrors({});
    let addressTargets = ['postal_code', 'address', 'province', 'city'];
    if (addressTargets.some(item => item == target.name)) {
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

  const [changePostexPass] = useMutation(CHANGE_POSTEX_PASSWORD);

  const [updateOrderSend, { loading: orderSendLoading }] =
    useMutation(UPDATE_ORDER_SEND);

  const [chargeAlopeyk, { data: chargeData, loading: chargeLoading }] =
    useMutation(CHARGE_ALOPEYK_WALLET);

  const payHandler = () => {
    chargeAlopeyk({
      variables: {
        content: {
          amount: +sendOrder?.approximate_post_cost,
          shipping_type: '5'
        }
      }
    });
  };

  useEffect(() => {
    if (chargeData?.order.chargeAloPeykWallet.charge_result === false) {
      if (
        chargeData?.order.chargeAloPeykWallet.gateway_type === 'AsanPardakht'
      ) {
        redirectToAP(chargeData?.order.chargeAloPeykWallet.token);
      } else if (chargeData?.order.chargeAloPeykWallet.gateway_type === 'SEP') {
        redirectToSEP(chargeData?.order.chargeAloPeykWallet.token);
      }
    }
    if (chargeData?.order.chargeAloPeykWallet.charge_result === true) {
      toast('از کیف پول دیجی فای شما پرداخت شد', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        // closeOnClick: true,
        draggable: true,
        closeButton: false,
        icon: <SuccessSvg2 />
      });
      refetchOrder();
    }
  }, [chargeData?.order]);

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
            <h3 onClick={() => setStep(2)}>حساب کاربری الوپیک</h3>
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
              <Grid container>
                <h2>اطلاعات مرسوله - الوپیک</h2>
              </Grid>
              <Grid container>
                <p>
                  پس از انتخاب موارد زیر با استفاده از دکمه &quot;تایید
                  اطلاعات&quot; می توانید هزینه ارسال الوپیک را مشاهده کنید.
                </p>
              </Grid>
              <Grid container>
                <Grid className={'smsCont'} item xs={12}>
                  {' '}
                  <FormControl variant="filled" style={{ width: '100%' }}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      error={!!errors.peyk_type}
                      displayEmpty
                      name="peyk_type"
                      InputLabelProps={{ style: { pointerEvents: 'auto' } }}
                      label={<div>نوع پیک ارسال</div>}
                      style={{ minHeight: '60px' }}
                      value={info?.peyk_type}
                      onChange={handleChange}
                      SelectProps={{
                        MenuProps: { className: 'menu' },
                        renderValue: value => (
                          <Typography style={{ margin: 0 }}>
                            {PEYK_TYPES[value - 1]?.name}
                          </Typography>
                        )
                      }}
                    >
                      {PEYK_TYPES.map(e => (
                        <MenuItem key={e.value} value={e.value}>
                          <Radio
                            checked={info?.peyk_type === e.value}
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'C' }}
                          />
                          <Typography variant="inherit" noWrap>
                            {e.name}{' '}
                            <span style={{ color: '#BDBDBD' }}>({e.desc})</span>
                          </Typography>
                        </MenuItem>
                      ))}
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
              <h2>اطلاعات مرسوله - الوپیک</h2>
            </Grid>
            <Grid container>
              <p>
                جزییات هزینه ارسال مرسوله شما به شرح زیر است. لطفا هزینه ارسال
                را با شارژ کیف پول خود مطابقت دهید.
              </p>
            </Grid>
            {!sendOrder?.pay_at_dest ? (
              <Grid mt={3} container className="address-container">
                <Grid justifyContent="space-between" container>
                  <h5>نوع پرداخت هزینه ارسال</h5>
                  <h4>
                    <Tooltip
                      open={showTooltip}
                      onOpen={() => setShowTooltip(true)}
                      onClose={() => {
                        setTimeout(() => {
                          setShowTooltip(false);
                        }, [2000]);
                      }}
                      title={
                        <Grid container spacing={1}>
                          <Grid item>
                            <h2 style={{ margin: '15px 0', fontSize: '16px' }}>
                              پیش پرداخت
                            </h2>
                            <p style={{ fontSize: '14px' }}>
                              پرداخت هزینه ارسال به صورت نقدی و یا با شارژ کیف
                              پول به صورت انلاین انجام می شود.
                            </p>
                          </Grid>
                        </Grid>
                      }
                      placement="bottom-start"
                    >
                      <Info
                        onClick={() => setShowTooltip(true)}
                        style={{ marginLeft: '5px', marginTop: '-10px' }}
                      />
                    </Tooltip>{' '}
                    پیش پرداخت
                  </h4>
                </Grid>
                <Grid mt={2} justifyContent="space-between" container>
                  <h5>شارژ کیف پول الوپیک شما</h5>
                  <h4>{formatNumber(sendOrder?.wallet_balance)} تومان</h4>
                </Grid>
                <Grid mt={2} justifyContent="space-between" container>
                  <h5>هزینه ارسال الوپیک</h5>
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
            ) : (
              <Grid container className="address-container">
                <Grid justifyContent="space-between" container>
                  <h5>نوع پرداخت هزینه ارسال</h5>
                  <h4>
                    <Tooltip
                      open={showTooltip}
                      onOpen={() => setShowTooltip(true)}
                      onClose={() => {
                        setTimeout(() => {
                          setShowTooltip(false);
                        }, [2000]);
                      }}
                      title={
                        <Grid container spacing={1}>
                          <Grid item>
                            <h2 style={{ margin: '15px 0', fontSize: '16px' }}>
                              پس پرداخت
                            </h2>
                            <p style={{ fontSize: '14px' }}>
                              پرداخت هزینه ارسال به عهده مشتری در محل تحویل می
                              باشد.{' '}
                            </p>
                          </Grid>
                        </Grid>
                      }
                      placement="bottom-start"
                    >
                      <Info
                        onClick={() => setShowTooltip(true)}
                        style={{ marginLeft: '5px', marginTop: '-10px' }}
                      />
                    </Tooltip>
                    پس پرداخت
                  </h4>
                </Grid>
                <Grid mt={2} justifyContent="space-between" container>
                  <h5>هزینه ارسال الوپیک</h5>
                  {sendOrder?.approximate_post_cost == -2 ? (
                    <h4 style={{ color: '#EA002A' }}>
                      <RefreshSVG onClick={() => refetchOrder()} /> مشکلی پیش
                      آمده
                    </h4>
                  ) : (
                    <h4>
                      <RefreshSVG onClick={() => refetchOrder()} />{' '}
                      {formatNumber(sendOrder?.approximate_post_cost)} تومان
                    </h4>
                  )}
                </Grid>
              </Grid>
            )}
            {!sendOrder?.pay_at_dest &&
              sendOrder?.approximate_post_cost !== -2 && (
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
              sendOrder.approximate_post_cost !== -2 &&
              !sendOrder?.pay_at_dest && (
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
      case 3: {
        return (
          <Grid container>
            <Grid container>
              <h2>اطلاعات مرسوله - الوپیک</h2>
            </Grid>
            <Grid container>
              <p>
                جزییات هزینه ارسال مرسوله شما به شرح زیر است. لطفا هزینه ارسال
                را با شارژ کیف پول خود مطابقت دهید.
              </p>
            </Grid>
            {!sendOrder?.pay_at_dest ? (
              <Grid mt={3} container className="address-container">
                <Grid justifyContent="space-between" container>
                  <h5>نوع پرداخت هزینه ارسال</h5>
                  <h4>
                    <Tooltip
                      open={showTooltip}
                      onOpen={() => setShowTooltip(true)}
                      onClose={() => {
                        setTimeout(() => {
                          setShowTooltip(false);
                        }, [2000]);
                      }}
                      title={
                        <Grid container spacing={1}>
                          <Grid item>
                            <h2 style={{ margin: '15px 0', fontSize: '16px' }}>
                              پیش پرداخت
                            </h2>
                            <p style={{ fontSize: '14px' }}>
                              پرداخت هزینه ارسال به صورت نقدی و یا با شارژ کیف
                              پول به صورت انلاین انجام می شود.
                            </p>
                          </Grid>
                        </Grid>
                      }
                      placement="bottom-start"
                    >
                      <Info
                        onClick={() => setShowTooltip(true)}
                        style={{ marginLeft: '5px', marginTop: '-10px' }}
                      />
                    </Tooltip>{' '}
                    پیش پرداخت
                  </h4>
                </Grid>
                <Grid mt={2} justifyContent="space-between" container>
                  <h5>شارژ کیف پول الوپیک شما</h5>
                  <h4>{formatNumber(sendOrder?.wallet_balance)} تومان</h4>
                </Grid>
                <Grid mt={2} justifyContent="space-between" container>
                  <h5>هزینه ارسال الوپیک</h5>
                  {sendOrder?.approximate_post_cost == -2 ? (
                    <h4 style={{ color: '#EA002A' }}>
                      <RefreshSVG onClick={() => refetchOrder()} /> مشکلی پیش
                      آمده
                    </h4>
                  ) : (
                    <h4>
                      <RefreshSVG onClick={() => refetchOrder()} />{' '}
                      {formatNumber(sendOrder?.approximate_post_cost)} تومان
                    </h4>
                  )}
                </Grid>
              </Grid>
            ) : (
              <Grid container className="address-container">
                <Grid justifyContent="space-between" container>
                  <h5>نوع پرداخت هزینه ارسال</h5>
                  <h4>
                    <Tooltip
                      open={showTooltip}
                      onOpen={() => setShowTooltip(true)}
                      onClose={() => {
                        setTimeout(() => {
                          setShowTooltip(false);
                        }, [2000]);
                      }}
                      title={
                        <Grid container spacing={1}>
                          <Grid item>
                            <h2 style={{ margin: '15px 0', fontSize: '16px' }}>
                              پس پرداخت
                            </h2>
                            <p style={{ fontSize: '14px' }}>
                              پرداخت هزینه ارسال به عهده مشتری در محل تحویل می
                              باشد.{' '}
                            </p>
                          </Grid>
                        </Grid>
                      }
                      placement="bottom-start"
                    >
                      <Info
                        onClick={() => setShowTooltip(true)}
                        style={{ marginLeft: '5px', marginTop: '-10px' }}
                      />
                    </Tooltip>
                    پس پرداخت
                  </h4>
                </Grid>
                <Grid mt={2} justifyContent="space-between" container>
                  <h5>هزینه ارسال الوپیک</h5>
                  {sendOrder?.approximate_post_cost == -2 ? (
                    <h4 style={{ color: '#EA002A' }}>
                      <RefreshSVG onClick={() => refetchOrder()} /> مشکلی پیش
                      آمده
                    </h4>
                  ) : (
                    <h4>
                      <RefreshSVG onClick={() => refetchOrder()} />{' '}
                      {formatNumber(sendOrder?.approximate_post_cost)} تومان
                    </h4>
                  )}{' '}
                </Grid>
              </Grid>
            )}
            {!sendOrder?.pay_at_dest && (
              <Grid mt={1} container justifyContent="flex-end">
                {sendOrder?.approximate_post_cost !== -2 && (
                  <Button
                    disabled={chargeLoading}
                    onClick={payHandler}
                    style={{ color: '#483493', paddingLeft: 0 }}
                    startIcon={<WalletSVG />}
                    color="primary"
                    variant="text"
                  >
                    شارژ کیف پول
                  </Button>
                )}
              </Grid>
            )}
            <Grid
              mt={3}
              alignItems="center"
              justifyContent="space-between"
              container
            >
              <p style={{ margin: 0 }}>در حال جستجوی سفیر الوپیک...</p>
              <Button
                endIcon={
                  <i
                    style={{ margin: 0, transform: 'rotate(180deg)' }}
                    className="df-arrow"
                  />
                }
                color="primary"
                variant="text"
                onClick={() => setShowModal(true)}
              >
                مشاهده
              </Button>
            </Grid>
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
                سفیر الو پیک یافت شده . در صورت تحویل مرسوله به مشتری ، وضعیت
                سفارش تحویل شده قرار میگیرد.
              </p>
            </Grid>
            <Grid mt={4} mb={2} container>
              <h3
                style={{
                  margin: 0,
                  color: '#6A6F80',
                  fontSize: '18px',
                  fontWeight: 500
                }}
              >
                اطلاعات سفیر
              </h3>
            </Grid>
            <Grid
              style={{ marginTop: '10px' }}
              container
              className="address-container"
            >
              <Grid item xs={6}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    backgroundColor: '#C4C4C4',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '100%',
                    overflow: 'hidden'
                  }}
                >
                  {safirData?.alopeyk_agent_info?.avatar?.url ? (
                    <img src={safirData?.alopeyk_agent_info?.avatar?.url} />
                  ) : (
                    <UserSVG />
                  )}
                </div>
              </Grid>
              <Grid style={{ textAlign: 'end' }} item xs={6}>
                <h5
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginBottom: '12px',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#000'
                  }}
                >
                  {safirData?.alopeyk_agent_info?.firstname
                    ? safirData?.alopeyk_agent_info?.firstname +
                      ' ' +
                      safirData?.alopeyk_agent_info?.lastname
                    : 'نامشخص'}
                  <SafirSVG style={{ marginRight: '12px' }} />
                </h5>
                <h5
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#000'
                  }}
                >
                  {safirData?.alopeyk_agent_info?.phone
                    ? safirData?.alopeyk_agent_info?.phone
                    : 'نامشخص'}
                  <PhoneSVG style={{ marginRight: '18px' }} />
                </h5>
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
                (sendOrder?.approximate_post_cost < sendOrder?.wallet_balance &&
                  !sendOrder?.pay_at_dest) ||
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
                      transport_type: info.peyk_type,
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
                    setShowModal(true);
                    setStep(3);
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
                'جستجو سفیر الوپیک'
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
      case 6:
        return (
          <Grid mt={6} container>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => {
                changePostexPass({
                  variables: {
                    content: {
                      password: newPassword
                    }
                  },
                  onCompleted: () => close()
                });
              }}
            >
              تایید
            </Button>
          </Grid>
        );

      default:
        return;
    }
  };

  return (
    <Style container>
      {showModal && (
        <Modal
          loading={cancelLoading}
          notFound={notFound}
          retry={async () => {
            await updateOrderSend({
              variables: {
                updateOrderSendId: order?.id,
                content: {
                  transport_type: info.peyk_type,
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
                setNotFound(false);
              },
              onError: () => {
                setShowModal(false);
                setNotFound(false);
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
          cancel={async () => {
            await cancelShipping({
              variables: {
                cancelShippingId: order?.id
              },
              onCompleted: () => {
                setShowModal(false);
                setStep(2);
              },
              onError: () => {}
            });
          }}
          close={() => {
            if (notFound) {
              setShowModal(false);
              setStep(2);
            } else {
              setShowModal(false);
            }
          }}
        />
      )}
      {renderTitle()}
      {renderContent()}
      {renderFooter()}
      <ToastContainer />
    </Style>
  );
};

export default AloPeyk;

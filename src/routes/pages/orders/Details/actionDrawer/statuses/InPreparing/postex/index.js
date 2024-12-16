import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Radio,
  TextField,
  Typography
} from '@mui/material';
import {
  arrayOfNumber,
  formatNumber
} from '../../../../../../../../utils/helpers';
import { InfoOutlined, KeyboardArrowDown } from '@mui/icons-material';
import { ReactComponent as SuccessSvg } from '../../WaitingForApproval/svg/success.svg';
import { ReactComponent as UnSuccessSvg } from '../../WaitingForApproval/svg/unsuccess.svg';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEND_POSTEX_PASSWORD } from '../../../../../../../../constant/queries/orders';
import { CHANGE_POSTEX_PASSWORD } from '../../../../../../../../constant/mutations/mutations';
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
    // display: flex;
    // align-items: center;
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

const Postex = ({
  order,
  updateSendOrder,
  close,
  sendOrder,
  step,
  setStep,
  postexOptions,
  sendOrderLoading,
  cities
}) => {
  const [postexSmsMsg, setPostexSmsMsg] = useState('');
  const [getPostexSms, { loading }] = useLazyQuery(SEND_POSTEX_PASSWORD, {
    onCompleted: () => setPostexSmsMsg('رمز عبور برای شما ارسال شد')
  });
  const [isEdit, setisEdit] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [sendCost, setSendCost] = useState(0);
  const [showingInfo, setShowingInfo] = useState({
    need_cartoon: true,
    weight: Math.ceil(sendOrder?.weight / 1000) * 1000 || 0,
    cartoon_size: '',
    insurance: '',
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
    need_cartoon: true,
    weight: Math.ceil(sendOrder?.weight / 1000) * 1000 || 0,
    cartoon_size: '',
    insurance: '',
    receiver_phone_number: showingInfo?.receiver_phone_number || '',
    receiver_last_name: showingInfo?.receiver_last_name || '',
    receiver_first_name: showingInfo?.receiver_first_name || '',
    address: {
      address: showingInfo?.address.address || '',
      city: { name: '' },
      province: {
        name: ''
      },
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

  const [changePostexPass, { loading: changePostexPassLoading }] = useMutation(
    CHANGE_POSTEX_PASSWORD
  );

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
            <h3 onClick={() => setStep(2)}>حساب کاربری پستکس</h3>
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

  const map = useMemo(() => {
    const { address: {
      lat, lng
    } } = order;
    return (
      <Grid container style={{ height: '120px', marginTop: '24px' }}>
        {lat && lng && <NeshanShowingMap
          latLng={[lat, lng]}
        />}
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
                  onChange={e => {
                    setInfo(info => ({
                      ...info,
                      receiver_first_name: e.target.value
                    }));
                    setErrors({});
                  }}
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
                  onChange={e => {
                    setInfo(info => ({
                      ...info,
                      receiver_last_name: e.target.value
                    }));
                    setErrors({});
                  }}
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
                  onChange={e => {
                    setInfo(info => ({
                      ...info,
                      receiver_phone_number: e.target.value
                    }));
                    setErrors({});
                  }}
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
                  onChange={e => {
                    setInfo(info => ({
                      ...info,
                      address: {
                        ...info.address,
                        address: e.target.value
                      }
                    }));
                    setErrors({});
                  }}
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
                  onChange={e => {
                    setInfo(info => ({
                      ...info,
                      address: {
                        ...info.address,
                        postal_code: e.target.value
                      }
                    }));
                    setErrors({});
                  }}
                  variant="outlined"
                  label="کد پستی"
                  fullWidth
                />
              </Grid>
              <Grid mt={-3} container>
                {order?.address?.lat && map}
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid container>
              <Grid container>
                <h2>اطلاعات مرسوله - پستکس</h2>
              </Grid>
              <Grid container>
                <p>
                  پس از انتخاب موارد زیر با استفاده از دکمه &quot;تایید
                  اطلاعات&quot; می توانید هزینه ارسال پستکس را مشاهده کنید.
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
                      error={!!errors.need_cartoon}
                      displayEmpty
                      name="need_cartoon"
                      InputLabelProps={{ style: { pointerEvents: 'auto' } }}
                      label={<div>نیاز به کارتن دارد؟</div>}
                      style={{ minHeight: '60px' }}
                      value={info?.need_cartoon}
                      onChange={handleChange}
                      SelectProps={{
                        MenuProps: { className: 'menu' },
                        renderValue: value =>
                          value === true ? (
                            <Typography style={{ margin: 0 }}>دارد</Typography>
                          ) : (
                            <Typography style={{ margin: 0 }}>ندارد</Typography>
                          )
                      }}
                    >
                      <MenuItem value>
                        <Radio
                          checked={info?.need_cartoon === true}
                          name="radio-button-demo"
                          inputProps={{ 'aria-label': 'C' }}
                        />
                        <Typography variant="inherit" noWrap>
                          دارد
                        </Typography>
                      </MenuItem>
                      <MenuItem value={false}>
                        <Radio
                          checked={info?.need_cartoon === false}
                          name="radio-button-demo"
                          inputProps={{ 'aria-label': 'C' }}
                        />
                        <Typography variant="inherit" noWrap>
                          ندارد
                        </Typography>
                      </MenuItem>
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid mt={2} className={'smsCont'} item xs={12}>
                  {' '}
                  <FormControl variant="filled" style={{ width: '100%' }}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      error={!!errors.cartoon_size}
                      displayEmpty
                      disabled={!info?.need_cartoon}
                      name="cartoon_size"
                      InputLabelProps={{ style: { pointerEvents: 'auto' } }}
                      label={<div>سایز بسته بندی</div>}
                      style={{ minHeight: '60px' }}
                      value={info?.cartoon_size}
                      onChange={handleChange}
                      SelectProps={{
                        MenuProps: { className: 'menu' },
                        renderValue: value => (
                          <Typography style={{ margin: 0 }}>{value}</Typography>
                        )
                      }}
                    >
                      {postexOptions?.cartoons?.map(e => (
                        <MenuItem key={e} value={e}>
                          <Radio
                            checked={info?.cartoon_size === e}
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'C' }}
                          />
                          <Typography variant="inherit" noWrap>
                            {e}
                          </Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid mt={2} className={'smsCont'} item xs={12}>
                  {' '}
                  <FormControl variant="filled" style={{ width: '100%' }}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      error={!!errors.insurance}
                      displayEmpty
                      name="insurance"
                      InputLabelProps={{ style: { pointerEvents: 'auto' } }}
                      label={<div>بیمه</div>}
                      style={{ minHeight: '60px' }}
                      value={info?.insurance}
                      onChange={handleChange}
                      SelectProps={{
                        MenuProps: { className: 'menu' },
                        renderValue: value => (
                          <Typography style={{ margin: 0 }}>{value}</Typography>
                        )
                      }}
                    >
                      {postexOptions?.insurances?.map(e => (
                        <MenuItem key={e} value={e}>
                          <Radio
                            checked={info?.insurance === e}
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'C' }}
                          />
                          <Typography variant="inherit" noWrap>
                            {e}
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
              <Grid container>{map}</Grid>
              <Grid container>
                <Grid container>
                  <p style={{ color: '#6A6F80', margin: '20px 0' }}>
                    لطفا استان و شهر مشتری را طبق ادرس ثبت شده انتخاب کنید
                  </p>
                </Grid>
                <Grid container>
                  {cities?.provinces?.length > 0 ? (
                    <Autocomplete
                      sx={{ width: '100%' }}
                      options={cities?.provinces}
                      value={info.address.province}
                      autoHighlight
                      noOptionsText="یافت نشد"
                      dir="rtl"
                      popupIcon={<KeyboardArrowDown />}
                      onChange={(e, value) => {
                        setErrors({});
                        if (value?.name) {
                          setInfo(info => ({
                            ...info,
                            address: {
                              ...info.address,
                              province: { name: value.name },
                              city: { name: '' }
                            }
                          }));
                        } else {
                          setInfo(info => ({
                            ...info,
                            address: {
                              ...info.address,
                              province: { name: '' },
                              city: { name: '' }
                            }
                          }));
                        }
                      }}
                      disablePortal
                      getOptionLabel={option => option.name}
                      renderOption={(props, option) => (
                        <Grid container {...props}>
                          <Radio
                            checked={
                              info.address.province?.name === option.name
                            }
                            color="primary"
                          />
                          <p>{option.name}</p>
                        </Grid>
                      )}
                      renderInput={params => (
                        <TextField
                          autoComplete="off"
                          error={errors.province}
                          helperText={errors.province}
                          variant="outlined"
                          style={{ width: '97%' }}
                          {...params}
                          label="استان"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                            form: {
                              autocomplete: 'off'
                            }
                          }}
                        />
                      )}
                    />
                  ) : null}
                </Grid>
                <Grid mt={2} container justifyContent="center">
                  {cities?.provinces?.length > 0 &&
                    info.address.province.name ? (
                    <Autocomplete
                      sx={{ width: '100%' }}
                      options={cities['cities'][info.address.province?.name]}
                      autoHighlight
                      value={info.address.city}
                      disabled={!info.address.province.name}
                      noOptionsText="یافت نشد"
                      dir="rtl"
                      popupIcon={<KeyboardArrowDown />}
                      onChange={(e, value) => {
                        setErrors({});
                        if (value?.name) {
                          setInfo(info => ({
                            ...info,
                            address: {
                              ...info.address,
                              city: { name: value.name }
                            }
                          }));
                        } else {
                          setInfo(info => ({
                            ...info,
                            address: {
                              ...info.address,
                              city: { name: '' }
                            }
                          }));
                        }
                      }}
                      disablePortal
                      getOptionLabel={option => option.name}
                      renderOption={(props, option) => (
                        <Grid
                          container
                          // component="li"
                          // sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <Radio
                            style={{ margin: 0, padding: 0 }}
                            checked={
                              info.address.city?.name &&
                              info.address.city?.name === option.name
                            }
                            color="primary"
                          />
                          <p
                            style={{
                              margin: 0,
                              padding: 0,
                              paddingRight: '4px'
                            }}
                          >
                            {option.name}
                          </p>
                        </Grid>
                      )}
                      renderInput={params => (
                        <TextField
                          variant="outlined"
                          error={errors.city}
                          helperText={errors.province}
                          autoComplete="off"
                          disabled={!info.address.province.name}
                          style={{ width: '97%' }}
                          {...params}
                          label="شهر"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                            form: {
                              autocomplete: 'off'
                            }
                          }}
                        />
                      )}
                    />
                  ) : cities?.provinces ? (
                    <Autocomplete
                      sx={{ width: '100%' }}
                      options={cities['cities']['تهران']}
                      autoHighlight
                      disabled
                      noOptionsText="یافت نشد"
                      dir="rtl"
                      popupIcon={<KeyboardArrowDown />}
                      disablePortal
                      getOptionLabel={option => option.name}
                      renderOption={(props, option) => (
                        <Grid
                          container
                          // component="li"
                          // sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <Radio
                            style={{ margin: 0, padding: 0 }}
                            checked={
                              info.address.city?.name &&
                              info.address.city?.name === option.name
                            }
                            color="primary"
                          />
                          <p style={{ margin: 0, padding: '5px' }}>
                            {option.name}
                          </p>
                        </Grid>
                      )}
                      renderInput={params => (
                        <TextField
                          variant="outlined"
                          autoComplete="off"
                          disabled={!info.address.province?.name}
                          style={{ width: '97%' }}
                          {...params}
                          label="شهر"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                            form: {
                              autocomplete: 'off'
                            }
                          }}
                        />
                      )}
                    />
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
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
              <h2>اطلاعات مرسوله - پستکس</h2>
            </Grid>
            <Grid container>
              <p>
                جزییات هزینه ارسال مرسوله شما به شرح زیر است. لطفا هزینه ارسال
                را با شارژ کیف پول خود مطابقت دهید.
              </p>
            </Grid>
            <Grid
              // justifyContent="space-between"
              style={{ marginTop: 0 }}
              container
              className="address-container"
            >
              <Grid justifyContent="space-between" container>
                <h5>شارژ کیف پول پستکس شما</h5>
                <h4>{formatNumber(sendOrder?.wallet_balance)} تومان</h4>
              </Grid>
              <Grid mt={2} justifyContent="space-between" container>
                <h5>هزینه ارسال پستکس</h5>
                <h4>{formatNumber(sendCost)} تومان</h4>
              </Grid>
            </Grid>
            <Grid mt={1} container justifyContent="flex-end">
              <Button
                onClick={() => setStep(3)}
                style={{ color: '#483493', paddingLeft: 0 }}
                startIcon={<i className="df-edit" />}
                color="primary"
                variant="text"
              >
                شارژ کیف پول
              </Button>
            </Grid>
            {sendOrder?.wallet_balance < sendCost && (
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
              <h2>اطلاعات مورد نیاز برای شارژ کیف پول پستکس</h2>
            </Grid>
            <Grid
              style={{ marginTop: '10px' }}
              container
              className="address-container"
            >
              <Grid container justifyContent="space-between">
                <h5>نام کاربری</h5>
                <h4>
                  {sendOrder?.postex_username}{' '}
                  <i style={{ marginRight: '5px' }} className="df-edit" />
                </h4>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <h5>رمز عبور</h5>
                <Button
                  disabled={loading}
                  onClick={() => getPostexSms()}
                  style={{ color: '#6A6F80', fontWeight: 300 }}
                  endIcon={
                    <i
                      style={{ fontSize: '14px', marginBottom: 0 }}
                      className="df-edit"
                    />
                  }
                  variant="text"
                  color="primary"
                >
                  {loading ? <CircularProgress /> : 'دریافت رمز عبور'}
                </Button>
              </Grid>
            </Grid>
            {postexSmsMsg && (
              <Grid container>
                <p style={{ margin: '15px 10px' }}>{postexSmsMsg}</p>
              </Grid>
            )}
            <Grid wrap="nowrap" container className="warning-cont">
              <InfoOutlined />
              <h5>
                لطفا رمز عبور خود را تغییر ندهید. اگر مجبور به تغییر شدید به
                پشتیبانی اطلاع دهید!
              </h5>
            </Grid>
            <Grid mt={3} container>
              <h2>لینک ورود به حساب کاربری پستکس :</h2>
            </Grid>
            <Grid justifyContent="flex-end" container>
              <a
                dir="ltr"
                target="_blank"
                rel="noreferrer"
                href="https://postex.ir/login"
              >
                https://postex.ir/login
              </a>
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
                اطلاعات ارسال با موفقیت ثبت شد. وضعیت سفارش مشتری، در حال ارسال
                قرار می گیرد.
              </p>
            </Grid>
            <Grid
              style={{ marginTop: '10px' }}
              container
              className="address-container"
            >
              <Grid container justifyContent="space-between">
                <h5> کد رهگیری پستکس</h5>
                <h4>
                  {sendOrder?.post_tracking_number}{' '}
                  <i style={{ marginRight: '5px' }} className="df-edit" />
                </h4>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <h5> پشتیبانی پستکس</h5>
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
                  href="https://postex.ir/login"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://postex.ir/login
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
                متاسفانه سایت پستکس با مشکلی مواجه شده است.لطفا چند لحظه بعد
                دوباره تلاش کنید.می توانید برای راهنمایی بیشتر با پشتیبانی تماس
                بگیرید.
              </p>
            </Grid>
            <Grid container className="address-container">
              <Grid mt={2} container justifyContent="space-between">
                <h5>پشتیبانی پستکس</h5>
                <h4>{order?.shipping_support_number?.replace('+98', '0')}</h4>
              </Grid>
            </Grid>
          </Grid>
        );
      }
      case 6: {
        return (
          <Grid container>
            <Grid container justifyContent="center">
              <UnSuccessSvg />
            </Grid>
            <Grid mt={3} container>
              <p style={{ marginBottom: '5px' }}>
                {sendOrder?.merchant_data?.first_name} عزیز
              </p>
              <p>
                شما رمز عبور خود را در حساب کاربری پستکس تغییر داده اید. لطفا
                برای ارسال سفارش، رمز عبور جدید خود را وارد کنید.{' '}
              </p>
            </Grid>
            <Grid mt={2} container>
              <TextField
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                fullWidth
                variant="outlined"
                label="رمز عبور جدید"
              />
            </Grid>
            <Grid wrap="nowrap" container className="warning-cont">
              <InfoOutlined />
              <h5>در صورت فراموشی رمز عبور از طریق سایت پستکس اقدام کنید.</h5>
            </Grid>
            <Grid mt={3} container>
              <h2>لینک ورود به حساب کاربری پستکس:</h2>
            </Grid>
            <Grid container justifyContent="flex-end">
              <a
                href="https://postex.ir/login"
                target="_blank"
                rel="noreferrer"
              >
                https://postex.ir/login
              </a>
            </Grid>
          </Grid>
        );
      }
      default:
        return;
    }
  };

  const validEdit = () => {
    if (!info?.receiver_first_name) {
      setErrors({
        receiver_first_name: 'این فیلد اجباری است'
      });
      return false;
    } else if (!info?.receiver_last_name) {
      setErrors({
        receiver_last_name: 'این فیلد اجباری است'
      });
      return false;
    } else if (!info?.receiver_phone_number) {
      setErrors({
        receiver_phone_number: 'این فیلد اجباری است'
      });
      return false;
    } else if (!info?.address.address) {
      setErrors({
        address: 'این فیلد اجباری است'
      });
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const validForm = () => {
    if (!info?.weight) {
      setErrors({
        weight: 'این فیلد اجباری است'
      });
      return false;
    } else if (info?.need_cartoon && !info?.cartoon_size) {
      setErrors({
        cartoon_size: 'این فیلد اجباری است'
      });
      return false;
    } else if (!info?.insurance) {
      setErrors({
        insurance: 'این فیلد اجباری است'
      });
      return false;
    } else if (!info?.address.province.name) {
      setErrors({
        province: 'این فیلد اجباری است'
      });
      return false;
    } else if (!info?.address.city.name) {
      setErrors({
        city: 'این فیلد اجباری است'
      });
      return false;
    } else {
      return true;
    }
  };

  const extractNumber = string => {
    let myString = string;
    let myRegexp = /حداقل (\d{1,3}(?:[.,]\d{1,3})*(?:[.,]\d{1,3}))/g;
    let match = myRegexp.exec(myString);

    if (match != null && match.length > 1) {
      return Math.ceil(match[1]?.replace(/,/g, '') / 10);
    } else {
      //
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
                    if (validEdit()) {
                      setShowingInfo(info);
                      setisEdit(false);
                    }
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
                disabled={sendOrderLoading}
                onClick={() => {
                  if (validForm()) {
                    updateSendOrder({
                      variables: {
                        updateOrderSendId: order?.id,
                        content: {
                          weight: info?.weight,
                          insurance_name: info?.insurance,
                          need_cartoon:
                            info?.cartoon_size === postexOptions.cartoons[0]
                              ? false
                              : info?.need_cartoon,
                          ...(info?.need_cartoon &&
                            info.cartoon_size !== postexOptions.cartoons[0] && {
                            cartoon_size: info?.cartoon_size
                          }),
                          receiver_first_name: showingInfo?.receiver_first_name,
                          receiver_last_name: showingInfo?.receiver_last_name,
                          receiver_phone_number:
                            showingInfo?.receiver_phone_number,
                          address: {
                            province: info?.address?.province?.name,
                            city: info?.address?.city?.name,
                            longitude: order?.address?.lng,
                            latitude: order?.address?.lat,
                            address: showingInfo?.address?.address,
                            postal_code: showingInfo?.address?.postal_code
                          }
                        }
                      },
                      onCompleted: () => setStep(4),
                      onError: err => {
                        if (
                          JSON.parse(
                            JSON.stringify(err)
                          )?.graphQLErrors[0]?.extensions?.response?.body?.detail?.includes(
                            'حداقل'
                          )
                        ) {
                          setSendCost(
                            extractNumber(
                              JSON.parse(JSON.stringify(err))?.graphQLErrors[0]
                                ?.extensions?.response?.body?.detail
                            )
                          );
                          setStep(2);
                        } else {
                          setStep(5);
                        }
                      }
                    });
                  }
                }}
                variant="contained"
                color="primary"
                fullWidth
              >
                {sendOrderLoading ? <CircularProgress /> : 'تایید اطلاعات'}
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
              disabled={sendOrderLoading}
              onClick={() => {
                if (validForm()) {
                  updateSendOrder({
                    variables: {
                      updateOrderSendId: order?.id,
                      content: {
                        weight: info?.weight,
                        insurance_name: info?.insurance,
                        need_cartoon: info?.need_cartoon,
                        ...(info?.need_cartoon && {
                          cartoon_size: info?.cartoon_size
                        }),
                        receiver_first_name: showingInfo?.receiver_first_name,
                        receiver_last_name: showingInfo?.receiver_last_name,
                        receiver_phone_number:
                          showingInfo?.receiver_phone_number,
                        address: {
                          province: info?.address?.province?.name,
                          city: info?.address?.city?.name,
                          longitude: order?.address?.lng,
                          latitude: order?.address?.lat,
                          address: showingInfo?.address?.address,
                          postal_code: showingInfo?.address?.postal_code
                        }
                      }
                    },
                    onCompleted: () => setStep(4),
                    onError: err => {
                      if (
                        JSON.parse(
                          JSON.stringify(err)
                        )?.graphQLErrors[0]?.extensions?.response?.body?.detail?.includes(
                          'حداقل'
                        )
                      ) {
                        setSendCost(
                          extractNumber(
                            JSON.parse(JSON.stringify(err))?.graphQLErrors[0]
                              ?.extensions?.response?.body?.detail
                          )
                        );
                        setStep(2);
                      }
                    }
                  });
                }
              }}
            >
              {sendOrderLoading ? <CircularProgress /> : 'تایید و ارسال'}
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
              disabled={changePostexPassLoading}
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
              {changePostexPassLoading ? <CircularProgress /> : 'تایید'}
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

export default Postex;

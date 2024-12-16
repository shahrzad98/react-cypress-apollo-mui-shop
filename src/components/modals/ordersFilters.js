import styled from '@emotion/styled';
import {
  Autocomplete,
  Button,
  Drawer,
  Grid,
  Slider,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as ActiveCheckBox } from '../../static/svg/activeCheckbox.svg';
import { ReactComponent as EmptyCheckbox } from '../../static/svg/emptyCheckBox.svg';
import { formatEngDate } from '../../utils/helpers';
import LocalizedDatePicker from '../shared/calendar/calendar';

const Style = styled(Drawer)`
  tags-standard-option-0 {
    background-color: red;
  }

  h3 {
    font-size: 16px;
    margin: 0;
    margin: 20px 0 17px;
  }

  .paperw {
    width: 100vw;
    background-color: #f5f6fa;
    height: 100vh;
    padding: 24px 16px 24px;
    overflow-y: auto;

    .submitBtn {
      margin-top: 16px;
      margin-bottom: 20px;
      /* position: fixed; */
      bottom: 0;
      left: 3%;
      width: 94%;
      height: 55px;
    }
  }

  .header {
    h1 {
      margin: 0;
      font-size: 20px;
    }

    .df-arrow {
      margin-right: 6px;
      color: #000;
    }
  }

  .paperCont {
    margin-top: 16px;
    background-color: #fff;
    padding: 0 16px 24px;
    border-radius: 16px;
    height: auto;
    overflow-y: scroll;
  }

  .options {
    font-size: 14px;
    margin: 0;
  }

  .dropdown {
    transform: rotate(90deg);
    margin-left: 10px;
    font-size: 15px;
    margin-right: 10px;
    color: #483493;
    margin-top: 5px;
  }

  .price-range-input {
    width: 40%;
  }
`;

const STATUSES = [
  { title: 'درخواست شده', value: 'STATUS_WAITING_FOR_APPROVAL' },
  { title: 'در انتظار پرداخت', value: 'STATUS_WAITING_FOR_PAYMENT' },
  {
    title: 'در انتظار تایید پرداخت',
    value: 'STATUS_WAITING_FOR_PAYMENT_APPROVAL'
  },
  { title: 'در انتظار تایید', value: 'STATUS_WAITING_FOR_PAYMENT_APPROVAL' },
  { title: 'در حال آماده سازی', value: 'STATUS_IN_PREPARING' },
  { title: 'در حال ارسال', value: 'STATUS_SENT' }
];

const PAY_TYPES = [
  { title: 'کارت به کارت', value: 11 },
  { title: 'زرین پال', value: 5 }
  // { title: 'پرداخت آنلاین پی پینگ', value: 3 }
  // { title: 'پرداخت آنلاین آیدی پی' }
];

const OrdersFilters = ({ close, filterPrimaries }) => {
  const [searchParams, setSearchparams] = useSearchParams();
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderStatusInput, setOrderStatusInput] = useState('');
  const [payTypeInput, setPayTypeInput] = useState('');
  const [payType, setpayType] = useState([]);
  const [cityinput, setCityInput] = useState('');
  const [city, setCity] = useState([]);
  const [sendDate, setSendDate] = useState('');
  const [submitDate, setSubmitDate] = useState('');
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    if (filterPrimaries?.order?.getManagersFilterPrimaries?.max_cost) {
      setPriceRange([
        priceRange[0],
        filterPrimaries?.order?.getManagersFilterPrimaries?.max_cost
      ]);
    }
  }, [filterPrimaries]);

  const submitFilterHandler = () => {
    let body = {
      ...(submitDate && { created_at: formatEngDate(submitDate) }),
      ...(city?.length > 0 && { cities: city }),
      ...(orderStatus?.length > 0 && {
        statuses: orderStatus?.map(e => e.value)
      }),
      ...(payType?.length > 0 && { payment_types: payType?.map(e => e.value) }),
      ...(sendDate && { sent_at: formatEngDate(sendDate) }),
      max_cost: priceRange[1],
      min_cost: priceRange[0],
      isFilter: true
    };
    setSearchparams(body);
  };

  return (
    <Style
      onClose={close}
      PaperProps={{ class: 'paperw' }}
      open={searchParams.get('modal') === 'filter'}
      data-cy="ordersFilters"
      anchor="bottom"
    >
      <Grid className="header" container justifyContent="space-between">
        <h1 onClick={() => setSearchparams({})}>
          <i className="df-arrow" /> فیلتر ها
        </h1>
        <Button
          data-cy="submit_clearFilter"
          onClick={() => {
            setSearchparams({ clearedFilter: true });
            setOrderStatus([]);
            setOrderStatusInput('');
            setPayTypeInput('');
            setpayType([]);
            setCity([]);
            setCityInput('');
            setSendDate('');
            setSubmitDate('');
            setPriceRange([0, 0]);
          }}
        >
          حذف همه فیلترها
        </Button>
      </Grid>
      <Grid className="paperCont" container>
        <h3>وضعیت سفارش</h3>
        <Grid xs={12}>
          <Autocomplete
            popupIcon={<i className="df-arrow dropdown" />}
            limitTags={2}
            value={orderStatus}
            onChange={(event, newValue) => {
              setOrderStatus(newValue);
            }}
            inputValue={orderStatusInput}
            onInputChange={(event, newInputValue) => {
              setOrderStatusInput(newInputValue);
            }}
            multiple
            autoHighlight={false}
            disabledItemsFocusable
            id="tags-standard"
            options={STATUSES}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={option => option.title}
            renderTags={value =>
              value.map((option, index) => (
                <p className="options" key={option.id}>
                  {index !== 0 ? ' _ ' : ''}
                  {option.title}
                </p>
              ))
            }
            renderOption={(props, option) => (
              <Grid container {...props} data-cy="popper_OrderStatus">
                {orderStatus?.filter(e => e.title === option.title)?.length >
                0 ? (
                  <ActiveCheckBox style={{ marginLeft: '8px' }} />
                ) : (
                  <EmptyCheckbox style={{ marginLeft: '8px' }} />
                )}
                <p className="options">{option.title}</p>
              </Grid>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="وضعیت را انتخاب کنید"
              />
            )}
          />
        </Grid>
        <h3>تاریخ ثبت سفارش</h3>
        <Grid xs={12}>
          <LocalizedDatePicker
            label="تاریخ"
            value={submitDate}
            setValue={setSubmitDate}
            data_cy="datePicker_order"
          />
        </Grid>
        <h3>روش پرداخت</h3>
        <Grid xs={12}>
          <Autocomplete
            popupIcon={<i className="df-arrow dropdown" />}
            limitTags={1}
            value={payType}
            onChange={(event, newValue) => {
              setpayType(newValue);
            }}
            inputValue={payTypeInput}
            onInputChange={(event, newInputValue) => {
              setPayTypeInput(newInputValue);
            }}
            multiple
            id="tags-standard"
            data-cy="autoComplete_paymentMethod"
            options={PAY_TYPES}
            isOptionEqualToValue={(option, value) =>
              option.title === value.title
            }
            getOptionLabel={option => option.title}
            renderTags={value =>
              value.map((option, index) => (
                <p className="options" key={option.id}>
                  {index !== 0 ? ' _ ' : ''}
                  {option.title}
                </p>
              ))
            }
            renderOption={(props, option) => (
              <Grid container {...props} data-cy="popper_paymentMethod">
                {payType?.filter(e => e.title === option.title)?.length > 0 ? (
                  <ActiveCheckBox style={{ marginLeft: '8px' }} />
                ) : (
                  <EmptyCheckbox style={{ marginLeft: '8px' }} />
                )}
                <p className="options">{option.title}</p>
              </Grid>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="روش پرداخت را انتخاب کنید"
              />
            )}
          />
        </Grid>
        <h3>شهر</h3>
        <Grid xs={12}>
          <Autocomplete
            popupIcon={<i className="df-arrow dropdown" />}
            limitTags={2}
            value={city}
            onChange={(event, newValue) => {
              setCity(newValue);
            }}
            inputValue={cityinput}
            onInputChange={(event, newInputValue) => {
              setCityInput(newInputValue);
            }}
            multiple
            id="tags-standard"
            data-cy="autoComplete_city"
            options={
              filterPrimaries?.order?.getManagersFilterPrimaries?.cities || []
            }
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={option => option}
            renderTags={value =>
              value.map((option, index) => (
                <p className="options" key={option}>
                  {index !== 0 ? ' _ ' : ''}
                  {option}
                </p>
              ))
            }
            renderOption={(props, option) => (
              <Grid container {...props} data-cy="popper_city">
                {city?.filter(e => e === option)?.length > 0 ? (
                  <ActiveCheckBox style={{ marginLeft: '8px' }} />
                ) : (
                  <EmptyCheckbox style={{ marginLeft: '8px' }} />
                )}
                <p className="options">{option}</p>
              </Grid>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="outlined"
                label="شهر را انتخاب کنید"
              />
            )}
          />
        </Grid>
        <h3>زمان ارسال</h3>
        <Grid xs={12}>
          <LocalizedDatePicker
            label="تاریخ"
            value={sendDate}
            setValue={setSendDate}
          />
        </Grid>
        <h3>مبلغ سفارش</h3>
        <Grid className="slider" item xs={12}>
          <Slider
            min={0}
            max={
              filterPrimaries?.order?.getManagersFilterPrimaries?.max_cost ||
              100000000
            }
            value={priceRange}
            onChange={(e, value) => {
              setPriceRange(value);
            }}
            valueLabelDisplay="off"
            disableSwap
          />
        </Grid>
        <Grid justifyContent="space-between" alignItems="center" container>
          <p>از</p>
          <TextField
            className="price-range-input"
            type="number"
            data-cy="textField_priceRange_from"
            InputProps={{ endAdornment: <p>تومان</p> }}
            onChange={e => setPriceRange([e.target.value, priceRange[1]])}
            variant="outlined"
            value={priceRange[0]}
          />
          <p>تا</p>
          <TextField
            className="price-range-input"
            type="number"
            data-cy="textField_priceRange_to"
            InputProps={{ endAdornment: <p>تومان</p> }}
            onChange={e => setPriceRange([priceRange[0], e.target.value])}
            variant="outlined"
            value={priceRange[1]}
          />
        </Grid>
      </Grid>
      <Button
        className="submitBtn"
        onClick={submitFilterHandler}
        variant="contained"
        color="primary"
        data-cy="submit-filter"
        fullWidth
      >
        اعمال
      </Button>
    </Style>
  );
};

export default OrdersFilters;

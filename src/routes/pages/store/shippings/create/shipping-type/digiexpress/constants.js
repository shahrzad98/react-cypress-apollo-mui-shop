import { InfoOutlined } from '@mui/icons-material';
import * as yup from 'yup';
import React from 'react';

export const regex = {
  phone: /^(\+98|0)?9\d{9}$/g,
  email:
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
  cost: /[\d]/g
};
export const FIRST_STEP_FORM = [
  { label: 'نام', name: 'first_name' },
  { label: 'نام خانوادگی', name: 'last_name' },
  { label: 'شماره موبایل', name: 'phone_number' }
];
export const STEP_CONTENT = [
  {
    title: 'ساخت حساب کاربری دیجی اکسپرس',
    desc: 'برای فعال سازی روش ارسال دیجی اکسپرس ، لطفا اطلاعات زیر را وارد کنید.'
  },
  {
    title: 'تعیین نوع پرداخت',
    desc: 'لطفا نوع پرداخت هزینه ارسال را طبق توضبحات ، انتخاب کنید.'
  },
  {
    title: 'مشخصات روش ارسالی',
    desc: 'مشخصات روش ارسال را برای شهر خود وارد کنید.'
  }
];

export const SHIPPING_COSTS = [
  { value: '-1', label: 'قیمت واقعی' },
  { value: '0', label: 'رایگان' },
  { value: '1', label: 'قیمت دلخواه' }
];

export const PAYMENT_TIME = [
  {
    title: 'پیش پرداخت',
    desc: 'پرداخت هزینه ارسال توسط شما با شارژ کیف پول به صورت آنلاین انجام می شود.',
    detail:
      '(هزینه ارسال پرداخت شده هنگام ثبت سفارش , ممکن است با هزینه ارسال محاسبه شده توسط دیجی اکسپرس هنگام ارسال سفارش ، متفاوت باشد.)',
    value: false
  },
  {
    title: 'پس پرداخت',
    desc: 'پرداخت هزینه ارسال توسط مشتری در محل تحویل به صورت حضوری انجام می شود.',
    detail:
      '(هزینه ارسال هنگام ارسال سفارش محاسبه و به شما نمایش داده می شود.)',
    value: true
  }
];

export const validateSchema = ({ step, shippingCost }) =>
  yup.object().shape({
    ...(step === 1 && {
      first_name: yup.string().required('نام خود را وارد کنید.'),
      last_name: yup.string().required('نام خانوادگی خود را وارد کنید.'),
      phone_number: yup
        .string()
        .required('شماره تلفن خود را وارد کنید.')
        .matches(regex.phone, 'شماره تلفن را به درستی وارد کنید.'),
      address: yup.string().required('آدرس خود را وارد کنید.'),
      lat: yup.string().required(),
      lng: yup.string().required()
    }),
    ...(step === 3 &&
      shippingCost === '1' && {
        cost: yup
          .string()
          .matches(regex.cost, 'مبلغ را به درستی وارد کنید.')
          .required('مبلغ را وارد کنید.')
      })
  });

export const toastMapError = {
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: true,
  draggable: true,
  closeButton: false,
  icon: <InfoOutlined />,
  style: {
    backgroundColor: '#EA002A33',
    color: '#EA002A'
  }
};

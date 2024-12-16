import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import * as yup from 'yup';
import React from 'react';

export const regex = {
  phone: /^(\+98|0)?9\d{9}$/g,
  email:
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
  cost: /[\d]/g,
  postal_code: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/g,
  national_code: /^[0-9]{10}$/g
};
export const FIRST_STEP_FORM = [
  { label: 'شماره موبایل', name: 'phone_number' },
  { label: 'کد ملی', name: 'national_code' },
  { label: 'کد پستی', name: 'postal_code' },
  { label: 'استان', name: 'province' },
  { label: 'شهر یا محله', name: 'city' },
  { label: 'آدرس مبدا تحویل سفارش', name: 'address' }
];
export const STEP_CONTENT = [
  {
    title: 'ساخت حساب کاربری پستکس',
    desc: 'این اطلاعات پس از ثبت دیگر قابل ویرایش نیست. لطفا دقت کنید!'
  },
  {
    title: 'مشخصات روش ارسالی',
    desc: 'مشخصات روش ارسال را برای استان خود و سایر استان ها وارد کنید.'
  },
  {
    title: 'حساب کاربری پستکس',
    desc: 'اطلاعات مورد نیاز شارژ کیف پول'
  }
];

export const SHIPPING_AREA = [
  {
    label: 'درون استانی',
    name: 'my_province',
    costName: 'cost',
    activeName: 'my_province_is_active'
  },
  {
    label: 'برون استانی',
    name: 'other_provinces',
    costName: 'other_provinces_cost',
    activeName: 'other_provinces_is_active'
  }
];

export const SHIPPING_COSTS = [
  { value: '-1', label: 'قیمت واقعی' },
  { value: '0', label: 'رایگان' },
  { value: '1', label: 'قیمت دلخواه' }
];

export const SHIPPING_INFO_DETAIL = [
  {
    label: 'زمان ارسال',
    name: 'time_sending'
  },
  {
    label: 'نوع هزینه ارسال',
    name: 'payment_type'
  },
  {
    label: 'مبلغ',
    name: 'cost'
  }
];

export const validateSchema = ({ step, shippingCost }) =>
  yup.object().shape({
    ...(step === 1 && {
      phone_number: yup
        .string()
        .required('شماره تلفن خود را وارد کنید.')
        .matches(regex.phone, 'شماره تلفن را به درستی وارد کنید.'),
      national_code: yup
        .string()
        .required('کد ملی خود را وارد کنید.')
        .matches(regex.national_code, 'کد ملی را به درستی وارد کنید.'),

      postal_code: yup
        .string()
        .required('کد پستی خود را وارد کنید.')
        .matches(regex.postal_code, 'کد پستی را به درستی وارد کنید.'),

      province: yup.string().required('استان خود را وارد کنید.'),
      city: yup.string().required('شهر یا محله خود را وارد کنید.'),
      address: yup.string().required('آدرس خود را وارد کنید.'),
      lat: yup.string().required(),
      lng: yup.string().required()
    }),
    ...(step === 2 &&
      shippingCost.my_province === '1' && {
        cost: yup
          .string()
          .matches(regex.cost, 'مبلغ را به درستی وارد کنید.')
          .required('مبلغ را وارد کنید.')
      }),
    ...(step === 2 &&
      shippingCost.other_provinces === '1' && {
        other_provinces_cost: yup
          .string()
          .matches(regex.cost, 'مبلغ را به درستی وارد کنید.')
          .required('مبلغ را وارد کنید.')
      })
  });

export const toastSuccess = {
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: true,
  draggable: true,
  closeButton: false,
  icon: <CheckCircleIcon />,
  style: {
    backgroundColor: '#DEFBE6',
    color: '#198038'
  }
};

export const toastWarning = {
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: true,
  draggable: true,
  closeButton: false,
  icon: <WarningIcon />,
  style: {
    backgroundColor: '#FCF4D6',
    color: '#F1C21B'
  }
};

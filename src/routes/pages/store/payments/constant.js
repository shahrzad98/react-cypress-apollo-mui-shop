import { ReactComponent as GatewaySuccess } from '../../../../static/svg/gatewaySuccess.svg';
import { ReactComponent as GatewayInfo } from '../../../../static/svg/gatewayInfo.svg';
import * as React from 'react';
import moment from 'moment-jalaali';

export const paymentDictionary = {
  1: 'پی پینگ',
  2: 'آی دی پی',
  3: 'کارت به کارت',
  4: 'به پرداخت',
  5: 'زرین پال'
};

export const statusDictionaryColor = {
  'in processing': '#FFC72A',
  'not confirmed': '#EA002A',
  confirmed: '#00CE7D'
};

export const statusDictionaryText = {
  'in processing': 'درانتظار بررسی...',
  'not confirmed': 'عدم تایید اطلاعات',
  confirmed: 'تایید اطلاعات'
};

export const levelDictionary = {
  BASIC: 'آبی',
  SILVER: 'نقره ای'
};
export const zarrinpalDetailTableRows = paymentInfo => [
  {
    id: 1,
    name: 'نام',
    value: paymentInfo?.first_name
  },
  {
    id: 2,
    name: 'نام خانوادگی',
    value: paymentInfo?.last_name
  },
  {
    id: 3,
    name: 'تلفن ثابت',
    value: paymentInfo?.telephone_number.replace(/\+98/, 0)
  },
  {
    id: 4,
    name: 'شماره موبایل',
    value: paymentInfo?.phone_number.replace(/\+98/, 0)
  },
  {
    id: 5,
    name: 'کد پستی',
    value: paymentInfo?.postal_code
  },
  {
    id: 6,
    name: 'کد ملی',
    value: paymentInfo?.national_code
  },
  {
    id: 7,
    name: 'ایمیل',
    value: paymentInfo?.email
  },
  {
    id: 8,
    name: 'تاریخ تولد',
    value: moment(paymentInfo?.birthday).format('jYYYY/jMM/jDD')
  },
  {
    id: 9,
    name: 'شماره شبا',
    value: paymentInfo?.sheba_number
  },
  {
    id: 10,
    name: 'شهر و استان',
    value: `${paymentInfo?.province} -  ${paymentInfo?.city}`
  }
];
export const withLevelZarrinpalDetailTableRows = paymentInfo => [
  {
    id: 1,
    name: 'سطح',
    level: paymentInfo?.level,
    value: levelDictionary[paymentInfo?.level]
  },
  {
    id: 2,
    name: 'نام',
    value: paymentInfo?.first_name
  },
  {
    id: 3,
    name: 'نام خانوادگی',
    value: paymentInfo?.last_name
  },
  {
    id: 4,
    name: 'تلفن ثابت',
    value: paymentInfo?.telephone_number.replace(/\+98/, 0)
  },
  {
    id: 5,
    name: 'شماره موبایل',
    value: paymentInfo?.phone_number.replace(/\+98/, 0)
  },
  {
    id: 6,
    name: 'کد پستی',
    value: paymentInfo?.postal_code
  },
  {
    id: 7,
    name: 'کد ملی',
    value: paymentInfo?.national_code
  },
  {
    id: 8,
    name: 'ایمیل',
    value: paymentInfo?.email
  },
  {
    id: 9,
    name: 'تاریخ تولد',
    value: moment(paymentInfo?.birthday).format('jYYYY/jMM/jDD')
  },
  {
    id: 10,
    name: 'شماره شبا',
    value: paymentInfo?.sheba_number
  },
  {
    id: 11,
    name: 'شهر و استان',
    value: `${paymentInfo?.province} -  ${paymentInfo?.city}`
  }
];
export const zarrinpalFeedbackTypes = {
  success: {
    icon: <GatewaySuccess />,
    title: 'درخواست موفق درگاه پرداخت',
    desc: 'درخواست شما، برای درﮔﺎه ﭘﺮداﺧﺖ زرین پال ﺑﺎ ﻣﻮﻓﻘﯿﺖ ﺛﺒﺖ شد.نتیجه حداکثر تا 2 روز کاری آینده به شما اطلاع داده می‌شود.'
  },
  waiting: {
    icon: <GatewayInfo />,
    title: 'اطلاعات در حال بررسی',
    desc: 'اطلاعات حساب کاربری شما ﺑﺎ ﻣﻮﻓﻘﯿﺖ ﺛﺒﺖ شد. نتیجه، از طریق پیامک به شما اطلاع داده می‌شود.'
  }
};

export const regex = {
  phone_number: /^(\+98|0)?9\d{9}$/g,
  email:
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
  postal_code: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/g,
  national_code: /^[0-9]{10}$/g,
  sheba_number: /^(?=.{24}$)[0-9]*$94833001/
};

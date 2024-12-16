import * as yup from 'yup';

export const regex = {
  phone: /^(\+98|0)?9\d{9}$/g,
  email:
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
  cost: /[\d]/g
};

export const STEP_CONTENT = [
  {
    title: 'مشخصات روش ارسالی',
    desc: 'برای ساخت و فعال سازی روش ارسال خود، اطلاعات آن را وارد کنید.',
    data_cy: 'step1'
  }
];

export const SHIPPING_COSTS = [
  { value: '0', label: 'رایگان' },
  { value: '1', label: 'قیمت دلخواه' }
];

export const validateSchema = yup.object().shape({
  name: yup.string().required('عنوان روش ارسال را وارد کنید.'),
  my_province_is_active: yup.boolean(),
  other_provinces_is_active: yup.boolean(),
  cost_method: yup.string(),
  other_provinces_cost_method: yup.string(),
  province: yup
    .object()
    .shape({ name: yup.string().required('استان خود را وارد کنید.') }),
  time_sending: yup.mixed().when('my_province_is_active', {
    is: true,
    then: yup
      .number()
      .typeError('زمان را به درستی وارد کنید')
      .min(1, 'زمان ارسال نمیتواند کمتر از 1 باشد')
      .required('زمان را وارد کنید')
  }),
  other_provinces_time_sending: yup.mixed().when('other_provinces_is_active', {
    is: true,
    then: yup
      .number()
      .typeError('زمان را به درستی وارد کنید')
      .min(1, 'زمان ارسال نمیتواند کمتر از 1 باشد')
      .required('زمان را وارد کنید')
  }),
  cost: yup.mixed().when(['my_province_is_active', 'cost_method'], {
    is: (my_province_is_active, cost_method) =>
      my_province_is_active && parseInt(cost_method) === 1,
    then: yup
      .number()
      .typeError('زمان را به درستی وارد کنید')
      .min(1, 'هزینه ارسال نمیتواند کمتر از 1 باشد')
      .required('هزینه ارسال را وارد کنید')
  }),
  other_provinces_cost: yup
    .mixed()
    .when(['other_provinces_is_active', 'other_provinces_cost_method'], {
      is: (other_provinces_is_active, other_provinces_cost_method) =>
        other_provinces_is_active &&
        parseInt(other_provinces_cost_method) === 1,
      then: yup
        .number()
        .typeError('زمان را به درستی وارد کنید')
        .min(1, 'هزینه ارسال نمیتواند کمتر از 1 باشد')
        .required('هزینه ارسال را وارد کنید')
    })
});

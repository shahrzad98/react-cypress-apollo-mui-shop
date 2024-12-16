import * as yup from 'yup';

export const regex = {
  phone: /^(\+98|0)?9\d{9}$/g,
  email:
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g,
  cost: /[\d]/g
};
export const FIRST_STEP_FORM = [
  { label: 'نام', name: 'first_name', data_cy: 'first_name' },
  { label: 'نام خانوادگی', name: 'last_name', data_cy: 'last_name' },
  { label: 'شماره موبایل', name: 'phone_number', data_cy: 'phone_number' }
];
export const STEP_CONTENT = [
  {
    title: 'ساخت حساب کاربری تیپاکس',
    desc: 'برای فعال سازی روش ارسال تیپاکس ، لطفا اطلاعات زیر را وارد کنید.',
    data_cy: 'step1'
  },
  {
    title: 'مشخصات روش ارسالی',
    desc: 'مشخصات روش ارسال را برای سایر شهرها وارد کنید.',
    data_cy: 'step2'
  }
];
export const SHIPPING_COSTS = [
  { value: '-1', label: 'قیمت واقعی' },
  { value: '0', label: 'رایگان' },
  { value: '1', label: 'قیمت دلخواه' }
];
export const validateSchema = yup.object().shape({
  first_name: yup.string().required('نام خود را وارد کنید.'),
  last_name: yup.string().required('نام خانوادگی خود را وارد کنید.'),
  city: yup
    .object()
    .shape({ name: yup.string().required('شهر خود را وارد کنید.') }),
  province: yup
    .object()
    .shape({ name: yup.string().required('استان خود را وارد کنید.') }),
  phone_number: yup
    .string()
    .required('شماره تلفن خود را وارد کنید.')
    .matches(regex.phone, 'شماره تلفن را به درستی وارد کنید.'),
  address: yup.string().required('آدرس خود را وارد کنید.'),
  lat: yup.string().required(),
  lng: yup.string().required()
});

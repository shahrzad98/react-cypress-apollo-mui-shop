import { ReactComponent as Step1Svg } from '../../../../svg/post_step1.svg';
import { ReactComponent as Step2Svg } from '../../../../svg/post_step2.svg';
import { ReactComponent as Step3Svg } from '../../../../svg/post_step3.svg';
import { ReactComponent as Step4ActiveSvg } from '../../../../svg/post_step4_active.svg';
import { ReactComponent as Step4Svg } from '../../../../svg/post_step4.svg';
import { ReactComponent as Step1ActiveSvg } from '../../../../svg/post_step1_active.svg';
import { ReactComponent as Step2ActiveSvg } from '../../../../svg/post_step2_active.svg';
import { ReactComponent as Step2PassedSvg } from '../../../../svg/post_step2_passed.svg';
import { ReactComponent as Step3ActiveSvg } from '../../../../svg/post_step3_active.svg';
import { ReactComponent as Step3PassedSvg } from '../../../../svg/post_step3_passed.svg';
import * as React from 'react';
import * as yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const postSteps = [
  {
    id: 1,
    icon: <Step1Svg />,
    activeIcon: <Step1ActiveSvg />,
    passedIcon: <Step1Svg />,
    title: 'اطلاعات کاربری'
  },
  {
    id: 2,
    icon: <Step2Svg />,
    activeIcon: <Step2ActiveSvg />,
    passedIcon: <Step2PassedSvg />,
    title: 'اطلاعات آدرس'
  },
  {
    id: 3,
    icon: <Step3Svg />,
    activeIcon: <Step3ActiveSvg />,
    passedIcon: <Step3PassedSvg />,
    title: 'روش ارسال'
  },
  {
    id: 4,
    icon: <Step4Svg />,
    activeIcon: <Step4ActiveSvg />,
    passedIcon: <Step4ActiveSvg />,
    title: 'تکمیل ساخت'
  }
];

const regex = {
  phone_number: /^(\+98|0)?9\d{9}$/g,
  postal_code: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/g,
  national_code: /^[0-9]{10}$/g
};

export const SHIPPING_COSTS = [
  { value: '0', label: 'رایگان' },
  { value: '1', label: 'قیمت دلخواه' },
  { value: '-1', label: 'قیمت واقعی' }
];

export const formData = (store, activeStep) => ({
  initialValues: {
    first_name: store?.first_name,
    last_name: store?.last_name,
    phone_number: store?.phone_number,
    national_code: '',
    national_code_serial: '',
    province: { name: store?.store_address?.province || '' },
    city: { name: store?.store_address?.city || '' },
    address: store?.store_address?.address,
    postal_code: store?.store_address?.postal_code,
    node: { name: '' },
    unit: { name: '' },
    latLng: [
      store?.store_address?.latitude || '35.699739',
      store?.store_address?.longitude || '51.338097'
    ]
  },

  validationSchema:
    activeStep === 1
      ? yup.object().shape({
          first_name: yup.string().required('لطفا نام خود را وارد کنید.'),
          last_name: yup.string().required('لطفا نام خود را وارد کنید.'),
          national_code: yup
            .string()
            .required('لطفا کد ملی خود را وارد کنید.')
            .matches(regex.national_code, 'کد ملی را به درستی وارد کنید.'),
          national_code_serial: yup
            .string()
            .required('لطفا سریال کارت ملی خود را وارد کنید.'),
          phone_number: yup
            .string()
            .required('لطفا شماره موبایل خود را وارد کنید.')
            .matches(regex.phone_number, 'شماره موبایل را به درستی وارد کنید.'),
          birthday: yup.string().required('لطفا تاریخ تولد خود را وارد کنید.')
        })
      : yup.object().shape({
          city: yup
            .object()
            .shape({ name: yup.string().required('شهر خود را وارد کنید.') }),
          province: yup
            .object()
            .shape({ name: yup.string().required('استان خود را وارد کنید.') }),
          unit: yup.object().shape({
            name: yup.string().required('واحد پستی خود را وارد کنید.')
          }),
          node: yup.object().shape({
            name: yup.string().required('نقطه مبادله خود را وارد کنید.')
          }),
          address: yup.string().required('لطفا  آدرس خود را وارد کنید.'),
          postal_code: yup
            .string()
            .required('لطفا کد پستی خود را وارد کنید.')
            .matches(regex.postal_code, 'کد پستی  را به درستی وارد کنید.')
        })
});
export const SHIPPING_AREA = [
  {
    label: 'ارسال درون شهری',
    name: 'my_province',
    costName: 'cost',
    activeName: 'my_province_is_active'
  },
  {
    label: 'ارسال برون شهری',
    name: 'other_provinces',
    costName: 'other_provinces_cost',
    activeName: 'other_provinces_is_active'
  }
];

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

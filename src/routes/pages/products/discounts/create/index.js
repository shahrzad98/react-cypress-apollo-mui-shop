import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Radio,
  Select,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Style } from './style';
import * as yup from 'yup';
import LocalizedDatePicker from '../../../../../components/shared/calendar/calendar';
import persianJs from 'persianjs';
import { useMutation } from '@apollo/client';
import { CREATE_VOUCHER } from '../../../../../constant/mutations/products';

const validationSchema = yup.object().shape({
  name: yup.string().required('نام ، برای ثبت تخفیف نیاز است.'),
  amount: yup
    .number()
    .typeError('این مقدار را به درستی وارد کنید')
    .when('voucher_type', {
      is: 2,
      then: yup
        .number()
        .typeError(' مبلغ را به درستی وارد کنید')
        .required(' مبلغ ، برای ثبت تخفیف نیاز است.')
        .min(1, 'مبلغ باید بیشتر از صفر باشد'),
      otherwise: yup
        .number()
        .typeError('  مقدار را به درستی وارد کنید')
        .max(100, 'حداکثر مقدار، میتواند ۱۰۰ درصد باشد')
        .required('  مقدار ، برای ثبت تخفیف نیاز است.')
        .min(1, 'مقدار باید بیشتر از صفر باشد')
    }),
  limit: yup
    .number()
    .typeError('این مقدار را به درستی وارد کنید')
    .when('voucher_type', {
      is: 2,
      then: yup
        .number()
        .typeError('حداقل خرید را به درستی وارد کنید')
        .required('حداقل خرید ، برای ثبت تخفیف نیاز است.'),
      otherwise: yup
        .number()
        .typeError('حداکثر سقف خرید را به درستی وارد کنید')
        .required('حداکثر سقف خرید ، برای ثبت تخفیف نیاز است.')
    }),
  start_date: yup
    .string()
    .typeError('محدودیت زمان ، برای ثبت تخفیف نیاز است.')
    .required('محدودیت زمان ، برای ثبت تخفیف نیاز است.'),
  expire_date: yup
    .string()
    .typeError('محدودیت زمان ، برای ثبت تخفیف نیاز است.')
    .required('محدودیت زمان ، برای ثبت تخفیف نیاز است.')
});

const CreateDiscount = () => {
  const [createVoucher, { loading }] = useMutation(CREATE_VOUCHER);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      voucher_type: 1,
      amount: '',
      limit: '',
      start_date: '',
      expire_date: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      createVoucher({
        variables: {
          content: {
            amount: values.amount,
            customers: [],
            expire_date: new Date(values.expire_date).toISOString(),
            limit: values.limit,
            name: values.name,
            start_date: new Date(values.start_date).toISOString(),
            voucher_type: values.voucher_type
          }
        },
        onCompleted: () => navigate('/products/discounts')
      });
    }
  });

  formik.handleChange = e => {
    if (e.target.name === 'voucher_type') {
      formik.setFieldValue('voucher_type', e.target.value);
    } else if (e?.target?.value) {
      const enValue = persianJs(e.target.value).toEnglishNumber().toString();
      formik.setFieldValue(e.target.name, enValue);
    } else {
      formik.setFieldValue(e.target.name, '');
    }
  };

  return (
    <Style>
      <Grid onClick={() => navigate('/products/discounts')} className="header">
        <i className="df-arrow" />
        <h1>تعریف تخفیف</h1>
      </Grid>
      <Grid alignContent="start" mt={2} container className="content">
        <form onSubmit={formik.handleSubmit}>
          <Grid mt={2} container>
            <h2>نام</h2>
          </Grid>
          <Grid mt={1} container>
            <TextField
              name="name"
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              helperText={formik.touched.name && formik.errors.name}
              placeholder="نام تخفیف را وارد کنید."
              fullWidth
              variant="outlined"
              data-cy="field_name"
            />
          </Grid>
          <Grid mt={2} container>
            <h2>نوع</h2>
          </Grid>
          <Grid mt={1} container>
            <FormControl fullWidth>
              <Select
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                className="select-cat"
                IconComponent={() => (
                  <i
                    className={
                      isOpen ? 'df-arrow dropdown-opened' : 'df-arrow dropdown'
                    }
                  />
                )}
                name="voucher_type"
                data-cy="field_voucher_type"
                onChange={formik.handleChange}
                displayEmpty
                value={formik.values.voucher_type}
                renderValue={() => {
                  if (formik.values.voucher_type === 2) return 'نقدی';
                  if (formik.values.voucher_type === 1) return 'درصدی';
                  return 'نوع تخفیف را انتخاب کنید';
                }}
              >
                <MenuItem value={2}>
                  {' '}
                  <Radio
                    disabled
                    style={{ color: '#00CE7D' }}
                    checked={formik.values.voucher_type === 2}
                  />
                  نقدی
                </MenuItem>
                <MenuItem value={1}>
                  {' '}
                  <Radio
                    disabled
                    style={{ color: '#00CE7D' }}
                    checked={formik.values.voucher_type === 1}
                  />
                  درصدی
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid mt={2} container>
            <h2>{formik.values.voucher_type === 2 ? 'مبلغ' : 'مقدار'}</h2>
          </Grid>
          <Grid mt={1} container>
            <TextField
              name="amount"
              value={formik.values.amount}
              error={formik.touched.amount && formik.errors.amount}
              onChange={formik.handleChange}
              data-cy="field_amount"
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                endAdornment: (
                  <p className="endAdornment">
                    {formik.values.voucher_type === 2 ? 'تومان' : 'درصد'}
                  </p>
                )
              }}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid mt={2} container>
            <h2>
              {formik.values.voucher_type === 2
                ? 'حداقل خرید'
                : 'حداکثر سقف خرید'}
            </h2>
          </Grid>
          <Grid mt={1} container>
            <TextField
              name="limit"
              value={formik.values.limit}
              error={formik.touched.limit && formik.errors.limit}
              onChange={formik.handleChange}
              helperText={formik.touched.limit && formik.errors.limit}
              fullWidth
              data-cy="field_limit"
              InputProps={{
                endAdornment: <p className="endAdornment">تومان</p>
              }}
              variant="outlined"
            />
          </Grid>
          <Grid mt={2} container>
            <h2>محدودیت زمان</h2>
          </Grid>
          <Grid mt={1} container>
            <Grid item xs={6} pr={1}>
              <LocalizedDatePicker
                minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                label="از تاریخ"
                data_cy="field_from"
                value={formik.values.start_date}
                setValue={e => formik.setFieldValue('start_date', e)}
              />
            </Grid>
            <Grid item xs={6} pl={1} sx={{ width: '300px' }}>
              <LocalizedDatePicker
                minDate={
                  formik.values.start_date ||
                  new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                }
                label="تا تاریخ"
                data_cy="field_to"
                value={formik.values.expire_date}
                setValue={e => formik.setFieldValue('expire_date', e)}
              />
            </Grid>
          </Grid>
          {(formik.touched.start_date && formik.errors.start_date) ||
          (formik.touched.expire_date && formik.errors.expire_date) ? (
            <Grid container>
              <p className="error">
                {formik.errors.start_date || formik.errors.expire_date}
              </p>
            </Grid>
          ) : (
            ''
          )}
          <Grid container className="footer">
            <Button
              disabled={loading}
              type="submit"
              data-cy="enter_discount"
              fullWidth
              variant="contained"
              color="primary"
            >
              {loading ? (
                <CircularProgress style={{ width: '24px', height: '24px' }} />
              ) : (
                'ثبت'
              )}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Style>
  );
};

export default CreateDiscount;

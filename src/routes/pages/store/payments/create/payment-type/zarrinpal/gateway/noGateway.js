import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledGrid } from '../style';
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PAYMENT } from '../../../../../../../../constant/mutations/payment';
import { toast, ToastContainer } from 'react-toastify';
import { InfoOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import FeedbackModal from './feedbackModal';
import { GET_STORE_INFO } from '../../../../../../../../constant/queries/settings';
import LocalizedDatePicker from '../../../../../../../../components/shared/calendar/calendar';
import { regex } from '../../../../constant';
import moment from 'moment-jalaali';

const NoGateway = () => {
  const [feedbackShow, setFeedbackShow] = useState(false);
  const navigate = useNavigate();
  const [createPaymentMethod] = useMutation(CREATE_PAYMENT);
  const { data: userInfo } = useQuery(GET_STORE_INFO);
  const { first_name, last_name, phone_number } = JSON.parse(
    localStorage.getItem('user')
  );
  const validationSchema = yup.object().shape({
    national_code: yup
      .string()
      .required('لطفا کد ملی خود را وارد کنید.')
      .matches(regex.national_code, 'کد ملی را به درستی وارد کنید.'),
    birthday: yup.string().required('لطفا تاریخ تولد خود را وارد کنید.'),
    email: yup
      .string()
      .required('لطفا ایمیل خود را وارد کنید.')
      .matches(regex.email, 'ایمیل را به درستی وارد کنید.'),

    sheba_number: yup
      .string()
      .min(24, 'شماره شبا باید حداقل 24 رقم باشد')
      .required('لطفا شماره شبای خود را وارد کنید.'),

    postal_code: yup
      .string()
      .required('لطفا کد پستی خود را وارد کنید.')
      .nullable()
      .matches(regex.postal_code, 'کدپستی را به درستی وارد کنید.'),
    address: yup.string().required('لطفا آدرس خود را وارد کنید.'),
    telephone_number: yup
      .string()
      .max(11, 'شماره تلفن را به درستی وارد کنید')
      .typeError('شماره تلفن را به درستی وارد کنید')
      .required('لطفا تلفن ثابت خود را وارد کنید.')
  });

  const cleanupStorage = setTimeout(
    () => localStorage.removeItem('user'),
    10 * 60 * 1000
  );

  const formik = useFormik({
    initialValues: {
      national_code: '',
      birthday: '',
      email: '',
      sheba_number: '',
      postal_code: '',
      address: '',
      telephone_number: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      await createPaymentMethod({
        variables: {
          content: {
            gateway_type: 5,
            national_code: values.national_code,
            birthday: moment(values.birthday).format('jYYYY-jMM-jDD'),
            email: values.email,
            telephone_number: values.telephone_number,
            phone_number: phone_number,
            sheba_number: values.sheba_number,
            postal_code: values.postal_code,
            address: values.address,
            first_name: first_name,
            last_name: last_name
          }
        },
        onCompleted: () => {
          setFeedbackShow(true);
        },
        onError: error => {
          const errorMessage =
            Object.values(
              JSON.parse(JSON.stringify(error))?.graphQLErrors[0]?.extensions
                ?.response?.body
            )[0][0] || 'مشکلی پیش آمده دوباره تلاش کنید';

          toast(errorMessage, {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            draggable: true,
            closeButton: false,
            icon: <InfoOutlined />,
            style: { backgroundColor: '#EA002A33', color: '#EA002A' }
          });
        }
      });
    }
  });

  const postalCode =
    userInfo?.user?.getUserRead?.my_store[0].store_address?.postal_code || '';

  function closeFeedback() {
    setFeedbackShow(false);
    navigate('/store/payment');
  }

  formik.errors = Object.keys(formik.touched).length > 0 ? formik.errors : {};

  useEffect(() => {
    return () => clearTimeout(cleanupStorage);
  }, []);
  useEffect(() => {
    userInfo && formik.setFieldValue('postal_code', postalCode);
  }, [userInfo]);

  useEffect(
    () => !first_name && navigate('/store/payment/create/zarrinpal'),
    [first_name]
  );
  return (
    <>
      <FeedbackModal
        modalType="waiting"
        onClose={closeFeedback}
        open={feedbackShow}
      />
      <ToastContainer />
      <StyledGrid container>
        <Grid className="header">
          <Grid
            className="back-link"
            onClick={() => navigate('/store/payment/create/zarrinpal/otp')}
          >
            <i className="df-arrow" />
            <h1>زرین پال</h1>
          </Grid>
          <Typography>
            برای فعال سازی درگاه پرداخت زرین پال ، لطفا اطلاعات زیر را وارد
            کنید.
          </Typography>
        </Grid>
        <Grid width={1} className="container">
          <form>
            <Grid mb="20px" className="form-item">
              <label>کد ملی </label>
              <TextField
                name="national_code"
                value={formik.values.national_code}
                onChange={formik.handleChange}
                placeholder={
                  !formik?.errors?.national_code
                    ? 'کد ملی خود را وارد کنید.'
                    : null
                }
                error={
                  !!(
                    formik?.touched?.national_code &&
                    formik?.errors?.national_code
                  )
                }
                helperText={
                  formik?.touched?.national_code &&
                  formik?.errors?.national_code
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mb="20px" className="form-item">
              <label>تاریخ تولد</label>
              <LocalizedDatePicker
                name="birthday"
                value={formik.values.birthday}
                setValue={e => formik.setFieldValue('birthday', e)}
                placeholder={
                  !formik?.errors?.birthday
                    ? 'تاریخ تولد خود را وارد کنید.'
                    : null
                }
                data_cy="datePicker_order"
                onChange={formik.handleChange}
                error={
                  !!(formik?.touched?.birthday && formik?.errors?.birthday)
                }
                helperText={
                  formik?.touched?.birthday && formik?.errors?.birthday
                }
                variant="outlined"
              />
            </Grid>

            <Grid mb="20px" className="form-item">
              <label>ایمیل</label>
              <TextField
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder={
                  !formik?.errors?.email ? 'ایمیل خود را وارد کنید.' : null
                }
                error={!!(formik?.touched?.email && formik?.errors?.email)}
                helperText={formik?.touched?.email && formik?.errors?.email}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mb="20px" className="form-item">
              <label>شماره تلفن ثابت </label>
              <TextField
                name="telephone_number"
                value={formik.values.telephone_number}
                onChange={formik.handleChange}
                placeholder={
                  !formik?.errors?.telephone_number
                    ? 'شماره تلفن ثابت خود را وارد کنید.'
                    : null
                }
                error={
                  !!(
                    formik?.touched?.telephone_number &&
                    formik?.errors?.telephone_number
                  )
                }
                helperText={
                  formik?.touched?.telephone_number &&
                  formik?.errors?.telephone_number
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mb="20px" className="form-item">
              <label>شماره شبا</label>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography color="#9185BE">-IR</Typography>
                    </InputAdornment>
                  )
                }}
                name="sheba_number"
                value={formik.values.sheba_number}
                onChange={formik.handleChange}
                placeholder={
                  !formik?.errors?.sheba_number
                    ? 'شماره شبا خود را وارد کنید.'
                    : null
                }
                error={
                  !!(
                    formik?.touched?.sheba_number &&
                    formik?.errors?.sheba_number
                  )
                }
                helperText={
                  formik?.touched?.sheba_number && formik?.errors?.sheba_number
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mb="20px" className="form-item">
              <label>کد پستی</label>
              <TextField
                type="number"
                name="postal_code"
                value={formik.values.postal_code}
                onChange={formik.handleChange}
                error={
                  !!(
                    formik?.touched?.postal_code && formik?.errors?.postal_code
                  )
                }
                helperText={
                  formik?.touched?.postal_code && formik?.errors?.postal_code
                }
                placeholder={
                  !postalCode && !formik?.errors?.postal_code
                    ? 'کد پستی خود را وارد کنید.'
                    : null
                }
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid mb="20px" className="form-item">
              <label>آدرس</label>
              <TextField
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                placeholder={
                  !formik?.errors?.address
                    ? 'آدرس فروشگاه خود را وارد کنید.'
                    : null
                }
                error={!!(formik?.touched?.address && formik?.errors?.address)}
                helperText={formik?.touched?.address && formik?.errors?.address}
                variant="outlined"
                fullWidth
                rows={2}
                multiline
              />
            </Grid>
          </form>
        </Grid>
        <Grid container className="submitButton">
          <Button
            fullWidth
            onClick={formik.handleSubmit}
            data-cy="accept"
            variant="contained"
          >
            تایید
          </Button>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default NoGateway;

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledGrid } from '../style';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_ZARRINPAL } from '../../../../../../../../constant/mutations/payment';
import { toast, ToastContainer } from 'react-toastify';
import { InfoOutlined } from '@mui/icons-material';
import { ReactComponent as SuccessSVG } from '../../../../../../../../components/createProduct/svg/success.svg';
import { regex } from '../../../../constant';
import { useMemo } from 'react';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [createZarrinpal, { loading }] = useMutation(CREATE_ZARRINPAL);
  const validationSchema = yup.object().shape({
    first_name: yup.string().required('لطفا نام خود را وارد کنید.'),
    last_name: yup.string().required('لطفا نام خانوادگی خود را وارد کنید.'),
    phone_number: yup
      .string()
      .required('لطفا شماره موبایل خود را وارد کنید.')
      .matches(regex.phone_number, 'شماره تلفن را به درستی وارد کنید.')
  });
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      await createZarrinpal({
        variables: {
          content: {
            first_name: values?.first_name,
            last_name: values?.last_name,
            phone_number: values?.phone_number
          }
        },
        onCompleted: () => {
          toast('کد با موفقیت ارسال شد.', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            draggable: true,
            closeButton: false,
            icon: <SuccessSVG />
          });
          navigate('/store/payment/create/zarrinpal/otp');
        },
        onError: error => {
          const errorMessage =
            JSON.parse(JSON.stringify(error))?.graphQLErrors[0]?.extensions
              ?.response?.body?.detail || 'مشکلی پیش آمده دوباره تلاش کنید';

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

  useMemo(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        phone_number: formik.values?.phone_number,
        first_name: formik.values?.first_name,
        last_name: formik.values?.last_name
      })
    );
  }, [formik.values]);

  return (
    <StyledGrid container>
      <ToastContainer />
      <Grid className="header">
        <Grid
          className="back-link"
          onClick={() => navigate('/store/payment/create')}
        >
          <i className="df-arrow" />
          <h1>زرین پال</h1>
        </Grid>
        <Typography>
          لطفا مشخصات خود را برای تایید احراز هویت وارد کنید.
        </Typography>
      </Grid>

      <Grid width={1} className="container" sx={{ height: '70vh' }}>
        <form>
          <Grid mb="20px" className="form-item">
            <label>نام </label>
            <TextField
              name="first_name"
              value={formik.values?.first_name}
              onChange={formik.handleChange}
              placeholder={
                !formik?.errors?.first_name ? 'نام خود را وارد کنید.' : ''
              }
              error={
                !!(formik?.touched?.first_name && formik?.errors?.first_name)
              }
              helperText={
                formik?.touched?.first_name && formik?.errors?.first_name
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid mb="20px" className="form-item">
            <label>نام خانوادگی</label>
            <TextField
              name="last_name"
              value={formik.values?.last_name}
              onChange={formik.handleChange}
              placeholder={
                !formik?.errors?.last_name
                  ? 'نام خانوادگی خود را وارد کنید.'
                  : ''
              }
              error={
                !!(formik?.touched?.last_name && formik?.errors?.last_name)
              }
              helperText={
                formik?.touched?.last_name && formik?.errors?.last_name
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid mb="20px" className="form-item">
            <label>شماره موبایل </label>
            <TextField
              name="phone_number"
              value={formik.values?.phone_number}
              onChange={formik.handleChange}
              placeholder={
                !formik?.errors?.phone_number
                  ? 'شماره موبایل خود را وارد کنید.'
                  : ''
              }
              error={
                !!(
                  formik?.touched?.phone_number && formik?.errors?.phone_number
                )
              }
              helperText={
                formik?.touched?.phone_number && formik?.errors?.phone_number
              }
              variant="outlined"
              fullWidth
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
          دریافت کد تایید
          {loading && (
            <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />
          )}
        </Button>
      </Grid>
    </StyledGrid>
  );
};

export default PersonalInfo;

import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Style } from './style';
import { ReactComponent as StoreSVG } from '../../../svg/user.svg';
import { ReactComponent as SuccessSVG } from '../../../../../../components/createProduct/svg/success.svg';
import { useFormik } from 'formik';
import persianJs from 'persianjs';
import { useMutation } from '@apollo/client';
import { EDIT_STORE } from '../../../../../../constant/mutations/store';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import LocalizedDatePicker from '../../../../../../components/shared/calendar/calendar';
import { formatEngDate } from '../../../../../../utils/helpers';
// import { ReactComponent as KeySVG } from '../../../svg/key.svg';
import { ReactComponent as LogOutSVG } from '../../../svg/logout.svg';
// const mobileRegex = /^(\+98|0)?9\d{9}$/g;

const validationSchema = yup.object().shape({
  first_name: yup.string().required('نام را وارد کنید.'),
  last_name: yup.string().required('نام خانوادگی را وارد کنید.'),
  national_code: yup.string().length(10, 'کد ملی را به درستی وارد کنید'),
  email: yup.string().email('ایمیل را به درستی وارد کنید'),
  sheba_number: yup.string().length(24, 'شماره شبا را به درستی وارد کنید')
});

const EditStoreDrawer = ({
  open,
  close,
  selectedStore,
  setSearchParams,
  refetch,
  setLogoutModal
}) => {
  const [percentage, setPercentage] = useState(0);
  const [logoImage, setLogoImage] = useState('');
  const [imageLoading] = useState('');

  const [editStore, { loading }] = useMutation(EDIT_STORE);
  const [NationalCodeError, setNationalCodeError] = useState('');
  function checkCodeMeli(code) {
    let L = code.length;

    if (L < 8 || parseInt(code, 10) == 0) return false;
    code = ('0000' + code).substr(L + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) == 0) return false;
    let c = parseInt(code.substr(9, 1), 10);
    let s = 0;
    for (let i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
  }

  useEffect(() => {
    if (selectedStore) {
      setLogoImage(selectedStore?.logo?.image);
    }
  }, [selectedStore]);

  const formik = useFormik({
    initialValues: {
      first_name: selectedStore?.first_name || '',
      last_name: selectedStore?.last_name || '',
      phone_number: selectedStore?.phone_number?.replace('+98', '0') || '',
      email: selectedStore?.email || '',
      birthday: selectedStore?.birthday || '',
      sheba_number: selectedStore?.sheba_number,
      national_code: selectedStore?.national_code
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      let body = { ...values };
      if (!values.birthday) delete body.birthday;
      if (!values.sheba_number) delete body.sheba_number;
      if (!values.email) delete body.email;
      if (checkCodeMeli(formik.values.national_code)) {
        setNationalCodeError('');
        editStore({
          variables: {
            content: {
              ...values,
              ...(values.birthday &&
                typeof values.birthday !== 'string' && {
                  birthday: formatEngDate(values.birthday)
                })
            }
          },
          onCompleted: () => {
            setSearchParams({});
            toast('ویرایش اطلاعات با موفقیت ثبت شد.', {
              position: 'bottom-center',
              autoClose: 2000,
              hideProgressBar: true,
              // closeOnClick: true,
              draggable: true,
              closeButton: false,
              icon: <SuccessSVG />
            });
            refetch();
          }
        });
      } else {
        setNationalCodeError('کد ملی را به درستی وارد کنید');
      }
    }
  });

  formik.handleChange = e => {
    if (e?.target?.value) {
      const newValue = persianJs(e.target.value).toEnglishNumber().toString();
      formik.setFieldValue(e.target.name, newValue);
    } else {
      formik.setFieldValue(e.target.name, '');
    }
  };

  useEffect(() => {
    let count = 0;
    let fields = [
      formik?.values?.email,
      formik?.values?.sheba_number,
      formik?.values?.birthday,
      formik?.values?.national_code,
      formik?.values?.phone_number,
      formik?.values?.last_name,
      formik?.values?.first_name
    ];
    for (let index = 0; index < fields.length; index++) {
      if (fields[index]) {
        count++;
      }
    }
    setPercentage(((count * 100) / 7).toFixed());
  }, [formik.values]);

  return (
    <Style anchor="bottom" open={open} onClose={close}>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <Grid onClick={close} className="header">
          <i className="df-arrow" />
          <h1>ویرایش اطلاعات شخصی</h1>
        </Grid>
        <Grid alignContent="flex-start" mt={3} container className="content">
          <Grid container justifyContent="center">
            <div style={{ width: '85px', height: '85px' }}>
              <CircularProgressbarWithChildren
                value={percentage}
                strokeWidth={4}
                counterClockwise
                styles={{
                  path: {
                    stroke:
                      percentage > 74
                        ? '#02E061'
                        : percentage > 24
                        ? '#FFC72A'
                        : '#EA002A',
                    strokeLinecap: 'round',
                    transformOrigin: 'center center'
                  },
                  trail: {
                    stroke: '#d6d6d6',
                    strokeLinecap: 'round',
                    transformOrigin: 'center center',
                    width: '1px'
                  },
                  text: {
                    fill: '#f88',
                    fontSize: '16px'
                  },
                  background: {
                    fill: '#3e98c7'
                  }
                }}
              >
                <div
                  style={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: '#DAD6E966',
                    borderRadius: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:
                      imageLoading || logoImage ? 'center' : 'flex-end',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <StoreSVG style={{ width: '65%', height: '80%' }} />
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </Grid>
          <Grid mt={3} container>
            <h5>نام</h5>
          </Grid>
          <Grid mt={1} container>
            <TextField
              error={formik.touched.first_name && formik.errors.first_name}
              helperText={formik.touched.first_name && formik.errors.first_name}
              name="first_name"
              onChange={formik.handleChange}
              fullWidth
              value={formik?.values?.first_name}
            />
          </Grid>
          <Grid mt={3} container>
            <h5>نام خانوادگی</h5>
          </Grid>
          <Grid mt={1} container>
            <TextField
              error={formik.touched.last_name && formik.errors.last_name}
              helperText={formik.touched.last_name && formik.errors.last_name}
              name="last_name"
              onChange={formik.handleChange}
              fullWidth
              value={formik?.values?.last_name}
            />
          </Grid>
          <Grid mt={2} container>
            <h5>شماره موبایل</h5>
          </Grid>
          <Grid mt={1} container>
            <TextField
              disabled
              className="disabled"
              error={formik.touched.phone_number && formik.errors.phone_number}
              helperText={
                formik.touched.phone_number && formik.errors.phone_number
              }
              name="phone_number"
              onChange={formik.handleChange}
              fullWidth
              value={formik?.values?.phone_number}
            />
          </Grid>
          <Grid mt={2} container>
            <h5>کد ملی</h5>
          </Grid>
          <Grid mt={1} container>
            <TextField
              error={
                (formik.touched.national_code && formik.errors.national_code) ||
                NationalCodeError
              }
              helperText={
                (formik.touched.national_code && formik.errors.national_code) ||
                NationalCodeError
              }
              name="national_code"
              onChange={formik.handleChange}
              fullWidth
              value={formik?.values?.national_code}
            />
          </Grid>
          <Grid mt={2} container>
            <h5>تاریخ تولد</h5>
          </Grid>
          <Grid mt={1} container>
            <LocalizedDatePicker
              value={formik.values.birthday}
              setValue={e => formik.setFieldValue('birthday', e)}
            />
          </Grid>
          <Grid container mt={2}>
            <h5>ایمیل</h5>
          </Grid>
          <Grid container mt={1}>
            <TextField
              fullWidth
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              name="email"
              onChange={formik.handleChange}
              value={formik?.values?.email}
            />
          </Grid>

          <Grid container mt={2}>
            <h5>شماره شبا</h5>
          </Grid>
          <Grid container mt={1}>
            <TextField
              fullWidth
              variant="outlined"
              value={formik.values?.sheba_number}
              error={formik.touched.sheba_number && formik.errors.sheba_number}
              helperText={
                formik.touched.sheba_number && formik.errors.sheba_number
              }
              name="sheba_number"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid mt={3} container>
            <Grid
              // style={{ borderLeft: '0.5px solid #C9C3E0' }}
              className="button_cont"
              item
              xs={12}
            >
              <Button
                style={{ color: '#9185BE' }}
                onClick={() => setLogoutModal(true)}
                variant="text"
                color="primary"
                fullWidth
                startIcon={<LogOutSVG />}
              >
                خروج از حساب
              </Button>
            </Grid>
            {/* <Grid className="button_cont" item xs={6}>
              <Button
                variant="text"
                color="primary"
                fullWidth
                startIcon={<KeySVG />}>
                تغییر رمز عبور
              </Button>
            </Grid> */}
          </Grid>
        </Grid>

        <Grid alignItems="center" container className="footer">
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            color="primary"
            variant="contained"
          >
            {loading ? <CircularProgress /> : 'ثبت'}
          </Button>
        </Grid>
      </form>
    </Style>
  );
};

export default EditStoreDrawer;

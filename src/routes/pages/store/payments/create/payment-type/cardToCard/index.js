import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/styles';
import NotificationCard from '../../../../../../../components/shared/notificationCard/notificationCard';
import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT } from '../../../../../../../constant/mutations/payment';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as SuccessPaymentSvg } from '../../../svg/successPaymentSvg.svg';
import { ReactComponent as WarningPaymentSvg } from '../../../svg/warningPaymentSvg.svg';
import * as yup from 'yup';
import { GET_PAYMENT_METHODS } from '../../../../../../../constant/queries/payment';

const validationSchema = yup.object().shape({
  first_name: yup.string().required('نام صاحب حساب را وارد کنید.'),
  last_name: yup.string().required('نام خانوادگی صاحب حساب را وارد کنید.'),
  card_number: yup
    .string()
    .typeError('شماره کارت را درست وارد کنید.')
    .required('این فیلد اجباری است')
});
const CreateCardToCard = () => {
  const navigate = useNavigate();
  const [createCardToCardPayment, { loading: createCardToCardPaymentLoading }] =
    useMutation(CREATE_PAYMENT);
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      first_name: '',
      last_name: '',
      card_number: '',
      cancel_duration_for_approve_order: 8,
      card_to_card_customer_payment_duration: 4,
      card_to_card_working_in_holidays: true
    },
    onSubmit: values => {
      createCardToCardPayment({
        variables: {
          content: {
            cancel_duration_for_approve_order:
              values.cancel_duration_for_approve_order,
            card_to_card_customer_payment_duration:
              values.card_to_card_customer_payment_duration,
            card_to_card_working_in_holidays:
              values.card_to_card_working_in_holidays,
            first_name: values.first_name,
            last_name: values.last_name,
            gateway_type: 3,
            card_number: values.card_number.replaceAll('-', '')
          }
        },
        update: (cache, prev) => {
          const { payment } = cache.readQuery({
            query: GET_PAYMENT_METHODS
          });
          let newPayments = [...payment.getPaymentMethods];
          newPayments.push({
            ...prev.data?.payment?.createNewPaymentMethod,
            gateway_type_display: 'cardtocard'
          });

          cache.writeQuery({
            query: GET_PAYMENT_METHODS,
            data: {
              payment: {
                ...payment,
                getPaymentMethods: newPayments
              }
            }
          });
        },
        onCompleted: () => {
          toast('ویرایش اطلاعات با موفقیت ثبت شد.', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            draggable: true,
            closeButton: true,
            icon: <SuccessPaymentSvg />,

            style: {
              borderRight: '3px solid #198038',
              backgroundColor: '#DEFBE6',
              color: '#000',
              direction: 'rtl'
            }
          }),
            navigate('/store/payment');
        },
        onError: () => {
          toast('مشکلی پیش آمده دوباره تلاش کنید', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            draggable: true,
            closeButton: true,
            icon: <WarningPaymentSvg />,
            style: {
              backgroundColor: '#FCF4D6',
              color: '#000',
              direction: 'rtl'
            }
          });
        }
      });
    }
  });

  const StyledBox = styled(Box)({
    borderRight: ' 3px solid #DAD6E9',
    padding: '5px',
    margin: '16px'
  });

  const requestTimeData = [
    {
      id: '1',
      label: 'مهلت بررسی درخواست',
      name: 'cancel_duration_for_approve_order',
      value: formik.values.cancel_duration_for_approve_order,
      hasNotifacation: true,
      textNotification:
        'مدت زمانی که طول می‌کشد تا درخواست مشتری را بررسی کنید.'
    },
    {
      id: '2',
      label: 'مهلت پرداخت مشتری',
      name: 'card_to_card_customer_payment_duration',
      value: formik.values.card_to_card_customer_payment_duration,
      hasNotifacation: false
    },
    {
      id: '3',
      label: 'زمان فعالیت',
      name: 'card_to_card_working_in_holidays',
      value: formik.values.card_to_card_working_in_holidays,
      hasNotifacation: true,
      textNotification:
        'اگر در بازه زمانی انتخاب شده، سفارش را بررسی نکنید، منقضی می شود.'
    }
  ];

  function arrayOfNumber(start, len) {
    const arr = new Array(len);
    for (let i = 0; i < len; i++, start++) {
      arr[i] = start;
    }
    return arr;
  }
  return (
    <>
      {createCardToCardPaymentLoading ? (
        <Grid container mt="200px" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <ToastContainer />
          <Stack
            direction="row"
            alignItems="center"
            onClick={() => navigate(-1)}
            my="24px"
            mx="16px"
          >
            <i className="df-arrow" />
            <Typography fontSize="20px" fontWeight={500} mx={1}>
              کارت به کارت
            </Typography>
          </Stack>
          <StyledBox>
            <Typography fontSize="14px">
              برای فعال سازی روش پرداخت کارت به کارت ، لطفا اطلاعات زیر را وارد
              کنید.
            </Typography>
          </StyledBox>
          <Stack
            bgcolor={'#fff'}
            borderRadius={'10px'}
            boxShadow={'0px 4px 8px rgba(72, 52, 147, 0.08)'}
            p={'16px'}
            mx={'16px'}
            direction={'column'}
          >
            <Grid mb={'24px'}>
              <Typography fontSize={'16px'} color={'#6A6F80'}>
                شماره کارت
              </Typography>
              <TextField
                required
                helperText={
                  formik.touched.card_number && formik.errors.card_number
                }
                error={formik.touched.card_number && formik.errors.card_number}
                name="card_number"
                placeholder="شماره کارت خود را وارد کنید."
                sx={{
                  marginTop: '8px',
                  '& input::placeholder': {
                    fontSize: '14px',
                    color: '#9185BE'
                  }
                }}
                type="text"
                inputProps={{ maxLength: 19 }}
                fullWidth
                value={formik.values.card_number}
                onChange={formik.handleChange}
                onKeyUp={e => {
                  if (e.keyCode !== 8) {
                    formik.values.card_number.substr(
                      formik.values.card_number.lastIndexOf('-') + 1
                    ).length == 4 &&
                      formik.values.card_number.length < 19 &&
                      formik.setFieldValue(
                        'card_number',
                        formik.values.card_number + '-'
                      );
                  }
                }}
              />
            </Grid>
            <Grid>
              <Typography fontSize={'16px'} color={'#6A6F80'}>
                نام صاحب حساب
              </Typography>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.first_name}
                error={formik.touched.first_name && formik.errors.first_name}
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
                required
                name="first_name"
                placeholder="نام و نام خانوادگی صاحب حساب را وارد کنید."
                sx={{
                  marginTop: '8px',
                  '& input::placeholder': {
                    fontSize: '14px',
                    color: '#9185BE'
                  }
                }}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid mt={2}>
              <Typography fontSize={'16px'} color={'#6A6F80'}>
                نام خانوادگی صاحب حساب
              </Typography>
              <TextField
                error={formik.touched.last_name && formik.errors.last_name}
                helperText={formik.touched.last_name && formik.errors.last_name}
                value={formik.values.last_name}
                onChange={formik.handleChange}
                required
                name="last_name"
                placeholder="نام و نام خانوادگی صاحب حساب را وارد کنید."
                sx={{
                  marginTop: '8px',
                  '& input::placeholder': {
                    fontSize: '14px',
                    color: '#9185BE'
                  }
                }}
                type="text"
                fullWidth
              />
            </Grid>
          </Stack>
          <Stack
            bgcolor={'#fff'}
            borderRadius={'10px'}
            boxShadow={'0px 4px 8px rgba(72, 52, 147, 0.08)'}
            p={'16px'}
            mx={'16px'}
            mt={'24px'}
            mb={'100px'}
            direction={'column'}
          >
            {requestTimeData.map(i => (
              <Grid mb={'24px'} key={i.id}>
                <Typography fontSize={'16px'} color={'#6A6F80'}>
                  {i.label}
                </Typography>
                <Select
                  defaultValue={() => {
                    if (typeof i.value == 'number') {
                      return i.value;
                    } else {
                      return Boolean(i.value);
                    }
                  }}
                  fullWidth
                  onChange={e =>
                    formik.setFieldValue(`${i.name}`, e.target.value)
                  }
                  sx={{ marginTop: '8px' }}
                  name={i.name}
                >
                  {i.name == 'card_to_card_working_in_holidays'
                    ? [
                        <MenuItem value key={'222'}>
                          <Typography variant="inherit" noWrap>
                            نامحدود
                          </Typography>
                        </MenuItem>,
                        <MenuItem value={false} key={'333'}>
                          <Typography variant="inherit" noWrap>
                            ساعت کاری (9 صبح تا 9 شب)
                          </Typography>
                        </MenuItem>
                      ]
                    : arrayOfNumber(2, 12).map((item, idx) => (
                        <MenuItem key={idx} value={item}>
                          <Typography variant="inherit" noWrap>
                            {`‍‍‍‍‍‍‍‍‍${item}  ساعت`}
                          </Typography>
                        </MenuItem>
                      ))}
                </Select>
                {i.hasNotifacation && (
                  <NotificationCard customText={i.textNotification} />
                )}
              </Grid>
            ))}
          </Stack>
          <Grid
            position="fixed"
            bgcolor="#F5F6FA"
            boxShadow="0px 0px 20px rgba(72, 52, 147, 0.12)"
            bottom={0}
            left={0}
            right={0}
            p={2}
            zIndex={3}
          >
            <Button
              onClick={formik.handleSubmit}
              disabled={createCardToCardPaymentLoading}
              fullWidth
              color="primary"
              variant="contained"
            >
              تایید{' '}
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};

export default CreateCardToCard;

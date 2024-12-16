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
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/styles';
import NotificationCard from '../../../../../../../components/shared/notificationCard/notificationCard';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { EDIT_PAYMENT_CARDTOCARD } from '../../../../../../../constant/mutations/payment';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as SuccessPaymentSvg } from '../../../svg/successPaymentSvg.svg';
import { ReactComponent as WarningPaymentSvg } from '../../../svg/warningPaymentSvg.svg';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  first_name: yup.string().required('نام صاحب حساب را وارد کنید.'),
  last_name: yup.string().required('نام خانوادگی صاحب حساب را وارد کنید.'),
  card_number: yup
    .string()
    .typeError('شماره کارت را درست وارد کنید.')
    .required('این فیلد اجباری است')
});
const EditCardToCard = ({ data, refetch, loading }) => {
  const navigate = useNavigate();
  const params = useParams();
  const editCardToCardData = useMemo(() => {
    if (data) {
      const {
        payment: { getPaymentMethod }
      } = data;
      return getPaymentMethod;
    }
  }, [data]);
  const [editCardToCard] = useMutation(EDIT_PAYMENT_CARDTOCARD);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      first_name: editCardToCardData?.first_name || '',
      last_name: editCardToCardData?.last_name || '',
      card_number:
        editCardToCardData?.card_number
          .split(/(?<=^(?:.{4})+)(?!$)/)
          .join('-') || '',
      cancel_duration_for_approve_order:
        editCardToCardData?.cancel_duration_for_approve_order || '',
      card_to_card_customer_payment_duration:
        editCardToCardData?.card_to_card_customer_payment_duration || '',
      card_to_card_working_in_holidays:
        editCardToCardData?.card_to_card_working_in_holidays
    },
    onSubmit: data => {
      const {
        cancel_duration_for_approve_order,
        card_to_card_customer_payment_duration,
        card_to_card_working_in_holidays,
        first_name,
        last_name,
        card_number
      } = data;
      editCardToCard({
        variables: {
          id: params.id,
          content: {
            cancel_duration_for_approve_order:
              cancel_duration_for_approve_order,
            card_to_card_customer_payment_duration:
              card_to_card_customer_payment_duration,
            card_to_card_working_in_holidays: card_to_card_working_in_holidays,
            first_name: first_name,
            last_name: last_name,
            gateway_type: 3,
            is_active: true,
            card_number: card_number.replaceAll('-', '')
          }
        },
        onCompleted: () => {
          refetch(),
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
            navigate(`/store/payment/detail/${editCardToCardData?.id}`);
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
      {loading ? (
        <Grid container mt="200px" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <ToastContainer />
          <Stack
            direction="row"
            alignItems="center"
            onClick={() =>
              navigate(`/store/payment/detail/${editCardToCardData?.id}`)
            }
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
                helperText={
                  formik.touched.card_number && formik.errors.card_number
                }
                error={formik.touched.card_number && formik.errors.card_number}
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
                required
                error={formik.touched.first_name && formik.errors.first_name}
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
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
                value={formik.values.first_name}
              />
            </Grid>
            <Grid mt={2}>
              <Typography fontSize={'16px'} color={'#6A6F80'}>
                نام خانوادگی صاحب حساب
              </Typography>
              <TextField
                onChange={formik.handleChange}
                required
                error={formik.touched.last_name && formik.errors.last_name}
                helperText={formik.touched.last_name && formik.errors.last_name}
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
                value={formik.values.last_name}
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
                            9 صبح تا 9 شب
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
              fullWidth
              color="primary"
              variant="contained"
            >
              ثبت تغییرات
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};

export default EditCardToCard;

import {
  Box,
  Grid,
  Stack,
  Typography,
  styled,
  Card,
  TextField,
  Divider,
  Button
} from '@mui/material';
import React, { useState } from 'react';
import { ReactComponent as PhoneSVG } from '../../../../../orders/Details/actionDrawer/statuses/InPreparing/alopeyk/svg/phone.svg';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SuccessModal from './successModal';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PAYMENT } from '../../../../../../../constant/mutations/payment';
import { GET_PAYMENT_METHODS } from '../../../../../../../constant/queries/payment';

const StyledBox = styled(Box)({
  borderLeft: ' 2px solid #DAD6E9',
  padding: '5px',
  margin: '16px'
});

const StyledCard = styled(Card)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 16px;
  padding: 16px;
  .form {
    label {
      color: #6a6f80;
      font-size: 16px;
      font-weight: 400;
      display: block;
      margin-bottom: 7px;
    }
    .form-control {
      margin-bottom: 20px;
    }
    .payment-card {
      margin-bottom: 15px;
      h5 {
        color: #101820;
        font-weight: 500;
        font-size: 16px;
        margin: 0;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        color: #6a6f80;
        margin: 0;
      }
      .desc {
        font-weight: 500;
        font-size: 12px;
        color: #c9c3e0;
      }
    }
  }
  input,
  textarea {
    font-size: 14px;
  }
`;

const validationSchema = yup.object({
  bpm_terminal_id: yup
    .number()
    .typeError('شماره پایانه وارد شده معتبر نیست.')
    .required('شماره پایانه پذیرنده را وارد کنید.'),
  bpm_username: yup
    .string('نام کاربری وارد شده اشتباه است.')
    .required('لطفا نام کاربری را وارد کنید.'),
  bpm_password: yup
    .string('رمز عبور  وارد شده اشتباه است.')
    .min(8, 'رمز عبور باید 8 کارکتر  داشته باشد')
    .required('لطفا رمز عبور را وارد کنید.')
});

export default function Behpardakht() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [createNewPaymentMethod] = useMutation(CREATE_PAYMENT);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bpm_terminal_id: '',
      bpm_username: '',
      bpm_password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      createNewPaymentMethod({
        variables: {
          content: {
            ...values,
            gateway_type: 4
          }
        },
        update: (cache, prev) => {
          const { payment } = cache.readQuery({
            query: GET_PAYMENT_METHODS
          });
          let newPayments = [...payment.getPaymentMethods];
          newPayments.push({
            ...prev.data?.payment?.createNewPaymentMethod,
            gateway_type_display: 'behpardakht'
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
          setOpenModal(true);
        }
      });
    }
  });
  return (
    <>
      {/* ======================head========================== */}
      <Stack
        direction="row"
        alignItems="center"
        onClick={() => navigate('/store/payment')}
        my="24px"
        mx="18px"
      >
        <i className="df-arrow" />
        <Typography fontSize="20px" fontWeight={500} mx={2}>
          تعریف روش پرداخت
        </Typography>
      </Stack>
      {/* ======================== main ======================== */}
      <Grid width="1" height="calc(100vh - 160px)" overflow={'auto'}>
        <StyledBox>
          <Typography fontSize="14px" fontWeight={400} mx={1}>
            در صورتی که درگاه به پرداخت ملت را از قبل فعال کردید برای اتصال آن،
            اطلاعات زیر را وارد کنید، در غیر اینصورت می‌توانید از سایت
            <a href="http://www.behpardakht.com/resources/Vpos.html">
              {' '}
              به پرداخت ملت{' '}
            </a>
            ثبت نام کنید.
          </Typography>
        </StyledBox>
        <StyledCard>
          <form className="form" onSubmit={formik.handleSubmit}>
            <Grid className="form-control">
              <label>شماره پایانه پذیرنده</label>
              <TextField
                placeholder="شماره پایانه پذیرنده را وارد کنید."
                fullWidth
                id="bpm_terminal_id"
                name="bpm_terminal_id"
                value={formik.values.bpm_terminal_id}
                onChange={formik.handleChange}
                error={
                  formik.touched.bpm_terminal_id &&
                  Boolean(formik.errors.bpm_terminal_id)
                }
                helperText={
                  formik.touched.bpm_terminal_id &&
                  formik.errors.bpm_terminal_id
                }
              />
            </Grid>
            <Grid className="form-control">
              <label>نام کاربری</label>
              <TextField
                placeholder="نام کاربری درگاه خود را وارد کنید."
                fullWidth
                id="bpm_username"
                name="bpm_username"
                value={formik.values.bpm_username}
                onChange={formik.handleChange}
                error={
                  formik.touched.bpm_username &&
                  Boolean(formik.errors.bpm_username)
                }
                helperText={
                  formik.touched.bpm_username && formik.errors.bpm_username
                }
              />
            </Grid>
            <Grid className="form-control">
              <label>رمز عبور</label>
              <TextField
                placeholder="رمز عبور درگاه خود را وارد کنید."
                fullWidth
                id="bpm_password"
                name="bpm_password"
                value={formik.values.bpm_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.bpm_password &&
                  Boolean(formik.errors.bpm_password)
                }
                helperText={
                  formik.touched.bpm_password && formik.errors.bpm_password
                }
              />
            </Grid>
            <Divider style={{ marginTop: '36px' }} />
            {/* ===================== Support  ==================== */}
            <Stack direction="column" mt={3}>
              <Typography fontSize="14px" fontWeight={400}>
                برای راهنمایی بیشتر می‌توانید با پشتیبانی تماس بگیرید.
              </Typography>
              <StyledBox
                style={{
                  margin: '24px 0px',
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography
                  fontSize="14px"
                  fontWeight={400}
                  mx={1}
                  color={'GrayText'}
                >
                  پشتیبانی
                </Typography>
                <Stack direction="row">
                  <Typography
                    fontSize="14px"
                    fontWeight={400}
                    color={'GrayText'}
                    mr={1}
                  >
                    021-40885523
                  </Typography>
                  <PhoneSVG />
                </Stack>
              </StyledBox>
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
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
              >
                تایید
              </Button>
            </Grid>
          </form>
        </StyledCard>
      </Grid>
      <SuccessModal
        close={setOpenModal}
        show={openModal}
        submit={() => {
          setOpenModal(false);
          navigate('/store/payment');
        }}
      />
    </>
  );
}

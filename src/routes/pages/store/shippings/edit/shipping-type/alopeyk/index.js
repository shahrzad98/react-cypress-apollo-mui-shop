import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import { GET_SHIPPING_METHOD_DETAIL } from '../../../../../../../constant/queries/shipping';
import {
  PAYMENT_TIME,
  SHIPPING_COSTS
} from '../../../create/shipping-type/alopeyk/constants';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as WarningSvg } from '../../../../svg/warningSvg.svg';
import { ReactComponent as SuccessSvg } from '../../../../svg/successSvg.svg';
import { Style } from '../../../detail/shipping-type/alopeyk/style';
const EditAlopeyk = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [shippingCost, setShippingCost] = useState('-1');

  const { data, refetch, loading } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } },
    onCompleted: data => {
      setShippingCost(
        +data?.shipping.getShippingMethodDetail?.cost > 0
          ? '1'
          : data?.shipping.getShippingMethodDetail?.cost
      );
    }
  });

  const editShippingData = useMemo(() => {
    if (data) {
      const {
        shipping: { getShippingMethodDetail }
      } = data;
      return getShippingMethodDetail;
    }
  }, [data]);

  const [editShippingAlopeyk] = useMutation(EDIT_SHIPPING);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pay_at_dest: editShippingData?.pay_at_dest,
      cost: +editShippingData?.cost > 0 ? editShippingData?.cost : '',
      my_province_is_active: editShippingData?.my_province_is_active
    },
    onSubmit: data => {
      const { pay_at_dest, cost, my_province_is_active } = data;
      editShippingAlopeyk({
        variables: {
          id: params.id,
          content: {
            pay_at_dest: pay_at_dest,
            cost: String(+shippingCost > 0 ? cost : shippingCost),
            my_province_is_active
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
              icon: <SuccessSvg />,

              style: {
                borderRight: '3px solid #198038',
                backgroundColor: '#DEFBE6',
                color: '#000',
                direction: 'rtl'
              }
            });
          navigate('/store/shippings/');
        },
        onError: () => {
          toast('مشکلی پیش آمده دوباره تلاش کنید', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            draggable: true,
            closeButton: true,
            icon: <WarningSvg />,
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
  const errors = Object.keys(formik.touched).length > 0 ? formik.errors : {};

  return (
    <>
      <Style mx={'16px'}>
        <ToastContainer />

        {loading ? (
          <Grid container mt="200px" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid
              className="header"
              mt={'24px'}
              display={'flex'}
              justifyContent={'space-between'}
            >
              <Grid
                className="back-link"
                onClick={() => navigate(`/store/shippings/detail/${params.id}`)}
              >
                <i className="df-arrow" />
                <h1>ویرایش الوپیک</h1>
              </Grid>
            </Grid>
            <Grid className="header" display={'flex'}>
              <Typography variant="h3">اطلاعات ارسال</Typography>
            </Grid>
            <Box
              mt={'16px'}
              padding={'16px'}
              boxShadow={' 0px 4px 8px rgba(72, 52, 147, 0.08)'}
              borderRadius={'10px'}
              bgcolor={'#fff'}
            >
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                mb={'24px'}
              >
                <Typography
                  fontSize={'18px'}
                  variant="h3"
                  lineHeight={'28px'}
                  color={'#6A6F80'}
                  fontWeight={'500'}
                >
                  درون شهری
                </Typography>
                <IOSSwitch
                  name="my_province_is_active"
                  checked={formik.values.my_province_is_active}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid>
                <label className="titleFeild">نوع هزینه ارسال</label>
                <Select
                  sx={{ marginTop: '8px' }}
                  renderValue={val =>
                    SHIPPING_COSTS.find(i => i.value == val).label
                  }
                  value={shippingCost}
                  name="shippingCost"
                  onChange={({ target: { value } }) => {
                    setShippingCost(value);
                    setTimeout(() => {
                      value !== '1' && formik.setFieldValue('cost', '');
                      formik.setFieldError('cost', null);
                    });
                  }}
                  variant="outlined"
                  fullWidth
                >
                  {SHIPPING_COSTS.map(i => (
                    <MenuItem key={i.label} value={i.value}>
                      <Radio checked={shippingCost == i.value} />
                      {i.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid mt={2}>
                <label className="titleFeild">مبلغ</label>
                <TextField
                  name="cost"
                  disabled={+shippingCost < 1}
                  value={+formik.values.cost > 0 ? formik.values.cost : ''}
                  placeholder={
                    shippingCost == '0'
                      ? '0 تومان'
                      : shippingCost == '-1'
                      ? 'محاسبه بر اساس پست'
                      : 'مبلغ را وارد کنید.'
                  }
                  onChange={formik.handleChange}
                  error={Boolean(errors?.cost)}
                  helperText={errors?.cost}
                  fullWidth
                  sx={{ marginTop: '8px' }}
                />
              </Grid>
            </Box>
            <Grid className="header" display={'flex'}>
              <Typography variant="h3">تعیین نوع پرداخت</Typography>
            </Grid>

            <Box
              mt={'16px'}
              padding={'16px'}
              boxShadow={' 0px 4px 8px rgba(72, 52, 147, 0.08)'}
              borderRadius={'10px'}
              bgcolor={'#fff'}
            >
              {PAYMENT_TIME.map(i => (
                <Grid
                  key={i.title}
                  border="0.5px solid #9185BE"
                  borderRadius="10px"
                  p={2}
                  pt={1}
                  mb={2}
                >
                  <Grid container flexDirection="row" alignItems="center">
                    <Grid>
                      <Radio
                        checked={formik.values.pay_at_dest === i.value}
                        onChange={() =>
                          formik.setFieldValue('pay_at_dest', i.value)
                        }
                        style={{ color: '#00D96F' }}
                      />
                    </Grid>
                    <h5 className="titlePayment">{i.title}</h5>
                  </Grid>
                  <Grid
                    container
                    borderTop="0.5px solid #DAD6E9"
                    flexDirection="column"
                  >
                    <p className="decPayment">{i.desc}</p>
                    <span className="detailPayment">{i.detail}</span>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </>
        )}
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
            disabled={loading}
            fullWidth
            color="primary"
            variant="contained"
          >
            تایید{' '}
          </Button>
        </Grid>
      </Style>
    </>
  );
};

export default EditAlopeyk;

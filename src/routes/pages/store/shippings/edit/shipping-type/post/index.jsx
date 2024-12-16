import React from 'react';
import { Style } from './style.js';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  MenuItem,
  Radio,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import { GET_SHIPPING_METHOD_DETAIL } from '../../../../../../../constant/queries/shipping';

import { useFormik } from 'formik';
import CenteredLoading from '../../../../../../../components/shared/UI/CenteredLoading';
import { toast, ToastContainer } from 'react-toastify';
import CustomizedStepper from '../../../../../../../components/shared/stepper';
import {
  postSteps,
  SHIPPING_COSTS
} from '../../../create/shipping-type/post/constant';
import * as yup from 'yup';
import { ReactComponent as InfoSvg } from '../../../../svg/infoSvg.svg';
import { ReactComponent as WarningSvg } from '../../../../svg/warningSvg.svg';

const Post = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [editPost, { loading: editPostLoading }] = useMutation(EDIT_SHIPPING);
  const {
    data,
    refetch,
    loading: shippingDetailLoading
  } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } }
  });

  const shippingDetail = data?.shipping?.getShippingMethodDetail;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cost: +shippingDetail?.cost > 0 ? shippingDetail?.cost : '',
      other_provinces_cost:
        +shippingDetail?.other_provinces_cost > 0
          ? shippingDetail?.other_provinces_cost
          : '',
      other_provinces_is_active: shippingDetail?.other_provinces_is_active,
      my_province_is_active: shippingDetail?.my_province_is_active,
      other_provinces_cost_method:
        SHIPPING_COSTS.find(
          el => el.value == shippingDetail?.other_provinces_cost
        )?.value ?? '1',
      cost_method:
        SHIPPING_COSTS.find(el => el.value == shippingDetail?.cost)?.value ??
        '1'
    },
    validationSchema: yup.object().shape({
      cost: yup.mixed().when(['my_province_is_active', 'cost_method'], {
        is: (my_province_is_active, cost_method) =>
          my_province_is_active && parseInt(cost_method) === 1,
        then: yup
          .number()
          .typeError('زمان را به درستی وارد کنید')
          .min(1, 'هزینه ارسال نمیتواند کمتر از 1 باشد')
          .required('هزینه ارسال را وارد کنید')
      }),
      other_provinces_cost: yup
        .mixed()
        .when(['other_provinces_is_active', 'other_provinces_cost_method'], {
          is: (other_provinces_is_active, other_provinces_cost_method) =>
            other_provinces_is_active &&
            parseInt(other_provinces_cost_method) === 1,
          then: yup
            .number()
            .typeError('زمان را به درستی وارد کنید')
            .min(1, 'هزینه ارسال نمیتواند کمتر از 1 باشد')
            .required('هزینه ارسال را وارد کنید')
        })
    }),

    onSubmit: data => {
      const {
        cost,
        other_provinces_cost,
        other_provinces_is_active,
        my_province_is_active,
        cost_method,
        other_provinces_cost_method,
        is_sms_service_active
      } = data;
      editPost({
        variables: {
          id: params.id,
          content: {
            cost: +cost_method > 0 ? cost.toString() : '0',
            other_provinces_cost:
              +other_provinces_cost_method > 0
                ? other_provinces_cost.toString()
                : '0',
            other_provinces_is_active: other_provinces_is_active,
            my_province_is_active: my_province_is_active,
            is_sms_service_active: is_sms_service_active || false
          }
        },
        onCompleted: () => {
          refetch(),
            navigate('/store/shippings/create/post', {
              state: {
                step: 4
              }
            });
        },
        onError: () => {
          toast('مشکلی پیش آمده دوباره تلاش کنید', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: true,
            draggable: true,
            closeButton: false,
            icon: <WarningSvg />,
            style: {
              backgroundColor: '#FCF4D6',
              color: '#000',
              direction: 'rtl',
              width: '100%'
            }
          });
        }
      });
    }
  });

  const errors = Object.keys(formik.touched).length > 0 ? formik.errors : {};
  if (shippingDetailLoading) return <CenteredLoading />;

  return (
    <Style mx={'16px'}>
      <ToastContainer />
      <>
        <Grid
          className="header"
          mt={'24px'}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Grid className="back-link" onClick={() => navigate(-1)}>
            <i className="df-arrow" />
            <h1>تنظیمات پست فروشگاه </h1>
          </Grid>
        </Grid>
        <Box my={3}>
          <CustomizedStepper steps={postSteps} activeStep={3} />
        </Box>
        <Typography>
          مشخصات روش ارسال را برای استان خود و سایر استان ها وارد کنید.
        </Typography>
        <>
          <Grid>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <h4>درون استانی</h4>
              <IOSSwitch
                name="my_province_is_active"
                checked={formik.values?.my_province_is_active}
                onChange={e =>
                  formik.setFieldValue(
                    'my_province_is_active',
                    e.target.checked
                  )
                }
              />
            </Stack>
          </Grid>
          <Grid>
            <label>نوع هزینه ارسال</label>
            <Select
              sx={{ marginTop: '8px' }}
              renderValue={val =>
                SHIPPING_COSTS.find(i => i.value === val)?.label
              }
              value={formik.values?.cost_method}
              name="cost_method"
              onChange={({ target: { value } }) => {
                formik.setFieldValue('cost_method', value);
                value !== '1' && formik.setFieldValue('cost', '');
                formik.setFieldError('cost', null);
              }}
              variant="outlined"
              fullWidth
            >
              {SHIPPING_COSTS.map(i => (
                <MenuItem key={i.label} value={i.value}>
                  <Radio checked={formik.values?.cost_method === i.value} />
                  {i.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid mt={2}>
            <label>مبلغ</label>

            <TextField
              name="cost"
              disabled={+formik.values?.cost_method < 1}
              value={formik.values?.cost}
              placeholder={
                formik.values?.cost_method === '0'
                  ? '0 تومان'
                  : 'مبلغ را وارد کنید.'
              }
              onChange={formik.handleChange}
              error={Boolean(errors?.cost)}
              helperText={errors?.cost}
              fullWidth
              sx={{ marginTop: '8px' }}
            />
          </Grid>
          <Alert
            severity="info"
            icon={false}
            sx={{
              borderLeft: '4px solid #0F62FE',
              marginTop: '1rem'
            }}
          >
            <Stack direction="row" alignItems="center">
              <Box width={40} mr={1}>
                <InfoSvg />
              </Box>
              <Typography fontWeight={500} fontSize={14}>
                زمان ارسال برای درون استانی ، 2 تا 3 روز کاری است.
              </Typography>
            </Stack>
          </Alert>
          <Divider sx={{ width: '100%', my: '24px' }} />
          <Grid>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <h4>برون استانی </h4>
              <IOSSwitch
                name="other_provinces_is_active"
                checked={formik.values?.other_provinces_is_active}
                onChange={e =>
                  formik.setFieldValue(
                    'other_provinces_is_active',
                    e.target.checked
                  )
                }
              />
            </Stack>
          </Grid>
          <Grid>
            <label className="titleFeild">نوع هزینه ارسال</label>
            <Select
              sx={{ marginTop: '8px' }}
              renderValue={val =>
                SHIPPING_COSTS.find(i => i.value === val)?.label
              }
              value={formik.values?.other_provinces_cost_method}
              name="other_provinces_cost_method"
              onChange={({ target: { value } }) => {
                formik.setFieldValue('other_provinces_cost_method', value);
                value !== '1' &&
                  formik.setFieldValue('other_provinces_cost', '');
                formik.setFieldError('other_provinces_cost', null);
              }}
              variant="outlined"
              fullWidth
            >
              {SHIPPING_COSTS.map(i => (
                <MenuItem key={i.label} value={i.value}>
                  <Radio
                    checked={
                      formik.values?.other_provinces_cost_method === i.value
                    }
                  />
                  {i.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid mt={2}>
            <label className="titleFeild">مبلغ</label>
            <TextField
              name="other_provinces_cost"
              disabled={+formik.values?.other_provinces_cost_method < 1}
              value={formik.values?.other_provinces_cost}
              placeholder={
                formik.values?.other_provinces_cost_method === '0'
                  ? '0 تومان'
                  : 'مبلغ را وارد کنید.'
              }
              onChange={formik.handleChange}
              error={Boolean(errors?.other_provinces_cost)}
              helperText={errors?.other_provinces_cost}
              fullWidth
              sx={{ marginTop: '8px' }}
            />
          </Grid>
          <Alert
            severity="info"
            icon={false}
            sx={{
              borderLeft: '4px solid #0F62FE',
              marginTop: '1rem'
            }}
          >
            <Stack direction="row" alignItems="center">
              <Box width={40} mr={1}>
                <InfoSvg />
              </Box>
              <Typography fontWeight={500} fontSize={14}>
                زمان ارسال برای برون استانی ، 4 تا 5 روز کاری است.
              </Typography>
            </Stack>
          </Alert>
        </>
        <Stack
          direction="row-reverse"
          justifyContent="start"
          alignItems="center"
          my={2}
        >
          <Typography variant="body2">
            آیا مایل‌ به ارسال پیامک از‌سمت پست به مشتریان خود هستید؟
          </Typography>
          <Checkbox
            onChange={e => {
              formik.setFieldValue('is_sms_service_active', e.target.checked);
            }}
            value={formik.values?.is_sms_service_active}
            checked={formik.values?.is_sms_service_active}
            sx={{ p: 0, mr: 1 }}
          />
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
            disabled={editPostLoading}
            fullWidth
            color="primary"
            variant="contained"
          >
            تایید
          </Button>
        </Grid>
      </>
    </Style>
  );
};

export default Post;

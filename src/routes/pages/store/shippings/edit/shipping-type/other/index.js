import React from 'react';
import { Style } from '../../../style';
import {
  Button,
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
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import { GET_SHIPPING_METHOD_DETAIL } from '../../../../../../../constant/queries/shipping';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as SuccessSvg } from '../../../../svg/successSvg.svg';
import { ReactComponent as WarningSvg } from '../../../../svg/warningSvg.svg';
import { EDIT_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import { SHIPPING_COSTS } from '../../../create/shipping-type/other/constants';

const Other = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data, refetch } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } }
  });
  const shippingDetail = data?.shipping?.getShippingMethodDetail;

  const [editOther, { loading: editOtherLoading }] = useMutation(EDIT_SHIPPING);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: shippingDetail?.name,
      time_sending: shippingDetail?.time_sending,
      other_provinces_time_sending:
        shippingDetail?.other_provinces_time_sending,
      pay_at_dest: shippingDetail?.pay_at_dest,
      cost: +shippingDetail?.cost > 0 ? shippingDetail?.cost : '',
      other_provinces_cost: +shippingDetail?.other_provinces_cost,
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
    onSubmit: data => {
      const {
        title,
        pay_at_dest,
        cost,
        other_provinces_cost,
        other_provinces_is_active,
        my_province_is_active,
        time_sending,
        other_provinces_time_sending,
        cost_method,
        other_provinces_cost_method
      } = data;
      editOther({
        variables: {
          id: params.id,
          content: {
            name: title,
            time_sending: +time_sending,
            other_provinces_time_sending: +other_provinces_time_sending,
            pay_at_dest: pay_at_dest,
            cost: +cost_method > 0 ? cost.toString() : '0',
            other_provinces_cost:
              +other_provinces_cost_method > 0
                ? other_provinces_cost.toString()
                : '0',
            other_provinces_is_active: other_provinces_is_active,
            my_province_is_active: my_province_is_active
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
          navigate(-1);
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
      <Style mx="16px" style={{ height: 'calc(100% + 470px)' }}>
        <ToastContainer />
        <Grid className="header" my="24px">
          <Grid className="back-link" onClick={() => navigate(-1)}>
            <i className="df-arrow" />
            <Typography fontSize="20px" fontWeight={500}>
              ویرایش {shippingDetail?.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid className="header" display="flex">
          <Typography
            borderLeft="2px solid #DAD6E9"
            paddingLeft="12px"
            variant="body1"
            color="#6A6F80"
            fontSize="18px"
            fontWeight={500}
          >
            اطلاعات ارسال
          </Typography>
        </Grid>

        <Grid
          width="1"
          bgcolor="#fff"
          boxShadow="0px 4px 8px rgba(72, 52, 147, 0.08)"
          borderRadius="10px"
          p="16px"
          mt={2}
        >
          <Grid>
            <label>عنوان</label>
            <TextField
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider sx={{ width: '100%', my: '24px' }} />

          <Grid className="shipping-area">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <h4>درون استانی</h4>
              <IOSSwitch
                name="my_province_is_active"
                checked={formik.values.my_province_is_active}
                onChange={e =>
                  formik.setFieldValue(
                    'my_province_is_active',
                    e.target.checked
                  )
                }
              />
            </Stack>
          </Grid>
          <Grid className="form-control" my={2}>
            <label>زمان ارسال</label>
            <TextField
              name="time_sending"
              value={formik.values.time_sending}
              placeholder="زمان ارسال را وارد کنید."
              onChange={formik.handleChange}
              error={
                formik.touched.time_sending &&
                Boolean(formik?.errors?.time_sending)
              }
              helperText={
                formik.touched.time_sending && formik?.errors?.time_sending
              }
              fullWidth
            />
          </Grid>
          <Grid>
            <label>نوع هزینه ارسال</label>
            <Select
              sx={{ marginTop: '8px' }}
              renderValue={val =>
                SHIPPING_COSTS.find(i => i.value === val)?.label
              }
              value={formik.values.cost_method}
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
                  <Radio checked={formik.values.cost_method === i.value} />
                  {i.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid mt={2}>
            <label>مبلغ</label>
            <TextField
              name="cost"
              disabled={+formik.values.cost_method < 1}
              value={formik.values.cost}
              placeholder={
                formik.values.cost_method === '0'
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
          <Divider sx={{ width: '100%', my: '24px' }} />
          <Grid className="shipping-area">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <h4>برون استانی </h4>
              <IOSSwitch
                name="other_provinces_is_active"
                checked={formik.values.other_provinces_is_active}
                onChange={e =>
                  formik.setFieldValue(
                    'other_provinces_is_active',
                    e.target.checked
                  )
                }
              />
            </Stack>
          </Grid>
          <Grid className="form-control" my={2}>
            <label>زمان ارسال</label>
            <TextField
              name="other_provinces_time_sending"
              value={formik.values.other_provinces_time_sending}
              placeholder="زمان ارسال را وارد کنید."
              onChange={formik.handleChange}
              error={
                formik.touched.other_provinces_time_sending &&
                Boolean(formik?.errors?.other_provinces_time_sending)
              }
              helperText={
                formik.touched.other_provinces_time_sending &&
                formik?.errors?.other_provinces_time_sending
              }
              fullWidth
            />
          </Grid>
          <Grid>
            <label className="titleFeild">نوع هزینه ارسال</label>
            <Select
              sx={{ marginTop: '8px' }}
              renderValue={val =>
                SHIPPING_COSTS.find(i => i.value === val)?.label
              }
              value={formik.values.other_provinces_cost_method}
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
                      formik.values.other_provinces_cost_method === i.value
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
              disabled={+formik.values.other_provinces_cost_method < 1}
              value={formik.values.other_provinces_cost}
              placeholder={
                formik.values.other_provinces_cost_method === '0'
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
        </Grid>

        <Grid
          position="fixed"
          bgcolor="#F5F6FA"
          boxShadow="0px 0px 20px rgba(72, 52, 147, 0.12)"
          bottom={0}
          left={0}
          right={0}
          p={2}
          zIndex={999}
        >
          <Button
            onClick={formik.handleSubmit}
            disabled={editOtherLoading}
            fullWidth
            color="primary"
            variant="contained"
          >
            تایید
          </Button>
        </Grid>
      </Style>
    </>
  );
};

export default Other;

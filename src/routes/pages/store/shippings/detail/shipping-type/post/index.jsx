import React, { Fragment, useMemo, useState } from 'react';
import { InfoDrawer, Style } from './style.js';
import {
  Box,
  Button,
  Checkbox,
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
import {
  SHIPPING_AREA,
  SHIPPING_COSTS,
  toastSuccess
} from '../../../create/shipping-type/post/constant';
import { ReactComponent as ErrorSvg } from '../../../../svg/error.svg';

const Post = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [shippingCost, setShippingCost] = useState({
    my_province: '-1',
    other_provinces: '-1'
  });
  // const [searchParam, useSearchParam] = useSearchParams();
  const { data, refetch, loading } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } },
    onCompleted: data => {
      const {
        shipping: {
          getShippingMethodDetail: { cost, other_provinces_cost }
        }
      } = data;
      setShippingCost({
        my_province: +cost > 0 ? '1' : cost,
        other_provinces: +other_provinces_cost > 0 ? '1' : other_provinces_cost
      });
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

  const [editPost, { loading: editPostLoading }] = useMutation(EDIT_SHIPPING);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      cost: +editShippingData?.cost > 0 ? editShippingData?.cost : '',
      other_provinces_cost:
        +editShippingData?.other_provinces_cost > 0
          ? editShippingData?.other_provinces_cost
          : '',
      my_province_is_active: editShippingData?.my_province_is_active || false,
      other_provinces_is_active:
        editShippingData?.other_provinces_is_active || false
    },
    onSubmit: data => {
      const {
        other_provinces_cost,
        cost,
        my_province_is_active,
        other_provinces_is_active
      } = data;
      editPost({
        variables: {
          id: params.id,
          content: {
            other_provinces_cost: String(
              +shippingCost.other_provinces > 0
                ? other_provinces_cost
                : shippingCost.other_provinces
            ),
            cost: String(
              +shippingCost.my_province > 0 ? cost : shippingCost.my_province
            ),
            my_province_is_active,
            other_provinces_is_active
          }
        },
        onCompleted: () => {
          refetch();
          toast('ویرایش اطلاعات با موفقیت ثبت شد.', toastSuccess);
          setTimeout(() => {
            navigate(`/store/shippings/detail/${params.id}`);
          }, 1500);
        }
      });
    }
  });

  const errors = Object.keys(formik.touched).length > 0 ? formik.errors : {};

  let isEdit = false;
  let [openChangeInfoDrawer, setOpenChangeInfoDrawer] = useState(false);
  return (
    <Style mx={'16px'}>
      <ToastContainer />
      {loading ? (
        <CenteredLoading />
      ) : (
        <>
          <Grid
            className="header"
            mt={'24px'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Grid className="back-link" onClick={() => navigate(-1)}>
              <i className="df-arrow" />
              <Typography variant="h6">تنظیمات پست فروشگاه </Typography>
            </Grid>
          </Grid>
          <Typography
            my={3}
            sx={{ borderLeft: '2px solid #DAD6E9', paddingLeft: '12px' }}
          >
            مشخصات روش ارسال را برای استان خود و سایر استان ها وارد کنید.
          </Typography>
          <Grid
            padding={'16px'}
            boxShadow={' 0px 4px 8px rgba(72, 52, 147, 0.08)'}
            borderRadius={'10px'}
            mt="16px"
            component="form"
            className="form"
            bgcolor={'#fff'}
          >
            {SHIPPING_AREA.map((area, i) => (
              <Fragment key={area.name}>
                <Grid
                  className="shipping-area"
                  borderTop={i && '1px solid #DAD6E9'}
                  pt={i && 3}
                >
                  <h4>{area.label}</h4>
                  <IOSSwitch
                    name={area.activeName}
                    checked={formik.values[area.activeName]}
                    onChange={formik.handleChange}
                  />
                </Grid>

                <Grid className="form-control">
                  <label>نوع هزینه ارسال</label>
                  <Select
                    renderValue={val =>
                      SHIPPING_COSTS.find(option => option.value == val)?.label
                    }
                    value={shippingCost[area.name]}
                    onChange={({ target: { value } }) => {
                      setShippingCost(prev => ({
                        ...prev,
                        [area.name]: value
                      }));
                      // setTimeout(() => {
                      //   value !== '1' &&
                      //     formik.setFieldValue(area.costName, '');
                      //   formik.setFieldError(area.costName, null);
                      // });
                    }}
                    variant="outlined"
                    fullWidth
                  >
                    {SHIPPING_COSTS.map(option => (
                      <MenuItem key={option.label} value={option.value}>
                        <Radio
                          checked={shippingCost[area.name] == option.value}
                        />
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid className="form-control">
                  <label>مبلغ</label>
                  <TextField
                    name={area.costName}
                    disabled={+shippingCost[area.name] < 1}
                    value={formik.values[area.costName]}
                    placeholder={
                      shippingCost[area.name] == '0'
                        ? '0 تومان'
                        : shippingCost[area.name] == '-1'
                        ? 'محاسبه بر اساس پست'
                        : 'مبلغ را وارد کنید.'
                    }
                    onChange={formik.handleChange}
                    error={Boolean(errors?.[area.costName])}
                    helperText={errors?.[area.costName]}
                    fullWidth
                  />
                </Grid>
              </Fragment>
            ))}
            <Stack
              direction="row-reverse"
              justifyContent="center"
              alignItems="start"
            >
              <Typography variant="body2">
                میخواهم شرکت پست، پیامک پیگیری مرسوله را برای مشتریانم ارسال
                کند.
              </Typography>
              <Checkbox
                disabled={isEdit}
                onChange={e => {
                  formik.setFieldValue(
                    'is_sms_service_active',
                    e.target.checked
                  );
                }}
                value={formik?.values?.is_sms_service_active}
                checked={formik?.values?.is_sms_service_active}
                sx={{ p: 0, mr: 1 }}
              />
            </Stack>
          </Grid>
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
              disabled={
                editPostLoading
                // || !Object.keys(formik.touched).length
              }
              fullWidth
              color="primary"
              variant="contained"
            >
              <Typography fontWeight={500} fontSize={14}>
                تایید
              </Typography>
            </Button>
            <Button
              mt={1}
              // onClick={}
              fullWidth
              variant="text"
            >
              <Typography
                onClick={() => setOpenChangeInfoDrawer(true)}
                color="#483493"
                fontWeight={500}
                fontSize={14}
              >
                ویرایش اطلاعات
              </Typography>
            </Button>
          </Grid>
        </>
      )}

      <InfoDrawer
        anchor="bottom"
        open={openChangeInfoDrawer}
        onClose={() => setOpenChangeInfoDrawer(false)}
      >
        <Stack direction="column" alignItems="center" px={2}>
          <Box my={5}>
            <ErrorSvg />
          </Box>
          <Typography fontWeight={500} mb={2}>
            تغییر اطلاعات حساب پست
          </Typography>
          <Typography variant="body2" mb={5}>
            تغییر اطلاعات نیازمند بررسی مجدد و تایید از سمت اداره پست می‌باشد، و
            در این مدت امکان تغییر تنظیمات روش پستی فروشگاه غیرفعال خواهد بود.
            آیا از اعمال این تغییرات اطمینان دارید؟
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate('/store/shippings/create/post')}
          >
            تغییر اطلاعات حساب
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOpenChangeInfoDrawer(false)}
          >
            انصراف و بازگشت
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="center" mt={4} mb={3}>
          <Typography fontSize={14} color="#C6C6C6">
            پشتیبانی پست:{' '}
          </Typography>
          <Typography fontSize={14} color="#C6C6C6">
            {' '}
            44556677{' '}
          </Typography>
        </Stack>
      </InfoDrawer>
    </Style>
  );
};

export default Post;

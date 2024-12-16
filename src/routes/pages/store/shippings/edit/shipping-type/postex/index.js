import React, { Fragment, useMemo, useState } from 'react';
import { Style } from '../../../detail/shipping-type/postex/style';
import {
  Button,
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
  SHIPPING_AREA,
  SHIPPING_COSTS,
  toastSuccess
} from '../../../create/shipping-type/postex/constants';

import { useFormik } from 'formik';
import CenteredLoading from '../../../../../../../components/shared/UI/CenteredLoading';
import { toast, ToastContainer } from 'react-toastify';

const Postex = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [shippingCost, setShippingCost] = useState({
    my_province: '-1',
    other_provinces: '-1'
  });

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

  const [editPostex, { loading: editPostexLoading }] =
    useMutation(EDIT_SHIPPING);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cost: +editShippingData?.cost > 0 ? editShippingData?.cost : '',
      other_provinces_cost:
        +editShippingData?.other_provinces_cost > 0
          ? editShippingData?.other_provinces_cost
          : '',
      my_province_is_active: editShippingData?.my_province_is_active,
      other_provinces_is_active: editShippingData?.other_provinces_is_active
    },
    onSubmit: data => {
      const {
        other_provinces_cost,
        cost,
        my_province_is_active,
        other_provinces_is_active
      } = data;
      editPostex({
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
            <Grid
              className="back-link"
              onClick={() => navigate(`/store/shippings/detail/${params.id}`)}
            >
              <i className="df-arrow" />
              <h1>ویرایش پستکس</h1>
            </Grid>
          </Grid>
          <Grid className="header" display={'flex'}>
            <Typography variant="h3">اطلاعات ارسال</Typography>
          </Grid>
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
                      setTimeout(() => {
                        value !== '1' &&
                          formik.setFieldValue(area.costName, '');
                        formik.setFieldError(area.costName, null);
                      });
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
              disabled={editPostexLoading}
              fullWidth
              color="primary"
              variant="contained"
            >
              ثبت
            </Button>
          </Grid>
        </>
      )}
    </Style>
  );
};

export default Postex;

import { useMutation, useQuery } from '@apollo/client';
import {
  Autocomplete,
  Box,
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
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHIPPING_COSTS, STEP_CONTENT, validateSchema } from './constants';
import { Style } from './style';
import { ToastContainer } from 'react-toastify';
import ShippingModal from '../../modal';
import { CREATE_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import { KeyboardArrowDown } from '@mui/icons-material';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import provinceDataSet from '../../../../settings/user_info/edit/provinceDataSet';
import { GET_SHIPPING_METHODS } from '../../../../../../../constant/queries/shipping';

const Other = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [createOther, { loading: createOtherLoading }] = useMutation(
    CREATE_SHIPPING,
    {
      onCompleted: () => {
        setModalType('success');
        setShowModal(true);
      },
      onError: () => {
        setModalType('failed');
        setShowModal(true);
      }
    }
  );

  const { data } = useQuery(GET_SHIPPING_METHODS, {
    variables: {
      param: {
        limit: 60
      }
    }
  });

  const shippingContent = useMemo(() => {
    if (data) {
      const {
        shipping: { getShippingMethods }
      } = data;
      return getShippingMethods;
    }
  }, [data]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validateSchema,
    initialValues: {
      name: '',
      pay_at_dest: false,
      cost: '',
      other_provinces_cost: '',
      my_province_is_active: false,
      other_provinces_is_active: false,
      time_sending: '',
      other_provinces_time_sending: '',
      cost_method: '1',
      other_provinces_cost_method: '1',
      province: { name: '' }
    },
    onSubmit: data => {
      const {
        province,
        my_province_is_active,
        cost_method,
        cost,
        time_sending,
        other_provinces_is_active,
        other_provinces_cost_method,
        other_provinces_cost,
        other_provinces_time_sending
      } = data;

      let body = {
        name: formik.values.name,
        shipping_type: 1,
        other_provinces_is_active,
        my_province_is_active,
        address: {
          province: province.name
        }
      };
      if (my_province_is_active) {
        body.cost = cost_method == 1 ? cost : '0';
        body.time_sending = +time_sending;
      }
      if (other_provinces_is_active) {
        body.other_provinces_cost =
          other_provinces_cost_method == 1 ? other_provinces_cost : '0';
        body.other_provinces_time_sending = +other_provinces_time_sending;
      }

      createOther({
        variables: {
          content: body
        }
      });
    }
  });
  const methodExist = shippingContent?.results?.filter(
    item => item.name === formik.values.name
  ).length;
  const nameExist = shippingContent?.results?.filter(
    item => item.name === data.name
  ).length;

  return (
    <Style data-cy="form" container>
      {showModal && (
        <ShippingModal
          open={showModal}
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}
      <ToastContainer />
      <Grid
        data-cy={STEP_CONTENT[0].data_cy}
        className="header"
        onClick={() => navigate(-1)}
        pl="2px"
        mb="15px"
      >
        <i className="df-arrow" />
        <h1>{STEP_CONTENT[0].title}</h1>
      </Grid>

      <Grid width="1" height="calc(100vh - 160px)" overflow={'auto'}>
        <Grid className="desc" height="auto">
          <p>{STEP_CONTENT[0].desc}</p>
        </Grid>
        <Grid
          width="1"
          bgcolor="#fff"
          boxShadow="0px 4px 8px rgba(72, 52, 147, 0.08)"
          borderRadius="10px"
          p="16px"
          mt={2}
        >
          <form className="form">
            <Grid mt={2} container>
              <Typography fontSize="16px" color="#6A6F80">
                عنوان
              </Typography>
            </Grid>
            <Grid mt={1} container>
              <TextField
                name="name"
                value={formik.values.name}
                placeholder="عنوان روش ارسال را وارد کنید."
                onChange={formik.handleChange}
                error={
                  nameExist ||
                  (formik.touched.name && Boolean(formik?.errors?.name))
                }
                helperText={formik.touched.name && formik?.errors?.name}
                fullWidth
              />
              {Boolean(methodExist) && (
                <Typography
                  data-cy="methodNameError"
                  fontSize="0.75rem"
                  color="#ff3262"
                  m={1}
                >
                  روش ارسال با این نام قبلا ساخته شده است
                </Typography>
              )}
            </Grid>

            <Grid mt={2} container>
              <Typography fontSize="16px" color="#6A6F80">
                استان
              </Typography>
            </Grid>
            <Grid mt={1} container>
              <Autocomplete
                name="province"
                fullWidth
                sx={{ width: '100%' }}
                options={provinceDataSet?.provinces || []}
                value={formik.values.province}
                noOptionsText="یافت نشد"
                dir="rtl"
                popupIcon={<KeyboardArrowDown />}
                onChange={(e, value) => {
                  if (value?.name) {
                    formik.setFieldValue('city', {
                      name: ''
                    });
                    formik.setFieldValue('province', {
                      name: value.name
                    });
                  } else {
                    formik.setFieldValue('city', {
                      name: ''
                    });
                    formik.setFieldValue('province', {
                      name: ''
                    });
                  }
                }}
                getOptionLabel={option => option?.name}
                renderOption={(props, option) => (
                  <Grid container {...props} id="provinceOption">
                    <Radio
                      checked={formik?.values.province.name === option.name}
                      color="primary"
                    />
                    <p className="option">{option.name}</p>
                  </Grid>
                )}
                renderInput={params => (
                  <TextField
                    error={
                      formik.touched.province && Boolean(formik.errors.province)
                    }
                    helperText={
                      formik?.touched?.province &&
                      formik?.errors?.province?.name
                    }
                    style={{ width: '100%' }}
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                    {...params}
                    placeholder="استان خود را انتخاب کنید."
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                      dataCy: 'provinceStoreSelected',
                      form: {
                        autocomplete: 'off'
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Divider sx={{ width: '100%', my: '24px' }} />

            <Grid className="shipping-area">
              <Stack direction="row" justifyContent="space-between">
                <h4>درون استانی</h4>
                <IOSSwitch
                  name="my_province_is_active"
                  onChange={formik.handleChange}
                  checked={formik.values.my_province_is_active}
                  data-cy="inner_switch"
                />
              </Stack>
            </Grid>
            <Grid className="form-control" mt={2}>
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
            <Grid className="form-control">
              <label>نوع هزینه ارسال</label>
              <Box id="cost_method">
                <Select
                  renderValue={val =>
                    SHIPPING_COSTS.find(option => option.value === val).label
                  }
                  name="cost_method"
                  data-cy="cost_method"
                  value={formik.values.cost_method}
                  onChange={({ target: { value } }) => {
                    formik.setFieldValue('cost_method', value);
                    value !== '1' && formik.setFieldValue('cost', '');
                    formik.setFieldError('cost', null);
                  }}
                  variant="outlined"
                  fullWidth
                >
                  {SHIPPING_COSTS.map(option => (
                    <MenuItem
                      key={option.label}
                      value={option.value}
                      id="cost_method_option"
                    >
                      <Radio
                        checked={formik.values.cost_method === option.value}
                      />
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
            <Grid className="form-control">
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
                error={
                  formik.values.cost_method !== '0' &&
                  formik.touched.cost &&
                  Boolean(formik?.errors?.cost)
                }
                helperText={
                  formik.values.cost_method !== '0' &&
                  formik.touched.cost &&
                  formik?.errors?.cost
                }
                fullWidth
              />
            </Grid>

            <Divider sx={{ width: '100%', my: '24px' }} />
            <Box>
              <Grid className="shipping-area">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <h4>برون استانی</h4>
                  <IOSSwitch
                    name="other_provinces_is_active"
                    onChange={formik.handleChange}
                    checked={formik.values.other_provinces_is_active}
                    data-cy="out_switch"
                  />
                </Stack>
              </Grid>
              <Grid className="form-control" mt={2}>
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
              <Grid className="form-control">
                <label>نوع هزینه ارسال</label>
                <Box id="other_provinces_cost_method">
                  <Select
                    renderValue={val =>
                      SHIPPING_COSTS.find(option => option.value === val).label
                    }
                    name="other_provinces_cost_method"
                    value={formik.values.other_provinces_cost_method}
                    onChange={({ target: { value } }) => {
                      formik.setFieldValue(
                        'other_provinces_cost_method',
                        value
                      );
                      value !== '1' &&
                        formik.setFieldValue('other_provinces_cost', '');
                      formik.setFieldError('other_provinces_cost', null);
                    }}
                    variant="outlined"
                    fullWidth
                  >
                    {SHIPPING_COSTS.map(option => (
                      <MenuItem
                        key={option.label}
                        value={option.value}
                        id="other_provinces_cost_method_option"
                      >
                        <Radio
                          checked={
                            formik.values.other_provinces_cost_method ===
                            option.value
                          }
                        />
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid className="form-control">
                <label>مبلغ</label>
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
                  error={
                    formik.values.other_provinces_cost_method !== '0' &&
                    formik.touched.other_provinces_cost &&
                    Boolean(formik?.errors?.other_provinces_cost)
                  }
                  helperText={
                    formik.values.other_provinces_cost_method !== '0' &&
                    formik.touched.other_provinces_cost &&
                    formik?.errors?.other_provinces_cost
                  }
                  fullWidth
                />
              </Grid>
            </Box>
          </form>
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
        zIndex={3}
      >
        <Button
          onClick={formik.handleSubmit}
          disabled={createOtherLoading}
          fullWidth
          color="primary"
          data-cy="submit-button"
          variant="contained"
        >
          تایید
        </Button>
      </Grid>
    </Style>
  );
};

export default Other;

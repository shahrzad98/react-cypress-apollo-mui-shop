import React, { useMemo, useState } from 'react';
import { Style } from '../../../style';
import {
  Autocomplete,
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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import {
  GET_PROVINCES_CITIES,
  GET_SHIPPING_METHOD_DETAIL
} from '../../../../../../../constant/queries/shipping';
import {
  FIRST_STEP_FORM,
  SHIPPING_COSTS
} from '../../../create/shipping-type/tipax/constants';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as SuccessSvg } from '../../../../svg/successSvg.svg';
import { ReactComponent as WarningSvg } from '../../../../svg/warningSvg.svg';
import { EDIT_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import { KeyboardArrowDown } from '@mui/icons-material';
import NeshanShowingMap from '../../../../../../../components/shared/mapNeshan/showingMap';
import LocationDrawer from '../../../../settings/store_info/edit/map';
import { GET_STORE_INFO } from '../../../../../../../constant/queries/settings';
import { GET_DIGIEXPRESS_CITIES } from '../../../../../../../constant/queries/orders';

const Tipax = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: digiexpressCities } = useQuery(GET_DIGIEXPRESS_CITIES);
  const { data, refetch } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } }
  });
  const { data: tipaxCities } = useQuery(GET_PROVINCES_CITIES, {
    variables: { params: { type: 7 } }
  });
  const { data: storeInfo } = useQuery(GET_STORE_INFO);

  const tipaxCitiesData = tipaxCities?.shipping?.getProvincesCities || [];
  const [latLng, setLatLng] = useState(['35.699739', '51.338097']);

  const [shippingOuterCost, setShippingOuterCost] = useState('-1');
  const [shippingInnerCost, setShippingInnerCost] = useState('-1');

  const [editTipax, { loading: editTipaxLoading }] = useMutation(EDIT_SHIPPING);
  const shippingDetail = data?.shipping?.getShippingMethodDetail;

  const storeDetail = useMemo(() => {
    if (storeInfo) {
      const store = storeInfo?.user?.getUserRead?.my_store[0];

      const {
        store_address: { latitude, longitude }
      } = store;

      setLatLng([latitude, longitude]);

      return store;
    } else {
      return {};
    }
  }, [storeInfo]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pay_at_dest: shippingDetail?.pay_at_dest,
      cost: +shippingDetail?.cost > 0 ? shippingDetail?.cost : '',
      other_provinces_cost:
        +shippingDetail?.other_provinces_cost > 0
          ? shippingDetail?.other_provinces_cost
          : '',
      other_provinces_is_active: shippingDetail?.other_provinces_is_active,
      my_province_is_active: shippingDetail?.my_province_is_active,
      first_name: storeDetail?.first_name || '',
      last_name: storeDetail?.last_name || '',
      phone_number: storeDetail?.phone_number?.replace('+98', '0') || '',
      address: storeDetail?.store_address?.address || '',
      lat: latLng[0],
      lng: latLng[1],
      province: { name: storeDetail?.store_address?.province || '' },
      city: { name: storeDetail?.store_address?.city || '' }
    },
    onSubmit: data => {
      const {
        pay_at_dest,
        cost,
        other_provinces_cost,
        other_provinces_is_active,
        my_province_is_active,
        first_name,
        last_name,
        phone_number,
        city,
        province,
        address,
        lat,
        lng
      } = data;

      editTipax({
        variables: {
          id: params.id,
          content: {
            pay_at_dest: pay_at_dest,
            cost: String(+shippingOuterCost > 0 ? cost : shippingOuterCost),
            other_provinces_cost: String(
              +shippingOuterCost > 0 ? other_provinces_cost : shippingOuterCost
            ),
            other_provinces_is_active: other_provinces_is_active,
            my_province_is_active: my_province_is_active,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            address: {
              address,
              latitude: lat,
              longitude: lng,
              city: city.name,
              province: province.name
            }
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
  const isDigiExpressCoverage =
    digiexpressCities?.shipping?.getDigiExpressActiveCities?.active_cities.includes(
      storeDetail?.store_address?.province
    );

  return (
    <>
      <Style mx="16px">
        <ToastContainer />
        <Grid className="header" my="24px">
          <Grid className="back-link" onClick={() => navigate(-1)}>
            <i className="df-arrow" />
            <h1>تیپاکس</h1>
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
          {!isDigiExpressCoverage && (
            <>
              <Grid className="shipping-area">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <h4>درون شهری</h4>
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
              <Grid>
                <label>نوع هزینه ارسال</label>
                <Select
                  sx={{ marginTop: '8px' }}
                  renderValue={val =>
                    SHIPPING_COSTS.find(i => i.value === val).label
                  }
                  value={shippingInnerCost}
                  name="shippingCost"
                  onChange={({ target: { value } }) => {
                    setShippingInnerCost(value);
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
                      <Radio checked={shippingInnerCost === i.value} />
                      {i.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid mt={2}>
                <label>مبلغ</label>
                <TextField
                  name="cost"
                  disabled={+shippingInnerCost < 1}
                  value={+formik.values.cost > 0 ? formik.values.cost : ''}
                  placeholder={
                    shippingInnerCost === '0'
                      ? '0 تومان'
                      : shippingInnerCost === '-1'
                      ? 'محاسبه بر اساس تیپاکس'
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
            </>
          )}

          <Grid className="shipping-area">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <h4>برون شهری</h4>
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
          <Grid>
            <label className="titleFeild">نوع هزینه ارسال</label>
            <Select
              sx={{ marginTop: '8px' }}
              renderValue={val =>
                SHIPPING_COSTS.find(i => i.value === val).label
              }
              value={shippingOuterCost}
              name="shippingCost"
              onChange={({ target: { value } }) => {
                setShippingOuterCost(value);
                setTimeout(() => {
                  value !== '1' &&
                    formik.setFieldValue('other_provinces_cost', '');
                  formik.setFieldError('other_provinces_cost', null);
                });
              }}
              variant="outlined"
              fullWidth
            >
              {SHIPPING_COSTS.map(i => (
                <MenuItem key={i.label} value={i.value}>
                  <Radio checked={shippingOuterCost === i.value} />
                  {i.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid mt={2}>
            <label className="titleFeild">مبلغ</label>
            <TextField
              name="other_provinces_cost"
              disabled={+shippingOuterCost < 1}
              value={
                +formik.values.other_provinces_cost > 0
                  ? formik.values.other_provinces_cost
                  : ''
              }
              placeholder={
                shippingOuterCost === '0'
                  ? '0 تومان'
                  : shippingOuterCost === '-1'
                  ? 'محاسبه بر اساس تیپاکس'
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
        <Grid className="header" display="flex" my="24px">
          <Typography
            borderLeft="2px solid #DAD6E9"
            paddingLeft="12px"
            variant="body1"
            color="#6A6F80"
            fontSize="18px"
            fontWeight={500}
          >
            اطلاعات حساب کاربری
          </Typography>
        </Grid>

        <Grid
          width="1"
          bgcolor="#fff"
          boxShadow="0px 4px 8px rgba(72, 52, 147, 0.08)"
          borderRadius="10px"
          p="16px"
          mt={2}
          mb={'100px'}
        >
          <form className="form">
            <>
              {FIRST_STEP_FORM.map(input => (
                <Grid mb="20px" className="form-control" key={input.name}>
                  <label>{input.label}</label>
                  <TextField
                    name={input.name}
                    value={formik.values[input.name]}
                    onChange={formik.handleChange}
                    error={Boolean(errors?.[input.name])}
                    helperText={errors?.[input.name]}
                    variant="outlined"
                    fullWidth
                    multiline={input.name === 'address'}
                    rows={input.name === 'address' ? 2 : undefined}
                  />
                </Grid>
              ))}
              <Grid container>
                <Typography color="#6A6F80" fontSize="16px">
                  استان
                </Typography>
              </Grid>
              <Grid container mb={2}>
                <Autocomplete
                  fullWidth
                  sx={{ width: '100%' }}
                  data-cy="cityStoreSelected"
                  options={tipaxCitiesData?.provinces || []}
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
                    <Grid
                      container
                      // component="li"
                      // sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
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
                        formik?.touched?.province &&
                        formik?.errors?.province?.name
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
                        dataCy: 'provinceStoreSelected', // disable autocomplete and autofill
                        form: {
                          autocomplete: 'off'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid mt={2} container>
                <Typography color="#6A6F80" fontSize="16px">
                  شهر
                </Typography>
              </Grid>
              <Grid mt={1} mb={2} container>
                <Autocomplete
                  sx={{ width: '100%' }}
                  options={
                    (tipaxCitiesData['cities'] &&
                      tipaxCitiesData['cities'][
                        formik.values.province?.name
                      ]) ||
                    []
                  }
                  value={formik.values.city}
                  noOptionsText="یافت نشد"
                  data-cy="citiesStoreSelected"
                  disabled={!formik.values.province?.name}
                  dir="rtl"
                  popupIcon={<KeyboardArrowDown />}
                  onChange={(e, value) => {
                    if (value?.name) {
                      formik.setFieldValue('city', {
                        name: value.name?.trim()
                      });
                    } else {
                      formik.setFieldValue('city', {
                        name: ''
                      });
                    }
                  }}
                  getOptionLabel={option => option?.name}
                  renderOption={(props, option) => (
                    <Grid container {...props}>
                      <Radio
                        checked={formik?.values.city.name === option.name}
                        color="primary"
                      />
                      <p className="option">{option.name}</p>
                    </Grid>
                  )}
                  renderInput={params => (
                    <TextField
                      style={{ width: '100%' }}
                      autoComplete="off"
                      variant="outlined"
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                        dataCy: 'citiesStoreSelected',
                        form: {
                          autocomplete: 'off'
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid className="form-control" mb="16px">
                <label>آدرس مبدا تحویل سفارش</label>
                <TextField
                  name={'address'}
                  value={formik.values['address']}
                  onChange={formik.handleChange}
                  error={Boolean(errors?.['address'])}
                  helperText={errors?.['address']}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid
                container
                height="100px"
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
                onClick={() => {
                  setSearchParams({ editMap: true });
                }}
              >
                <NeshanShowingMap latLng={[latLng[0], latLng[1]]} />
              </Grid>
              <LocationDrawer
                setSearchParams={setSearchParams}
                selectedStore={storeDetail}
                lat={formik.values.lat}
                lng={formik.values.lng}
                setlat={val => setLatLng(prev => [String(val), prev[1]])}
                setLng={val => setLatLng(prev => [prev[0], String(val)])}
                open={Boolean(searchParams.get('editMap'))}
                close={() => navigate(-1)}
              />
            </>
          </form>
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
            disabled={editTipaxLoading}
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

export default Tipax;

import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GET_STORE_INFO } from '../../../../../../../constant/queries/settings';
import {
  FIRST_STEP_FORM,
  SHIPPING_COSTS,
  STEP_CONTENT,
  validateSchema
} from './constants';
import { Style } from './style';
import NeshanShowingMap from '../../../../../../../components/shared/mapNeshan/showingMap';
import LocationDrawer from '../../../../settings/store_info/edit/map';
import { ToastContainer } from 'react-toastify';
import ShippingModal from '../../modal';
import { CREATE_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import { KeyboardArrowDown } from '@mui/icons-material';
import { ReactComponent as InfoSVG } from '../../../../../../../static/svg/info.svg';
import {
  GET_PROVINCES_CITIES,
  GET_SHIPPING_METHODS
} from '../../../../../../../constant/queries/shipping';
import { GET_DIGIEXPRESS_CITIES } from '../../../../../../../constant/queries/orders';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';

const Tipax = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingCost, setShippingCost] = useState('-1');
  const [latLng, setLatLng] = useState(['', '']);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: tipaxCities } = useQuery(GET_PROVINCES_CITIES, {
    variables: { params: { type: 7 } }
  });
  const { data: digiexpressCities } = useQuery(GET_DIGIEXPRESS_CITIES);

  const { data: shippingMethods } = useQuery(GET_SHIPPING_METHODS, {
    variables: {
      param: {
        limit: 60
      }
    }
  });
  const { data: storeInfo, loading } = useQuery(GET_STORE_INFO);
  const tipaxCitiesData = tipaxCities?.shipping?.getProvincesCities || [];
  const [createTipax, { loading: createTipaxLoading }] = useMutation(
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
    validationSchema: validateSchema,
    initialValues: {
      first_name: storeDetail?.first_name || '',
      last_name: storeDetail?.last_name || '',
      phone_number: storeDetail?.phone_number?.replace('+98', '0') || '',
      email: storeDetail?.email || '',
      address: storeDetail?.store_address?.address || '',
      lat: '35.699739',
      lng: '51.338097',
      pay_at_dest: false,
      cost: '',
      province: { name: storeDetail?.store_address?.province || '' },
      city: { name: storeDetail?.store_address?.city || '' }
    },
    onSubmit: data => {
      if (step === 1) {
        setStep(2);
      } else {
        const {
          address,
          city,
          province,
          cost,
          lat: latitude,
          lng: longitude,
          ...remain
        } = data;
        createTipax({
          variables: {
            content: {
              name: 'تیپاکس',
              shipping_type: 7,
              address: {
                address,
                latitude,
                longitude,
                city: city.name,
                province: province.name
              },
              cost: +shippingCost > 0 ? cost : shippingCost,
              ...remain
            }
          }
        });
      }
    }
  });

  const isDigiExpressCoverage =
    digiexpressCities?.shipping?.getDigiExpressActiveCities?.active_cities.includes(
      formik.values.province.name
    );
  const hasDigiexpressAccount = Boolean(
    shippingMethods?.shipping?.getShippingMethods?.results.find(
      el => el.shipping_type_display === 'digiexpress'
    )
  );
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
        data-cy={STEP_CONTENT[step - 1].data_cy}
        className="header"
        onClick={() => {
          step === 1 ? navigate(-1) : setStep(prev => prev - 1);
        }}
        pl="2px"
        mb="15px"
      >
        <i className="df-arrow" />

        <h1>{STEP_CONTENT[step - 1].title}</h1>
      </Grid>
      {loading ? (
        <Grid container mt="200px" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid width="1" height="calc(100vh - 160px)" overflow={'auto'}>
            <Grid className="desc" height="auto">
              <p>{STEP_CONTENT[step - 1].desc}</p>
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
                {step === 1 && (
                  <>
                    {FIRST_STEP_FORM.map(input => (
                      <Grid className="form-control" key={input.name}>
                        <label>{input.label}</label>
                        <TextField
                          name={input.name}
                          data-cy={input.data_cy}
                          value={formik.values[input.name]}
                          onChange={formik.handleChange}
                          error={Boolean(formik?.errors?.[input.name])}
                          helperText={formik?.errors?.[input.name]}
                          variant="outlined"
                          fullWidth
                          multiline={input.name === 'address'}
                          rows={input.name === 'address' ? 2 : undefined}
                        />
                      </Grid>
                    ))}
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
                          <Grid container {...props}>
                            <Radio
                              checked={
                                formik?.values.province.name === option.name
                              }
                              color="primary"
                            />
                            <p className="option">{option.name}</p>
                          </Grid>
                        )}
                        renderInput={params => (
                          <TextField
                            error={
                              formik.touched.province &&
                              Boolean(formik.errors.province)
                            }
                            name="province"
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
                    <Grid mt={2} container>
                      <Typography fontSize="16px" color="#6A6F80">
                        شهر
                      </Typography>
                    </Grid>
                    <Grid mt={1} mb={2} container>
                      <Autocomplete
                        name="city"
                        sx={{ width: '100%' }}
                        options={
                          (tipaxCitiesData['cities'] &&
                            tipaxCitiesData['cities'][
                              formik.values.province.name
                            ]) ||
                          []
                        }
                        value={formik.values.city}
                        noOptionsText="یافت نشد"
                        data-cy="citiesStoreSelected"
                        disabled={!formik.values.province.name}
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

                    <Grid className="form-control">
                      <label>آدرس مبدا تحویل سفارش</label>
                      <TextField
                        placeholder="آدرس فروشگاه خود را وارد کنید."
                        name={'address'}
                        data-cy="address"
                        value={formik.values['address']}
                        onChange={formik.handleChange}
                        error={Boolean(formik?.errors?.['address'])}
                        helperText={formik?.errors?.['address']}
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
                )}
                {step === 2 && (
                  <>
                    <Box>
                      <Grid className="shipping-area">
                        <Stack direction="row" justifyContent="space-between">
                          <h4>درون شهری</h4>
                          <IOSSwitch
                            data-cy="inner_switch"
                            disabled={isDigiExpressCoverage}
                          />
                        </Stack>
                      </Grid>

                      {isDigiExpressCoverage ? (
                        <Alert
                          severity="info"
                          icon={false}
                          sx={{ borderLeft: '4px solid #0F62FE' }}
                        >
                          <Stack direction="row" alignItems="center">
                            <Box width={80}>
                              <InfoSVG />
                            </Box>
                            {hasDigiexpressAccount ? (
                              <Typography fontWeight={500} fontSize={14}>
                                ارسال های درون شهری توسط دیجی اکسپرس انجام می
                                شود. شما قبلا این روش ارسال را فعال کرده اید.
                              </Typography>
                            ) : (
                              <Typography fontWeight={500} fontSize={14}>
                                ارسال های درون شهری توسط دیجی اکسپرس انجام می
                                شود. لطفا برای ساخت حساب، اقدام کنید.
                              </Typography>
                            )}
                          </Stack>
                          {!hasDigiexpressAccount && (
                            <Stack direction="row" justifyContent="flex-end">
                              <Typography
                                onClick={() =>
                                  navigate(
                                    '/store/shippings/create/digiexpress'
                                  )
                                }
                                fontWeight={500}
                                fontSize={14}
                                color="#0F62FE"
                                mt="16px"
                              >
                                ساخت حساب
                              </Typography>
                            </Stack>
                          )}
                        </Alert>
                      ) : (
                        <Box>
                          <Grid className="form-control">
                            <label>نوع هزینه ارسال</label>
                            <Select
                              renderValue={val =>
                                SHIPPING_COSTS.find(
                                  option => option.value === val
                                ).label
                              }
                              name="shippingCost"
                              value={shippingCost}
                              onChange={({ target: { value } }) => {
                                setShippingCost(value);
                                setTimeout(() => {
                                  value !== '1' &&
                                    formik.setFieldValue('cost', '');
                                  formik.setFieldError('cost', null);
                                });
                              }}
                              variant="outlined"
                              fullWidth
                            >
                              {SHIPPING_COSTS.map(option => (
                                <MenuItem
                                  key={option.label}
                                  value={option.value}
                                >
                                  <Radio
                                    checked={shippingCost === option.value}
                                  />
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          <Grid className="form-control">
                            <label>مبلغ</label>
                            <TextField
                              name="cost"
                              disabled={+shippingCost < 1}
                              value={formik.values.cost}
                              placeholder={
                                shippingCost === '0'
                                  ? '0 تومان'
                                  : shippingCost === '-1'
                                  ? 'محاسبه بر اساس تیپاکس'
                                  : 'مبلغ را وارد کنید.'
                              }
                              onChange={formik.handleChange}
                              error={Boolean(formik?.errors?.cost)}
                              helperText={formik?.errors?.cost}
                              fullWidth
                            />
                          </Grid>
                          <Alert
                            severity="info"
                            icon={false}
                            sx={{ borderLeft: '4px solid #0F62FE' }}
                          >
                            <Stack direction="row" alignItems="center">
                              <Box width={40}>
                                <InfoSVG />
                              </Box>

                              <Typography fontWeight={500} fontSize={14}>
                                زمان برای ارسال درون شهری حداکثر 4 روز کاری است.
                              </Typography>
                            </Stack>
                          </Alert>
                        </Box>
                      )}
                    </Box>
                    <Divider sx={{ width: '100%', my: '24px' }} />
                    <Box>
                      <Grid className="shipping-area">
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <h4>برون شهری</h4>
                          <IOSSwitch data-cy="out_switch" />
                        </Stack>
                      </Grid>
                      <Grid className="form-control">
                        <label>نوع هزینه ارسال</label>
                        <Select
                          renderValue={val =>
                            SHIPPING_COSTS.find(option => option.value === val)
                              .label
                          }
                          name="shippingCost"
                          value={shippingCost}
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
                          {SHIPPING_COSTS.map(option => (
                            <MenuItem key={option.label} value={option.value}>
                              <Radio checked={shippingCost === option.value} />
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid className="form-control">
                        <label>مبلغ</label>
                        <TextField
                          name="cost"
                          disabled={+shippingCost < 1}
                          value={formik.values.cost}
                          placeholder={
                            shippingCost === '0'
                              ? '0 تومان'
                              : shippingCost === '-1'
                              ? 'محاسبه بر اساس تیپاکس'
                              : 'مبلغ را وارد کنید.'
                          }
                          onChange={formik.handleChange}
                          error={Boolean(formik?.errors?.cost)}
                          helperText={formik?.errors?.cost}
                          fullWidth
                        />
                      </Grid>
                      <Alert
                        severity="info"
                        icon={false}
                        sx={{ borderLeft: '4px solid #0F62FE' }}
                      >
                        <Stack direction="row" alignItems="center">
                          <Box width={40}>
                            <InfoSVG />
                          </Box>

                          <Typography fontWeight={500} fontSize={14}>
                            زمان برای ارسال برون شهری حداکثر 4 روز کاری است.
                          </Typography>
                        </Stack>
                      </Alert>
                    </Box>
                  </>
                )}
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
              disabled={createTipaxLoading}
              fullWidth
              data-cy="btn"
              color="primary"
              variant="contained"
            >
              تایید
            </Button>
          </Grid>
        </>
      )}
    </Style>
  );
};

export default Tipax;

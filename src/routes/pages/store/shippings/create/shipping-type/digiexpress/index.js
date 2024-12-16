import { useMutation, useQuery } from '@apollo/client';
import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  Radio,
  Select,
  TextField
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
import { GET_DIGIEXPRESS_CITIES } from '../../../../../../../constant/queries/orders';
import { Info, KeyboardArrowDown } from '@mui/icons-material';
import provinceDataSet from '../../../../settings/store_info/edit/provinceDataSet';
import CenteredLoading from '../../../../../../../components/shared/UI/CenteredLoading';

const Digiexpress = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingCost, setShippingCost] = useState('-1');
  const [latlng, setLatLng] = useState(['', '']);
  const [showModal, setShowModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: digiexpressCities } = useQuery(GET_DIGIEXPRESS_CITIES);

  const { data: storeInfo, loading } = useQuery(GET_STORE_INFO);
  const [createAlopeyk, { loading: createAlopeykLoading }] = useMutation(
    CREATE_SHIPPING,
    {
      onCompleted: () => {
        setShowModal('success');
      },
      onError: () => {
        setShowModal('failed');
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
  const [digiExpressCityError, setDigiExpressCityError] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validateSchema({ step, shippingCost }),
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
      province: { name: storeDetail?.store_address?.province || 'تهران' },
      city: { name: storeDetail?.store_address?.city || 'تهران' }
    },
    onSubmit: data => {
      if (step === 1) {
        if (
          !digiexpressCities?.shipping?.getDigiExpressActiveCities?.active_cities?.includes(
            formik.values.city.name
          )
        ) {
          setDigiExpressCityError(true);
        } else {
          setStep(2);
        }
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
        createAlopeyk({
          variables: {
            content: {
              name: 'دیجی اکسپرس',
              shipping_type: 6,
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

  const errors = Object.keys(formik.touched).length > 0 ? formik.errors : {};

  return (
    <Style container>
      {showModal && (
        <ShippingModal
          open={Boolean(showModal)}
          type={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
      <ToastContainer />
      <Grid
        className="header"
        onClick={() => {
          step === 1
            ? navigate('/store/shippings/create')
            : setStep(prev => prev - 1);
        }}
        pl="2px"
        mb="15px"
      >
        <i className="df-arrow" />
        <h1>{STEP_CONTENT[step - 1].title}</h1>
      </Grid>
      {loading ? (
        <CenteredLoading />
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
                    <Grid mt={2} container>
                      <h5>استان</h5>
                    </Grid>
                    <Grid mt={1} container>
                      <Autocomplete
                        fullWidth
                        sx={{ width: '100%' }}
                        data-cy="cityStoreSelected"
                        options={provinceDataSet.provinces}
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
                            setDigiExpressCityError(false);
                          } else {
                            formik.setFieldValue('city', {
                              name: ''
                            });
                            formik.setFieldValue('province', {
                              name: ''
                            });
                            setDigiExpressCityError(false);
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
                      <h5>شهر</h5>
                    </Grid>
                    <Grid mt={1} mb={2} container>
                      <Autocomplete
                        sx={{ width: '100%' }}
                        options={
                          formik.values.province.name
                            ? provinceDataSet['cities'][
                                formik.values.province.name
                              ]
                            : provinceDataSet['cities']['تهران']
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
                            setDigiExpressCityError(false);
                          } else {
                            formik.setFieldValue('city', {
                              name: ''
                            });
                            setDigiExpressCityError(false);
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
                            label="شهر"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password',
                              dataCy: 'citiesStoreSelected', // disable autocomplete and autofill
                              form: {
                                autocomplete: 'off'
                              }
                            }}
                          />
                        )}
                      />
                    </Grid>
                    {digiExpressCityError && (
                      <Grid
                        alignItems="center"
                        container
                        className="digiExpressCityError"
                      >
                        <Grid item xs={1}>
                          <Info style={{ color: '#da1e28' }} />
                        </Grid>
                        <Grid pl={1} item xs={11}>
                          <p>
                            در حال حاضر، شهر شما در محدوده تحت پوشش دیجی اکسپرس
                            نمی باشد.
                          </p>
                        </Grid>
                      </Grid>
                    )}
                    <Grid className="form-control">
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
                      <NeshanShowingMap latLng={[latlng[0], latlng[1]]} />
                    </Grid>
                    <LocationDrawer
                      setSearchParams={setSearchParams}
                      selectedStore={storeDetail}
                      lat={formik.values.lat}
                      lng={formik.values.lng}
                      setlat={val => setLatLng(prev => [String(val), prev[1]])}
                      setLng={val => setLatLng(prev => [prev[0], String(val)])}
                      open={Boolean(searchParams.get('editMap'))}
                      close={() => setSearchParams({})}
                    />
                  </>
                )}
                {step === 2 && (
                  <>
                    <Grid className="shipping-area">
                      <h4>درون شهری</h4>
                    </Grid>

                    <Grid className="form-control">
                      <label>نوع هزینه ارسال</label>
                      <Select
                        renderValue={val =>
                          SHIPPING_COSTS.find(option => option.value === val)
                            .label
                        }
                        name="shippingCost"
                        className="shippingCost"
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
                      />
                    </Grid>
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
              data-cy="submit-button"
              disabled={createAlopeykLoading}
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

export default Digiexpress;

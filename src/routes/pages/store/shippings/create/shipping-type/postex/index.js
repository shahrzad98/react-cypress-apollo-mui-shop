import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  Button,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  Select,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GET_STORE_INFO } from '../../../../../../../constant/queries/settings';
import {
  FIRST_STEP_FORM,
  SHIPPING_AREA,
  SHIPPING_COSTS,
  STEP_CONTENT,
  toastSuccess,
  validateSchema
} from './constants';
import { Style } from './style';
import NeshanShowingMap from '../../../../../../../components/shared/mapNeshan/showingMap';
import LocationDrawer from '../../../../settings/store_info/edit/map';
import { toast, ToastContainer } from 'react-toastify';
import {
  GET_PROVINCES_CITIES,
  SEND_POSTEX_SMS
} from '../../../../../../../constant/queries/shipping';
import ShippingModal from '../../modal';
import { CREATE_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import { ContentCopyOutlined, EmailOutlined, Info } from '@mui/icons-material';
import CenteredLoading from '../../../../../../../components/shared/UI/CenteredLoading';

const Postex = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingCost, setShippingCost] = useState({
    my_province: '-1',
    other_provinces: '-1'
  });
  const [latlng, setLatLng] = useState();
  const [showModal, setShowModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: storeInfo, loading } = useQuery(GET_STORE_INFO);
  const [createPostex, { loading: createPostexLoading }] = useMutation(
    CREATE_SHIPPING,
    {
      onCompleted: () => {
        setStep(prev => prev + 1);
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

  const { data: provinces } = useQuery(GET_PROVINCES_CITIES, {
    variables: { param: { type: 2 } }
  });

  const provincesData = useMemo(() => {
    if (provinces) {
      return provinces.shipping.getProvincesCities.cities;
    }
  }, [provinces]);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validateSchema({ step, shippingCost }),
    initialValues: {
      phone_number: storeDetail?.phone_number || '',
      national_code: storeDetail?.national_code || '',
      postal_code: storeDetail?.store_address?.postal_code || '',
      address: storeDetail?.store_address?.address || '',
      city: '',
      province: '',
      lat: '35.699739',
      lng: '51.338097',
      cost: '',
      other_provinces_cost: '',
      my_province_is_active: true,
      other_provinces_is_active: true
    },
    onSubmit: data => {
      if (step < 3) {
        formik.setTouched({});
        if (step !== 2) {
          setStep(prev => prev + 1);
        } else {
          const {
            address,
            city,
            province,
            cost,
            other_provinces_cost,
            postal_code,
            lat: latitude,
            lng: longitude,
            ...remain
          } = data;
          createPostex({
            variables: {
              content: {
                name: 'پستکس',
                shipping_type: 2,
                address: {
                  address,
                  latitude,
                  longitude,
                  city,
                  province,
                  postal_code
                },
                cost:
                  +shippingCost.my_province > 0
                    ? cost
                    : shippingCost.my_province,
                other_provinces_cost:
                  +shippingCost.other_provinces > 0
                    ? other_provinces_cost
                    : shippingCost.other_provinces,
                ...remain
              }
            }
          });
        }
      } else if (step === 3) {
        setShowModal('success');
      }
    }
  });
  const [sendPostexSms] = useLazyQuery(SEND_POSTEX_SMS, {
    onCompleted: () => {
      toast(
        `رمز عبور به شماره ${formik.values.phone_number} ارسال شد.`,
        toastSuccess
      );
    }
  });

  const resetNeshan = (type, val) => {
    formik.setFieldValue(type, null);
    setTimeout(() => {
      formik.setFieldValue(type, val);
    });
  };

  useEffect(() => {
    if (latlng) {
      resetNeshan('lat', latlng[0]);
      resetNeshan('lng', latlng[1]);
    }
  }, [latlng]);

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
                        {input.name === 'province' || input.name === 'city' ? (
                          provincesData ? (
                            <>
                              <Select
                                displayEmpty
                                name={input.name}
                                value={formik.values[input.name]}
                                onChange={e => {
                                  input.name === 'province' &&
                                    formik.setFieldValue('city', '');
                                  formik.handleChange(e);
                                }}
                                error={Boolean(errors?.[input.name])}
                                variant="outlined"
                                fullWidth
                              >
                                <MenuItem value="">
                                  {input.name === 'province'
                                    ? ' استان خود را انتخاب کنید.'
                                    : 'شهر یا محله خود را انتخاب کنید.'}
                                </MenuItem>

                                {input.name === 'province'
                                  ? Object.keys(provincesData).map(provice => (
                                      <MenuItem key={provice} value={provice}>
                                        {provice}
                                      </MenuItem>
                                    ))
                                  : provincesData?.[
                                      formik.values.province
                                    ]?.map(city => (
                                      <MenuItem
                                        key={city.name}
                                        value={city.name}
                                      >
                                        {city.name}
                                      </MenuItem>
                                    ))}
                              </Select>
                              <FormHelperText
                                sx={theme => ({
                                  color: theme.palette.error.main,
                                  pl: 2
                                })}
                              >
                                {errors?.[input.name]}
                              </FormHelperText>
                            </>
                          ) : (
                            <CenteredLoading mt="0" />
                          )
                        ) : (
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
                        )}
                      </Grid>
                    ))}
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
                      {formik.values.lng && (
                        <NeshanShowingMap
                          latLng={[formik.values.lat, formik.values.lng]}
                        />
                      )}
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
                {step === 2 &&
                  SHIPPING_AREA.map((area, i) => (
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
                            SHIPPING_COSTS.find(option => option.value === val)
                              .label
                          }
                          className={area.name}
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
                                checked={
                                  shippingCost[area.name] === option.value
                                }
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
                {step === 3 && (
                  <Grid className="info-step">
                    <Grid p={2} className="info-card">
                      <Grid className="info-row">
                        <span className="info-title">نام کاربری</span>
                        <span className="info-value">
                          {formik.values.phone_number}
                          <ContentCopyOutlined />
                        </span>
                      </Grid>
                      <Grid className="info-row">
                        <span className="info-title">رمز عبور</span>
                        <span className="info-value" onClick={sendPostexSms}>
                          <span className="get-pass">دریافت رمز عبور</span>
                          <EmailOutlined />
                        </span>
                      </Grid>
                    </Grid>
                    <p>
                      از طریق لینک زیر می توانید وارد پنل کاربری پستکس خود شوید.
                    </p>
                    <a
                      data-cy="postex-link"
                      href="https://postex.ir/login"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      https://postex.ir/login
                    </a>
                    <Grid className="info-message" p={2}>
                      <Info />
                      لطفا رمز عبور خود را تغییر ندهید. اگر مجبور به تغییر شدید
                      به پشتیبانی اطلاع دهید!
                    </Grid>
                  </Grid>
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
              disabled={createPostexLoading}
              fullWidth
              data-cy="submit-button"
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

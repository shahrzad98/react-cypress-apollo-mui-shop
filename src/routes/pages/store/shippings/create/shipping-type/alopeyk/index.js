import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Grid,
  MenuItem,
  Radio,
  Select,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GET_STORE_INFO } from '../../../../../../../constant/queries/settings';
import {
  FIRST_STEP_FORM,
  PAYMENT_TIME,
  SHIPPING_COSTS,
  STEP_CONTENT,
  toastMapError,
  validateSchema
} from './constants';
import { Style } from './style';
import NeshanShowingMap from '../../../../../../../components/shared/mapNeshan/showingMap';
import LocationDrawer from '../../../../settings/store_info/edit/map';
import { toast, ToastContainer } from 'react-toastify';
import { GET_NESHAN_CITY } from '../../../../../../../constant/queries/shipping';
import ShippingModal from '../../modal';
import { CREATE_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import CenteredLoading from '../../../../../../../components/shared/UI/CenteredLoading';

const Alopeyk = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingCost, setShippingCost] = useState('-1');
  const [latlng, setLatLng] = useState();
  const [showModal, setShowModal] = useState(false);
  const [mapError, setMapError] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

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

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validateSchema({ step, shippingCost }),
    initialValues: {
      first_name: storeDetail?.first_name || '',
      last_name: storeDetail?.last_name || '',
      phone_number: storeDetail?.phone_number || '',
      email: storeDetail?.email || '',
      address: storeDetail?.store_address?.address || '',
      lat: '35.699739',
      lng: '51.338097',
      pay_at_dest: false,
      cost: '',
      province: '',
      city: ''
    },
    onSubmit: data => {
      if (step < 3) {
        setStep(prev => prev + 1);
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
              name: 'الوپیک',
              shipping_type: 5,
              address: {
                address,
                latitude,
                longitude,
                city,
                province
              },
              cost: +shippingCost > 0 ? cost : shippingCost,
              ...remain
            }
          }
        });
      }
    }
  });

  const resetNeshan = (type, val) => {
    formik.setFieldValue(type, null);
    setTimeout(() => {
      formik.setFieldValue(type, val);
    });
  };

  const [getNeshanCity, { loading: mapLoading }] = useLazyQuery(
    GET_NESHAN_CITY,
    {
      onCompleted: data => {
        const {
          shipping: {
            getNeshanCity: { city, state: province }
          }
        } = data;

        formik.setFieldValue('city', city);
        formik.setFieldValue('province', province);

        const isInLocation = city === 'تهران' || city === 'کرج';

        if (!isInLocation) {
          toast('محدوده مورد نظر خارج از تهران یا کرج است.', toastMapError);
        }
        setTimeout(() => setMapError(!isInLocation));
      }
    }
  );

  useEffect(() => {
    if (latlng) {
      resetNeshan('lat', latlng[0]);
      resetNeshan('lng', latlng[1]);
      getNeshanCity({
        variables: { param: { lat: latlng[0], lng: latlng[1] } }
      });
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
                      {formik.values.lng &&
                        (mapLoading ? (
                          <CenteredLoading mt="50px" />
                        ) : (
                          <NeshanShowingMap
                            latLng={[formik.values.lat, formik.values.lng]}
                          />
                        ))}
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
                    {PAYMENT_TIME.map(type => (
                      <Grid
                        key={type.title}
                        border="0.5px solid #9185BE"
                        borderRadius="10px"
                        p={2}
                        pt={1}
                        className="payment-card"
                      >
                        <Grid container flexDirection="row" alignItems="center">
                          <Grid>
                            <Radio
                              checked={formik.values.pay_at_dest === type.value}
                              onChange={() =>
                                formik.setFieldValue('pay_at_dest', type.value)
                              }
                              style={{ color: '#00D96F' }}
                            />
                          </Grid>
                          <h5>{type.title}</h5>
                        </Grid>
                        <Grid
                          container
                          borderTop="0.5px solid #DAD6E9"
                          flexDirection="column"
                        >
                          <p>{type.desc}</p>
                          <span className="desc">{type.detail}</span>
                        </Grid>
                      </Grid>
                    ))}
                  </>
                )}
                {step === 3 && (
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
            zIndex={500}
          >
            <Button
              onClick={formik.handleSubmit}
              disabled={mapError || mapLoading || createAlopeykLoading}
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

export default Alopeyk;

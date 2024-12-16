import * as React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { formData, postSteps } from './constant';
import { PostContainer, SubmitContainer } from './style';
import CustomizedStepper from '../../../../../../../components/shared/stepper';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_STORE_INFO } from '../../../../../../../constant/queries/settings';
import Step2 from './steps/Step2';
import CenteredLoading from '../../../../../../../components/shared/UI/CenteredLoading';
import Step1 from './steps/Step1';
import Step4 from './steps/Step4';
import {
  CREATE_POST,
  EDIT_POST_METHOD
} from '../../../../../../../constant/mutations/shipping';
import moment from 'moment-jalaali';
import { toast, ToastContainer } from 'react-toastify';
import { InfoOutlined } from '@mui/icons-material';

const Post = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: storeInfo, loading: storeInfoLoading } =
    useQuery(GET_STORE_INFO);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => state && setActiveStep(state?.step), [search]);

  const store = useMemo(() => {
    if (storeInfo) {
      return storeInfo?.user?.getUserRead?.my_store[0];
    }
  }, [storeInfo]);

  const [createPostMethod, { loading: createPostLoading }] =
    useMutation(CREATE_POST);
  const [
    editPostMethod
    // , { loading: editPostLoading }
  ] = useMutation(EDIT_POST_METHOD);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData(store, activeStep)?.initialValues,
    validationSchema: formData(store, activeStep)?.validationSchema,
    onSubmit: () => {
      const creatPostPayload = {
        name: 'پست',
        shipping_type: 4,
        address: {
          address: formik.values?.address,
          latitude: formik.values?.latLng[0],
          longitude: formik.values?.latLng[1],
          postal_code: formik.values?.postal_code,
          city: formik.values?.city?.name,
          province: formik.values?.province?.name,
          unit: formik.values?.unit?.name,
          node: formik.values?.node?.name
        },
        store_data: {
          birthday: moment(formik.values?.birthday).format('jYYYY-jMM-jDD'),
          national_code: formik.values?.national_code,
          national_code_serial: formik.values?.national_code_serial,
          phone_number: formik.values?.phone_number,
          first_name: formik.values?.first_name,
          last_name: formik.values?.last_name
        }
      };

      activeStep === 1 && setActiveStep(prev => prev + 1);
      if (activeStep === 2) {
        if (state?.mode === 'edit') {
          editPostMethod({
            variables: {
              content: creatPostPayload
            },
            context: {
              headers: {
                'accept-language': 'fa-IR'
              }
            },
            onCompleted: data => {
              const {
                shipping: {
                  createPostMethod: { id }
                }
              } = data;
              history.push(`/store/shippings/edit/${id}`);
            },
            onError: error => {
              const errorMessage =
                Object.values(
                  JSON.parse(JSON.stringify(error))?.graphQLErrors[0]
                    ?.extensions?.response?.body
                )[0][0] || 'مشکلی پیش آمده دوباره تلاش کنید';
              toast(errorMessage, {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
                draggable: true,
                closeButton: false,
                icon: <InfoOutlined />,
                style: { backgroundColor: '#EA002A33', color: '#EA002A' }
              });
            }
          });
        } else {
          createPostMethod({
            variables: {
              content: creatPostPayload
            },
            context: {
              headers: {
                'accept-language': 'fa-IR'
              }
            },
            onCompleted: data => {
              const {
                shipping: {
                  createPostMethod: { id }
                }
              } = data;
              history.push(`/store/shippings/edit/${id}`);
            },
            onError: error => {
              const errorMessage =
                Object.values(
                  JSON.parse(JSON.stringify(error))?.graphQLErrors[0]
                    ?.extensions?.response?.body
                )[0][0] || 'مشکلی پیش آمده دوباره تلاش کنید';
              toast(errorMessage, {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
                draggable: true,
                closeButton: false,
                icon: <InfoOutlined />,
                style: { backgroundColor: '#EA002A33', color: '#EA002A' }
              });
            }
          });
        }
      }
    }
  });
  useEffect(() => {
    if (activeStep === 1) {
      formik.setFieldValue('first_name', store?.first_name);
      formik.setFieldValue('last_name', store?.last_name);
      formik.setFieldValue('phone_number', store?.phone_number);
    }
    if (activeStep === 1) {
      formik.setFieldValue('province', {
        name: store?.store_address?.province
      });
      formik.setFieldValue('city', { name: store?.store_address?.city });
      formik.setFieldValue('address', store?.store_address?.address);
      formik.setFieldValue('postal_code', store?.store_address?.postal_code);
      formik.setFieldValue('address', store?.store_address?.address);
      formik.setFieldValue('latLng', [
        store?.store_address?.latitude,
        store?.store_address?.longitude
      ]);
    }
  }, [store]);

  const errors = Object.keys(formik.touched).length > 0 ? formik.errors : {};

  let renderStep = {
    1: <Step1 form={formik} errors={errors} />,
    2: <Step2 form={formik} errors={errors} />,
    4: <Step4 />
  };

  if (storeInfoLoading) return <CenteredLoading />;

  return (
    <>
      <ToastContainer />
      <PostContainer>
        <Stack
          onClick={() => navigate('/store/shippings/create/')}
          direction="row"
          alignItems="center"
          mb={3}
        >
          <i className="df-arrow" />
          <h1>ساخت حساب کاربری پست</h1>
        </Stack>

        <Stack className="stepContainer">
          <CustomizedStepper steps={postSteps} activeStep={activeStep} />
        </Stack>
        <Typography
          variant="body2"
          mb={3}
          borderLeft=" 2px solid #DAD6E9"
          pl={2}
        >
          {activeStep === 1
            ? 'نام و نام خانوادگی، تاریخ تولد، کد ملی و شماره سریال کارت ملی باید به اسم یک شخص باشد.'
            : searchParams.get('editMap')
            ? 'لطفا آدرس خود را روی نقشه را انتخاب کنید'
            : 'لطفا اطلاعات مربوط به آدرس خود را، کامل کنید'}
        </Typography>

        <form className="formContainer">{renderStep[activeStep]}</form>
      </PostContainer>
      {[1, 2].includes(activeStep) && (
        <SubmitContainer container className="submit">
          <Button
            onClick={() => {
              searchParams.get('editMap')
                ? setSearchParams({})
                : formik.handleSubmit();
            }}
            disabled={createPostLoading}
            fullWidth
            variant="contained"
          >
            تایید
          </Button>
        </SubmitContainer>
      )}
    </>
  );
};
export default Post;

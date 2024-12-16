import { Button, CircularProgress, Grid, Skeleton } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryFields from '../../../../../../components/createProduct/primary-fields-card/onlyVariant';
import ProductImagesUploadCard from '../../../../../../components/createProduct/product-images-card';
import { Style } from './style';
import * as yup from 'yup';
import persianJs from 'persianjs';
import ZeroStockModal from '../../../../../../components/createProduct/modal/zeroStock';
import { useMutation, useQuery } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { UPDATE_VARIANT } from '../../../../../../constant/mutations/products';
import { GET_VARIANT } from '../../../../../../constant/queries/products';

const validationSchema = yup.object().shape({
  cost: yup
    .number()
    .typeError(' قیمت را به درستی وارد کنید')
    .required('قیمت ، اطلاعات مورد نیاز برای نمایش محصول می باشد.')
    .moreThan(0, 'قیمت ، باید بیشتر از صفر باشد.'),

  time_delay: yup
    .number()
    .typeError(' زمان آماده سازی را به درستی وارد کنید')
    .required('زمان آماده سازی ، اطلاعات مورد نیاز برای نمایش محصول می باشد.')
    .lessThan(31, 'حداکثر زمان آماده سازی ، 30 روز می باشد.')
});

const index = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [imageUUids, setImageUUids] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [editVariant, { loading }] = useMutation(UPDATE_VARIANT);
  const { data, loading: productLoading } = useQuery(GET_VARIANT, {
    variables: {
      getVariantId: params.variantId
    }
  });

  window.onpopstate = function () {
    navigate(`/products/detail/variant/${params.variantId}`);
  };
  history.pushState({}, '');

  const formik = useFormik({
    initialValues: {
      cost: data?.item?.getVariant?.primary_cost || '',
      time_delay: data?.item?.getVariant?.time_delay || 1,
      stock: data?.item?.getVariant?.stock || 0,
      is_unlimited: data?.item?.getVariant?.is_unlimited || false,
      voucher_cash:
        data?.item?.getVariant?.primary_cost - data?.item?.getVariant?.cost > 0
          ? data?.item?.getVariant?.primary_cost - data?.item?.getVariant?.cost
          : '',
      voucher_percent:
        data?.item?.getVariant?.primary_cost - data?.item?.getVariant?.cost > 0
          ? (
              ((data?.item?.getVariant?.primary_cost -
                data?.item?.getVariant?.cost) /
                data?.item?.getVariant?.primary_cost) *
              100
            ).toFixed()
          : ''
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      if (!values.is_unlimited && !values.stock && values.stock !== 0) {
        setErrors({
          stock: 'موجودی ، اطلاعات مورد نیاز برای نمایش محصول می باشد.'
        });
      } else if (
        !values.is_unlimited &&
        values.stock == 0 &&
        searchParams.get('modal') !== 'zero-stock'
      ) {
        setSearchParams({ modal: 'zero-stock' });
      } else {
        setSearchParams({});

        editVariant({
          variables: {
            content: {
              images: imageUUids,
              is_unlimited: values?.is_unlimited,
              stock: values.stock,
              primary_cost: values.cost,
              cost: values?.voucher_cash
                ? values.cost - values.voucher_cash
                : values.cost,
              time_delay: values.time_delay
            },
            partialUpdateVariantId: params?.variantId
          },
          onError: err => {
            if (
              JSON.parse(
                JSON.stringify(err)
              )?.graphQLErrors[0]?.extensions?.response?.body?.non_field_errors[0]?.includes(
                'unique'
              )
            ) {
              formik.setFieldError('name', 'نام محصول، تکراری است');
            }
          },
          onCompleted: () => {
            navigate(`/products/detail/variant/${data?.item?.getVariant?.id}`);
          }
        });
      }
    }
  });

  formik.handleChange = e => {
    if (e?.target?.value) {
      const newValue = persianJs(e.target.value).toEnglishNumber().toString();
      // e.target.value = parseFloat(e.target.value) || 0;
      formik.setFieldValue(e.target.name, parseFloat(newValue) || 0);
    } else {
      formik.setFieldValue(e.target.name, e.target.value);
    }
  };

  return (
    <Style container>
      {searchParams.get('modal') === 'zero-stock' && (
        <ZeroStockModal
          name={formik.values.name}
          close={() => setSearchParams({})}
          submit={formik.handleSubmit}
        />
      )}

      <Grid alignItems="center" justifyContent="space-between" container>
        <Grid
          onClick={() => {
            navigate(`/products/detail/variant/${data?.item?.getVariant?.id}`);
          }}
          style={{ display: 'flex' }}
          alignItems="center"
        >
          <i className="df-arrow" />
          <h1>ویرایش متغیر</h1>
        </Grid>
      </Grid>
      {productLoading ? (
        <Grid container>
          <Skeleton
            variant="rectangular"
            style={{
              width: '100%',
              height: '100px',
              borderRadius: '10px',
              marginTop: '20px'
            }}
          />
          <Skeleton
            variant="rectangular"
            style={{
              width: '100%',
              height: '500px',
              borderRadius: '10px',
              marginTop: '40px'
            }}
          />
        </Grid>
      ) : (
        <>
          <ProductImagesUploadCard
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setImageUUids={setImageUUids}
            imageUUids={imageUUids}
            product={data}
            openAll={() => setSearchParams({ modal: 'all-images' })}
          />
          <form onSubmit={formik.handleSubmit}>
            <PrimaryFields
              setSearchParams={setSearchParams}
              setErrors={setErrors}
              errors={errors}
              formik={formik}
            />
            <Grid
              alignItems="center"
              justifyContent="center"
              className="submitBtnCont"
              container
            >
              <Button
                disabled={loading}
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
              >
                {loading ? <CircularProgress /> : 'ثبت'}
              </Button>
            </Grid>
          </form>
        </>
      )}
      <ToastContainer />
    </Style>
  );
};

export default index;

import { Button, CircularProgress, Grid } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PrimaryFields from '../../../../components/createProduct/primary-fields-card';
import ProductImagesUploadCard from '../../../../components/createProduct/product-images-card';
import { Style } from './style';
import * as yup from 'yup';
import persianJs from 'persianjs';
import ZeroStockModal from '../../../../components/createProduct/modal/zeroStock/index';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PRODUCT } from '../../../../constant/mutations/products';
import SecondaryFieldsCard from '../../../../components/createProduct/modal/secondary-fields-card';
import { GET_CATEORIES } from '../../../../constant/queries/products';
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as SuccessSVG } from '../../../../components/createProduct/svg/success.svg';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('نام ، اطلاعات مورد نیاز برای نمایش محصول می باشد.')
    .max(32, 'نام ، باید حداکثر دارای 32 کاراکتر باشد.'),
  cost: yup
    .string()
    .required('قیمت ، اطلاعات مورد نیاز برای نمایش محصول می باشد.'),
  time_delay: yup
    .number()
    .typeError(' زمان آماده سازی را به درستی وارد کنید')
    .required('زمان آماده سازی ، اطلاعات مورد نیاز برای نمایش محصول می باشد.')
    .lessThan(31, 'حداکثر زمان آماده سازی ، 30 روز می باشد.')
});
const index = () => {
  const navigate = useNavigate();
  const [imageUUids, setImageUUids] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT);
  const { data: categories } = useQuery(GET_CATEORIES, {
    variables: {
      params: {
        limit: 100,
        parent_only: true
      }
    }
  });
  const openToast = () => {
    toast('اطلاعات بیشتر با موفقیت ثبت شد.', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
      // closeOnClick: true,
      draggable: true,
      closeButton: false,
      icon: <SuccessSVG />
    });
  };
  const formik = useFormik({
    initialValues: {
      cost: 0,
      name: '',
      time_delay: 1,
      stock: 0,
      is_unlimited: false,
      category: '',
      is_active: true,
      voucher_cash: '',
      voucher_percent: '',
      weight: '',
      features: [
        {
          title: '',
          description: ''
        }
      ],
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (values.cost == '0') {
        formik.setFieldError('cost', '  قیمت محصول نمیتواند صفر باشد! ');
        return 0;
      }

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
        createProduct({
          variables: {
            content: {
              ...(values.features?.length >= 1 &&
                values.features[0]?.title && {
                  features: values.features
                }),
              ...(imageUUids?.length > 0 && {
                images: imageUUids
              }),
              ...(values.category && { category: values.category }),
              is_active: values.is_active,
              ...(values.description && { description: values.description }),
              name: values.name,
              label: values.name,
              tags: [],
              unit: 5,
              variants: [
                {
                  cost: values?.voucher_cash
                    ? parseFloat(values.cost.replace(/,/g, '')) -
                      values.voucher_cash
                    : parseFloat(values.cost.replace(/,/g, '')),

                  name: values.name,
                  primary_cost: parseFloat(values.cost.replace(/,/g, '')),
                  time_delay: +values.time_delay,
                  ...(values.is_unlimited === false && {
                    stock: +values.stock
                  }),
                  is_unlimited: values.is_unlimited
                }
              ],
              ...(values.weight && { weight: +values.weight })
            }
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
            openToast();
            navigate('/products/list');
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

  window.onpopstate = function () {
    navigate('/products/list');
  };
  history.pushState({}, '');

  return (
    <Style container>
      {searchParams.get('modal') === 'zero-stock' && (
        <ZeroStockModal
          name={formik.values.name}
          close={() => setSearchParams({})}
          submit={formik.handleSubmit}
        />
      )}
      {searchParams.get('modal') === 'secondary-fields' && (
        <SecondaryFieldsCard
          openToast={openToast}
          setSearchParams={setSearchParams}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories?.item?.getCategories?.results}
          formik={formik}
          open={searchParams.get('modal') === 'secondary-fields'}
          close={() => setSearchParams({})}
        />
      )}

      <Grid
        onClick={() => {
          navigate('/products');
        }}
        style={{ display: 'flex' }}
        alignItems="center"
      >
        <i className="df-arrow" />
        <h1>تعریف محصول</h1>
      </Grid>

      <ProductImagesUploadCard
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setImageUUids={setImageUUids}
        imageUUids={imageUUids}
        openAll={() => setSearchParams({ modal: 'all-images' })}
      />
      <form onSubmit={formik.handleSubmit}>
        <Grid container className="fields-container">
          <PrimaryFields
            setSearchParams={setSearchParams}
            setErrors={setErrors}
            errors={errors}
            formik={formik}
          />
        </Grid>

        <Grid
          alignItems="center"
          justifyContent="center"
          className="submitBtnCont"
          container
        >
          <Button
            type="submit"
            data-cy="create_submit_btn"
            disabled={loading}
            fullWidth
            color="primary"
            variant="contained"
          >
            {loading ? <CircularProgress /> : 'ثبت محصول'}
          </Button>
        </Grid>
      </form>
      <ToastContainer />
    </Style>
  );
};

export default index;

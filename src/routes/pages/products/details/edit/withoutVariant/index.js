import { Button, CircularProgress, Grid, Skeleton } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryFields from '../../../../../../components/createProduct/primary-fields-card';
import ProductImagesUploadCard from '../../../../../../components/createProduct/product-images-card';
import { Style } from './style';
import * as yup from 'yup';
import persianJs from 'persianjs';
import ZeroStockModal from '../../../../../../components/createProduct/modal/zeroStock';
import { useMutation, useQuery } from '@apollo/client';
import SecondaryFieldsCard from '../../../../../../components/createProduct/modal/secondary-fields-card';
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as SuccessSVG } from '../../../../../../components/createProduct/svg/success.svg';
import { ReactComponent as TrashSVG } from '../../../../../../components/createProduct/svg/trashCan.svg';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from '../../../../../../constant/mutations/products';
import { GET_PRODUCT } from '../../../../../../constant/queries/products';
import ConfirmModal from '../../../../../../components/createProduct/modal/confirmModal/index';
import { InfoOutlined } from '@mui/icons-material';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('نام ، اطلاعات مورد نیاز برای نمایش محصول می باشد.')
    .max(30, 'نام ، باید حداکثر دارای 30 حرف باشد.'),
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
  const addCommas = useCallback(
    num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    []
  );
  const removeNonNumeric = useCallback(
    num => num.toString().replace(/[^0-9]/g, ''),
    []
  );

  const navigate = useNavigate();
  const params = useParams();
  const [imageUUids, setImageUUids] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editProduct, { loading }] = useMutation(EDIT_PRODUCT);
  const [createProduct, { loading: makeProdLoading }] =
    useMutation(CREATE_PRODUCT);
  const { data, loading: productLoading } = useQuery(GET_PRODUCT, {
    variables: {
      params: {
        limit: 100
      },
      getProductId: params.productId
    }
  });
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  useEffect(() => {
    if (data?.item?.getProduct?.category?.title) {
      setSelectedCategory(data?.item?.getProduct?.category?.title);
    }
  }, [data]);

  window.onpopstate = function () {
    navigate('/products/list');
  };
  history.pushState({}, '');

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
      cost: data?.item?.getProduct?.variants[0]?.primary_cost
        ? addCommas(
            removeNonNumeric(data?.item?.getProduct?.variants[0]?.primary_cost)
          )
        : '',
      name:
        data?.item?.getProduct?.label && searchParams?.get('isCopy')
          ? data?.item?.getProduct?.label + ' کپی '
          : data?.item?.getProduct?.label
          ? data?.item?.getProduct?.label
          : '',
      time_delay: data?.item?.getProduct?.variants[0]?.time_delay || 1,
      stock: data?.item?.getProduct?.variants[0]?.stock || 0,
      is_unlimited: data?.item?.getProduct?.variants[0]?.is_unlimited || false,
      category: data?.item?.getProduct?.category?.id || '',
      is_active: data?.item?.getProduct?.is_active || true,
      voucher_cash:
        data?.item?.getProduct?.variants[0]?.primary_cost -
        data?.item?.getProduct?.variants[0]?.cost,
      voucher_percent:
        data?.item?.getProduct?.variants[0]?.primary_cost -
          data?.item?.getProduct?.variants[0]?.cost >
        0
          ? (
              ((data?.item?.getProduct?.variants[0]?.primary_cost -
                data?.item?.getProduct?.variants[0]?.cost) /
                data?.item?.getProduct?.variants[0]?.primary_cost) *
              100
            ).toFixed()
          : '',
      weight: data?.item?.getProduct?.weight,
      features:
        data?.item?.getProduct?.features?.length > 0
          ? data?.item?.getProduct?.features
          : [
              {
                title: '',
                description: ''
              }
            ],
      description: data?.item?.getProduct?.description || ''
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      if (values.cost == '0') {
        formik.setFieldError('cost', '  قیمت محصول نمیتواند صفر باشد! ');

        toast('قیمت محصول نمیتواند صفر باشد!', {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
          closeButton: false,
          icon: <InfoOutlined />,
          style: { backgroundColor: '#EA002A33', color: '#EA002A' }
        });
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
        let newFeatures = [];
        values.features.forEach(element => {
          let obj = {
            title: element?.title,
            description: element?.description
          };
          newFeatures.push(obj);
        });
        if (searchParams.get('isCopy')) {
          createProduct({
            variables: {
              content: {
                ...(values.features?.length >= 1 &&
                  values.features[0]?.title && {
                    features: newFeatures
                  }),
                ...(imageUUids?.length > 0 && {
                  images: imageUUids
                }),
                ...(values.category && { category: +values.category }),
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
        } else {
          editProduct({
            variables: {
              updateProductId: data?.item?.getProduct?.id,
              content: {
                ...(values.features?.length >= 1 &&
                  values.features[0]?.title && {
                    features: newFeatures
                  }),
                ...(imageUUids?.length > 0 && {
                  images: imageUUids
                }),
                ...(values.category && { category: +values.category }),
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
              navigate(`/products/details/${data?.item?.getProduct?.id}`);
            }
          });
        }
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
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <Style container>
      {searchParams.get('modal') === 'zero-stock' && (
        <ZeroStockModal
          name={formik.values.name}
          close={() => setSearchParams({})}
          submit={formik.handleSubmit}
        />
      )}
      {deleteModal && (
        <ConfirmModal
          submit={() => {
            deleteProduct({
              variables: {
                deleteProductId: data?.item?.getProduct?.id
              },
              onCompleted: () => navigate('/products/list')
            });
          }}
          text={`آیا از حذف محصول ${data?.item?.getProduct?.label} اطمینان دارید؟`}
          close={() => setDeleteModal(false)}
        />
      )}
      {searchParams.get('modal') === 'secondary-fields' && (
        <SecondaryFieldsCard
          openToast={openToast}
          setSearchParams={setSearchParams}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={data?.item?.getCategories?.results}
          formik={formik}
          open={searchParams.get('modal') === 'secondary-fields'}
          close={() => setSearchParams({})}
        />
      )}
      <Grid alignItems="center" justifyContent="space-between" container>
        <Grid
          onClick={() => {
            navigate(`/products/details/${data?.item?.getProduct?.id}`);
          }}
          style={{ display: 'flex' }}
          alignItems="center"
        >
          <i className="df-arrow" />
          {searchParams?.get('isCopy') ? (
            <h1>ساخت محصول</h1>
          ) : (
            <h1>ویرایش محصول</h1>
          )}
        </Grid>
        <TrashSVG
          style={{ width: '22px', height: '22px' }}
          onClick={() => setDeleteModal(true)}
        />
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
                data-cy="create_submit_btn"
                disabled={loading || makeProdLoading}
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
              >
                {loading || makeProdLoading ? <CircularProgress /> : 'ثبت'}
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

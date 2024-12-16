import { Button, CircularProgress, Grid, Skeleton } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PrimaryFields from '../../../../../../components/createProduct/primary-fields-card/withVariant';
import ProductImagesUploadCard from '../../../../../../components/createProduct/product-images-card';
import { Style } from './style';
import * as yup from 'yup';
import persianJs from 'persianjs';
import { useMutation, useQuery } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as SuccessSVG } from '../../../../../../components/createProduct/svg/success.svg';
import { ReactComponent as TrashSVG } from '../../../../../../components/createProduct/svg/trashCan.svg';
import {
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from '../../../../../../constant/mutations/products';
import { GET_PRODUCT } from '../../../../../../constant/queries/products';
import ConfirmModal from '../../../../../../components/createProduct/modal/confirmModal/index';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('نام ، اطلاعات مورد نیاز برای نمایش محصول می باشد.')
    .max(30, 'نام ، باید حداکثر دارای 30 حرف باشد.')
});

const index = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [imageUUids, setImageUUids] = useState([]);
  const [errors, setErrors] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editProduct, { loading }] = useMutation(EDIT_PRODUCT);
  const { data, loading: productLoading } = useQuery(GET_PRODUCT, {
    variables: {
      params: {
        limit: 100
      },
      getProductId: params.productId
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
  window.onpopstate = function () {
    navigate('/products/list');
  };
  history.pushState({}, '');

  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  useEffect(() => {
    if (data?.item?.getProduct?.category?.title) {
      setSelectedCategory(data?.item?.getProduct?.category?.title);
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: data?.item?.getProduct?.label || '',
      category: data?.item?.getProduct?.category?.id || '',
      is_active: data?.item?.getProduct?.is_active || true,
      weight: data?.item?.getProduct?.weight,
      features:
        data?.item?.getProduct?.features?.length > 0
          ? data?.item?.getProduct?.features
          : [],
      description: data?.item?.getProduct?.description || ''
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: values => {
      setSearchParams({});
      let newFeatures = [];
      values.features.forEach(element => {
        let obj = {
          title: element?.title,
          description: element?.description
        };
        newFeatures.push(obj);
      });
      // eslint-disable-next-line no-unsafe-optional-chaining
      let newVariants = [];
      data.item.getProduct.variants.forEach(element => {
        let obj = {
          images: element?.images.map(img => img.uuid),
          is_unlimited: element?.is_unlimited,
          stock: +element?.stock,
          name: element?.name,
          primary_cost: +element?.primary_cost,
          cost: +element?.cost,
          time_delay: +element?.time_delay
        };
        newVariants.push(obj);
      });
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
            variants: newVariants,
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

      <Grid alignItems="center" justifyContent="space-between" container>
        <Grid
          onClick={() => {
            navigate(`/products/details/${data?.item?.getProduct?.id}`);
          }}
          style={{ display: 'flex' }}
          alignItems="center"
        >
          <i className="df-arrow" />
          <h1>ویرایش محصول</h1>
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
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={data?.item?.getCategories?.results}
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

import { useQuery } from '@apollo/client';
import { Grid, Button, Skeleton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ToggleBox from '../../../../components/shared/ToggleBox';
import { GET_PRODUCT } from '../../../../constant/queries/products';
import { formatNumber } from '../../../../utils/helpers';
import VariantModal from './modal/variantModal';
import { Style } from './style';
import VariantCard from './variantCard';

const ProductDetail = () => {
  const [showMoreModal, setShowMoreModal] = useState('');
  const [selectedProd, setSelectedProd] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: {
      params: {
        limit: 100
      },
      getProductId: params.productId
    },
    fetchPolicy: 'network-only'
  });
  const [accardeonTitle, setAccardeonTitle] = useState('مشخصات و توضیحات');
  window.onpopstate = function () {
    navigate('/products/list');
  };
  history.pushState({}, '');
  return (
    <Style>
      <VariantModal
        product={selectedProd}
        open={showMoreModal}
        close={() => {
          setShowMoreModal(null);
          setSelectedProd('');
        }}
      />
      <Grid pb={2} container alignItems="center" justifyContent="space-between">
        <Grid
          style={{ width: '78%' }}
          onClick={() => navigate('/products/list')}
          className="header"
        >
          <i className="df-arrow" />
          <Typography noWrap component={'h1'}>
            {data?.item?.getProduct?.label || 'محصول'}
          </Typography>
        </Grid>
        <Button
          onClick={() => {
            if (data?.item?.getProduct?.variants?.length > 1) {
              navigate(
                `/products/details/withVariant/${params.productId}/edit`
              );
            } else {
              navigate(`/products/details/${params.productId}/edit`);
            }
          }}
          variant="text"
          style={{ width: '15%' }}
          className="edit-btn"
          startIcon={<i className="df-edit" />}
        >
          ویرایش
        </Button>
      </Grid>
      {loading ? (
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
        <Grid style={{ overflow: 'auto', maxHeight: 'calc(100vh - 90px)' }}>
          <Grid mt={2} container className="image_container">
            <Grid container>
              <h2>تصاویر محصول</h2>
            </Grid>
            <Grid
              style={{
                maxWidth: '100%',
                flexWrap: 'nowrap',
                overflowX: 'auto'
              }}
              mt={2}
              container
              className="images_swiper"
            >
              {data?.item?.getProduct?.images?.map(e => (
                <img key={e.uuid} src={e?.image} />
              ))}
            </Grid>
          </Grid>
          <Grid container mt={2} className="data_container">
            <Grid container>
              <h2>اطلاعات محصول</h2>
            </Grid>
            <Grid mt={3} container>
              <Grid item xs={6} className="right-odd-row">
                <h5>نام</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>{data?.item?.getProduct?.label}</h6>
              </Grid>
            </Grid>
            {data?.item?.getProduct?.variants?.length === 1 && (
              <>
                <Grid container>
                  <Grid item xs={6} className="right-even-row">
                    <h5>قیمت</h5>
                  </Grid>
                  <Grid item xs={6} className="left-even-row">
                    <h6>
                      {formatNumber(
                        data?.item?.getProduct?.variants[0]?.primary_cost
                      )}{' '}
                      تومان
                    </h6>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} className="right-odd-row">
                    <h5>موجودی</h5>
                  </Grid>
                  <Grid item xs={6} className="left-odd-row">
                    <h6>
                      {data?.item?.getProduct?.variants[0]?.is_unlimited
                        ? 'نامحدود'
                        : data?.item?.getProduct?.variants[0]?.stock}
                    </h6>
                  </Grid>
                </Grid>{' '}
              </>
            )}
            <Grid container>
              <Grid item xs={6} className="right-even-row">
                <h5>دسته بندی</h5>
              </Grid>
              <Grid item xs={6} className="left-even-row">
                <h6>{data?.item?.getProduct?.category?.title}</h6>
              </Grid>
            </Grid>
            {data?.item?.getProduct?.variants?.length === 1 && (
              <>
                <Grid container>
                  <Grid item xs={6} className="right-odd-row">
                    <h5>تخفیف</h5>
                  </Grid>
                  <Grid item xs={6} className="left-odd-row">
                    <h6>
                      {formatNumber(
                        data?.item?.getProduct?.variants[0]?.primary_cost -
                          data?.item?.getProduct?.variants[0]?.cost
                      )}{' '}
                      تومان
                    </h6>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} className="right-even-row">
                    <h5>قیمت با تخفیف</h5>
                  </Grid>
                  <Grid item xs={6} className="left-even-row">
                    <h6>
                      {formatNumber(data?.item?.getProduct?.variants[0]?.cost)}{' '}
                      تومان
                    </h6>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid container>
              <Grid item xs={6} className="right-odd-row">
                <h5>وضعیت</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>
                  {' '}
                  {data?.item?.getProduct?.is_active ? 'فعال' : 'غیرفعال'}
                </h6>
              </Grid>
            </Grid>
            {data?.item?.getProduct?.variants?.length === 1 && (
              <Grid container>
                <Grid item xs={6} className="right-even-row">
                  <h5>زمان آماده سازی</h5>
                </Grid>
                <Grid item xs={6} className="left-even-row">
                  <h6>{data?.item?.getProduct?.variants[0]?.time_delay} روز</h6>
                </Grid>
              </Grid>
            )}
            <Grid container>
              <Grid
                item
                xs={6}
                className={
                  data?.item?.getProduct?.variants?.length === 1
                    ? 'right-odd-row'
                    : 'right-even-row'
                }
              >
                <h5>وزن</h5>
              </Grid>
              <Grid
                item
                xs={6}
                className={
                  data?.item?.getProduct?.variants?.length === 1
                    ? 'left-odd-row'
                    : 'left-even-row'
                }
              >
                <h6>{data?.item?.getProduct?.weight} گرم</h6>
              </Grid>
            </Grid>
          </Grid>
          <ToggleBox
            onExpand={() => setAccardeonTitle('مشخصات')}
            onCollapse={() => setAccardeonTitle('مشخصات و توضیحات')}
            isProduct
            name={accardeonTitle}
          >
            {data?.item?.getProduct?.features?.length === 0 ? (
              <Grid
                justifyContent="center"
                alignItems="center"
                container
                className="feauters_cont_empty"
              >
                <p>هنوز مشخصاتی تعریف نکردید!</p>
              </Grid>
            ) : (
              <Grid container className="feauters_cont">
                {data?.item?.getProduct?.features?.map((e, i) => (
                  <Grid key={i} container>
                    <Grid
                      item
                      xs={6}
                      className={
                        i % 2 === 0 ? 'right-odd-row' : 'right-even-row'
                      }
                    >
                      <h5>{e.title}</h5>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      className={i % 2 === 0 ? 'left-odd-row' : 'left-even-row'}
                    >
                      <h6>{e.description}</h6>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
            {data?.item?.getProduct?.description ? (
              <Grid container>
                <Grid container>
                  <h2>توضیحات</h2>
                </Grid>
                <Grid mt={2} container className="desc_container">
                  <p>{data?.item?.getProduct?.description}</p>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid container>
                  <h2>توضیحات</h2>
                </Grid>
                <Grid
                  justifyContent="center"
                  alignItems="center"
                  container
                  className="desc_container_empty"
                >
                  <p>هنوز توضیحاتی تعریف نکردید!</p>
                </Grid>
              </Grid>
            )}
          </ToggleBox>
          {data?.item?.getProduct?.variants?.length > 1 && (
            <Grid mt={3} className="multi_variant_container" container>
              <Grid mb={2} pl={2} container className="multi_variant_title">
                <h3>متغیرهای محصول</h3>
              </Grid>
              {data?.item?.getProduct?.variants?.map(variant => (
                <VariantCard
                  selectedProd={selectedProd}
                  showMoreClick={() => {
                    setShowMoreModal(true);
                    setSelectedProd(variant);
                  }}
                  productname={data?.item?.getProduct?.label}
                  key={variant.id}
                  variant={variant}
                />
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </Style>
  );
};

export default ProductDetail;

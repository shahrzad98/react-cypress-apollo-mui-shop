import { useQuery } from '@apollo/client';
import { Grid, Button, Skeleton } from '@mui/material';
import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { GET_VARIANT } from '../../../../../constant/queries/products';
import { formatNumber } from '../../../../../utils/helpers';
import { Style } from './style';

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_VARIANT, {
    variables: {
      getVariantId: params.variantId
    },
    fetchPolicy: 'network-only'
  });

  window.onpopstate = function () {
    navigate(`/products/details/${data?.item?.getVariant?.product}`);
  };
  history.pushState({}, '');
  const [searchParams] = useSearchParams();
  return (
    <Style>
      <Grid pb={2} container alignItems="center" justifyContent="space-between">
        <Grid
          onClick={() => {
            if (!loading) {
              navigate(`/products/details/${data?.item?.getVariant?.product}`);
            }
          }}
          className="header"
        >
          <i className="df-arrow" />
          <h1>{searchParams?.get('product') || 'جزییات متغیر'}</h1>
        </Grid>
        <Button
          onClick={() => {
            if (!loading) {
              navigate(`/products/detail/variant/${params.variantId}/edit`);
            }
          }}
          variant="text"
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
          <Grid className="options_container" container>
            {data?.item?.getVariant?.option_values?.map((e, i) => {
              if (i + 1 === data?.item?.getVariant?.option_values?.length) {
                return <p key={e.value}>{e.value}</p>;
              } else {
                return <p key={e.value}>{`${e.value} _`}</p>;
              }
            })}
          </Grid>
          <Grid mt={2} container className="image_container">
            <Grid container>
              <h2>تصاویر متغیر</h2>
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
              {data?.item?.getVariant?.images?.map(e => (
                <img key={e.uuid} src={e?.image} />
              ))}
            </Grid>
          </Grid>
          <Grid container mt={2} className="data_container">
            <Grid container>
              <h2>اطلاعات متغیر</h2>
            </Grid>
            <Grid mt={3} container>
              <Grid item xs={6} className="right-odd-row">
                <h5>قیمت</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>
                  {formatNumber(data?.item?.getVariant?.primary_cost)} تومان
                </h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-even-row">
                <h5>موجودی</h5>
              </Grid>
              <Grid item xs={6} className="left-even-row">
                <h6>{data?.item?.getVariant?.stock}</h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-odd-row">
                <h5>زمان آماده سازی</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>{data?.item?.getVariant?.time_delay} روز</h6>
              </Grid>
            </Grid>{' '}
            <Grid container>
              <Grid item xs={6} className="right-even-row">
                <h5>تخفیف</h5>
              </Grid>
              <Grid item xs={6} className="left-even-row">
                <h6>
                  {' '}
                  {formatNumber(
                    data?.item?.getVariant?.primary_cost -
                      data?.item?.getVariant?.cost
                  )}{' '}
                  تومان
                </h6>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} className="right-odd-row">
                <h5>قیمت با تخفیف</h5>
              </Grid>
              <Grid item xs={6} className="left-odd-row">
                <h6>{formatNumber(data?.item?.getVariant?.cost)} تومان</h6>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Style>
  );
};

export default ProductDetail;

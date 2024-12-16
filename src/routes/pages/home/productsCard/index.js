import { Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../../../utils/helpers';
import { Style } from './style';
import { ReactComponent as EmptyImageSvg } from './svg/productNoImage.svg';
import { ReactComponent as EmptyProductsSvg } from './svg/emptyProducts.svg';

const ProductsCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Style container>
      <Grid className="header" container justifyContent="space-between">
        <h3>جدیدترین محصول ها</h3>
        <Button
          data-cy="allProductsBtn"
          onClick={() => navigate('/products/list')}
          style={{ height: '24px', color: '#483493' }}
          endIcon={
            <i
              className="df-arrow"
              style={{
                transform: 'rotate(180deg)',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            />
          }
        >
          همه
        </Button>
      </Grid>
      <Grid className="orders_cont" container>
        {data?.length < 1 ? (
          <Grid className="empty">
            <EmptyProductsSvg />
            <p>هنوز محصولی تعریف نکرده اید.</p>
          </Grid>
        ) : (
          data?.map((e, i) => (
            <Grid
              justifyContent="space-between"
              alignItems="center"
              style={{
                borderBottom:
                  i + 1 === data?.length ? 'none' : '0.5px solid #c9c3e0'
              }}
              className="order_card"
              key={e.id}
              container
            >
              <Grid item xs={8} container>
                <Grid
                  onClick={() => navigate(`/products/details/${e.id}`)}
                  container
                  justifyContent="center"
                  alignItems="center"
                  className="icon_order_cont"
                >
                  {e?.image?.image ? (
                    <img src={e?.image?.image} />
                  ) : (
                    <EmptyImageSvg />
                  )}
                </Grid>
                <Grid ml={1}>
                  <h6>{e?.label}</h6>
                  <h6 style={{ marginTop: '7px' }}>
                    {formatNumber(e?.primary_cost)} تومان
                  </h6>
                </Grid>
              </Grid>
              <div style={{ textAlign: 'end' }}>
                <p
                  style={{ color: e?.is_active ? '#00CE7D' : '#C9C3E0' }}
                  className="activeness"
                >
                  {e?.is_active ? 'فعال' : 'غیرفعال'}
                </p>
                <p
                  style={{
                    marginTop: '7px',
                    color:
                      e?.unlimited_variant_count > 0 || e?.stock > 0
                        ? '#9185BE'
                        : '#EA002A'
                  }}
                  className="activeness"
                >
                  {e?.unlimited_variant_count > 0
                    ? 'نامحدود'
                    : e?.stock > 0
                    ? `${e?.stock} کالا`
                    : 'ناموجود'}
                </p>
              </div>
            </Grid>
          ))
        )}
      </Grid>
    </Style>
  );
};

export default ProductsCard;

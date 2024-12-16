import { Grid, IconButton, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../../../../utils/helpers';
import { Style } from './style';
import { ReactComponent as MoreSVG } from './svg/moreInfoSVG.svg';
import { ReactComponent as MultiVariantSVG } from './svg/multiVariant.svg';

const ProductCard = ({ product, showMoreClick, selectedProd }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  return (
    <Style
      onClick={() => navigate(`/products/details/${product.id}`)}
      ref={cardRef}
      data-cy="product-card"
      style={{
        zIndex:
          selectedProd.id == product?.id &&
          cardRef.current.getBoundingClientRect().top < 395
            ? 1500
            : '',
        position: 'relative'
      }}
      container
    >
      <Grid className="image-cont">
        {product?.variants?.length > 1 && (
          <div className="multiVariant" data-cy="svgVariant">
            <MultiVariantSVG />
          </div>
        )}
        {product?.image?.image ? (
          <img src={product?.image?.image} />
        ) : (
          <i className="df-product" />
        )}
      </Grid>
      <Grid pl={1} alignContent="space-between" className="content" container>
        <Grid container justifyContent="space-between">
          <Typography style={{ width: '90%' }} noWrap>
            {product?.name}
          </Typography>
          <IconButton style={{ padding: '4px' }} data-cy="showMoreClick">
            <MoreSVG
              onClick={e => {
                e.stopPropagation();
                showMoreClick();
              }}
            />
          </IconButton>
        </Grid>
        <Grid container>
          <Grid className="border_right" container>
            {product?.variants?.length > 1 && (
              <Grid item xs={12} container>
                <Grid style={{ width: '30%' }} item className="title">
                  <p>متغیر</p>
                </Grid>
                <Grid container style={{ width: '70%' }} className="value">
                  {product?.options.map((e, i) => (
                    <p
                      style={{
                        borderLeft:
                          i === product?.options?.length - 1 ? 'none' : '',
                        paddingRight: i === 0 ? 0 : ''
                      }}
                      className="option_value"
                      key={e}
                    >
                      {e}
                    </p>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid className="border_right" container>
            <Grid item xs={12} container>
              <Grid style={{ width: '30%' }} item className="title">
                <p>دسته بندی</p>
              </Grid>
              <Grid
                container
                style={{ width: '70%', overflowX: 'auto' }}
                className="value"
              >
                <p style={{ whiteSpace: 'nowrap' }}>{product?.category}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="border_right" container>
            <Grid container item xs={6}>
              <Grid style={{ width: '60%' }} item className="title">
                <p>وضعیت</p>
              </Grid>
              <Grid item className="value">
                <p style={{ color: !product?.is_active ? '#EA002A' : '' }}>
                  {product?.is_active ? 'فعال' : 'غیرفعال'}
                </p>
              </Grid>
            </Grid>
            {product?.variants?.length === 1 &&
              product?.variants[0].cost < product?.variants[0].primary_cost && (
                <Grid
                  alignItems="center"
                  item
                  container
                  xs={6}
                  justifyContent="flex-end"
                >
                  <p className="price_primary">
                    {formatNumber(product?.variants[0]?.primary_cost)}{' '}
                  </p>
                  <span style={{ marginRight: '3px' }}> تومان </span>
                </Grid>
              )}
          </Grid>
          {product?.variants?.length === 1 && (
            <Grid className="border_right" container>
              <Grid container item xs={6}>
                <Grid style={{ width: '60%' }} item className="title">
                  <p style={{ marginBottom: 0 }}>موجودی</p>
                </Grid>
                <Grid
                  style={{ display: 'flex', alignItems: 'center' }}
                  item
                  className="value"
                >
                  <p
                    style={{
                      marginBottom: 0,
                      fontSize: product?.variants[0]?.is_unlimited
                        ? '10px'
                        : '12px'
                    }}
                  >
                    {product?.variants[0]?.is_unlimited
                      ? 'نامحدود'
                      : product?.variants[0].stock}
                  </p>
                </Grid>
              </Grid>
              <Grid item container xs={6} justifyContent="flex-end">
                <p className="price">
                  {formatNumber(product?.variants[0]?.cost)} <span>تومان</span>{' '}
                </p>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Style>
  );
};

export default ProductCard;

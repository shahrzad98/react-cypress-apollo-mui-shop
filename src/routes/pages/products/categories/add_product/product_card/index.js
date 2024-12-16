import { useMutation } from '@apollo/client';
import { CircularProgress, Grid } from '@mui/material';
import React, { useState } from 'react';
import { PARTIAL_UPDATE_PRODUCT } from '../../../../../../constant/mutations/products';
import { Style } from './style';
import { ReactComponent as ActiveSVG } from './svg/active.svg';
import { ReactComponent as DisableSVG } from './svg/disable.svg';

const CategoryProductCard = ({ product, categoryId, is_active }) => {
  const [isActive, setIsActive] = useState(is_active);
  const [editProduct, { loading }] = useMutation(PARTIAL_UPDATE_PRODUCT);
  return (
    <Style mt={2} container>
      <Grid className="inner1" container></Grid>
      <Grid
        data-cy="CategoryProductCard"
        onClick={() => {
          // onClick();
          if (!isActive) {
            editProduct({
              variables: {
                partialUpdateProductId: product?.id,
                content: {
                  category: +categoryId
                }
              },
              onCompleted: () => {
                setIsActive(true);
              }
            });
          }
          if (isActive) {
            editProduct({
              variables: {
                partialUpdateProductId: product?.id,
                content: {
                  category: 0
                }
              },
              onCompleted: () => {
                setIsActive(false);
              }
            });
          }
        }}
        className="inner2"
        container
      >
        {product?.image?.image || product?.images?.length > 0 ? (
          <img
            src={
              product?.image?.image
                ? product?.image?.image
                : product?.images?.length > 0
                ? product?.images[0]?.image
                : ''
            }
          />
        ) : (
          <div className="empty_prod_cont">
            <i className="df-product" />
          </div>
        )}
        <Grid
          style={{ width: '76%' }}
          container
          alignItems="space-between"
          ml={1}
        >
          <Grid container>
            <h4>{product?.name || product?.label || 'unkonwn'}</h4>
          </Grid>
          <Grid alignItems="flex-end" justifyContent="flex-end" container>
            <h4>
              {product?.cost || product?.variants[0]?.cost || 'unkonwn'} تومان
            </h4>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        onClick={() => {
          // onClick();
          if (!isActive) {
            editProduct({
              variables: {
                partialUpdateProductId: product?.id,
                content: {
                  category: +categoryId
                }
              },
              onCompleted: () => {
                setIsActive(true);
              }
            });
          }
          if (isActive) {
            editProduct({
              variables: {
                partialUpdateProductId: product?.id,
                content: {
                  category: 0
                }
              },
              onCompleted: () => {
                setIsActive(false);
              }
            });
          }
        }}
        className="inner3"
        container
      >
        {loading ? (
          <CircularProgress style={{ width: '15px', height: '15px' }} />
        ) : isActive ? (
          <ActiveSVG />
        ) : (
          <DisableSVG />
        )}
      </Grid>
    </Style>
  );
};

export default CategoryProductCard;

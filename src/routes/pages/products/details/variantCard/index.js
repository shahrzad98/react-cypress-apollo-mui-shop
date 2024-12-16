import { Grid, IconButton, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../../../../utils/helpers';
import { Style } from './style';
import { ReactComponent as MoreSVG } from './svg/moreInfoSVG.svg';

const VariantCard = ({ variant, productname, selectedProd, showMoreClick }) => {
  const cardRef = useRef(null);

  return (
    <Style
      data-cy="variantCard"
      ref={cardRef}
      style={{
        zIndex:
          selectedProd.id == variant?.id &&
          cardRef.current.getBoundingClientRect().top < 600
            ? 1500
            : '',
        position: 'relative'
      }}
      container
    >
      <Link
        data-cy="variantCardLink"
        to={`/products/detail/variant/${variant.id}?product=${productname}`}
      >
        <Grid className="image-cont">
          {variant?.images?.length > 0 ? (
            <img src={variant?.images[0]?.image} />
          ) : (
            <i className="df-product" />
          )}
        </Grid>
      </Link>
      <Grid pl={1} alignContent="space-between" className="content" container>
        <Grid container justifyContent="space-between">
          <Typography style={{ width: '80%' }} noWrap>
            {variant?.name}
          </Typography>
          <IconButton style={{ padding: '4px' }}>
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
            {variant?.option_values?.map((e, i) => (
              <>
                <Grid key={e.id} item xs={7} container>
                  <Grid style={{ width: '50%' }} item className="title">
                    <p>{e?.option?.name}</p>
                  </Grid>
                  <Grid container style={{ width: '50%' }} className="value">
                    <p className="option_value">{e?.value}</p>
                  </Grid>
                </Grid>
                {i + 1 === variant?.option_values?.length &&
                  variant?.cost < variant?.primary_cost && (
                    <Grid
                      alignItems="center"
                      item
                      container
                      xs={5}
                      justifyContent="flex-end"
                    >
                      <p className="price_primary">
                        {formatNumber(variant.primary_cost)}{' '}
                      </p>
                      <span style={{ marginRight: '3px' }}> تومان </span>
                    </Grid>
                  )}
              </>
            ))}
          </Grid>

          <Grid className="border_right" container>
            <Grid container item xs={7}>
              <Grid style={{ width: '50%' }} item className="title">
                <p style={{ marginBottom: 0 }}>موجودی</p>
              </Grid>
              <Grid item className="value">
                <p style={{ marginBottom: 0 }}>{variant?.stock}</p>
              </Grid>
            </Grid>
            <Grid item container xs={5} justifyContent="flex-end">
              <p className="price">
                {formatNumber(variant?.cost)} <span>تومان</span>{' '}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Style>
  );
};

export default VariantCard;

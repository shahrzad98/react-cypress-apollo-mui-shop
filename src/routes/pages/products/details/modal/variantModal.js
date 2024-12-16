import { Button, Grid } from '@mui/material';
import React from 'react';
import { Style } from './style';
import { ReactComponent as EditSVG } from './svg/edit.svg';
import { Link } from 'react-router-dom';

const VariantModal = ({ close, open, product }) => {
  return (
    <Style open={open} onClose={close} anchor="bottom">
      <Grid container className="content">
        <Grid container justifyContent="center">
          {' '}
          <Grid className="divider"></Grid>
        </Grid>
        <Grid container>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/products/detail/variant/${product.id}/edit`}
          >
            <Button
              onClick={() => {
                close();
              }}
              className="btn"
              startIcon={<EditSVG />}
            >
              ویرایش
            </Button>
          </Link>
        </Grid>
        {/* 
        <Grid container>
          <a
            style={{ textDecoration: 'none' }}
            target="_blank"
            rel="noreferrer"
            href={
              window.location.host?.includes('apps')
                ? `https://shop.apps.digify.shop/4/product/${product.id}`
                : `https://shop.digify.shop/4/product/${product.id}`
            }>
            <Button className="btn" startIcon={<ShowSVG />}>
              نمایش در فروشگاه
            </Button>
          </a>
        </Grid> */}
      </Grid>
    </Style>
  );
};

export default VariantModal;

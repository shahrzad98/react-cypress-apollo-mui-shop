import { Button, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as ProductSVG } from './svg/product.svg';
import { ReactComponent as DiscountSVG } from './svg/discount.svg';
import { ReactComponent as CategorySvg } from './svg/category.svg';

const CreateDrawer = ({ open, close }) => {
  const navigate = useNavigate();

  return (
    <Style onClose={close} anchor="bottom" open={open}>
      <Grid container justifyContent="center">
        <div className="divider"></div>
      </Grid>
      <Grid container>
        <Button
          onClick={() => {
            close();
            navigate('/products/create_product');
          }}
          data-cy="definition_btn"
          className="btn mt-32"
          startIcon={<ProductSVG />}
        >
          تعریف محصول
        </Button>
      </Grid>
      <Grid container>
        <Button
          data-cy="definition_btn"
          onClick={() => {
            close();
            navigate('/products/categories/create_category');
          }}
          className="btn"
          startIcon={<CategorySvg />}
        >
          تعریف دسته بندی
        </Button>
      </Grid>
      <Grid container>
        <Button
          data-cy="definition_btn"
          onClick={() => {
            close();
            navigate('/products/discounts/create');
          }}
          className="btn"
          startIcon={<DiscountSVG />}
        >
          تعریف تخفیف
        </Button>
      </Grid>
    </Style>
  );
};

export default CreateDrawer;

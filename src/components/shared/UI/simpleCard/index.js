import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import React from 'react';
import { ReactComponent as ProductSVG } from './svg/product.svg';
import { ReactComponent as DiscountSVG } from './svg/discount.svg';
import { ReactComponent as CategorySVG } from './svg/category.svg';

const Style = styled(Grid)({
  width: '100%',
  height: '88px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(72, 52, 147, 0.08)',
  backgroundColor: '#FFF',
  marginTop: '16px',
  padding: '0 16px',
  '& h3': {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'normal'
  }
});

const SimpleCard = ({ isProduct, name, icon, clickHandler, id }) => {
  const renderProductIcon = icon => {
    switch (icon) {
      case 'product':
        return <ProductSVG />;

      case 'discount':
        return <DiscountSVG />;

      case 'category':
        return <CategorySVG />;

      default:
        return;
    }
  };

  return (
    <Style
      data-cy='order_card'
      onClick={clickHandler}
      container
      alignItems="center"
      justifyContent="space-between">
      <h3>
        {name}{' '}
        {(id === 2 || id === 3) && !isProduct ? (
          <i
            style={{
              fontSize: '8px',
              color: id === 2 ? '#483493' : '#EA002A',
              marginRight: '4px'
            }}
            className="df-order-notif"></i>
        ) : (
          ''
        )}
      </h3>
      {isProduct ? (
        renderProductIcon(icon)
      ) : (
        <i style={{ color: '#DAD6E9', fontSize: '40px' }} className={icon}></i>
      )}
    </Style>
  );
};

export default SimpleCard;

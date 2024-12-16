import styled from '@emotion/styled';
import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const Style = styled(Grid)`
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  height: 180px;
  background-color: #fff;
  .img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
  .title1 {
    border-radius: 5px;
    width: 100%;
    height: 15px;
  }
  .title2 {
    border-radius: 5px;
    width: 100%;
    height: 30px;
  }
  .title3 {
    border-radius: 5px;
    width: 100%;
    height: 20px;
  }
`;

const OrderSkeleton = () => {
  return <Style mt={2} container>
      <Skeleton variant='rectangular' container className='title1'></Skeleton>
      <Skeleton variant='rectangular' mt={2} container className='title2'></Skeleton>
      <Skeleton variant='rectangular' mt={2} container className='title3'></Skeleton>
  </Style>;
};

export default OrderSkeleton;

import styled from '@emotion/styled';
import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const Style = styled(Grid)`
  padding: 16px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  height: 100px;
  .title1 {
    width: 30%;
    height: 25px;
    border-radius: 3px;
  }
`;

const FinanceSkeleton = () => {
  return <Style mt={2} container>
      <Grid container justifyContent='space-between'>
          <Skeleton variant='rectangular' className='title1'/>
          <Skeleton variant='rectangular' className='title1'/>
      </Grid>
      <Grid container justifyContent='space-between'>
          <Skeleton variant='rectangular' className='title1'/>
          <Skeleton variant='rectangular' className='title1'/>
          <Skeleton variant='rectangular' className='title1'/>
      </Grid>
  </Style>;
};

export default FinanceSkeleton;

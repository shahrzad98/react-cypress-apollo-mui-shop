import styled from '@emotion/styled';
import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const Style = styled(Grid)`
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  height: 85;
  background-color: #fff;
  .img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
  }
  .title {
    border-radius: 5px;
    width: 30%;
    height: 20px;
  }
  .title2 {
    border-radius: 5px;
    width: 10%;
    height: 20px;
  }
  .title3 {
    border-radius: 5px;
    width: 50%;
    height: 20px;
  }
`;

const CategorySkeleton = () => {
  return (
    <Style container mt={2}>
      <Grid item xs={2}>
        <Skeleton variant="rectangular" className="img" />
      </Grid>
      <Grid pl={2} item xs={8}>
        <Grid container justifyContent="space-between">
          <Skeleton className="title3" variant="rectangular" />
        </Grid>
        <Grid mt={1} container justifyContent="space-between">
          <Skeleton className="title" variant="rectangular" />
        </Grid>
      </Grid>
    </Style>
  );
};

export default CategorySkeleton;

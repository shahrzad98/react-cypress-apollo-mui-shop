import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

const CenteredLoading = ({ color, mt = '150px' }) => {
  return (
    <Grid container justifyContent="center" mt={mt}>
      <CircularProgress color={color} />
    </Grid>
  );
};

export default CenteredLoading;

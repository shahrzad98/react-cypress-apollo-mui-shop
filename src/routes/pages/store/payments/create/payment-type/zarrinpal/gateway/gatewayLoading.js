import * as React from 'react';
import { Grid } from '@mui/material';
import { StyledGrid } from '../style';
import FallbackLoading from '../../../../../../../../components/shared/FallbackLoading';

const GatewayLoading = () => {
  return (
    <StyledGrid container>
      <Grid className="header">
        <Grid className="back-link">
          <i className="df-arrow" />
          <h1>زرین پال</h1>
        </Grid>
      </Grid>
      <Grid w={1}>
        <FallbackLoading />
      </Grid>
    </StyledGrid>
  );
};

export default GatewayLoading;

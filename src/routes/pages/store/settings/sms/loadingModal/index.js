import styled from '@emotion/styled';
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

const Style = styled(Grid)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.6);
  position: fixed;
  top: 0;
  right: 0;
`;

const LoadingModal = () => {
  return (
    <Style container justifyContent="center" alignItems="center">
      <CircularProgress />
    </Style>
  );
};

export default LoadingModal;

import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

const Style = styled(Grid)({
  boxShadow: '0 2px 8px 0 rgb(72 52 147 / 8%)',
  borderRadius: '10px',
  background: '#fff',
  padding: '1rem',
  marginTop: '1rem'
});

const Box = ({ children }) => <Style>{children}</Style>;

export default Box;

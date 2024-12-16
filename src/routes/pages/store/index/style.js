import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  .header {
    h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
  }
  .card {
    height: 88px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    padding: 0 16px;
    h2 {
      font-size: 18px;
      font-weight: 400;
      color: #101820;
      margin: 0;
    }
  }
`;

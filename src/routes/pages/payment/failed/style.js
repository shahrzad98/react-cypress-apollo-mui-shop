import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  position: relative;
  .header {
    h1 {
      font-size: 20px;
      font-weight: 500;
      color: #101820;
      margin: 0;
    }
  }
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
  }
  p {
    text-align: center;
    margin: 0;
  }
  .content {
    height: calc(100vh - 100px);
    background-color: #fff;
    border-radius: 10px;
    padding: 0 16px;
  }
`;

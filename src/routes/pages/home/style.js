import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  padding-bottom: 80px;
  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: #101820;
  }
  .icon-header {
      margin-left: 16px;
  }
  h2 {
      font-weight: 400;
      font-size: 18px;
      margin: 0;
      margin-top: 16px;
  }
  .skelet {
    width: 100%;
    height: 300px;
    margin-top: 24px;
    border-radius: 10px;
    text-align: center;
  }
  .skelet-text {
    width: 100%;
    height: 70px;
    margin-top: 24px;
    border-radius: 10px;
  }
  .logo-skelet {
    width: 50px;
    height: 50px;
  }
`;

import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  .content {
    width: 92vw;
    background-color: #fff;
    border-radius: 10px;
    height: auto;
    .icon_btn {
      padding: 0;
    }
    h3 {
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
      margin: 0;
    }
    h4 {
      font-size: 16px;
      font-weight: 400;
      color: #6a6f80;
      margin: 0;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
  }
`;

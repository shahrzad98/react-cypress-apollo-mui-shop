import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10000;
  padding: 24px 16px;

  h1 {
    margin: 0;
    color: #101820;
    font-size: 20px;
    font-weight: 500;
    margin-left: 15px;
  }
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .df-arrow {
      color: #101820;
      font-size: 18px !important;
      font-weight: 700;
      transform: none !important;
    }
  }
  img {
    width: 100%;
    height: 45% !important;
    margin-top: 50% !important;
  }
`;

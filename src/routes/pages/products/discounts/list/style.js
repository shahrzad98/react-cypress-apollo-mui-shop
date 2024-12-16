import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  .count {
    margin: 0;
    color: #9fa6b9;
    font-size: 14px;
    font-weight: 400;
  }
  .header {
    display: flex;
    align-items: center;
    h1 {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
    .df-arrow {
      margin-right: 10px;
      font-size: 15px;
      font-weight: 700;
    }
  }
  .scrollabale {
    padding: 0 0 65px;
    max-height: calc(100vh - 160px);
    overflow-y: auto;
    margin-top: 20px;
    .infinite-scroll-component__outerdiv {
      width: 100%;
    }
    .mask {
      width: 100vw;
      height: 100vh;
      background-color: transparent;
      position: fixed;
      top: 0;
      left: 0;
    }
  }
  .footer {
      position: fixed;
      bottom: 0;
      right: 0;
      padding: 0 16px;
      background-color: #F5F6FA;
      display: flex;
      align-items: center;
      height: 80px;
  }
`;

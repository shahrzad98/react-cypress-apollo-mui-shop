import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  .header {
    display: flex;
    align-items: center;
    i {
      color: #000;
      font-weight: 700;
      margin-right: 12px;
    }
    h1 {
      font-size: 20px;
      margin: 0;
      font-weight: 500;
    }
  }
  .title {
    border-left: 1.5px solid #dad6e9;
    padding-left: 16px;
    p {
      margin: 0;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .scrollabale {
    max-height: calc(100vh - 275px);
    overflow-y: auto;
    /* margin-top: 20px; */
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
    left: 0;
    width: 100vw;
    height: 75px;
    box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
    background-color: #f5f6fa;
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
`;

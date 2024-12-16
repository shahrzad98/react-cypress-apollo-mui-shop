import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  position: relative;
  height: 100vh;
  .header {
    display: flex;
    align-items: center;
    h1 {
      font-size: 20px;
      font-weight: 500;
      color: #101820;
      margin: 0;
    }
    .df-arrow {
      font-size: 20px;
      font-weight: 700;
      margin-right: 12px;
    }
  }
  .scrollabale {
    padding: 0 0 100px;
    max-height: calc(100vh - 145px);
    overflow-y: auto;
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
`;

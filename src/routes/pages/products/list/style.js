import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  max-height: 100vh;
  overflow-y: hidden;
  .df-arrow {
    color: #101820;
    font-size: 20px;
    font-weight: 700;
  }
  .header_count {
    margin: 0;
    color: #9FA6B9;
    font-size: 14px;
  }
  h1 {
    margin: 0;
    color: #101820;
    font-size: 20px;
    font-weight: 500;
    margin-left: 15px;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .scrollabale {
    padding: 0 0 100px;
    max-height: calc(100vh - 100px);
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
`;

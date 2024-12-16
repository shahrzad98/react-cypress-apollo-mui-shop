import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    height: 100vh;
    padding: 24px 16px;
    background-color: #f5f6fa;
    position: relative;
    .header {
      display: flex;
      align-items: center;
      h1 {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
      }
      .df-arrow {
        font-size: 18px;
        margin-right: 12px;
      }
    }
    .map_container {
      height: calc(100vh - 150px);
      background-color: #454545;
      border-radius: 10px;
      overflow: hidden;
    }
    .footer {
      height: 72px;
      background-color: #f5f6fa;
      box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
      display: flex;
      align-items: center;
      padding: 0 16px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
`;

import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    height: 100vh;
    padding: 24px 16px;
    background-color: #f5f6fa;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
    .content {
      padding: 16px;
      border-radius: 16px;
      background-color: #fff;
      height: calc(100vh - 200px);
      h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: #6a6f80;
      }
      .dropdown-opened {
        position: absolute;
        right: 20px;
        transform: rotate(-90deg);
        color: #483493;
      }
      .dropdown {
        position: absolute;
        right: 20px;
        transform: rotate(90deg);
        color: #483493;
      }
    }
    .footer {
      box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
      height: 80px;
      position: fixed;
      bottom: 0;
      right: 0;
      display: flex;
      padding: 0 16px;
      align-items: center;
    }
  }
`;

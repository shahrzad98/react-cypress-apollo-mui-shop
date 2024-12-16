import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    height: 100vh;
    background-color: #f5f6fa;
    padding: 24px 16px;
    position: relative;
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
    .content {
      box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
      border-radius: 10px;
      background-color: #fff;
      height: calc(100vh - 180px);
      padding: 24px 16px;
      overflow-y: auto;
      h3 {
        font-size: 16px;
        color: #6a6f80;
        font-weight: 400;
        margin: 0;
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
      .price-range-input {
        width: 40%;
      }
    }
    .footer {
      height: 78px;
      background-color: #f5f6fa;
      box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
      padding: 0 16px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
`;

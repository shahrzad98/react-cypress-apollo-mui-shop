import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
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
  .error_container {
    height: 50px;
    background-color: #ee3b4f18;
    border-radius: 10px;
    padding: 0 16px;
    h3 {
      font-size: 14px;
      font-weight: 400;
      color: #ee3b4f;
      margin-left: 8px;
    }
  }
  .content {
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    border-radius: 10px;
    padding: 18px 16px;
    height: calc(100vh - 180px);
    overflow-y: auto;
    background-color: #fff;
    .divider {
      height: 0.5px;
      background-color: #c9c3e0;
    }
    h4 {
      margin: 0;
      color: #6a6f80;
      font-size: 18px;
      font-weight: 500;
    }
    h5 {
      margin: 0;
      color: #adaaba;
      font-size: 14px;
      font-weight: 300;
    }
    h6 {
      color: #6a6f80;
      font-size: 14px;
      font-weight: 300;
      margin: 0;
    }
    .right-odd-row {
      padding-left: 16px;
      display: flex;
      align-items: center;
      height: 48px;
      border-radius: 16px 0 0 16px;
      background-color: #f3f3f3;
    }
    .left-odd-row {
      padding-left: 16px;
      display: flex;
      align-items: center;
      height: 48px;
      border-radius: 0 16px 16px 0;
      background-color: #f3f3f3;
      border-left: 1px solid #fff;
    }
    .right-even-row {
      padding-left: 16px;
      display: flex;
      align-items: center;
      height: 48px;
      border-radius: 16px 0 0 16px;
      background-color: #fff;
    }
    .left-even-row {
      padding-left: 16px;
      display: flex;
      align-items: center;
      height: 48px;
      border-radius: 0 16px 16px 0;
      background-color: #fff;
      border-left: 1px solid #f3f3f3;
    }
  }
  .factor {
    .content_factor {
      border: 0.5px solid #c9c3e0;
      border-top: none;
      padding: 16px;
      border-radius: 0 0 10px 10px;
      .title {
        margin: 0;
        color: #adaaba;
        font-size: 14px;
        font-weight: 400;
      }
      .value {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: #101820;
      }
      .little {
        font-size: 10px;
        margin-left: 2px;
      }
    }
    .header_factor {
      background-color: #f3f3f3;
      border-radius: 10px 10px 0 0;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 16px;

      h6 {
        margin: 0;
        color: #6a6f80;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
  .voucher_input {
    .MuiOutlinedInput-root {
      padding-right: 0;
    }
    button {
      color: #483493;
      height: 100%;
      padding: 0;
    }
  }
  .voucher_ticket {
    height: 54px;
    background-color: #f3f3f3;
    border-radius: 10px;
    border: 0.5px solid #c9c3e0;
    padding-left: 16px;
    overflow: hidden;
    svg {
      margin-right: 8px;
    }
    p {
      color: #adaaba;
      margin: 0;
      font-size: 14px;
      font-weight: 400;
      display: flex;
    }
    button {
      height: 100%;
      width: 50px;
      background-color: #fff;
      border-radius: 0;
      border-left: 0.5px dashed #c9c3e0;
      color: #483493;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 85px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
  }
`;

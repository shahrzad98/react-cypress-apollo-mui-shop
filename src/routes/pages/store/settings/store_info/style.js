import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
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
    padding: 18px 16px;
    height: calc(100vh - 105px);
    overflow-y: auto;
    background-color: #fff;
    .text-progress {
      h2 {
        color: #9fa6b9;
        margin: 0;
        font-size: 14px;
        font-weight: 400;
      }
      .line {
        height: 0.5px;
        background-color: #9fa6b988;
      }
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
    .address-container {
      border-left: 2px solid #f1f1f1;
      padding-left: 12px;
      margin-top: 12px;
      h6 {
        margin-top: 8px;
      }
      h4 {
        color: #000;
        font-size: 14px;
        font-weight: 300;
        margin: 0;
        display: flex;
        align-items: center;
        i {
          margin-bottom: 0;
        }
      }
      button {
        height: 10px;
        padding: 0;
      }
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
  .progressCont {
    width: 85px;
    height: 85px;
    .svg {
      width: 47px;
      height: 47px;
    }
  }
  button {
    color: #483493;
    height: 30px;
    .df-edit {
      font-size: 15px;
    }
  }
`;

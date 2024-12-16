import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  position: relative;
  height: auto;
  padding-bottom: 120px;
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
  .logBtn {
    padding: 0;
    height: 30px;
    justify-content: flex-end;
    color: #483493;
  }
  .amount_cont {
    height: 160px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    border-radius: 10px;
    background-color: #fff;
    padding: 16px;
    position: relative;
    .circle {
      background-color: #c9c3e0;
      width: 46px;
      height: 46px;
      z-index: 100;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 4px;
    }
    h1 {
      color: #6a6f80;
      font-size: 30px;
      font-weight: 500;
      margin: 0;
      z-index: 100;
      margin-left: 16px;
      span {
        font-size: 16px;
      }
    }
    .banner_cont {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 100%;
      }
    }
  }
  .content {
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    padding: 16px;
    h2 {
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
      margin: 0;
    }
    .box_amount {
      height: 44px;
      width: 100%;
      border: 1px solid #9185be;
      border-radius: 10px;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
    .active {
      background-color: #6d5da9;
      color: #fff;
      border: none;
    }
    .input_box {
      border: 1px solid #9185be;
      height: 44px;
      border-radius: 10px;
      .add_btn {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 0.5px solid #c9c3e0;
        width: 12%;
      }
      .remove_btn {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 0.5px solid #c9c3e0;
        width: 12%;
      }
      .input_cont {
        width: 76%;
        position: relative;
        span {
          position: absolute;
          right: 15px;
          font-size: 12px;
          top: 12px;
        }
        .input_real {
          height: 100%;
          border: none;
          outline: none;
          font-family: iransans;
          text-align: center;
          width: 100%;
        }
      }
    }
    .divider {
      height: 1px;
      background-color: #c9c3e0;
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
  }
  .footer {
    height: 75px;
    background-color: #f5f6fa;
    box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9999;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
`;

import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  padding-bottom: 100px;
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
  .card {
    height: 65px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    background-color: #fff;
    padding: 0 16px;
    .title {
      display: flex;
      h2 {
        font-size: 16px;
        font-weight: 400;
        margin: 0;
      }
      svg {
        margin-right: 16px;
      }
    }
    .df-arrow {
      transform: rotate(180deg);
      display: block;
      color: #483493;
      font-size: 18px;
    }
  }
  .wallet-card {
    height: 130px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    background-color: #fff;
    padding: 0 16px;
    .circle {
      width: 80px;
      height: 80px;
      background-color: #f3f3f3;
      border: 0.5px solid #dad6e9;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title {
      margin-left: 16px;
      margin-top: 7px;
      h2 {
        font-size: 14px;
        font-weight: 400;
        margin: 0;
      }
      h3 {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
        margin-top: 16px;
        color: #6A6F80;
        span {
          font-size: 12px;
        }
      }
      svg {
        margin-right: 16px;
      }
    }
    .df-arrow {
      transform: rotate(180deg);
      display: block;
      color: #483493;
      font-size: 18px;
    }
  }
`;

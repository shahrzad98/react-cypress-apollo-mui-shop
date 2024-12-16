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
      margin: 0;
    }
    .df-arrow {
      margin-right: 10px;
      font-size: 15px;
      font-weight: 700;
    }
  }
  .content {
    border-radius: 16px;
    height: auto;
    background-color: #fff;
    padding: 16px;
    h2 {
      font-size: 16px;
      font-weight: 400;
      margin: 0;
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
    form {
      width: 100%;
    }
    .endAdornment {
      font-size: 14px;
      font-weight: 400;
      margin: 0;
      color: #9185be;
    }
    .error {
      font-size: 12px;
      font-weight: 400;
      color: #ff3262;
    }
    .footer {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 75px;
      background-color: #f5f6fa;
      box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
      display: flex;
      align-items: center;
      padding: 0 16px;
    }
  }
`;

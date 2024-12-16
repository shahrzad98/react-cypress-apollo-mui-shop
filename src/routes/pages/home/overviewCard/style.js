import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 16px;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  background-color: #FFF;
  border-radius: 10px;
  margin-top: 16px;
  .banner {
      height: 60px;
      position: relative;
  }
  .logo {
      width: 48px;
      height: 48px;
      background-color: #C9C3E0;
      border-radius: 100%;
      z-index: 10;
      margin-top: 25px;
      display: flex;
      justify-content: center;
      overflow: hidden;
  }
  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: #101820;
  }
  .icon-header {
      margin-left: 16px;
  }
  h2 {
      font-weight: 400;
      font-size: 18px;
      margin: 0;
      margin-top: 16px;
  }
  h3 {
      margin: 0;
      font-weight: 700;
      font-size: 16px;
      color: #6A6F80;
  }
  h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 400;
      color: #6A6F80;
  }
  h6 {
      margin: 0;
      font-weight: 500;
      font-size: 16px;
      color: #6A6F80;
  }
  h5 {
      margin: 0;
      font-weight: 400;
      color: #BAB4CE;
      font-size: 12p;
  }
  p {
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      color: #BAB4CE;
  }
  .name {
      margin-top: 30px;
  }
  .brief-row {
      border-right: 0.5px solid #C9C3E0;
      height: 40px;
      text-align: center;
  }
`;

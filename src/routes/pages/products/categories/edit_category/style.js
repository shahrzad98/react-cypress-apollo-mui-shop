import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  .error {
    color: #EA002A;
    margin: 0;
  }
  .header {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
      margin-right: 15px;
    }
    h1 {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
  }

  .content {
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    background-color: #fff;
    height: calc(100vh - 175px);
    padding: 16px;
    h2 {
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
      margin: 0;
    }
    h3 {
      font-size: 16px;
      font-weight: 400;
      color: #6a6f80;
      margin: 0;
    }
    .removeImage {
      border: 0.5px solid #dad6e9;
      border-radius: 8px 0;
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .square {
      width: 48%;
      height: 145px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dashed {
      border: 0.5px dashed #6a6f80;
    }
    .img {
      border: 0.5px solid #dad6e9;
      background-color: #f3f3f3;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    right: 0;
    box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
  }
`;

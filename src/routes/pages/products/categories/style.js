import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  padding-bottom: 90px;
  .count {
    margin: 0;
    color: #9fa6b9;
    font-size: 14px;
    font-weight: 400;
  }
  .header {
    display: flex;
    align-items: center;
    i {
      color: #000;
      font-weight: 700;
      margin-right: 12px;
    }
    h1 {
      font-size: 20px;
      margin: 0;
      font-weight: 500;
    }
  }
  .child_category {
    border-left: 2.5px solid #dad6e9;
    padding-left: 16px;
    margin-top: 12px;
    h5 {
      margin: 0;
      font-size: 16px;
      font-weight: 400;
      color: #9fa6b9;
    }
  }
  .footer {
    width: 100vw;
    height: 78px;
    position: fixed;
    bottom: 0;
    background-color: #f5f6fa;
    box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
  }
`;

import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  position: relative;
  height: 90px;
  .inner1 {
    height: 30px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 0;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    left: 0;
  }
  .inner2_active {
    border: 1px solid #483493;
    border-top-left-radius: 0 !important;
  }
  .inner2 {
    height: 89px;
    width: calc(100% - 30px);
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    top: 1px;
    right: 0;
    padding: 16px;
    border-top: none;
    flex-wrap: nowrap;
    .empty_prod_cont {
      width: 58px;
      height: 58px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f3f3f3;
      .df-product {
        color: #c9c3e0;
        font-size: 35px;
      }
    }
    h4 {
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }
    img {
      width: 58px;
      height: 58px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  .inner3 {
    height: 27.6px;
    width: 10%;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 1.2px;
    left: 1px;
    display: flex;
    align-items: center;
    padding-left: 6px;
  }
  .inner1_active {
    border: 1px solid #483493;
  }
  .radio-btn {
    padding: 0;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

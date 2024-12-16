import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  /* height: 155px; */
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  border-radius: 10px;
  margin-bottom: 22px;
  padding: 16px;
  .content {
    width: calc(100% - 120px);
    h2 {
      font-size: 16px;
      color: #101820;
      font-weight: 500;
      margin: 0;
    }
    .border_right {
      border-left: 1.5px solid #f3f3f3;
      padding-left: 8px;
      .price {
        margin: 0;
        font-size: 14px;
        span {
          font-size: 10px;
        }
      }
      .price_primary {
        margin: 0;
        font-size: 14px;
        color: #adaaba;
        text-decoration: line-through;
      }
      span {
        font-size: 10px;
        text-decoration: none;
        color: #adaaba;
      }
    }
    .title {
      p {
        font-size: 12px;
        margin: 0;
        color: #adaaba;
        margin-bottom: 6px;
      }
    }
    .value {
      p {
        font-size: 12px;
        margin: 0;
        color: #101820;
        margin-bottom: 6px;
      }
      .option_value {
          border-right: 1px solid #C9C3E0;
          padding: 0 5px;
      }
    }
  }
  .image-cont {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    border: 0.5px solid #dad6e9;
    background-color: #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .df-product {
      color: #c9c3e0;
      font-size: 44px;
    }
    .multiVariant {
      width: 34px;
      height: 34px;
      border: 0.5px solid #dad6e9;
      border-radius: 10px 0 10px 0;
      background-color: #FFF;
      position: absolute;
      top: 0;
      left: 0;
      border-top: none;
      border-left: none;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      height: 100%;
      object-fit: cover;
    }
  }
`;

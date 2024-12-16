import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  background-color: #fff;
  margin-top: 16px;
  transition: all 1s ease;
  button {
    margin: 0;
    height: 25px;
    padding: 0;
    font-size: 14px;
    font-weight: normal;
    color: #483493;
  }
  h2 {
    margin: 0;
    color: #6a6f80;
    font-size: 18px;
    font-weight: 500;
  }
  .df-arrow {
    font-size: 12px !important;
    transform: rotate(180deg);
    color: #483493;
  }
  .btn {
    border: 0.5px dashed #6a6f80;
    border-radius: 8px;
    margin-top: 24px;
    height: 40px;
    color: #6a6f80;
    svg {
      width: 28px;
      height: 28px;
    }
  }
  .images_container {
    max-width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
  }
  .image_item {
    margin-right: 16px;
    border-radius: 8px;
    width: 93px;
    height: 93px;
    min-width: 93px;
    min-height: 93px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 1px solid #dad6e9;
    }
    .closeCont {
      position: absolute;
      left: 0;
      top: 0;
      height: 24px;
      width: 24px;
      background-color: #fff;
      border-radius: 8px 0;
      border: 0.5px solid #dad6e9;
      display: flex;
      justify-content: center;
      align-items: center;
      .df-close {
        font-size: 10px;
      }
    }
  }
`;

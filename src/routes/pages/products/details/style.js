import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  max-height: 100vh;
  overflow-y: hidden;
  .df-arrow {
    color: #101820;
    font-size: 20px;
    font-weight: 700;
  }
  h1 {
    margin: 0;
    color: #101820;
    font-size: 18px;
    font-weight: 500;
    margin-left: 15px;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .edit-btn {
    height: auto;
    padding: 0;
    color: #483493;
    i {
      font-size: 18px;
    }
  }
  .image_container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    padding: 16px;
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
    }
    .images_swiper {
      max-width: 100%;
      overflow-x: auto;
      img {
        width: 93px;
        height: 93px;
        object-fit: contain;
        border-radius: 8px;
        border: 0.5px solid #dad6e9;
        margin-right: 16px;
      }
    }
  }
  .data_container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    padding: 16px;
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
    }
  }
  .feauters_cont {
    padding-bottom: 25px;
    border-bottom: 0.5px solid #c9c3e0;
  }
  .feauters_cont_empty {
    height: 75px;
    padding-bottom: 30px;
    border-bottom: 0.5px solid #c9c3e0;
    p {
      font-size: 14px;
      color: #6a6f80;
    }
  }
  h2 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    color: #6a6f80;
    margin-top: 16px;
  }
  .desc_container_empty {
    height: 75px;
    p {
      font-size: 14px;
      color: #6a6f80;
      margin: 0;
    }
  }
  .desc_container {
    background-color: #f3f3f3;
    border-radius: 10px;
    padding: 16px;
    p {
      font-size: 14px;
      color: #6a6f80;
      margin: 0;
    }
  }
  .right-odd-row {
    padding-left: 16px;
    display: flex;
    align-items: center;
    min-height: 48px;
    border-radius: 16px 0 0 16px;
    background-color: #f3f3f3;
  }
  .left-odd-row {
    padding-left: 16px;
    display: flex;
    align-items: center;
    min-height: 48px;
    border-radius: 0 16px 16px 0;
    background-color: #f3f3f3;
    border-left: 1px solid #fff;
  }
  .right-even-row {
    padding-left: 16px;
    display: flex;
    align-items: center;
    min-height: 48px;
    border-radius: 16px 0 0 16px;
    background-color: #fff;
  }
  .left-even-row {
    padding-left: 16px;
    display: flex;
    align-items: center;
    min-height: 48px;
    border-radius: 0 16px 16px 0;
    background-color: #fff;
    border-left: 1px solid #f3f3f3;
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
  .multi_variant_container {
    .multi_variant_title {
      border-left: 2px solid #dad6e9;
      h3 {
        font-size: 18px;
        font-weight: 500;
        color: #6a6f80;
        margin: 0;
      }
    }
  }
`;

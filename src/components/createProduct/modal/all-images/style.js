import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    width: 100vw;
    height: 100vh;
    background-color: #f5f6fa;
    padding: 24px 16px;
    /* padding-bottom: 2px; */
  }

  .df-arrow {
    color: #101820;
    font-size: 20px;
    font-weight: 700;
  }
  h1 {
    margin: 0;
    color: #101820;
    font-size: 20px;
    font-weight: 500;
    margin-left: 15px;
  }
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .images-cont {
    margin: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    padding: 16px;
    background-color: #fff;
    margin-top: 18px;
    height: 100%;
    position: relative;
    .uploadBtn {
      position: absolute;
      bottom: 24px;
      left: 16px;
      width: calc(100% - 32px);
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
  }
  .image_item {
    margin-right: 1.5%;
    margin-left: 1.5%;
    border-radius: 8px;
    width: 30%;
    height: 93px;
    min-width: 93px;
    min-height: 93px;
    overflow: hidden;
    position: relative;
    margin-bottom: 16px;
    border: 1px solid #dad6e9;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

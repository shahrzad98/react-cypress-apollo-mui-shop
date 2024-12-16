import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    height: 100vh;
    padding: 24px 16px;
    background-color: #f5f6fa;
    position: relative;
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
    .footer {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 78px;
      background-color: #f5f6fa;
      box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
      padding: 0 16px;
    }
    .content {
      box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
      border-radius: 10px;
      padding: 18px 16px;
      height: calc(100vh - 185px);
      overflow-y: auto;
      background-color: #fff;
      .disabled {
        fieldset {
          background-color: rgba(0,0,0,0.08);
        }
      }
      .option {
        font-family: iransans !important;
      }
      .MuiAutoComplete-popper {
        background-color: red !important;
      }
      h5 {
        font-size: 16px;
        font-weight: 400;
        color: #6a6f80;
        margin: 0;
      }
      .hoverDiv {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        /* background-color: rgba(0, 0, 0, 0.5); */
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
`;

import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    height: 100vh;
    background-color: #f5f6fa;
    padding: 24px 16px;
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
    .content {
      box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
      border-radius: 10px;
      background-color: #fff;
      height: calc(100vh - 100px);
      padding: 24px 16px;
      .factor {
        .content_factor {
          border: 0.5px solid #c9c3e0;
          border-top: none;
          padding: 16px;
          border-radius: 0 0 10px 10px;
          .title {
            margin: 0;
            color: #adaaba;
            font-size: 14px;
            font-weight: 400;
          }
          .value {
            margin: 0;
            font-size: 16px;
            font-weight: 400;
            color: #101820;
          }
          .little {
            font-size: 10px;
            margin-left: 2px;
          }
        }
        .header_factor {
          background-color: #f3f3f3;
          border-radius: 10px 10px 0 0;
          height: 50px;
          display: flex;
          align-items: center;
          padding: 0 16px;

          h6 {
            margin: 0;
            color: #6a6f80;
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

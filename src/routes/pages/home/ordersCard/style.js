import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding-bottom: 16px;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  background-color: #fff;
  border-radius: 10px;
  margin-top: 24px;
  .header {
    padding-bottom: 16px;
    padding: 16px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);

    h3 {
      margin: 0;
      color: #6a6f80;
      font-size: 16px;
      font-weight: 500;
    }
  }
  .orders_cont {
    max-height: 250px;
    padding: 0 16px;
    height: 250px;
    overflow-y: auto;
    .empty {
      text-align: center;
      width: 100%;
      padding-top: 50px;
      p {
        color: #c9c3e0;
        font-size: 16px;
        font-weight: 400;
        margin: 0;
        margin-top: 24px;
      }
    }
    .order_card {
      padding: 16px 0;
      border-bottom: 0.5px solid #c9c3e0;
      h6 {
        font-weight: 400;
        font-size: 14px;
        color: #101820;
        margin: 0;
      }
      .icon_order_cont {
        background-color: #f3f3f3;
        width: 52px;
        height: 52px;
        border-radius: 8px;
        border: 0.5px solid #dad6e9;
        i {
          color: #c9c3e0;
          font-size: 20px;
        }
      }
    }
  }
`;

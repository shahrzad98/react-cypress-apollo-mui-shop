import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 10px 16px;
  /* position: relative; */
  padding-bottom: 100px;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
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
  .desc {
    p {
      color: #101820;
      font-size: 14px;
      padding: 4px 12px;
      border-left: 4px solid #dad6e9;
    }
  }
  .form {
    label {
      color: #6a6f80;
      font-size: 16px;
      font-weight: 400;
      display: block;
      margin-bottom: 7px;
    }
    .form-control {
      margin-bottom: 20px;
    }
    .payment-card {
      margin-bottom: 15px;
      h5 {
        color: #101820;
        font-weight: 500;
        font-size: 16px;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        color: #6a6f80;
      }
      .desc {
        font-weight: 500;
        font-size: 12px;
        color: #c9c3e0;
      }
    }
  }
  .shipping-area {
    font-weight: 500;
    font-size: 18px;
    color: #6a6f80;
    h4 {
      margin-top: 0;
    }
  }
`;

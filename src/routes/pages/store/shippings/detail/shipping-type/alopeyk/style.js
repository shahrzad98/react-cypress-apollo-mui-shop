import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  /* padding: 24px 16px 24px 16px; */
  padding-bottom: 100px;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    .back-link {
      display: flex;
      align-items: center;
    }
    .create-shipping {
      display: flex;
      align-items: center;
      color: #483493;
      .plus {
        font-size: 1.7rem;
      }
    }
    h1 {
      font-size: 20px;
      font-weight: 500;
      color: #101820;
      margin: 0;
    }
    h3 {
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
      border-left: 4px solid #dad6e9;
      padding: 5px 15px;
      margin-top: 24px;
    }
    .df-arrow {
      font-size: 20px;
      font-weight: 700;
      margin-right: 12px;
    }
  }
  .empty {
    min-height: 70vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      margin-top: 70px;
      width: 95%;
    }
  }
  .titleFeild {
    font-size: 16px;
    color: #6a6f80;
    font-weight: 400;
  }
  .titlePayment {
    font-size: 16px;
    color: #101820;
    font-weight: 500;
    margin: 12px;
  }
  .decPayment {
    font-size: 14px;
    font-weight: 400;
    color: #6a6f80;
  }
  .detailPayment {
    font-size: 12px;
    font-weight: 500;
    color: #c9c3e0;
  }
  .descDelete {
    font-size: 14px;
    color: #101820;
    font-weight: 500;
    margin: 0;
  }
`;

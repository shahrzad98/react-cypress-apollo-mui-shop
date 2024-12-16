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
  .shipping-area {
    font-weight: 500;
    font-size: 18px;
    color: #6a6f80;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      margin-top: 0;
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
    .info-step {
      .info-card {
        border: 0.5px solid #9185be;
        border-radius: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        .info-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .info-title {
            color: #9fa6b9;
            font-weight: 400;
            font-size: 14px;
          }
          .info-value {
            color: #6a6f80;
            display: flex;
            align-items: center;
            gap: 8px;
            svg {
              color: #483493;
            }
            .get-pass {
              color: #483493;
            }
          }
        }
      }
      p {
        font-weight: 400;
        font-size: 14px;
        color: #101820;
      }
      a {
        color: #483493;
        text-decoration: none;
        direction: rtl;
        display: block;
        /* text-align: right; */
      }
      .info-message {
        background: #edf5ff;
        border-left: 4px solid #0f62fe;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #101820;
        margin-top: 35px;
        svg {
          color: #0f62fe;
        }
      }
    }
  }
`;

import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 24px 16px;
  padding-bottom: 90px;
  form {
    width: 100%;
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
  .submitBtnCont {
    position: absolute;
    bottom: 0;
    height: 78px;
    background-color: #f5f6fa;
    box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
    right: 0;
    padding: 0 15px;
    button {
      border-radius: 10px;
    }
  }
  .Toastify__toast-container {
    bottom: 85px;
  }
  .Toastify__toast {
    width: 90%;
    margin: auto;
    direction: ltr;
    background-color: #D9F9EA;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    border-radius: 8px;
    color: #00D96F;
    font-family: iransans;
  }
  .Toastify__toast-body {
    direction: ltr;
  }
`;

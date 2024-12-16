import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 30px;
  background-color: #fff;
  height: 100vh;
  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
  }
  p {
    margin: 0;
  }
  .otpInput {
    width: 14%;
    margin-top: 25;
  }
  .otpInputText {
    input {
      text-align: center;
      font-size: 1.5rem;
      padding: 5px;
      font-weight: 400;
    }
  }
  .otpInputsWrapper {
    display: flex;
    justify-content: space-between;
  }
  .codeexpirewrapper {
    display: inline-flex;
    margin-bottom: 5;
  }
  .remainTime {
    color: #a8a8a8;
    font-size: 0.9rem;
  }
  resendBtn {
    font-size: 0.9rem;
    color: #8432f0;
  }
`;

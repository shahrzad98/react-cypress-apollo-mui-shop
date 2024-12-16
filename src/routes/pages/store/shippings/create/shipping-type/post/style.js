import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const PostContainer = styled(Grid)`
  padding: 24px 16px 110px 16px;

  h1 {
    font-size: 20px;
    padding-left: 16px;
  }

  .stepContainer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
  }

  .firstStepIcon {
    margin-left: 12px;
  }

  .connector {
    width: 100%;
    padding: 0 4px;
    display: flex;
    justify-content: space-between;
    min-width: 54px;

    .connectorChild {
      width: 15%;
      height: 1px;
      background-color: #483493;
      background-size: 15px;
    }
    .connectorChild:first-child {
      width: 100%;
    }
  }
  .stepTitle {
    margin-top: 16px;
    width: 80px;
    p {
      font-size: 12px;
    }
  }

  .formContainer {
    border-radius: 10px;
    padding: 16px;
    background: #fff;

    p {
      margin: 0 0 8px 0 !important;
    }

    .MuiFormControl-root {
      margin-bottom: 16px;
    }
  }
`;

export const SubmitContainer = styled(Grid)`
  z-index: 999;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #f5f6fa;
  box-shadow: 0 0 20px rgba(72, 52, 147, 0.12);
`;

import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  .content {
    padding: 24px 16px;
    border-radius: 10px;
    background-color: #fff;
    position: relative;
    h4 {
      color: #101820;
      font-size: 14px;
      font-weight: 500;
      margin: 0;
      margin-bottom: 60px;
    }
    .btn {
      height: 42px;
      padding: 0;
      width: 110px;
      font-size: 14px;
      font-weight: 500;
    }
    .close {
      position: absolute;
      top: 16px;
      right: 16px;
    }
  }
`;

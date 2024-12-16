import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  padding: 16px;
  background-color: #fff;
  button {
    padding: 0;
    height: 24px;
    color: #483493;
    .df-arrow {
      transform: rotate(180deg);
      font-size: 14px;
    }
  }
  p {
    margin: 0;
    margin-left: 16px;
    font-size: 14px;
    font-weight: 400;
  
  }
  span {
        font-size: 12px;
        margin-left: 5px;
    }
  .divider {
    height: 1px;
    background-color: #c9c3e0;
  }
`;

import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    border-radius: 16px 16px 0 0;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    padding: 12px 18px;
    z-index: 999999999999;
    .divider {
      background-color: #dad6e9;
      height: 4px;
      width: 50px;
      border-radius: 16px;
      margin-bottom: 8px;
    }
    .btn {
      color: #101820;
      font-size: 16px;
      svg {
        margin-right: 10px;
      }
    }
  }
`;

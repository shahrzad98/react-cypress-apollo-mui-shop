import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    border-radius: 16px 16px 0 0;
    padding: 10px 16px 20px;
    .divider {
      width: 50px;
      height: 4px;
      background-color: #dad6e9;
    }
    .btn {
      padding: 0;
      color: #101820;
      font-size: 16px;
      font-weight: 400;
    }
    .mt-32 {
      margin-top: 32px;
    }
    .MuiButton-startIcon {
        margin-right: 16px;
        margin-left: 0;
    }
  }
`;

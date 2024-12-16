import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    width: 100vw;
    height: 100vh;
    background-color: #f5f6fa;
    padding: 24px 16px;
    /* padding-bottom: 2px; */
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
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .cropperContent {
    margin: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    padding: 16px;
    background-color: #fff;
    margin-top: 18px;
    height: 100%;
    position: relative;
  }
`;

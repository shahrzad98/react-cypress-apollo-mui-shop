import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const MapContainer = styled(Box)`
  .header {
    display: flex;
    align-items: center;
    h1 {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
    .df-arrow {
      font-size: 18px;
      margin-right: 12px;
    }
  }
  .map_container {
    height: 557px;
    background-color: #454545;
    border-radius: 10px;
    overflow: hidden;
  }
  .footer {
    height: 72px;
    background-color: #f5f6fa;
    box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
    display: flex;
    align-items: center;
    padding: 0 16px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

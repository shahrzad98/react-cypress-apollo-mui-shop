import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  .MuiAccordion-root {
    width: 100%;
    margin: 0 !important;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    border: none;
    border-top: none;
    padding: 0 16px;
    border-radius: 10px !important;
    .df-arrow {
      transform: rotate(90deg);
      font-size: 12px;
      font-weight: 800;
      color: #483493;
    }
    .MuiAccordionDetails-root {
      border-top: 0.5px dashed #c9c3e0;
      padding: 0;
      padding-bottom: 16px;
      .title {
        margin: 0;
        color: #c9c3e0;
        font-size: 14px;
        font-weight: 300;
      }
      .value {
        margin: 0;
        color: #101820;
        font-size: 14px;
        font-weight: 400;
      }
      .code_container {
        height: 54px;
        width: 100%;
        background-color: #f3f3f3;
        border: 1px solid #dad6e9;
        border-radius: 8px;
        padding: 0 16px;
        .title {
          color: #9185be;
        }
        .value {
          color: #483493;
          display: flex;
          align-items: center;
          svg {
              margin-left: 5px;
          }
        }
      }
    }
    .MuiAccordionSummary-root {
      height: 60px !important;
      min-height: 60px !important;
      padding: 0;
      position: relative;
      .delete_icon {
        position: absolute;
        right: 8%;
        top: 31%;
        width: 20px;
        height: 20px;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        margin-left: 12px;
      }
    }
  }
`;

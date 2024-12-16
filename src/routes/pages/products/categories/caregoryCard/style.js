import styled from '@emotion/styled';
import { Accordion } from '@mui/material';

export const Style = styled(Accordion)`
  width: 100%;
  margin-top: ${props =>
    props.isSubCategory ? '10px !important' : '16px !important'};
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  border: none;
  border-top: none;
  border-radius: 10px !important;
  .df-arrow {
    transform: rotate(90deg);
    color: #483493;
    font-size: 15px;
    font-weight: 800;
  }
  .MuiAccordionSummary-expandIconWrapper {
    position: absolute;
    right: 20px;
  }
  /* padding: 16px; */
  p {
    margin: 0;
  }
  &::before {
    background-color: transparent;
  }
  .MuiAccordionSummary-content {
    height: 84px;
    padding: 16px;
    .showMore {
      position: absolute;
      right: 20px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .MuiAccordionSummary-root {
    height: 84px;
    padding: 0;
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 400;
    }
    h4 {
      margin: 0;
      margin-top: 4px;
      font-size: 12px;
      font-weight: 300;
    }
    img {
      height: 52px;
      width: 52px;
      object-fit: cover;
      border-radius: 8px;
      border: 0.5px solid #dad6e9;
    }
    .emptyImage {
        width: 52px;
        height: 52px;
        background-color: #f3f3f377;
        border-radius: 6px;
        border: 0.5px solid #c9c3e0;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          width: 25px;
          height: 25px;
        }
      }
  }
  .MuiAccordionDetails-root {
    .content {
      border-top: 0.5px solid #c9c3e0;
      width: 100%;
      padding-top: 16px;
      h5 {
        color: #6a6f80;
        font-size: 16px;
        font-weight: 400;
        margin: 0;
      }
      button {
        padding: 0;
      }
    }
    .products {
      max-height: 288px;
      overflow: auto;
    }
    .empty-products {
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        text-align: center;
      }
      i {
        font-size: 70px;
        font-weight: 200px;
        color: #dad6e9;
      }
      p {
        color: #dad6e9;
        margin-top: 12px;
        font-weight: 500;
      }
    }
    .product-row {
      height: 72px;
      border-bottom: 0.5px solid #c9c3e0;
      padding: 16px 0;
      position: relative;
      .divider {
        height: 60%;
        margin-left: 8px;
        background-color: #c9c3e0;
        width: 1px;
      }
      h4 {
        font-size: 14px;
        font-weight: 400;
        margin-left: 8px;
      }
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 6px;
        border: 0.5px solid #c9c3e0;
      }
     
      :last-of-type {
        border: none;
      }
      button {
        padding: 0;
      }
      .delete_icon {
        position: absolute;
        right: 0;
        top: 35px;
      }
    }
  }
`;

import styled from '@emotion/styled';
import { Drawer } from '@mui/material';

export const Style = styled(Drawer)`
  .MuiPaper-root {
    width: 100vw;
    height: 100vh;
    background-color: #f5f6fa;
    padding: 24px 16px;
    padding-bottom: 90px;
    .MuiSelect-select {
      position: relative;
      .clear {
        position: absolute;
        right: 20px;
        z-index: 99999999999;
      }
      p {
        color: #000;
      }
    }
    .select-cat {
      .dropdown {
        transform: rotate(90deg);
        margin-left: 10px;
        font-size: 15px;
        margin-right: 10px;
        color: #483493;
        margin-top: 5px;
      }
      .dropdown-opened {
        transform: rotate(-90deg);
        margin-left: 10px;
        font-size: 15px;
        margin-right: 10px;
        color: #483493;
        margin-top: 5px;
      }
    }
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
  .fields-container {
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
    padding: 16px;
    background-color: #fff;
    margin-top: 18px;
    padding-bottom: 50px;
    .sub_category {
      width: 76%;
      margin: auto;
      border-left: 2px solid #f1f1f1;
    }
    h2 {
      margin: 0;
      color: #6a6f80;
      font-size: 18px;
      font-weight: 500;
    }
    h3 {
      font-size: 16px;
      font-weight: 400;
      color: #6a6f80;
      margin: 0;
    }
    h6 {
      font-size: 14px;
      font-weight: 400;
      color: #6a6f80;
      margin: 0;
    }
    p {
      margin: 0;
      color: #9185be;
    }
    .df-arrow {
      font-size: 12px !important;
      transform: rotate(180deg);
      color: #483493;
    }
    fieldset {
      border-radius: 10px;
    }
    .add-btn {
      height: 30px;
    }
    textarea {
      padding: 15px 0;
    }
    input {
      height: 44px;
      padding: 3px;
      padding-right: 12px;
      padding-left: 12px;
    }
    .MuiInputBase-root {
      padding: 0 10px;
    }
    form {
      width: 100%;
      margin: 0;
    }
  }
  .submitBtnCont {
    position: fixed;
    bottom: 0;
    height: 78px;
    background-color: #f5f6fa;
    box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
    right: 0;
    padding: 0 15px;
    button {
      border-radius: 10px;
    }
  }
  .MuiFormHelperText-root {
    color: #ff3262 !important;
  }
`;

import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  padding: 16px;
  padding-bottom: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
  background-color: #fff;
  margin-top: 16px;
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
  .stock {
    width: 158px;
    height: 44px;
    border: 1px solid #9185be;
    border-radius: 10px;
  }
  .minus {
    border-right: 0.5px solid #c9c3e0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .plus {
    border-left: 0.5px solid #c9c3e0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .stock-input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    text-align: center;
    color: #9185be;
    font-size: 14px;
    font-weight: 400;
    font-family: iransans;
    :focus {
      outline: none;
      border: none;
    }
  }
  .unlimited {
    width: 30%;
    span {
      padding: 4px;
    }
    svg {
      color: #9fa6b9;
    }
    .Mui-checked {
      svg {
        color: #483493;
      }
    }
  }
  .disabled-stock {
    height: 100%;
    background-color: #f3f3f3;
  }
  .cost_input {
    width: 100%;
    border-radius: 8px;
    border: 1px solid rgb(145, 133, 190);
    font-family: 'iransans';
    &:focus-visible {
      outline: none;
      border: 2px solid #483493;
    }
  }
`;

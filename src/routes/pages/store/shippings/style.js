import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Style = styled(Grid)`
  label {
    color: #6a6f80;
    font-size: 16px;
    font-weight: 400;
    display: block;
    margin-bottom: 7px;
  }
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    .back-link {
      display: flex;
      align-items: center;
    }

    .create-shipping {
      display: flex;
      align-items: center;
      color: #483493;

      .plus {
        font-size: 1.7rem;
      }
    }

    h1 {
      font-size: 20px;
      font-weight: 500;
      color: #101820;
      margin: 0;
    }

    h3 {
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
      border-left: 4px solid #dad6e9;
      padding: 5px 15px;
      margin-top: 25px;
    }

    .df-arrow {
      font-size: 20px;
      font-weight: 700;
      margin-right: 12px;
    }
  }
  .empty {
    min-height: 70vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      margin-top: 70px;
      width: 95%;
    }
  }
  .postStatus {
    border-radius: 29px;
    padding: 6px 16px;
  }
  .error {
    background-color: #fff1f1;
  }
  .waiting {
    background-color: #fcf4d6;
  }
  .postContainer {
    margin-bottom: 16px;
    background-color: #fff;
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(72, 52, 147, 0.08);
  }
  .postTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
  }
  .bottomDashed {
    margin: 0 16px;
    background-image: linear-gradient(to right, #c0c0c0 50%, #fff 50%);
    background-position: bottom;
    background-repeat: repeat-x;
    background-size: 10px 1px;
  }
`;

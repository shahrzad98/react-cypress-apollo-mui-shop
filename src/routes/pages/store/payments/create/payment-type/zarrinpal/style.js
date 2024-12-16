import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const StyledGrid = styled(Grid)`
  .container {
    width: 95%;
    box-shadow: 0 4px 30px rgba(72, 52, 147, 0.08);
    border-radius: 10px;
    margin: 16px;
    padding: 16px;
    letter-spacing: -0.5px;
    background: #fff;
  }

  .tableContainer {
    width: 100%;
    box-shadow: 0 4px 30px rgba(72, 52, 147, 0.08);
    background: #fff;
    padding: 16px;
    margin: 16px;
    border-radius: 16px;
  }

  input {
    font-size: 14px;
    padding: 14px;
    color: #101820;

    &::placeholder {
      color: #9185be;
      opacity: 1;
    }
  }

  textarea {
    font-size: 14px;
    ::placeholder {
      color: #9185be;
      opacity: 1;
    }
  }

  label {
    color: #6a6f80;
    font-size: 16px;
    font-weight: 400;
    display: block;
    margin-bottom: 7px;
  }

  .header {
    margin: 10px 16px 0;

    .back-link {
      display: flex;
      align-items: center;
    }

    h1 {
      font-size: 20px;
      font-weight: 500;
      color: #101820;
    }

    h6 {
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
      border-left: 2px solid #dad6e9;
      padding-left: 12px;
    }

    p {
      font-size: 14px;
      color: #101820;
      margin-bottom: 10px;
      border-left: 2px solid #dad6e9;
      padding-left: 12px;
    }

    .df-arrow {
      font-size: 17px;
      font-weight: 700;
      margin-right: 12px;
    }
  }

  .submitButton {
    padding: 16px;
    position: fixed;
    bottom: 0;
    background-color: #f5f6fa;
    box-shadow: 0 0 20px rgba(72, 52, 147, 0.12);

    & button {
      font-size: 14px;
    }
  }
  .upload {
    border-radius: 10px;
    h2 {
      font-size: 18px;
      font-weight: 500;
      color: #6a6f80;
      margin: 0;
    }
    h3 {
      font-size: 16px;
      font-weight: 400;
      color: #6a6f80;
      margin: 0;
    }
    .removeImage {
      width: 100%;
      border: 0.5px solid #dad6e9;
      border-radius: 8px 0;
      height: 205px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .removeImageContainer {
      width: 100%;
      position: relative;
    }
    .square {
      width: 100%;
      height: 40px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dashed {
      border: 0.5px dashed #6a6f80;
    }
    .file-error {
      border: 0.5px dashed #ea002a;
      color: #ea002a;
    }
    .errorFeedback {
      font-size: 14px;
      color: #ea002a;
      margin-top: 8px;
    }
    .img {
      border: 0.5px solid #dad6e9;
      background-color: #f3f3f3;
    }
  }
  .uploadImageContainer {
    margin-top: 24px;
    min-width: 300px;
    min-height: 200px;
    position: relative;

    & img {
      width: 100%;
      border-radius: 8px;
      max-width: 300px;
      max-height: 200px;
    }
  }
  .removeUploadedImage {
    position: absolute;
    left: 0;
    top: 0;
    height: 24px;
    width: 24px;
    background-color: #fff;
    border-radius: 8px 0;
    border: 0.5px solid #dad6e9;
    display: flex;
    justify-content: center;
    align-items: center;

    .df-close {
      font-size: 10px;
      color: #9185be;
    }

    .df-edit {
      color: #6a6f80;
      font-size: 25px;
    }
  }
  .identifyFormLink {
    text-decoration: none;
    border-bottom: 1px solid #483493;
    color: #483493;
  }
`;

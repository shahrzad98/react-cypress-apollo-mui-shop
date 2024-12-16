import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import { Button, CircularProgress, Grid, IconButton } from '@mui/material';
import React from 'react';
import { ReactComponent as NotFoundSVG } from '../svg/safirNotFound.svg';

const Style = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  .content {
    width: 90%;
    background-color: #fff;
    border-radius: 10px;
    height: auto;
    position: relative;
    padding: 30px;
    h2 {
      font-size: 16px;
      font-weight: 500;
      color: #000;
    }
  }
  .close__btn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

const index = ({ close, cancel, loading, notFound, retry }) => {
  return (
    <Style container alignItems="center" justifyContent="center">
      <Grid className="content">
        <IconButton onClick={close} className="close__btn">
          <Close />
        </IconButton>
        {notFound ? (
          <Grid mt={1} container justifyContent="center">
            <h2>سفیر الوپیک یافت نشد!</h2>
          </Grid>
        ) : (
          <Grid mt={1} container justifyContent="center">
            <h2>در حال جستجوی سفیر الوپیک</h2>
          </Grid>
        )}
        {notFound && (
          <Grid container justifyContent="center">
            <NotFoundSVG />
          </Grid>
        )}
        <Grid container mt={notFound ? 3 : 35}>
          {notFound ? (
            <Button
              disabled={loading}
              onClick={retry}
              fullWidth
              variant="outlined"
              color="primary">
              {loading ? (
                <CircularProgress style={{ width: '24px', height: '24' }} />
              ) : (
                'تلاش مجدد'
              )}
            </Button>
          ) : (
            <Button
              disabled={loading}
              onClick={cancel}
              fullWidth
              variant="outlined"
              color="primary">
              {loading ? (
                <CircularProgress style={{ width: '24px', height: '24' }} />
              ) : (
                'انصراف'
              )}
            </Button>
          )}
        </Grid>
      </Grid>
    </Style>
  );
};

export default index;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

const Style = styled(Grid)({
  '& .image--container': {
    marginTop: '20px',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      maxWidth: '100%'
    }
  }
});

export const BigPictureModal = () => {
  const location = useLocation();
  const {
    state: {
      data: { image }
    }
  } = location;

  return (
    <Style>
      <div className="image--container">
        <img src={image} alt="" />
      </div>
    </Style>
  );
};

export default BigPictureModal;

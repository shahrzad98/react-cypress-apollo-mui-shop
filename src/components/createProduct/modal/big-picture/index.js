import { Grid } from '@mui/material';
import React from 'react';
import { Style } from './style';
import { ReactComponent as TrashSVG } from '../../svg/trashCan.svg';

const BigPicture = ({ close, img, index, all, openDelete }) => {
  return (
    <Style>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid onClick={close} className="header">
          <i className="df-arrow" />
          <h1>
            {index + 1} از {all}
          </h1>
        </Grid>
        <Grid className="btn-cont">
          <TrashSVG
            onClick={openDelete}
            style={{ width: '22px', height: '20px', color: '#483493' }}
          />
        </Grid>
      </Grid>
      <img src={img} />
    </Style>
  );
};

export default BigPicture;

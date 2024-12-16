import React from 'react';
import { Grid } from '@mui/material';
import ImageCropper from '../../../shared/imageCropper';
import { Style } from './style';

const ImageCropperModal = ({
  open = false,
  close = () => {},
  image,
  aspect,
  setImage
}) => {
  return (
    <Style onClose={close} open={open} anchor="right">
      <Grid onClick={close} className="header">
        <i className="df-arrow" />
        <h1>برش تصویر محصول</h1>
      </Grid>
      <Grid
        justifyContent="start"
        alignContent="flex-start"
        container
        className="cropperContent"
      >
        <ImageCropper {...{ image, aspect, close, setImage }} />
      </Grid>
    </Style>
  );
};

export default ImageCropperModal;

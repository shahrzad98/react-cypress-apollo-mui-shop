import { Add } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { Style } from './style';

const AllImagesDrawe = ({
  open,
  close,
  imageList,
  onImageRemove,
  setImageUUids,
  imageUUids,
  onImageUpload,
  loading
}) => {
  return (
    <Style onClose={close} open={open} anchor="right">
      <Grid onClick={close} className="header">
        <i className="df-arrow" />
        <h1>تصاویر محصول</h1>
      </Grid>
      <Grid
        justifyContent="start"
        alignContent="flex-start"
        container
        className="images-cont"
      >
        {' '}
        {imageList.map((image, index) => (
          <div key={index} className="image_item">
            <div
              onClick={() => {
                onImageRemove(index);
                let newUUids = [...imageUUids];
                newUUids.splice(index, 1);
                setImageUUids(newUUids);
              }}
              className="closeCont"
            >
              <i className="df-close" />
            </div>
            <img src={image.data_url} alt="" width="100" />
          </div>
        ))}
        <Button
          disabled={loading}
          onClick={onImageUpload}
          className="uploadBtn"
          variant="outlined"
          fullWidth
        >
          {loading ? 'در حال آپلود... ' : <Add />}
        </Button>
      </Grid>
    </Style>
  );
};

export default AllImagesDrawe;

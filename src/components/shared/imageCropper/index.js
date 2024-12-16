import { Box, Button, Grid, Slider } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { createCroppedImg } from './createCroppedImage';

const ImageCropper = ({
  image,
  aspect = 1 / 1,
  setImage,
  close,
  maxZoom = 3,
  minZoom = 1
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const [croppedPixel, setCroppedPixel] = useState();

  const handleChangeZoom = (_ev, newValue) => {
    setZoom(newValue);
  };

  const onCropComplete = useCallback(
    (_croppedArea, croppedAreaPixels) => {
      setCroppedPixel(croppedAreaPixels);
    },
    [rotation, croppedPixel, zoom]
  );

  const finalApprove = () => {
    try {
      createCroppedImg(image, croppedPixel, rotation).then(res => {
        setImage?.(res);
        close?.();
      });
    } catch {
      //
    }
  };

  return (
    <Grid
      bgcolor="#fff"
      container
      flexDirection="column"
      flexWrap="nowrap"
      height="100%"
    >
      <Grid container height="70%" minHeight="250px" position="relative">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          maxZoom={maxZoom}
          minZoom={minZoom}
          rotation={rotation}
          zoomSpeed={1}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
        />
      </Grid>
      <Grid container display="flex" mt={3} gap={2} alignItems="center">
        <span>زوم</span>
        <Box flex={1}>
          <Slider
            min={minZoom}
            max={maxZoom}
            step={0.1}
            value={zoom}
            onChange={handleChangeZoom}
            valueLabelFormat={val => `${val.toFixed(1)}x`}
            valueLabelDisplay="on"
          />
        </Box>
      </Grid>
      <Grid container mt={2}>
        <Button onClick={finalApprove} variant="contained" fullWidth>
          تایید
        </Button>
      </Grid>
    </Grid>
  );
};

export default ImageCropper;

import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Style } from './style';
import Map from '../../../../../../../components/shared/mapNeshan/index';

const LocationDrawer = ({ open, close, lat, lng, setLng, setlat }) => {
  const [latLng, setLatLng] = useState([35.699739, 51.338097]);

  useEffect(() => {
    if (lat && lng) {
      setLatLng([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <Style anchor="bottom" open={open} onClose={close}>
      <Grid container>
        <Grid onClick={close} className="header">
          <i className="df-arrow" />
          <h1>موقعیت فروشگاه</h1>
        </Grid>
      </Grid>
      <Grid mt={2} container className="map_container">
        <Map latLng={latLng} setLngLat={setLatLng} />
      </Grid>
      <Grid container className="footer">
        <Button
          onClick={() => {
            setlat(latLng[0]);
            setLng(latLng[1]);
            close();
          }}
          variant="contained"
          data-cy="acceptNegativeStore"
          color="primary"
          fullWidth
        >
          تایید موقعیت مکانی
        </Button>
      </Grid>
    </Style>
  );
};

export default LocationDrawer;

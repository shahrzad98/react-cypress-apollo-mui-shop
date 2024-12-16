import { Grid } from '@mui/material';
import React from 'react';
import { MapContainer } from './style';
import Map from '../../../../../../../../components/shared/mapNeshan/index';

const PostMap = ({ latLng, setLatLng }) => {
  return (
    <MapContainer>
      <Grid mt={2} container className="map_container">
        <Map latLng={latLng} setLngLat={setLatLng} />
      </Grid>
    </MapContainer>
  );
};

export default PostMap;

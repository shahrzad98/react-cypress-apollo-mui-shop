import React from 'react';
import NeshanMap from 'react-neshan-map-leaflet';

function NeshanShowingMap({ latLng }) {
  return (
    <NeshanMap
      style={{ width: '100%', height: '100%', borderRadius: '8px' }}
      options={{
        key: 'web.vLwZBntMU0p6xDsZ5audA1pOFG8S5oNlM4j1qmAC',
        maptype: 'dreamy-gold',
        poi: true,
        traffic: false,
        center: latLng,
        zoom: 14
      }}
    />
  );
}

export default NeshanShowingMap;

import React, { useState } from 'react';
import Mapir from 'mapir-react-component';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';

const Style = styled(Grid)({
  '& .mapboxgl-map': {
    width: '100% !important',
    height: '100% !important',
    overflow: 'hidden',
    borderRadius: '10px',
    position: 'relative'
  },
  '& .mapboxgl-marker': {
    right: '0',
    top: '0',
    position: 'absolute',
    '& img': {
      width: '20px !important'
    }
  }
});

const Map = ({ lng, lat, setLng, setLat }) => {
  const [center, setCenter] = useState([lng ?? 51.389, lat ?? 35.6892]);

  const _Map = Mapir.setToken({
    transformRequest: url => {
      return {
        url: url,
        headers: {
          'x-api-key': process.env.REACT_APP_MAP_IR_TOKEN,
          'Mapir-SDK': 'reactjs'
        }
      };
    }
  });

  function reverseFunction(map, e) {
    // let url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
    // fetch(url, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key':
    //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjliZmMzZjQ0MDliOTAxZTg3Y2UzOWRlNmNlNDE5N2MxZGIxYzZhMWQxMWNlZjUzZjU5MmY2ZDJhYTk5Y2Q4ZTk2MDEwMWRkMDNlNzcxMjJiIn0.eyJhdWQiOiIxNDE3NCIsImp0aSI6IjliZmMzZjQ0MDliOTAxZTg3Y2UzOWRlNmNlNDE5N2MxZGIxYzZhMWQxMWNlZjUzZjU5MmY2ZDJhYTk5Y2Q4ZTk2MDEwMWRkMDNlNzcxMjJiIiwiaWF0IjoxNjIyMzY3NTA1LCJuYmYiOjE2MjIzNjc1MDUsImV4cCI6MTYyNDk1OTUwNSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.po3qWR_QgO6LF_m_TTr-jhd0_1jZXYqTvUBus-00dS6o0nB24CUR5g5iKHg1aEQdbuS9f1otwcn4VViKsolJVcyyXsOeDP-OoxoJPrfUAL8zAxwfkGqi9x5qyagFJzhN0jD-qO7ZtGcLICcWmBeHjwhP-j-aF-YqoWKY4fLtSLKtCFbFRAeuI74t1lwWBssCuvub446t2z5BKcsKwqnzT-uAfdofrIsIsKPyJsgHuu9BVjk82RNIySLVm1YT7fXN-C6RJ8tyDIa85ivr9EJj8qc6D7h-z5wvJtAVMe46_3t212Udo16wcRdt2B49YkAg-ALkWOUqhYiEscLeOytS2w'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => pickLocation(data));
    // const array = [];
    // array.push(
    //   <Mapir.Marker
    //     coordinates={[e.lngLat.lalngt, e.lngLat.lng]}
    //     anchor="bottom"
    //   />
    // );
    setCenter([e.lngLat.lng, e.lngLat.lat]);
    setLng(e.lngLat.lng);
    setLat(e.lngLat.lat);
  }

  return (
    <Style container>
      <Mapir onClick={reverseFunction} center={center} userLocation Map={_Map}>
        <Mapir.Marker
          Image={'/location.png'}
          coordinates={center}
          anchor="bottom"
        />
      </Mapir>
    </Style>
  );
};

export default Map;

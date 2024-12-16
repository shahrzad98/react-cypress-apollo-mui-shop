import { Button, Grid } from '@mui/material';
import React from 'react';
import { Style } from './style';

const DrawerComponent = ({ open, items, handleClose }) => {
  return (
    <Style onClose={handleClose} anchor="bottom" open={open}>
      <Grid container justifyContent="center">
        <div className="divider"></div>
      </Grid>
      {items.map(item => (
        <Grid container key={item.id}>
          <Button onClick={item.handler} className="btn" startIcon={item.icon}>
            {item.title}
          </Button>
        </Grid>
      ))}
    </Style>
  );
};

export default DrawerComponent;

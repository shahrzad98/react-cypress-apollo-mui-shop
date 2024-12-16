import { Box, Fab, Modal } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BigPictureModalPage = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { backgroundLocation }
  } = location;

  const handleClose = () => {
    navigate(backgroundLocation?.pathname);
  };

  return (
    <Modal sx={{ width: '100vw', height: '100vh' }} open onClose={handleClose}>
      <Box width="1" p={2}>
        <Fab size="small" onClick={handleClose}>
          <i className="df-arrow" />
        </Fab>
        {children}
      </Box>
    </Modal>
  );
};

export default BigPictureModalPage;

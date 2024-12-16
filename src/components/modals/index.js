import React from 'react';
import Box from '@mui/material/Box';
import { default as M } from '@mui/material/Modal';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Style = styled(Box)({
  width: '100vw',
  height: '100vh',
  background: '#fff',
  position: 'absolute',
  right: '50%',
  top: '50%',
  transform: 'translate(50%,-50%)',
  '& .close--button': {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
    '& .df-close': {
      fontWeight: 'bold'
    }
  }
});

export const Modal = () => {
  const navigate = useNavigate();

  return (
    <M open onClose={() => navigate(-1)}>
      <Style>
        <div className="close--button" onClick={() => navigate(-1)}>
          <i className="df-close" />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </Style>
    </M>
  );
};

export default Modal;

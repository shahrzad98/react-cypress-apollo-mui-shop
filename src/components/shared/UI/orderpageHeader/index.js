import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderT = styled(Grid)`
    padding: 24px 16px 10px;
    h1 {
      margin: 0 0 20px;
      font-size: 20px;
      display: flex;
      align-items: center
    }
    p {
      margin: 0 0 20px;
      font-size: 14px;
      color: #9fa6b9;
    }
  `;

const Header = ({ title, count }) => {
  const history = useNavigate();
  return (
    <HeaderT  data-cy='order_header' alignItems="center" container justifyContent="space-between">
      <h1 onClick={() => history('/orders')}>
        <i style={{marginLeft: '16px',fontWeight: 'bold'}}className="df-arrow" /> {title}
      </h1>
      {count ? <p>{count} سفارش</p> : <p>۰ سفارش</p>}
    </HeaderT>
  );
};

export default Header;

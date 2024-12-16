import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import { formatDate, formatNumber } from '../../../../utils/helpers';
import { ReactComponent as PayPingSVG } from '../../../../static/svg/payping.svg';
import Progressbar from '../progressBar';
import { Link } from 'react-router-dom';

const Box = styled(Grid)({
  width: '100%',
  height: '200px',
  borderRadius: '12px',
  backgroundColor: '#FFF',
  boxShadow: '0px 4px 8px rgba(72, 52, 147, 0.08)',
  padding: '10px 16px',
  marginBottom: '20px',
  '& a': {
    width: '100%',
    textDecoration: 'none',
    color: 'inherit',
    '& .header': {
      height: '55px',
      borderBottom: '0.5px solid #C9C3E0',
      '& h3': {
        fontSize: '16px',
        fontWeight: 'normal',
        margin: 0
      },
      '& h4': {
        margin: 0
      }
    },
    '& .row': {
      height: '40px',
      '& h3': {
        color: '#C9C3E0',
        fontSize: '14px',
        fontWeight: 'normal',
        margin: 0
      },
      '& h4': {
        fontSize: '14px',
        fontWeight: 'normal',
        margin: 0
      }
    }
  }
});

const OrderCard = ({
  refrence_code,
  is_seen,
  created_at,
  customer,
  id,
  status,
  cost,
  registration_type
}) => {
  const theme = useTheme();

  const renderPayType = () => {
    switch (registration_type) {
      case 1:
        return (
          <>
            <PayPingSVG />
            <h5>{cost ? formatNumber(cost) : '0'} تومان</h5>
          </>
        );
      case 2:
        return (
          <>
            <i style={{color: '#C9C3E0',marginTop: '-7px',fontSize: '25px'}} className='df-card-to-card'/>
            <h5>{cost ? formatNumber(cost) : '0'} تومان</h5>
          </>
        );

      default:
        return (
          <>
             <PayPingSVG />
            <h5>{cost ? formatNumber(cost) : '0'} تومان</h5>
          </>
        );
    }
  };

  return (
    <Box data-cy='order_detail_card' container>
      <Link to={`/orders/detail/${id}`}>
        <Grid
          className="header"
          container
          justifyContent="space-between"
          alignItems="center">
          <h3 dir="rtl">
            سفارش{' '}
            {!is_seen ? (
              <i
                className="df-order-notif"
                style={{
                  fontSize: '10px',
                  color: theme.palette.primary.main,
                  marginRight: '10px'
                }}
              />
            ) : (
              ''
            )}
            {refrence_code}{' '}
          </h3>
          <div style={{width: '89px'}}>
            <Progressbar status={status} />
          </div>
        </Grid>
        <Grid
          className="row"
          container
          justifyContent="space-between"
          alignItems="center">
          <h3>تاریخ ثبت</h3>
          <h4>{created_at && formatDate(created_at)}</h4>
        </Grid>
        <Grid
          style={{ borderBottom: '0.5px dashed #C9C3E0' }}
          className="row"
          container
          justifyContent="space-between"
          alignItems="center">
          <h3>مشتری</h3>
          <h4>{customer && customer?.name}</h4>
        </Grid>
        {/* <div style={{ height: '35px', width: '100%' }} /> */}
        <Grid
          container
          justifyContent="space-between"
          style={{ height: '50px' }}
          alignItems="center">
          {renderPayType()}
        </Grid>
      </Link>
    </Box>
  );
};

export default OrderCard;

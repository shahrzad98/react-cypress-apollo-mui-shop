import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_MANAGER } from '../../../../constant/queries/orders';

const Style = styled('div')({
  position: 'fixed',
  width: '100%',
  background: '#fff',
  zIndex: '999',
  bottom: '0',
  left: '0',
  boxShadow: '0 -2px 8px 0 rgb(72 52 147 / 8%)',
  padding: '11px',
  '& button': {
    height: '46px',
    fontSize: '14px',
    '&:disabled': {
      backgroundColor: '#DAD6E9'
    }
  }
});

const ActionButton = ({ orderId, onClick }) => {
  const { data } = useQuery(GET_MANAGER, {
    variables: {
      getManagerId: orderId
    }
  });

  const { status } = data.order.getManager;

  const buttonName = {
    14: 'بررسی درخواست',
    2: 'بررسی سفارش',
    3: 'ارسال سفارش',
    16: 'بررسی سفارش',
    4: 'تحویل شده',
    17: 'تحویل شده',
    10: 'برگرداندن مبلغ',
    11: 'برگرداندن مبلغ',
    12: 'برگرداندن مبلغ',
    8: 'check'
  };

  if (!buttonName[status]) return null;

  if (status === 4 && data?.order?.getManager?.shipping_type !== 'other') return null;

  return (
    <Style>
      <Button
        disabled={status === 12 || status === 13}
        fullWidth
        onClick={onClick}
        variant="contained"
        color="primary">
        {buttonName[status]}
      </Button>
    </Style>
  );
};

export default ActionButton;

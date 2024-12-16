import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import EmptyPaymentSvg from '../../svg/EmptyPaymentSvg';
import { useNavigate } from 'react-router-dom';

export default function EmptyList() {
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      alignItems={'center'}
      justifyContent={'space-evenly'}
      height={'60%'}
    >
      <Stack direction="column" alignItems={'center'}>
        <Stack direction={'row'}>
          <EmptyPaymentSvg />
        </Stack>
        <Stack direction={'row'} mt={4}>
          <Typography
            variant="h5"
            fontSize={'16px'}
            component={'h1'}
            color={'GrayText'}
          >
            تابحال هیچ روش پرداختی تعریف نکردید !
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={'row'}>
        <Button
          color="primary"
          variant="outlined"
          style={{ padding: '0 90px' }}
          onClick={() => navigate('/store/payment/create')}
        >
          تعریف روش پرداخت
        </Button>
      </Stack>
    </Stack>
  );
}

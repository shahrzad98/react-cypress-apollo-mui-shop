import { Box, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as NotificationSvg } from './svg/notificationSvg.svg';

const NotificationCard = ({ customText }) => {
  return (
    <Box
      bgcolor={'#EDF5FF'}
      mt={'16px'}
      borderLeft={'4px solid #0F62FE'}
      p={'14px'}
      display={'flex'}
      alignItems={'center'}
    >
      <NotificationSvg style={{ flexShrink: 0 }} />
      <Typography
        fontSize={'16px'}
        color={'#262626'}
        fontWeight={500}
        pl={'14px'}
      >
        {customText}
      </Typography>
    </Box>
  );
};

export default NotificationCard;

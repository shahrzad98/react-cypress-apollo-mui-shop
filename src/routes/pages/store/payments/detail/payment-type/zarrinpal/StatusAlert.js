import * as React from 'react';
import { Alert, Box, Link, Stack, Typography } from '@mui/material';
import { ReactComponent as InfoSVG } from '../../../../../../../static/svg/info.svg';
import { useNavigate } from 'react-router-dom';

const StatusAlert = ({ type }) => {
  const navigate = useNavigate();

  const dictionary = {
    info: { color: '#0F62FE' },
    error: { color: '#DA1E28' }
  };
  return (
    <Alert
      severity={type}
      icon={false}
      sx={{ borderLeft: `4px solid ${dictionary[type].color}` }}
    >
      <Stack direction="row" alignItems="center">
        <Box width={40} mr={2}>
          <InfoSVG fill={dictionary[type].color} />
        </Box>
        {type === 'info' && (
          <Typography fontWeight={500} fontSize={14}>
            اطلاعات حساب کاربری شما تایید شده است. می توانید درخواست درگاه خود
            را تکمیل کنید.
          </Typography>
        )}

        {type === 'error' && (
          <Typography fontWeight={400} fontSize={14}>
            ساخت درگاه پرداخت زرین پال با مشکل روبرو شده است. می توانید با ورود
            به پنل کاربری خود مشکل را برطرف کنید.
          </Typography>
        )}
      </Stack>

      <Stack direction="row" justifyContent="flex-end" mt={2}>
        {type === 'info' && (
          <Typography
            color={dictionary[type].color}
            fontWeight={500}
            onClick={() => navigate('/store/payment/create/zarrinpal/gateway')}
          >
            ادامه ساخت درگاه
          </Typography>
        )}

        {type === 'error' && (
          <Link
            color={dictionary[type].color}
            fontWeight={500}
            fontSize={14}
            sx={{ textDecoration: 'none' }}
            href="http://zarinpal.com/panel"
            target="_blank"
            rel="noreferrer noopener"
          >
            http://zarinpal.com/panel
          </Link>
        )}
      </Stack>
    </Alert>
  );
};

export default StatusAlert;

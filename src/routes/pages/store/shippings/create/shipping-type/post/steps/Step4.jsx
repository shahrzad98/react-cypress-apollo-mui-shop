import * as React from 'react';
import { ReactComponent as PostSuccess } from '../../../../../svg/postSuccess.svg';
import { ReactComponent as PostEdit } from '../../../../../svg/postEdit.svg';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Step4 = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Stack flexDirection="column" alignItems="center">
      <Typography fontWeight={500} mb={4}>
        ساخت حساب کاربری پست
      </Typography>
      <Box my={4}>{state?.step === 4 ? <PostEdit /> : <PostSuccess />}</Box>
      <Box my={4}>
        <Typography textAlign="center">
          {state?.step === 4
            ? 'درخواست تغییر اطلاعات حساب کاربری پست برای شما ثبت شد. پس از بررسی اطلاعات توسط پست، نتیجه درخواست شما اعلام می‌شود.'
            : 'روش ارسال‌پستی فروشگاه با موفقیت تکمیل، و به روش‌های در دسترس شما افزوده شد.'}
        </Typography>
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate('/store/shippings/')}
      >
        بازگشت به روش های ارسال
      </Button>
    </Stack>
  );
};

export default Step4;

import { Button, Grid, Modal } from '@mui/material';
import { ReactComponent as SuccessShipping } from '../../../svg/successShipping.svg';
import { ReactComponent as FailedShipping } from '../../../svg/failedShipping.svg';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

const Style = styled(Grid)`
  h4 {
    font-weight: 500;
    font-size: 18px;
    color: #6a6f80;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    color: #2f2f2f;
  }
`;

const shippingName = {
  alopeyk: 'الوپیک',
  digiexpress: 'دیجی اکسپرس',
  postex: 'پستکس',
  tipax: 'تیپاکس',
  other: 'دیگر'
};

const ShippingModal = ({ open, onClose, type = 'failed' }) => {
  const navigate = useNavigate();
  const { shippingID } = useParams();

  const TYPES = {
    success: {
      icon: <SuccessShipping />,
      title: 'ساخت روش ارسال موفق',
      desc: `روش ارسال ${shippingName[shippingID]} برای شما با موفقیت ساخته شد.`
    },
    failed: {
      icon: <FailedShipping />,
      title: 'ساخت حساب کاربری ناموفق',
      desc: 'اطلاعات حساب کاربری صحیح وارد نشده است.'
    }
  };

  return (
    <Modal open={open} onClose={onClose} data-cy="shipping-modal">
      <Style
        width="100vw"
        height="100vh"
        container
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          width="90%"
          height="70%"
          bgcolor="#fff"
          borderRadius="10px"
          p="30px 16px"
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            {TYPES[type].icon}
            <h4>{TYPES[type].title}</h4>
            <p>{TYPES[type].desc}</p>
          </Grid>
          <Button
            onClick={() => {
              onClose();
              type === 'success' && navigate('/store/shippings');
            }}
            fullWidth
            data-cy="understand‌Btn"
            color="primary"
            variant="contained"
          >
            متوجه شدم
          </Button>
        </Grid>
      </Style>
    </Modal>
  );
};

export default ShippingModal;

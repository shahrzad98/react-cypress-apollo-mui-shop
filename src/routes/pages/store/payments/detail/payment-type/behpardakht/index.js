import { styled, Card, Stack, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PhoneSVG } from '../../../../../orders/Details/actionDrawer/statuses/InPreparing/alopeyk/svg/phone.svg';
import MemoEmailPayment from '../../../../svg/EmailPayment';

const StyledCard = styled(Card)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 16px;
  padding: 16px;
`;
const StyledBox = styled(Box)({
  borderLeft: ' 2px solid #DAD6E9',
  padding: '5px',
  margin: '16px'
});
export default function index() {
  const navigate = useNavigate();

  return (
    <>
      {/* ======================head========================== */}
      <Stack
        direction="row"
        alignItems="center"
        onClick={() => navigate('/store/payment')}
        my="24px"
        mx="18px"
      >
        <i className="df-arrow" />
        <Typography fontSize="20px" fontWeight={500} mx={2}>
          روش پرداخت
        </Typography>
      </Stack>
      <StyledBox>
        <Typography fontSize="14px" fontWeight={400} mx={1}>
          اطلاعات روش پرداخت به پرداخت
        </Typography>
      </StyledBox>
      <StyledCard>
        {/* ===================== Support  ==================== */}
        <Stack direction="column" mt={3}>
          <Typography fontSize="14px" fontWeight={400}>
            درصورت نیاز به ویرایش یا ساخت حساب جدید، درخواست خود را به پشتیبانی
            ارسال کنید.
          </Typography>
          <StyledBox
            style={{
              margin: '24px 0px',
              padding: 0,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              fontSize="14px"
              fontWeight={400}
              mx={1}
              color={'GrayText'}
            >
              پشتیبانی
            </Typography>
            <Stack direction="row">
              <Typography
                fontSize="14px"
                fontWeight={400}
                color={'GrayText'}
                mr={1}
              >
                021-40885523
              </Typography>

              <PhoneSVG />
            </Stack>
          </StyledBox>
          <Stack direction="row-reverse">
            <Typography fontSize="14px" fontWeight={500} mx={1}>
              ارسال درخواست
            </Typography>
            <MemoEmailPayment />
          </Stack>
        </Stack>
      </StyledCard>
    </>
  );
}

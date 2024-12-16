import { Box, Grid, Stack, styled, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import ListItem from './lietItem';
import CardToCardComponent from '../../svg/CardToCardComponent';
// import PayPing from '../../svg/PaypingComponent.js';
// import IdPayComponent from '../../svg/IdPayComponent';
import BehPardakhtComponent from '../../svg/BehPardakhtComponent';
import ZarinPal from '../../svg/ZarinPal';
// import PaymentSpot from '../../svg/PaymentSpot';
import { useNavigate } from 'react-router-dom';
import { GET_PAYMENT_METHODS } from '../../../../../constant/queries/payment';
import { useQuery } from '@apollo/client';

const StyledBox = styled(Box)({
  borderLeft: ' 3px solid #DAD6E9',
  padding: '5px',
  margin: '16px'
});

export default function GateWay() {
  const navigate = useNavigate();
  const { data } = useQuery(GET_PAYMENT_METHODS);

  const ITEMS = useMemo(() => {
    const {
      payment: { getPaymentMethods }
    } = data;
    return [
      {
        svg: <CardToCardComponent />,
        paymentType: 3,
        title: ' کارت به کارت',
        link: 'cardtocard'
      },
      {
        svg: <BehPardakhtComponent />,
        paymentType: 4,
        title: 'به پرداخت',
        link: 'behpardakht'
      },
      // {
      //   svg: <IdPayComponent />,
      //   paymentType: 2,
      //   title: 'آی دی پی'
      // },
      // {
      //   svg: <PayPing />,
      //   paymentType: 1,
      //   title: 'پی پینگ'
      // },
      // {
      //   svg: <PaymentSpot />,
      //   paymentType: 9,
      //   title: 'پرداخت درمحل '
      // },
      {
        svg: <ZarinPal />,
        paymentType: 5,
        title: 'زرین پال',
        link: 'zarrinpal'
      }
    ].map(paymentMethod => ({
      ...paymentMethod,
      disabel: !!getPaymentMethods.find(
        item => item.gateway_type === paymentMethod.paymentType
      )
    }));
  }, [data]);

  return (
    <>
      {/* ======================head========================== */}
      <Grid container alignItems={'center'}>
        <Grid item xs={10}>
          <Stack
            direction="row"
            alignItems="center"
            onClick={() => navigate('/store/payment')}
            my="24px"
            mx="18px"
          >
            <i className="df-arrow" />
            <Typography fontSize="20px" fontWeight={500} mx={1}>
              تعریف روش پرداخت
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack height={'calc(100vh - 148px)'} overflow="auto">
        <StyledBox>
          <Typography fontSize="14px" fontWeight={400} mx={1}>
            روش پرداخت مورد نظر خود را برای ساخت و فعال سازی انتخاب کنید
          </Typography>
        </StyledBox>
        {/* ======================== main ======================== */}
        <Grid container>
          {ITEMS.map((ele, index) => {
            return (
              <Grid item xs={6} key={index}>
                <ListItem
                  link={ele?.link}
                  svgComponent={ele?.svg}
                  title={ele?.title}
                  key={index}
                  disabel={ele.disabel}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </>
  );
}

import * as React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EmptyList from './EmptyList';
import CenteredLoading from '../../../../../components/shared/UI/CenteredLoading';
import { GET_PAYMENT_METHODS } from '../../../../../constant/queries/payment';
import PaymentListItem from './listItem';

const Payments = () => {
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_PAYMENT_METHODS, {
    notifyOnNetworkStatusChange: true
  });

  const paymentMethods = React.useMemo(() => {
    if (data) {
      return data?.payment?.getPaymentMethods.filter(
        ele => ele.gateway_type != 1 && ele.gateway_type != 2
      );
    }
  }, [data]);
  const StyledBox = styled(Box)({
    borderRight: ' 3px solid #DAD6E9',
    padding: '5px',
    margin: '16px'
  });

  return (
    <>
      <Grid my="24px" px={2} container alignItems={'center'}>
        <Grid item xs={9}>
          <Stack
            direction="row"
            alignItems="center"
            onClick={() => navigate('/store/')}
          >
            <i className="df-arrow" />
            <Typography fontSize="20px" fontWeight={500} ml={1}>
              روش پرداخت
            </Typography>
          </Stack>
        </Grid>

        <Grid
          item
          xs={3}
          display={'flex'}
          alignItems={'center'}
          justifyContent="flex-end"
          onClick={() => navigate('/store/payment/create')}
          color="#483493"
        >
          <AddIcon className="plus" />
          <span>تعریف</span>
        </Grid>
      </Grid>

      <StyledBox>
        <Typography fontSize="18px" fontWeight={500} mx={1}>
          روش پرداخت‌های شما
        </Typography>
      </StyledBox>
      {loading ? (
        <CenteredLoading />
      ) : !paymentMethods?.length ? (
        <EmptyList />
      ) : (
        <>
          {paymentMethods?.map(
            item =>
              item.gateway_type === 3 && (
                <PaymentListItem
                  key={item.id}
                  gatewayType={item.gateway_type}
                  item={item}
                  paymentIfo={item}
                />
              )
          )}
          <Divider style={{ width: '90%', margin: '16px' }} />
          {paymentMethods?.map(
            paymentMethod =>
              paymentMethod.gateway_type !== 3 && (
                <PaymentListItem
                  key={paymentMethod.id}
                  gatewayType={paymentMethod.gateway_type}
                  paymentIfo={paymentMethod}
                />
              )
          )}
        </>
      )}
    </>
  );
};

export default Payments;

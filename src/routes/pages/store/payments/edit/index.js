import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CenteredLoading from '../../../../../components/shared/UI/CenteredLoading';
import { GET_PAYMENT_METHOD } from '../../../../../constant/queries/payment';
import CardToCard from './payment-type/cardToCard';

const PAYMENT_TYPES = {
  ['card to card']: CardToCard
};

const Index = () => {
  const params = useParams();

  const { data, loading, refetch } = useQuery(GET_PAYMENT_METHOD, {
    variables: {
      getPaymentMethodId: params?.id
    }
  });

  const paymentName = useMemo(() => {
    if (data) {
      return data.payment.getPaymentMethod.gateway_type_display;
    }
  }, [data]);
  const PaymentComponent = PAYMENT_TYPES[paymentName] || 'ANOTHER';

  return loading ? (
    <CenteredLoading />
  ) : (
    <PaymentComponent data={data} refetch={refetch} loading={loading} />
  );
};

export default Index;

import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CenteredLoading from '../../../../../components/shared/UI/CenteredLoading';
import { GET_SHIPPING_METHOD_DETAIL } from '../../../../../constant/queries/shipping';
import Alopeyk from './shipping-type/alopeyk';
import Postex from './shipping-type/postex';
import Tipax from './shipping-type/tipax';
import Other from './shipping-type/other';
import Digiexpress from './shipping-type/digiexpress';
import Post from './shipping-type/post';

const SHIPPING_TYPES = {
  alopeyk: <Alopeyk />,
  postex: <Postex />,
  digiexpress_tipax: <Tipax />,
  other: <Other />,
  digiexpress: <Digiexpress />,
  post: <Post />
};

const Index = () => {
  const params = useParams();

  const { data, loading } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } }
  });

  const shippingName = useMemo(() => {
    if (data) {
      return data.shipping.getShippingMethodDetail.shipping_type_display;
    }
  }, [data]);

  return loading ? (
    <CenteredLoading />
  ) : (
    SHIPPING_TYPES?.[shippingName] || 'another'
  );
};

export default Index;

import React from 'react';
import { useParams } from 'react-router-dom';
import Alopeyk from './alopeyk';
import Digiexpress from './digiexpress';
import Tipax from './tipax';
import Postex from './postex';
import Other from './other';
import Post from './post';

const SHIPPING_TYPES = {
  alopeyk: <Alopeyk />,
  digiexpress: <Digiexpress />,
  postex: <Postex />,
  tipax: <Tipax />,
  post: <Post />,
  other: <Other />
};

const Index = () => {
  const { shippingID } = useParams();

  return SHIPPING_TYPES[shippingID] || 'another';
};

export default Index;

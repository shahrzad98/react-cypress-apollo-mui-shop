import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from './client';

const Apollo = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Apollo;

import { ApolloClient, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import cache from './cache';
import urls from '../constant/urls';
import typeDefs from './TypeDefs';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = new createUploadLink({
  uri: urls.graphQlUri,
  credentials: 'include',
  headers: {
    'Accept-Language': 'fa-IR'
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      if (message === '401: Unauthorized') {
        if (
          window.location.pathname !== '/login' &&
          !window.location.pathname?.includes('forget-password')
        ) {
          window.location.replace('/login');
        }
      }
      if (message === '468: Unknown Status Code') {
        const packageExpiredEvent = new Event('packageExpired');
        window.dispatchEvent(packageExpiredEvent);
      }
    });
});
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  typeDefs,
  connectToDevTools: process.env.NODE_ENV !== 'production'
});

export default client;

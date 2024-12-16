import { InMemoryCache } from '@apollo/client';
import { foundAlopeykSafirVar } from './vars';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getAloPeykSafir: {
          read() {
            return foundAlopeykSafirVar();
          }
        }
      }
    }
  }
});

export default cache;

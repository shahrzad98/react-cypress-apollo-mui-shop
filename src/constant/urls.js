let graphQlUri;

if (process.env.NODE_ENV === 'development') {
  graphQlUri = 'http://localhost:5000/graphql';
} else if (process.env.NODE_ENV === 'production') {
  if (process.env.REACT_APP_STAGING === 'true') {
    graphQlUri = 'https://apollo.apps.digify.shop/graphql';
  } else {
    graphQlUri = 'https://apollo.digify.shop/graphql';
  }
}

const urls = {
  graphQlUri
};

export default urls;

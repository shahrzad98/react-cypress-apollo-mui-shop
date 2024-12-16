import { toast } from 'react-toastify';
// import farsiErrors from "../constant/farsiErrors";

const handleApolloError = ({ graphQLErrors, networkError }) => {
  let errors = {};

  if (graphQLErrors) {
    graphQLErrors.map(
      ({
        extensions: {
          response: { body },
          code
        }
      }) => {
        if (body) {
          for (let i in body) {
            errors = {
              ...errors,
              [i]: body[i][0]
            };
          }
        } else {
          toast.error(code);
        }
      }
    );
  }

  if (networkError) {
    toast.error('network error');
    return;
  }

  return errors;
};

export default handleApolloError;

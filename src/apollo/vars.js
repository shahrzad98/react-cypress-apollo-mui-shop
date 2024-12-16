import { makeVar } from '@apollo/client';

export const foundAlopeykSafirVar = makeVar({
  status: '',
  action_id: '',
  store_id: '',
  alopeyk_agent_info: {
    phone: '',
    firstname: '',
    lastname: '',
    avatar: {
      url: ''
    }
  }
});

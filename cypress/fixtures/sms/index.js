export const getSmsDataLocal = {
  data: {
    store: {
      getSmsData: {
        id: '4',
        report_sms_send: true,
        customer_sms_send: true,
        sms_charge: 8539891,
        sms_count: 27914,
        initial_sms_count: 179673,
        sms_cost: 48,
        __typename: 'StoreSmsData'
      },
      __typename: 'StoreQuery'
    }
  }
};

export const getSmsDataAfterDisabelReport = {
  data: {
    store: {
      getSmsData: {
        id: '4',
        report_sms_send: false,
        customer_sms_send: true,
        sms_charge: 8539891,
        sms_count: 27914,
        initial_sms_count: 179673,
        sms_cost: 48,
        __typename: 'StoreSmsData'
      },
      __typename: 'StoreQuery'
    }
  },
  errors: null
};

export const getSmsDataAfterDisabelCustomer = {
  data: {
    store: {
      getSmsData: {
        id: '4',
        report_sms_send: true,
        customer_sms_send: false,
        sms_charge: 8539891,
        sms_count: 27914,
        initial_sms_count: 179673,
        sms_cost: 48,
        __typename: 'StoreSmsData'
      },
      __typename: 'StoreQuery'
    }
  },
  errors: null
};

export const patchSmsData = {
  data: {
    store: {
      patchSmsData: {
        customer_sms_send: true,
        report_sms_send: false,
        __typename: 'StoreSmsData'
      },
      __typename: 'StoreMutation'
    }
  }
};

export const patchSmsDataCustomer = {
  data: {
    store: {
      patchSmsData: {
        customer_sms_send: false,
        report_sms_send: true,
        __typename: 'StoreSmsData'
      },
      __typename: 'StoreMutation'
    }
  }
};

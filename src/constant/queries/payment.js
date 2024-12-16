import { gql } from '@apollo/client';

export const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods {
    payment {
      getPaymentMethods {
        first_name
        last_name
        email
        phone_number
        national_code
        birthday
        province
        city
        address
        sheba_number
        postal_code
        telephone_number
        store
        is_default
        is_active
        gateway_type
        id
        card_number
        gateway_type_display
        is_confirmed
        have_access
        cancel_duration_for_approve_order
        card_to_card_customer_payment_duration
        card_to_card_working_in_holidays
        is_basic_info_confirmed
        is_identity_info_confirmed
        is_gateway_confirmed
        level
      }
    }
  }
`;

export const GET_PAYMENT_METHOD = gql`
  query Payment($getPaymentMethodId: ID) {
    payment {
      getPaymentMethod(id: $getPaymentMethodId) {
        level
        is_gateway_confirmed
        is_identity_info_confirmed
        is_basic_info_confirmed
        card_to_card_working_in_holidays
        card_to_card_customer_payment_duration
        cancel_duration_for_approve_order
        have_access
        is_confirmed
        gateway_type_display
        card_number
        id
        is_active
        gateway_type
        is_default
        store
        telephone_number
        postal_code
        sheba_number
        address
        city
        province
        birthday
        phone_number
        national_code
        email
        last_name
        first_name
        behpardakht_terminalId
        behpardakht_password
        behpardakht_username
      }
    }
  }
`;

export const GET_ZARRINPAL_STATUS = gql`
  query GetZarrinPalStatus {
    payment {
      getZarrinPalStatus {
        level
        active_terminals {
          id
          domain
          name
        }
        phone_number
        is_basic_info_confirmed
        is_identity_info_confirmed
        is_gateway_confirmed
      }
    }
  }
`;

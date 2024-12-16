import { gql } from '@apollo/client';

export const GET_STORE_INFO = gql`
  query My_brand {
    user {
      getUserRead {
        my_store {
          id
          name
          guild
          telephone_number
          birthday
          email
          first_name
          last_name
          national_code
          phone_number
          sheba_number
          store_address {
            address
            city
            province
            latitude
            longitude
            postal_code
          }
          logo {
            image
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_PACKAGE = gql`
  query GetCurrentPackage {
    packages {
      getCurrentPackage {
        id
        start_date_time
        end_date_time
        is_activated
        can_use_renew_voucher
        is_reserved
        package {
          name
          cost
          is_active
          renew_voucher_amount
        }
      }
    }
  }
`;

export const GET_BUYABLE_PACKAGE = gql`
  query Results {
    user {
      getUserRead {
        my_store {
          national_code
          sheba_number
        }
      }
    }
    packages {
      getPackages {
        results {
          name
          duration
          id
          cost
          renew_voucher_amount
          renew_voucher
          renew_voucher_type
        }
      }
    }
  }
`;

export const GET_SMS_DATA = gql`
  query GetSmsData {
    store {
      getSmsData {
        id
        report_sms_send
        customer_sms_send
        sms_charge
        sms_count
        initial_sms_count
        sms_cost
      }
    }
  }
`;

export const GET_FINANCIAL_DATA = gql`
  query GetFinancialData($params: FinancialDataParams) {
    packages {
      getFinancialData(params: $params) {
        count
        next
        previous
        results {
          main_amount
          created_at
          amount
          sms_cost
          reference_code
          status
          title
          validity_rate
        }
      }
    }
  }
`;

export const GET_WALLET_DATA = gql`
  query GetWalletData {
    store {
      getWalletData {
        amount
      }
    }
  }
`;

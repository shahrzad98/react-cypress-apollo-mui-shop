import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GetUserRead {
    user {
      getUserRead {
        has_active_purchase_package
        my_store {
          id
          ecommerce {
            is_active
            expire_date
            full_sub_domain_path
          }
        }
        my_brand {
          id
        }
      }
    }
  }
`;

export const GET_COOKIE = gql`
  mutation getCookie($content: TokenContent!) {
    user {
      getCookie(content: $content) {
        access
        refresh
      }
    }
  }
`;

export const CLEAR_COOKIE = gql`
  mutation clearCookie {
    user {
      clearCookie
    }
  }
`;

export const CHANGE_POSTEX_PASSWORD = gql`
  mutation PartialUpdatePostexInfo($content: PostexContent) {
    order {
      partialUpdatePostexInfo(content: $content)
    }
  }
`;

export const CHARGE_SMS = gql`
  mutation ChargeSms($content: ChargeSmsParams) {
    packages {
      chargeSms(content: $content) {
        charge_result
        token
        invoice_id
        gateway_type
      }
    }
  }
`;

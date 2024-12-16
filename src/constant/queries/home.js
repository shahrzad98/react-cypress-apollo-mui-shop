import { gql } from '@apollo/client';

export const GET_HOME_DATA = gql`
  query getHomeData(
    $params: ordersBriefParams
    $getItemsBriefParams2: ItemsBriefParams
  ) {
    user {
      getUserRead {
        my_store {
          email
          phone_number
          first_name
          name
          id
          ecommerce {
            domain
            full_sub_domain_path
            is_domain_confirmed
          }
        }
      }
    }
    store {
      getHomeData {
        orders_count
        products_count
        customers_count
        logo {
          image
        }
        recharge_date
        expire_date
        sms_charge
        initial_sms_charge
        name
      }
    }
    order {
      getOrdersBrief(params: $params) {
        results {
          customer_first_name
          customer_last_name
          status
          id
          cost
        }
      }
    }
    item {
      getItemsBrief(params: $getItemsBriefParams2) {
        results {
          id
          unlimited_variant_count
          stock
          primary_cost
          label
          image {
            image
          }
          is_active
        }
      }
    }
  }
`;

export const GET_WEBSOCKET_NOTIF = gql`
  query GetTokenPanel {
    notification {
      getTokenPanel {
        token
      }
    }
  }
`;

export const GET_ALOPEYK_SAFIR = gql`
  query getAlopeyk {
    getAloPeykSafir @client
  }
`;

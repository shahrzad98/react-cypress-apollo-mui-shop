import { gql } from '@apollo/client';

export const GET_MANAGER = gql`
  query GetManager($getManagerId: ID!) {
    order {
      getManager(id: $getManagerId) {
        pocket_cost
        cost
        created_at
        is_seen
        courier_info {
          phone
          avatar {
            url
          }
          lastname
          firstname
        }
        registration_type
        prepare_deadline
        fa_registration_type
        tracking_url
        total_profit
        shipping_cost
        order_weight
        sent_at
        confirmed_at
        pocket_name
        expired_at
        preparing_days
        shipping_support_number
        address {
          lat: latitude
          lng: longitude
          address
          city
          province
          postal_code
        }
        customer_description
        order_description
        shipping_type
        shipping {
          cost
          name
        }
        total_primary_cost
        tax
        id
        loyalty_amount
        total_discount_cost
        status
        owner_card_name
        owner_card_number
        previous_status
        deadline_date
        reference_code
        shipping_name
        customer {
          name
          phone_number
          card_number
        }
        items {
          details {
            variant {
              images {
                image
              }
              option_values {
                value
                option {
                  name
                }
              }
              product_serialized {
                images {
                  image
                }
                label
                chosen_image {
                  image
                }
              }
              primary_cost
              cost
            }
          }
          unit_amount
        }
        payment {
          transactions {
            card_bills {
              image
              created_at
            }
          }
        }
      }
      getOrderSend(id: $getManagerId) {
        approximate_post_cost
        shipping_time_sending
        weight
        is_sms_service_active
        receiver_phone_number
        receiver_last_name
        receiver_first_name
        wallet_balance
        pay_at_dest
        postex_username
        address {
          address
          city
          province
          postal_code
        }
        merchant_data {
          address {
            city
            province
            address
            postal_code
          }
          first_name
          last_name
          phone_number
        }
      }
    }
  }
`;

export const GET_MANAGER_POSTEX = gql`
  query GetManager($getManagerId: ID!, $params: citiesParams) {
    order {
      getManager(id: $getManagerId) {
        cost
        created_at
        registration_type
        prepare_deadline
        tracking_url
        total_profit
        shipping_cost
        order_weight
        sent_at
        confirmed_at
        expired_at
        preparing_days
        shipping_support_number
        address {
          lat: latitude
          lng: longitude
          address
          city
          province
          postal_code
        }
        customer_description
        order_description
        shipping_type
        shipping {
          cost
          name
        }
        total_primary_cost
        tax
        id
        loyalty_amount
        total_discount_cost
        status
        owner_card_name
        owner_card_number
        previous_status
        deadline_date
        reference_code
        customer {
          name
          phone_number
        }
        items {
          details {
            variant {
              images {
                image
              }
              option_values {
                value
                option {
                  name
                }
              }
              product_serialized {
                images {
                  image
                }
                label
                chosen_image {
                  image
                }
              }
              primary_cost
              cost
            }
          }
        }
        payment {
          transactions {
            card_bills {
              image
              created_at
            }
          }
        }
      }
      getOrderSend(id: $getManagerId) {
        approximate_post_cost
        shipping_time_sending
        weight
        is_sms_service_active
        receiver_phone_number
        receiver_last_name
        receiver_first_name
        wallet_balance
        pay_at_dest
        postex_username
        address {
          address
          city
          province
          postal_code
        }
        merchant_data {
          address {
            city
            province
            address
            postal_code
          }
          first_name
          last_name
          phone_number
        }
      }
      getPostCartoonsInsurances {
        cartoons
        insurances
      }
      getPostexInfo {
        password_state
      }
      getPostProvincesCities(params: $params) {
        provinces {
          name
        }
        cities
      }
    }
  }
`;
export const GET_MANAGER_POST = gql`
  query GetManager($getManagerId: ID!, $params: citiesParams) {
    order {
      getManager(id: $getManagerId) {
        cost
        created_at
        registration_type
        prepare_deadline
        tracking_url
        total_profit
        shipping_cost
        order_weight
        sent_at
        confirmed_at
        expired_at
        preparing_days
        shipping_support_number
        address {
          lat: latitude
          lng: longitude
          address
          city
          province
          postal_code
        }
        customer_description
        order_description
        shipping_type
        shipping {
          cost
          name
        }
        total_primary_cost
        tax
        id
        loyalty_amount
        total_discount_cost
        status
        owner_card_name
        owner_card_number
        previous_status
        deadline_date
        reference_code
        customer {
          name
          phone_number
        }
        items {
          details {
            variant {
              images {
                image
              }
              option_values {
                value
                option {
                  name
                }
              }
              product_serialized {
                images {
                  image
                }
                label
                chosen_image {
                  image
                }
              }
              primary_cost
              cost
            }
          }
        }
        payment {
          transactions {
            card_bills {
              image
              created_at
            }
          }
        }
      }
      getOrderSend(id: $getManagerId) {
        approximate_post_cost
        shipping_time_sending
        weight
        is_sms_service_active
        receiver_phone_number
        receiver_last_name
        receiver_first_name
        wallet_balance
        pay_at_dest
        postex_username
        address {
          address
          city
          province
          postal_code
        }
        merchant_data {
          address {
            city
            province
            address
            postal_code
          }
          first_name
          last_name
          phone_number
        }
      }
      getPostProvincesCities(params: $params) {
        provinces {
          name
        }
        cities
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetManagers($params: ManagersParams) {
    order {
      getManagers(params: $params) {
        count
        next
        previous
        results {
          id
          is_seen
          reference_code
          customer {
            name
          }
          created_at
          registration_type
          cost
          status
        }
        status_count {
          status
          total
        }
      }
    }
  }
`;
export const GET_ORDERS_AND_FILTERS = gql`
  query GetManagers($params: ManagersParams) {
    order {
      getManagers(params: $params) {
        count
        next
        previous
        results {
          id
          is_seen
          reference_code
          customer {
            name
          }
          created_at
          registration_type
          cost
          status
        }
        status_count {
          status
          total
        }
      }
      getManagersFilterPrimaries {
        max_cost
        min_cost
        cities
      }
    }
  }
`;

export const GET_STATUSES = gql`
  query GetManagersStatusCount {
    order {
      getManagersStatusCount {
        status_count {
          status
          total
        }
        returns_count
        all
      }
    }
  }
`;

export const GET_FILTER_PRIMS = gql`
  query GetManagersFilterPrimaries {
    order {
      getManagersFilterPrimaries {
        max_cost
        min_cost
        cities
      }
    }
  }
`;

export const GET_POSTEX_INSURANCES = gql`
  query GetPostCartoonsInsurances {
    order {
      getPostCartoonsInsurances {
        cartoons
        insurances
      }
    }
  }
`;

export const SEND_POSTEX_PASSWORD = gql`
  query GetPostexPassword {
    order {
      getPostexPassword
    }
  }
`;
export const GET_DIGIEXPRESS_CITIES = gql`
  query GetDigiExpressActiveCities {
    shipping {
      getDigiExpressActiveCities {
        active_cities
      }
    }
  }
`;

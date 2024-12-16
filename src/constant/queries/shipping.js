import { gql } from '@apollo/client';

export const GET_SHIPPING_METHODS = gql`
  query GetShippingMethods($param: ShippingMethodsParam) {
    shipping {
      getShippingMethods(param: $param) {
        count
        results {
          name
          chips_values
          other_provinces_is_active
          my_province_is_active
          is_national_post_active
          is_rejected
          id
          shipping_type
          shipping_type_display
        }
        status_count {
          shipping_type
          total
          status
        }
      }
    }
  }
`;

export const GET_SHIPPING_METHOD_DETAIL = gql`
  query GetShippingMethodDetail($param: ShippingDetailParam) {
    shipping {
      getShippingMethodDetail(param: $param) {
        address {
          city
          province
          address
          no
          postal_code
          unit_number
          id
          description
          receiver_name
          receiver_lastname
          receiver_number
          name
          longitude
          latitude
        }
        id
        name
        is_active
        description
        cost
        shipping_type
        other_provinces_cost
        shipping_type_display
        time_sending
        other_provinces_time_sending
        my_province_is_active
        other_provinces_is_active
        postex_username
        is_national_post_active
        is_sms_service_active
        pay_at_dest
        chips_values
        title_values
      }
    }
  }
`;

export const GET_PROVINCES_CITIES = gql`
  query GetProvincesCities($param: ProvincesCitiesParam) {
    shipping {
      getProvincesCities(param: $param) {
        provinces {
          name
        }
        cities
      }
    }
  }
`;

export const GET_POST_PROVINCES_CITIES = gql`
  query GetProvincesCities($params: citiesParams) {
    order {
      getPostProvincesCities(params: $params) {
        provinces {
          name
        }
        cities
      }
    }
  }
`;

export const GET_UNIT_NODES = gql`
  query GetUnitsNodes {
    shipping {
      getUnitsNodes {
        units
        nodes
      }
    }
  }
`;

export const GET_NESHAN_CITY = gql`
  query GetNeshanCity($param: NeshanCityParam) {
    shipping {
      getNeshanCity(param: $param) {
        state
        city
      }
    }
  }
`;

export const SEND_POSTEX_SMS = gql`
  query SendPostexSms {
    shipping {
      sendPostexSms
    }
  }
`;

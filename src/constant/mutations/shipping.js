import { gql } from '@apollo/client';

export const CREATE_SHIPPING = gql`
  mutation CreateNewShipping($content: CreateShippingContent) {
    shipping {
      createNewShipping(content: $content) {
        id
        name
        is_active
      }
    }
  }
`;

export const EDIT_SHIPPING = gql`
  mutation EditShipping($id: ID!, $content: CreateShippingContent) {
    shipping {
      editShipping(id: $id, content: $content) {
        cost
        pay_at_dest
        my_province_is_active
        other_provinces_is_active
      }
    }
  }
`;

export const EDIT_POST_METHOD = gql`
  mutation EditPostMethod($content: CreatePostContent) {
    shipping {
      editPostMethod(content: $content) {
        id
        name
        is_active
        description
        time_sending
        cost
        store
        shipping_type
        shipping_type_display
        other_provinces_cost
        other_provinces_time_sending
        my_province_is_active
        other_provinces_is_active
        postex_username
        pay_at_dest
        is_national_post_active
        is_cost_set
        chips_values
        title_values
        address
      }
    }
  }
`;

export const DELETE_SHIPPING = gql`
  mutation DeleteShipping($content: DeleteShippingContent) {
    shipping {
      deleteShipping(content: $content)
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePostMethod($content: CreatePostContent) {
    shipping {
      createPostMethod(content: $content) {
        id
        name
        is_active
        description
        time_sending
        cost
        store
        shipping_type
        shipping_type_display
        other_provinces_cost
        other_provinces_time_sending
        my_province_is_active
        other_provinces_is_active
        postex_username
        pay_at_dest
        is_national_post_active
        is_cost_set
        chips_values
        title_values
        address {
          city
          province
          address
          no
          postal_code
          id
          unit_number
          description
          receiver_name
          receiver_lastname
          receiver_number
          name
          longitude
          latitude
          unit
          node
        }
      }
    }
  }
`;

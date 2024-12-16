import { gql } from '@apollo/client';

const TypeDefs = gql`
  input TokenContent {
    username: String!
    password: String!
  }
  input OrderStatusContent {
    status: Int
    put_back_items: Boolean
    preparing_days: Int
    cancellation_reason: String
    owner_card_number: String
    owner_card_name: String
  }
  input ManagerContent {
    address: String
    status: String
    shipping: String
    description: String
    tax: Float
    pocket: String
    is_seen: Boolean
    confirmed_at: String
    sent_at: String
    prepare_deadline: String
    owner_card_number: String
    owner_card_name: String
  }
`;

export default TypeDefs;

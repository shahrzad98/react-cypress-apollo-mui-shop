import { gql } from '@apollo/client';

export const CHANGE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus(
    $updateOrderStatusId: ID!
    $content: OrderStatusContent
  ) {
    order {
      updateOrderStatus(id: $updateOrderStatusId, content: $content)
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation PartialUpdateManager(
    $partialUpdateManagerId: ID!
    $content: ManagerContent!
  ) {
    order {
      partialUpdateManager(id: $partialUpdateManagerId, content: $content)
    }
  }
`;

export const UPDATE_ORDER_SEND = gql`
  mutation UpdateOrderSend(
    $updateOrderSendId: ID!
    $content: orderSendContent
  ) {
    order {
      updateOrderSend(id: $updateOrderSendId, content: $content)
    }
  }
`;

export const CANCEL_SHIPPING = gql`
  mutation CancelShipping($cancelShippingId: ID) {
    order {
      cancelShipping(id: $cancelShippingId)
    }
  }
`;

export const CHARGE_ALOPEYK_WALLET = gql`
  mutation ChargeAloPeykWallet($content: ChargeAlopeykContent) {
    order {
      chargeAloPeykWallet(content: $content) {
        charge_result
        token
        invoice_id
        gateway_type
      }
    }
  }
`;

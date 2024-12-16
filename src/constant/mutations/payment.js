import { gql } from '@apollo/client';

export const CREATE_BEHPARDAKHT = gql`
  mutation Payment($content: CreateBehPardakhtContent) {
    payment {
      createBehPardakht(content: $content) {
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

export const EDIT_PAYMENT = gql`
  mutation Payment(
    $editPaymentMethodId: ID!
    $content: CreatePaymentMethodContent
  ) {
    payment {
      editPaymentMethod(id: $editPaymentMethodId, content: $content) {
        first_name
        last_name
        email
        phone_number
        is_active
      }
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation Payment($content: CreatePaymentMethodContent) {
    payment {
      createNewPaymentMethod(content: $content) {
        behpardakht_terminalId
        behpardakht_password
        behpardakht_username
        level
        is_gateway_confirmed
        is_identity_info_confirmed
        card_to_card_customer_payment_duration
        card_to_card_working_in_holidays
        is_basic_info_confirmed
        cancel_duration_for_approve_order
        have_access
        is_confirmed
        gateway_type_display
        card_number
        id
        gateway_type
        is_default
        is_active
        store
        postal_code
        telephone_number
        sheba_number
        address
        city
        birthday
        province
        national_code
        phone_number
        email
        last_name
        first_name
      }
    }
  }
`;

export const EDIT_PAYMENT_CARDTOCARD = gql`
  mutation EditPaymentMethod($id: ID!, $content: CreatePaymentMethodContent) {
    payment {
      editCardToCard(id: $id, content: $content) {
        cancel_duration_for_approve_order
        card_to_card_customer_payment_duration
        card_to_card_working_in_holidays
      }
    }
  }
`;

export const DELETE_PAYMENT = gql`
  mutation DeletePaymentMethod($id: ID!) {
    payment {
      deletePaymentMethod(id: $id)
    }
  }
`;

export const CREATE_ZARRINPAL = gql`
  mutation createZarrinPal($content: CreateZarrinPalContent) {
    payment {
      createZarrinPal(content: $content)
    }
  }
`;

export const VERIFY_ZARRINPAL_OTP = gql`
  mutation verifyZarrinPalOTP($content: CheckZarrinPalOtpContent) {
    payment {
      verifyZarrinPalOTP(content: $content)
    }
  }
`;

export const CHOOSE_EX_ZARRINPAL = gql`
  mutation Payment($content: ChooseZarrinPalTerminalContent) {
    payment {
      chooseExTerminalZarrinpal(content: $content) {
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
        behpardakht_username
        behpardakht_password
        behpardakht_terminalId
      }
    }
  }
`;

export const SUBMIT_ZARRINPAL_CREATION = gql`
  mutation submitZarrinPalCreation {
    payment {
      submitZarrinPalCreation
    }
  }
`;

export const UPLOAD_ZARRINPAL_DOCUMENT = gql`
  mutation UploadZarrinPalDocument($files: [Upload]) {
    payment {
      uploadZarrinPalDocument(files: $files)
    }
  }
`;

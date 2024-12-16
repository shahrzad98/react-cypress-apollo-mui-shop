import { gql } from '@apollo/client';

export const GET_OPT_SMS = gql`
  mutation GetChangePasswordAuth($content: SendOtpForgetPasswordContent) {
    merchantRegister {
      sendSmsForgetPassword(content: $content) {
        is_forget_password
      }
    }
  }
`;

export const CHECK_OTP_CODE = gql`
  mutation MerchantCheckOtp($content: CheckOtpContent) {
    merchantRegister {
      merchantCheckOtp(content: $content)
    }
  }
`;

export const CHANGE_PASSWORD_REGISTER = gql`
  mutation ChangePasswordRegister($content: ChangePasswordRegisterContent) {
    merchantRegister {
      changePasswordRegister(content: $content)
    }
  }
`;

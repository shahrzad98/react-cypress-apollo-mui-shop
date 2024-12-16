import { gql } from '@apollo/client';

export const EDIT_STORE = gql`
  mutation EditStoreData($content: storeFields) {
    store {
      editStoreData(content: $content)
    }
  }
`;

export const CHECK_PACKAGE_VOUCHER = gql`
  mutation CheckPackageVoucher($params: packageVoucherParams) {
    packages {
      checkPackageVoucher(params: $params) {
        discount
      }
    }
  }
`;

export const EDIT_SMS_DATA = gql`
  mutation PatchSmsData($content: PatchSmsDataInput) {
    store {
      patchSmsData(content: $content) {
        customer_sms_send
        report_sms_send
      }
    }
  }
`;

export const BUY_PACKAGE = gql`
  mutation BuyPackage($content: BuyPackageParams) {
    packages {
      buyPackage(content: $content) {
        charge_result
        token
        invoice_id
        gateway_type
      }
    }
  }
`;

export const CHARGE_WALLET = gql`
  mutation ChargeWallet($content: ChargeWalletInput) {
    store {
      chargeWallet(content: $content) {
        charge_result
        token
        invoice_id
        gateway_type
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    item {
      uploadImage(file: $file) {
        id
        uuid
        image
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($content: ProductContent) {
    item {
      createProduct(content: $content) {
        id
      }
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation UpdateProduct($content: ProductContent, $updateProductId: ID!) {
    item {
      updateProduct(content: $content, id: $updateProductId)
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation Mutation($deleteProductId: ID!) {
    item {
      deleteProduct(id: $deleteProductId)
    }
  }
`;

export const UPDATE_VARIANT = gql`
  mutation PartialUpdateVariant(
    $partialUpdateVariantId: ID!
    $content: VariantLiteInput
  ) {
    item {
      partialUpdateVariant(id: $partialUpdateVariantId, content: $content)
    }
  }
`;

export const PARTIAL_UPDATE_PRODUCT = gql`
  mutation Mutation($partialUpdateProductId: ID!, $content: ProductContent) {
    item {
      partialUpdateProduct(id: $partialUpdateProductId, content: $content)
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation Mutation($deleteCategoryId: ID!) {
    item {
      deleteCategory(id: $deleteCategoryId)
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($content: CategoryContent) {
    item {
      createCategory(content: $content) {
        id
      }
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation PartialUpdateCategory(
    $partialUpdateCategoryId: ID!
    $content: CategoryContent
  ) {
    item {
      partialUpdateCategory(id: $partialUpdateCategoryId, content: $content) {
        id
      }
    }
  }
`;

export const DELETE_VOUCHER = gql`
  mutation DeleteVoucher($deleteVoucherId: ID) {
    item {
      deleteVoucher(id: $deleteVoucherId)
    }
  }
`;

export const CREATE_VOUCHER = gql`
  mutation CreateVoucher($content: VoucherContent) {
    item {
      createVoucher(content: $content)
    }
  }
`;

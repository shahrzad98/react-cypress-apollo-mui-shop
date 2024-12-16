import { gql } from '@apollo/client';

export const GET_CATEORIES = gql`
  query GetCategories($params: CategoriesParams) {
    item {
      getCategories(params: $params) {
        results {
          id
          title
          child_categories {
            id
            title
            parent
          }
          parent
        }
      }
    }
  }
`;

export const GET_PRODUCTS_LIST = gql`
  query GetProducts($params: ProductsParams) {
    item {
      getProducts(params: $params) {
        count
        results {
          id
          image {
            image
          }

          options
          category
          is_active
          variants {
            primary_cost
            stock
            cost
            images {
              image
            }
            is_active
            is_unlimited
            option_values {
              value
              option {
                name
              }
            }
          }
          label
          name
        }
      }
      getProductsFilterPrimsMerchant {
        categories {
          id
          title
          parent
          child_categories {
            id
            title
            parent
          }
        }
        min_stock
        max_stock
        min_cost
        max_cost
        min_primary_cost
        max_primary_cost
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetCategories($params: CategoriesParams, $getProductId: ID!) {
    item {
      getCategories(params: $params) {
        results {
          id
          title
          child_categories {
            id
            title
            parent
          }
        }
      }
      getProduct(id: $getProductId) {
        id
        name
        label
        description
        category {
          id
          title
        }
        images {
          uuid
          image
        }
        variants {
          id
          cost
          stock
          name
          option_values {
            value
            option {
              name
            }
          }
          images {
            uuid
            image
          }
          time_delay
          primary_cost
          is_unlimited
        }
        tags {
          id
        }
        features {
          title
          description
        }
        weight
        is_active
      }
    }
  }
`;

export const GET_VARIANT = gql`
  query GetVariant($getVariantId: ID!) {
    item {
      getVariant(id: $getVariantId) {
        time_delay
        cost
        primary_cost
        stock
        name
        product
        option_values {
          option {
            name
            id
          }
          value
          id
        }
        is_unlimited
        id
        weight
        images {
          image
          uuid
        }
      }
    }
  }
`;

export const GET_CATEGORIES_MAIN_PAGE = gql`
  query Results($params: CategoriesParams) {
    item {
      getCategories(params: $params) {
        results {
          id
          title
          image {
            image
            id
          }
          products {
            cost
            id
            images {
              image
            }
            label
          }
          child_categories {
            id
            title
            parent
            discount
            image {
              image
            }
            products {
              images {
                image
              }
              label
              id
              cost
            }
          }
          discount
        }
        count
      }
    }
  }
`;

export const GET_CATEGORY_AND_PRODUCTS = gql`
  query GetCategory($getCategoryId: ID!, $params: ProductsParams) {
    item {
      getCategory(id: $getCategoryId) {
        title
        products {
          id
          label
          cost
          images {
            image
          }
        }
      }
      getProducts(params: $params) {
        count
        results {
          id
          image {
            image
          }

          options
          category
          is_active
          variants {
            primary_cost
            stock
            cost
            images {
              image
            }
            is_active
            is_unlimited
            option_values {
              value
              option {
                name
              }
            }
          }
          label
          name
        }
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($getCategoryId: ID!) {
    item {
      getCategory(id: $getCategoryId) {
        title
        id
        parent
        image {
          image
          uuid
        }
      }
    }
  }
`;

export const GET_VOUCHERS = gql`
  query Item($params: voucherParams) {
    item {
      getVouchers(params: $params) {
        count
        next
        previous
        results {
          amount
          code
          expire_date
          limit
          name
          start_date
          voucher_type
          id
          customers
        }
      }
    }
  }
`;

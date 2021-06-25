import { gql } from "@apollo/client";

const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    categoryId
    name
  }
`;
const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    productId
    name
    price
    units
    imageUrl
  }
`;

const CATELOUGE = gql`
  ${CATEGORY_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  query getAllCategories {
    allCategories {
      ...CategoryFields
      products {
        ...ProductFields
      }
    }
  }
`;

const CATEGORY_LIST = gql`
  ${CATEGORY_FRAGMENT}
  query getCategoryList {
    allCategories {
      ...CategoryFields
    }
  }
`;

const CATEGORY_BY_ID = gql`
  ${CATEGORY_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  query getCategoryById($categoryId: String) {
    categoryById(id: $categoryId) {
      ...CategoryFields
      products {
        ...ProductFields
      }
    }
  }
`;

export { CATELOUGE, CATEGORY_BY_ID, CATEGORY_LIST };

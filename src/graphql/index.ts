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

const USER_ORDERS = gql`
  query allUserOrders {
    userOrders {
      orderId
      products {
        name
        quantity
        units
      }
    }
  }
`;

const PLACE_USER_ORDER = gql`
  mutation ($userOrder: String) {
    placeUserOrder(userOrder: $userOrder)
  }
`;

export {
  CATELOUGE,
  CATEGORY_BY_ID,
  CATEGORY_LIST,
  PLACE_USER_ORDER,
  USER_ORDERS,
};

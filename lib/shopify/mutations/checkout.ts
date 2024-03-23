export const checkoutToCustomerMutation = /* GraphQL */ `
  mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkoutUserErrors {
        field
        message
      }
      checkout {
        buyerIdentity {
          countryCode
        }
      }
    }
  }
`;

export const cartBuyerIdentityUpdate = /* GraphQL */ `
  mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
      userErrors {
        field
        message
      }
    }
  }
`;

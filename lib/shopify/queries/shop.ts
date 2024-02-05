export const getShopData = /* GraphQL */ `
  {
    shop {
      name
      shippingPolicy {
        body
      }
      brand {
        logo {
          alt
          image {
            url
          }
        }
      }
    }
  }
`;

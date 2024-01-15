export const getShopData = /* GraphQL */ `
  {
    shop {
      name
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

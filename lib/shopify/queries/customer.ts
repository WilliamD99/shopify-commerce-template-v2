// Customer Account API
export const getCustomerAccQuery = /* GraphQL */ `
  query {
    customer {
      id
      firstName
      lastName
      imageUrl
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
      defaultAddress {
        id
        address1
        address2
        city
        country
        province
        zip
      }
    }
  }
`;

// Admin API
export const getCustomerAccountQueryAdmin = /* GraphQL */ `
  query getAccount($id: ID!) {
    customer(id: $id) {
      id
      addresses(first: 10) {
        id
        firstName
        lastName
        phone
        address1
        address2
        city
        country
        countryCodeV2
        province
        provinceCode
        zip
      }
      defaultAddress {
        id
      }
    }
  }
`;

export const getCustomerOrdersQueryAdmin = /* GraphQL */ `
  query getCustomerOrders($id: ID!) {
    customer(id: $id) {
      id
      orders(first: 10) {
        edges {
          cursor
          node {
            id
            confirmationNumber
            createdAt
            subtotalLineItemsQuantity
            fullyPaid
            displayAddress {
              id
              address1
              address2
              city
              provinceCode
              countryCodeV2
              firstName
              lastName
              phone
            }
            taxLines {
              title
              priceSet {
                presentmentMoney {
                  amount
                }
              }
            }
            totalPriceSet {
              presentmentMoney {
                amount
              }
            }
            lineItems(first: 50) {
              edges {
                node {
                  name
                  quantity
                  image {
                    url
                  }
                  originalUnitPriceSet {
                    presentmentMoney {
                      amount
                    }
                  }
                  discountedTotalSet {
                    presentmentMoney {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

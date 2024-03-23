// Customer Account API
export const customerUpdateMutation = /* GraphQL */ `
  mutation customerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customer {
        displayName
        id
      }
    }
  }
`;
// Customer Account API
export const customerUpdateAddressMutation = /* GraphQL */ `
  mutation customerAddressUpdate(
    $address: CustomerAddressInput
    $addressId: ID!
    $defaultAddress: Boolean
  ) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
        address1
        address2
        city
        country
        province
        zip
      }
      userErrors {
        field
        message
      }
    }
  }
`;
export const customerDeleteAddressMutation = /* GraphQL */ `
  mutation customerAddressDelete($addressId: ID!) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        field
        message
      }
    }
  }
`;

// Customer Account API
export const customerAddAddressMutation = /* GraphQL */ `
  mutation customerAddressCreate($address: CustomerAddressInput!) {
    customerAddressCreate(address: $address) {
      customerAddress {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const customerStorefrontAccessTokenCreate = /* GraphQL */ `
  mutation storefrontCustomerAccessTokenCreate {
    storefrontCustomerAccessTokenCreate {
      customerAccessToken
      userErrors {
        field
        message
      }
    }
  }
`;

// Storefront
export const customerUpdateMutationSF = /* GraphQL */ `
  mutation {
    customerUpdate(
      customerAccessToken: "atkn_CqwCCMData4GEOCStq4GYp0CCAYSEJliVjxzrUn_pn7-GGg4sxQaPGVtYWlsIGh0dHBzOi8vYXBpLmN1c3RvbWVycy5jb20vYXV0aC9jdXN0b21lci5ncmFwaHFsIG9wZW5pZCDzVCjO9QI6JDIxOTc4NGM2LWI3ZDAtNGRkMi1iN2E5LWQyZmY3ODI5MTBmYUIHQWNjb3VudEoQC_h9wSIVSCqj-1qiTuE5YFJdeyJzdWIiOiJzaHBfNTM4NzJjMWQtMGZkYS00MDU5LWEzYzAtZWE0ZmI4MjI3NGIzIiwiaXNzIjoiaHR0cHM6Ly9jdXN0b21lci5sb2dpbi5zaG9waWZ5LmNvbSJ9YhBKBYp2_-xEH4s27BUPykYUahAYOhlB4GFPCoDjBkQKRXWiEkCqOZUua8sFsJdtRcNBmPnkYvxxh3Zk9dacPP6LabIU7qNtiLtw4hTJkid2emq3N_sWqPaDoAodx982jJCVQ9kL"
      customer: { firstName: "Will", phone: "604" }
    ) {
      customer {
        displayName
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Admin
export const customerUpdateMutationAdmin = /* GraphQL */ `
  mutation customerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
        phone
      }
      userErrors {
        field
        message
      }
    }
  }
`;

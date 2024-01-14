// Get content for the top notification bar
export const getMetaObjectNotificationQuery = /* GraphQL */ `
  query getNotificationContent($id: ID!) {
    metaobject(id: $id) {
      handle
      id
      type
      fields {
        key
        value
      }
    }
  }
`;

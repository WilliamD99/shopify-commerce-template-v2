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

export const getSliderContentQuery = /* GraphQL */ `
  query getHomeSlider($handle: String!) {
    metaobject(handle: { handle: $handle, type: "slider" }) {
      field(key: "slider_items") {
        references(first: 100) {
          edges {
            node {
              ... on Metaobject {
                handle
                fields {
                  value
                  key
                  type
                  reference {
                    ... on MediaImage {
                      image {
                        url
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
  }
`;

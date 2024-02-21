export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
  items: {
    title: string;
    path: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
        items: {
          title: string;
          url: string;
          items: {
            title: string;
            url: string;
          }[];
        }[];
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    limit?: number | string;
  };
};

export type ShopifyMetaObjectOperation = {
  data: {
    metaobject: {
      handle: string;
      id: string;
      type: string;
      fields: {
        key: string;
        value: string;
      }[];
    };
  };
  variables: {
    id: string;
  };
};

export type ShopifyShopDataOperation = {
  data: {
    shop: {
      name: string;
      shippingPolicy: {
        body: string;
      };
      brand: {
        logo: {
          alt: string;
          image: {
            url: string;
          };
        };
      };
    };
  };
};

export type ShopData = {
  name: string;
  shippingPolicy: {
    body: string;
  };
  brand: {
    logo: {
      alt: string;
      image: {
        url: string;
      };
    };
  };
};

export type ShopSliderContent = {
  data: {
    metaobject: {
      field: {
        references: {
          edges: {
            node: {
              handle: string;
              fields: {
                key: string;
                type: string;
                value: string;
                reference?: {
                  image: {
                    url: string;
                  };
                };
              }[];
            };
          }[];
        };
      };
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopCustomerContent = {
  data: {
    customer: {
      id: string;
      firstName?: string;
      lastName?: string;
      imageUrl?: string;
      defaultAddress?: {
        id: string;
        address1: string;
        address2: string;
        city: string;
        country: string;
        province: string;
        zip: string;
      };
      emailAddress?: {
        emailAddress: string;
      };
      phoneNumber?: {
        phoneNumber: string;
      };
    };
  };
};

export type ShopCustomerContentAdmin = {
  data: {
    customer: {
      addresses: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        address1: string;
        address2: string;
        city: string;
        country: string;
        countryCodeV2: string;
        province: string;
        provinceCode: string;
        zip: string;
      }[];
      defaultAddress: {
        id: string;
      };
    };
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
  variables: {
    id: string;
  };
};

export type CustomerUpdateMutationType = {
  data: {
    customerUpdate: {
      customer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
      };
      userErrors: {
        field: string[];
        message: string;
      }[];
    };
  };
  variables: {
    input: {
      firstName?: FormDataEntryValue | null;
      lastName?: FormDataEntryValue | null;
      phone?: FormDataEntryValue | null;
      email?: FormDataEntryValue | null;
      id: FormDataEntryValue | null;
    };
  };
};

export type CustomerAddAddressMutationType = {
  data: {
    customerAddressCreate: {
      customerAddress: {};
      userErrors: {
        field: string[];
        message: string;
      }[];
    };
  };
  variables: {
    address: {
      firstName: FormDataEntryValue | null;
      lastName: FormDataEntryValue | null;
      address1: FormDataEntryValue | null;
      address2: FormDataEntryValue | null;
      city: FormDataEntryValue | null;
      zoneCode: FormDataEntryValue | null;
      phoneNumber: FormDataEntryValue | null;
    };
  };
};

export type CustomerUpdateAddressMutationType = {
  data: {
    customerAddressUpdate: {
      customerAddress: {
        id: string;
        address1: string;
        address2: string;
        city: string;
        country: string;
        province: string;
        zip: string;
      };
      userErrors: {
        field: string[];
        message: string;
      }[];
    };
  };
  variables: {
    addressId: string | undefined;
    address: {
      address1?: FormDataEntryValue | null;
      address2?: FormDataEntryValue | null;
      city?: FormDataEntryValue | null;
      // country?: FormDataEntryValue | null;
      // province?: FormDataEntryValue | null;
      zip?: FormDataEntryValue | null;
    };
    defaultAddress: boolean | null;
  };
};

export type CustomerDeleteAddressMutationType = {
  data: {
    customerAddressDelete: {
      deletedAddressId: string;
      userErrors: {
        field: string[];
        message: string;
      }[];
    };
  };
  variables: {
    addressId: string | undefined;
  };
};

export type CustomerOrderQueryType = {
  data: {
    customer: {
      id: string;
      orders: {
        edges: {
          cursor: string;
          node: {
            id: string;
            confirmationNumber: string;
            subtotalLineItemsQuantity: number;
            createdAt: string;
            confirmed: boolean;
            fullyPaid: boolean;
            note: string;
            taxLines: {
              title: string;
              priceSet: {
                presentmentMoney: {
                  amount: string;
                };
              };
            }[];
            totalPriceSet: {
              presentmentMoney: {
                amount: string;
              };
            };
            displayAddress: {
              id: string;
              address1: string;
              address2: string;
              city: string;
              provinceCode: string;
              countryCodeV2: string;
              firstName: string;
              lastName: string;
              phone: string;
            };
            lineItems: {
              edges: {
                cursor: string;
                node: {
                  name: string;
                  quantity: number;
                  image: {
                    url: string;
                  };
                  discountedTotalSet: {
                    presentmentMoney: {
                      amount: string;
                    };
                  };
                  originalUnitPriceSet: {
                    presentmentMoney: {
                      amount: string;
                    };
                  };
                };
              }[];
            };
          };
        }[];
      };
    };
  };
  variables: {
    id: string;
  };
};

export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}

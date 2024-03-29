import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_ADMIN_GRAPHQL_API_ENDPOINT,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS
} from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import {
  customerAddAddressMutation,
  customerDeleteAddressMutation,
  customerUpdateAddressMutation,
  customerUpdateMutationAdmin
} from './mutations/customer';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import {
  getCustomerAccQuery,
  getCustomerAccountQueryAdmin,
  getCustomerOrdersQueryAdmin
} from './queries/customer';
import { getMenuQuery } from './queries/menu';
import { getMetaObjectNotificationQuery, getSliderContentQuery } from './queries/metaobjects';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import { getShopData } from './queries/shop';
import {
  Cart,
  Collection,
  Connection,
  CustomerAddAddressMutationType,
  CustomerDeleteAddressMutationType,
  CustomerOrderQueryType,
  CustomerUpdateAddressMutationType,
  CustomerUpdateMutationType,
  Image,
  Menu,
  Page,
  Product,
  ShopCustomerContent,
  ShopCustomerContentAdmin,
  ShopSliderContent,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyMetaObjectOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyShopDataOperation,
  ShopifyUpdateCartOperation
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const adminEndpoint = `${domain}${SHOPIFY_ADMIN_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const adminKey = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

// Storefront
export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

export async function shopifyAdminFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(adminEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminKey,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });
    const body = await result.json();

    if (body.errors) throw body.errors[0];

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

// Customer Account API
export async function shopifyCustomerFetch<T>({
  cache = 'no-cache',
  headers,
  query,
  tags,
  variables,
  token
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
  token: string;
}): Promise<{ status: number; body: T } | never> {
  try {
    const shop_id = process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID;
    const auth_endpoint = `https://shopify.com/${shop_id}/account/customer/api/unstable/graphql`;

    const result = await fetch(auth_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        ...headers
      },
      body: JSON.stringify({
        operationName: 'SomeQuery',
        variables: {},
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });
    const body = await result.json();

    if (body.errors) throw body.errors[0];

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message
        // query
      };
    }

    throw {
      error: e
      // query
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: 'no-store'
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections]
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return (
    res.body?.data?.menu?.items.map(
      (item: {
        title: string;
        url: string;
        items: { title: string; url: string; items: { title: string; url: string }[] }[];
      }) => ({
        title: item.title,
        path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', ''),
        items: item.items?.map((nested) => ({
          title: nested.title,
          path: nested.url
            .replace(domain, '')
            .replace('/collections', '/search')
            .replace('/pages', ''),
          items: nested.items?.map((nested2) => ({
            title: nested2.title,
            path: nested2.url
              .replace(domain, '')
              .replace('/collections', '/search')
              .replace('/pages', '')
          }))
        }))
      })
    ) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  limit
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  limit?: number | string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
      limit: limit ?? 10
    }
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getNotificationContent({ id }: { id: string }) {
  if (!process.env.SHOPIFY_NOTIFICATION_ID) return;

  const res = await shopifyFetch<ShopifyMetaObjectOperation>({
    query: getMetaObjectNotificationQuery,
    tags: [TAGS.notificationContent],
    variables: {
      id
    }
  });
  return res.body.data.metaobject;
}

export async function getShopContent() {
  const res = await shopifyFetch<ShopifyShopDataOperation>({
    query: getShopData,
    tags: [TAGS.shop]
  });

  return res.body.data.shop;
}

export async function getSliderContent(id: string | undefined) {
  if (!id) return null;

  const res = await shopifyFetch<ShopSliderContent>({
    query: getSliderContentQuery,
    tags: [TAGS.home_slider],
    variables: {
      handle: id
    }
  });
  return res.body.data.metaobject.field.references.edges;
}

// Customer Account API
export async function getCustomerAccount(token: string | undefined) {
  const startTime = Date.now(); // Record the start time

  if (!token) return null;
  const res = await shopifyCustomerFetch<ShopCustomerContent>({
    query: getCustomerAccQuery,
    tags: [TAGS.customer],
    token: token,
    cache: 'force-cache'
  });
  const endTime = Date.now(); // Record the end time
  const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds
  console.log(`updateCustomer function ran for ${elapsedTime} seconds`);
  return res.body.data.customer;
}

// Admin API (For more details)
export async function getCustomerAccountAdmin(id: string) {
  const res = await shopifyAdminFetch<ShopCustomerContentAdmin>({
    query: getCustomerAccountQueryAdmin,
    tags: [TAGS.customer],
    variables: {
      id
    }
  });
  return res.body.data.customer;
}

// Update through admin api
export async function updateCustomer(input: {
  firstName?: FormDataEntryValue | null;
  lastName?: FormDataEntryValue | null;
  phone?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  id: FormDataEntryValue | null;
}) {
  if (!input) return null;
  const res = await shopifyAdminFetch<CustomerUpdateMutationType>({
    query: customerUpdateMutationAdmin,
    variables: {
      input: input
    }
  });
  return res.body.data.customerUpdate;
}

export async function addCustomerAddress(
  token: string | undefined,
  input: {
    firstName: FormDataEntryValue | null;
    lastName: FormDataEntryValue | null;
    address1: FormDataEntryValue | null;
    address2: FormDataEntryValue | null;
    city: FormDataEntryValue | null;
    zoneCode: FormDataEntryValue | null;
    phoneNumber: FormDataEntryValue | null;
  }
) {
  if (!token) return null;
  const res = await shopifyCustomerFetch<CustomerAddAddressMutationType>({
    query: customerAddAddressMutation,
    token: token,
    tags: [TAGS.customer],
    variables: {
      address: input
    }
  });

  return res.body.data.customerAddressCreate;
}

export async function updateCustomerAddress(
  token: string | undefined,
  id: FormDataEntryValue | undefined,
  address: {
    address1?: FormDataEntryValue | null;
    address2?: FormDataEntryValue | null;
    city?: FormDataEntryValue | null;
    zip?: FormDataEntryValue | null;
    territoryCode?: FormDataEntryValue | null;
  },
  defaultAddress: boolean = false
) {
  if (!id || !token) return null;
  let formattedId = id
    .toString()
    .replace('MailingAddress', 'CustomerAddress')
    .split('?model_name')[0];
  const res = await shopifyCustomerFetch<CustomerUpdateAddressMutationType>({
    query: customerUpdateAddressMutation,
    token: token,
    variables: {
      addressId: formattedId,
      address,
      defaultAddress: defaultAddress ?? false
    },
    cache: 'no-cache'
  });
  return res.body.data.customerAddressUpdate;
}

export async function deleteCustomerAddress(
  token: string | undefined,
  id: FormDataEntryValue | undefined
) {
  if (!id || !token) throw new Error('invalid id or token');
  let formattedId = id
    .toString()
    .replace('MailingAddress', 'CustomerAddress')
    .split('?model_name')[0];

  let res = await shopifyCustomerFetch<CustomerDeleteAddressMutationType>({
    query: customerDeleteAddressMutation,
    token: token,
    variables: {
      addressId: formattedId
    },
    cache: 'no-cache'
  });

  return res.body.data.customerAddressDelete;
}

// Get orders through admin api
export async function getCustomerOrders(id: string) {
  if (!id) throw new Error('No id provided');
  const res = await shopifyAdminFetch<CustomerOrderQueryType>({
    query: getCustomerOrdersQueryAdmin,
    variables: {
      id
    },
    tags: [TAGS.customer]
  });
  return res.body.data.customer;
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = headers().get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

'use server';

import { getProducts } from '../shopify';

const getSearchProducts = async (searchStr: string) => {
  try {
    const result = await getProducts({
      query: `title:${searchStr}`
    });
    return result;
  } catch (e) {
    return [];
  }
};

export { getSearchProducts };

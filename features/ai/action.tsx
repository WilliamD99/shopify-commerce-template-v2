import 'server-only';

import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc';
import OpenAI from 'openai';

import {
  BotCard,
  BotMessage,
  Events,
  Purchase,
  Stock,
  Stocks,
  SystemMessage,
  spinner
} from './components/llm';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addItem } from '~/components/cart/actions';
import { getProduct, getProducts } from '~/lib/shopify';
import { EventsSkeleton } from './components/llm/events-skeleton';
import { StockSkeleton } from './components/llm/stock-skeleton';
import { StocksSkeleton } from './components/llm/stocks-skeleton';
import ProductDetails from './components/products/product-details';
import ProductList from './components/products/product-list';
import { formatNumber, runAsyncFnWithoutBlocking, runOpenAICompletion, sleep } from './utils';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

async function confirmAddToCart(variantId: string, quantity = 1) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

  const adding = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2 text-black">Adding product to cart, please wait...</p>
    </div>
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    try {
      await addItem(null, variantId, 1);

      adding.done(
        <div>
          <p className="mb-2 text-black">You have successfully added this product to cart.</p>
        </div>
      );

      aiState.done([
        ...aiState.get(),
        {
          role: 'system',
          content: `[User has added ${quantity} of product ${variantId} to cart]`
        }
      ]);
      revalidatePath('/');
    } catch (e: any) {
      adding.done(
        <div>
          <p className="mb-2 text-black">Something went wrong, please try again.</p>
        </div>
      );
    }
  });

  return {
    addToCartUI: adding.value,
    newMessage: {
      id: Date.now(),
      display: systemMessage.value
    }
  };
}

async function confirmPurchase(symbol: string, price: number, amount: number) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  );

  const systemMessage = createStreamableUI(null);

  runAsyncFnWithoutBlocking(async () => {
    3;
    // You can update the UI at any point.
    await sleep(1000);

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>
    );

    await sleep(1000);

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {formatNumber(amount * price)}
        </p>
      </div>
    );

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
        {formatNumber(amount * price)}.
      </SystemMessage>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'system',
        content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
          amount * price
        }]`
      }
    ]);
  });

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: Date.now(),
      display: systemMessage.value
    }
  };
}

async function submitUserMessage(content: string) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content
    }
  ]);

  const reply = createStreamableUI(<BotMessage className="items-center">{spinner}</BotMessage>);

  const completion = runOpenAICompletion(openai, {
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `\
You are a professional sale associate for an e-commerce clothing store.
You and the user can discuss product prices and the user can adjust the amount of products they want to buy, or place an order, in the UI.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
- "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

If the user requests purchasing a stock, call \`show_stock_purchase_ui\` to show the purchase UI.
If the user just wants the price, tell the user to call me maybe.
If you want to show trending stocks, call \`list_stocks\`.
If you want to show events, call \`get_events\`.
If the user wants to complete any impossible task, respond that you can't do that at the moment, if the user needs more help, they can call customer service.
If the user requesting to see my resume, please send them this link https://www.willdoan.ca
If the user asking for latest product in store, call \`show_latest_products\`.
If the user asking to see more details about a selected product, call \`show_selected_product\` and then ask them if the user wish to purchase this product.
If the user requesting to add a product with a given handle to cart, tell them to wait a bit please.

Besides that, you can also chat with users and do some calculations if needed.`
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name
      }))
    ],
    functions: [
      {
        name: 'show_stock_price',
        description:
          'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
        parameters: z.object({
          symbol: z
            .string()
            .describe('The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'),
          price: z.number().describe('The price of the stock.'),
          delta: z.number().describe('The change in price of the stock')
        })
      },
      {
        name: 'show_stock_purchase_ui',
        description:
          'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
        parameters: z.object({
          symbol: z
            .string()
            .describe('The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'),
          price: z.number().describe('The price of the stock.'),
          numberOfShares: z
            .number()
            .describe(
              'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.'
            )
        })
      },
      {
        name: 'show_product_purchase_ui',
        description:
          'Show product and the UI to add product to cart. Use this if the user is asking to buy or add a product to cart.',
        parameters: z.object({
          products: z.array(
            z.object({
              title: z.string().describe('Product title'),
              description: z.string().describe('Product Description')
            })
          )
        })
      },
      {
        name: 'list_stocks',
        description: 'List three imaginary stocks that are trending.',
        parameters: z.object({
          stocks: z.array(
            z.object({
              symbol: z.string().describe('The symbol of the stock'),
              price: z.number().describe('The price of the stock'),
              delta: z.number().describe('The change in price of the stock')
            })
          )
        })
      },
      {
        name: 'get_events',
        description:
          'List funny imaginary events between user highlighted dates that describe stock activity.',
        parameters: z.object({
          events: z.array(
            z.object({
              date: z.string().describe('The date of the event, in ISO-8601 format'),
              headline: z.string().describe('The headline of the event'),
              description: z.string().describe('The description of the event')
            })
          )
        })
      },
      {
        name: 'show_latest_products',
        description: 'Showing the latest products in store',
        parameters: z.object({
          limit: z.number().describe('Number of products user want to see')
        })
      },
      {
        name: 'show_selected_product',
        description: 'Showing the latest products in store',
        parameters: z.object({
          handle: z.string().describe('Handle of the selected product')
        })
      }
    ],
    temperature: 0
  });

  // Show Latest Product function call
  completion.onFunctionCall('show_latest_products', async ({ limit = 3 }) => {
    reply.update(
      <BotCard>
        <StockSkeleton />
      </BotCard>
    );
    let productsRes = await getProducts({ query: 'Nike', limit: limit });
    reply.done(
      <BotCard className="text-black">
        <ProductList products={productsRes} />
      </BotCard>
    );
    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'show_latest_products',
        content: JSON.stringify(productsRes)
      }
    ]);
  });

  // Show the details of a product
  completion.onFunctionCall('show_selected_product', async ({ handle }) => {
    reply.update(
      <BotCard className="text-black">
        <StockSkeleton />
      </BotCard>
    );

    let product = await getProduct(handle);
    console.log(product);
    reply.done(
      <BotCard className="text-black">
        <ProductDetails product={product} />
      </BotCard>
    );
    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'show_selected_product',
        content: JSON.stringify(product)
      }
    ]);
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: 'assistant', content }]);
    }
  });

  completion.onFunctionCall('list_stocks', async ({ stocks }) => {
    console.log(stocks);
    reply.update(
      <BotCard>
        <StocksSkeleton />
      </BotCard>
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Stocks stocks={stocks} />
      </BotCard>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'list_stocks',
        content: JSON.stringify(stocks)
      }
    ]);
  });

  completion.onFunctionCall('get_events', async ({ events }) => {
    reply.update(
      <BotCard>
        <EventsSkeleton />
      </BotCard>
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Events events={events} />
      </BotCard>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'get_events',
        content: JSON.stringify(events)
      }
    ]);
  });

  completion.onFunctionCall('show_stock_price', async ({ symbol, price, delta }) => {
    reply.update(
      <BotCard>
        <StockSkeleton />
      </BotCard>
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Stock name={symbol} price={price} delta={delta} />
      </BotCard>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'show_stock_price',
        content: `[Price of ${symbol} = ${price}]`
      }
    ]);
  });

  // Show product purchase UI
  completion.onFunctionCall('show_product_purchase_ui', async ({ products }) => {});

  completion.onFunctionCall('show_stock_purchase_ui', ({ symbol, price, numberOfShares = 100 }) => {
    if (numberOfShares <= 0 || numberOfShares > 1000) {
      reply.done(<BotMessage>Invalid amount</BotMessage>);
      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: 'show_stock_purchase_ui',
          content: `[Invalid amount]`
        }
      ]);
      return;
    }

    reply.done(
      <>
        <BotMessage>
          Sure!{' '}
          {typeof numberOfShares === 'number'
            ? `Click the button below to purchase ${numberOfShares} shares of $${symbol}:`
            : `How many $${symbol} would you like to purchase?`}
        </BotMessage>
        <BotCard showAvatar={false}>
          <Purchase defaultAmount={numberOfShares} name={symbol} price={+price} />
        </BotCard>
      </>
    );
    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'show_stock_purchase_ui',
        content: `[UI for purchasing ${numberOfShares} shares of ${symbol}. Current price = ${price}, total cost = ${
          numberOfShares * price
        }]`
      }
    ]);
  });

  return {
    id: Date.now(),
    display: reply.value
  };
}

// Define necessary types and create the AI.

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
    confirmPurchase,
    confirmAddToCart
  },
  initialUIState,
  initialAIState
});

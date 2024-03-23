# Next.js Shopify E-Commerce Template

Use this template to bootstrap your Shopify Headless Website. This is a Next.js 14 and App Router-ready website featuring:

- Next.js App Router
- Optimized for SEO using Next.js's Metadata
- React Server Components (RSCs) and Suspense
- Server Actions for mutations
- Edge Runtime
- New fetching and caching paradigms
- Dynamic OG images
- Styling with Tailwind CSS
- Checkout and payments with Shopify
- Password-less authentication using [Customer Account API](https://shopify.dev/docs/api/customer)
- Customize your website's look via Shopify Metadata
- AI support chatbot (WIP)

## Running locally

Before run this project, you need to obtain access token from Shopify (Storefront and Admin token), please follow this [tutorial](https://www.shopify.com/ca/partners/blog/17056443-how-to-generate-a-shopify-api-token) to get these. Additionally, remember to add the [Headless](https://apps.shopify.com/headless) app on Shopify.

You will need to use the environment variables [defined in `.env.example`](.env.example) to run this project. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

This is all required variables to setup this template:

- NEXT_PUBLIC_SHOPIFY_STORE_ID
- SHOPIFY_STORE_DOMAIN
- SHOPIFY_REVALIDATION_SECRET (use this to setup webhook for Shopify)
- NEXT_PUBLIC_SHOPIFY_CUSTOMER_CALLBACK
- NEXT_PUBLIC_SHOPIFY_CUSTOMER_LOGOUT_URI

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Setup Customer Account API

You can generate the customer account access token via the Headless app on Shopify. After that, please define the env variables required:

- NEXT_PUBLIC_SHOPIFY_CUSTOMER_CALLBACK
- NEXT_PUBLIC_SHOPIFY_CUSTOMER_LOGOUT_URI
- SHOPIFY_CUSTOMER_ACCOUNT_ID
- SHOPIFY_CUSTOMER_ACCOUNT_SK

Remember to config the callback URI on Shopify dashboard as well. The callback URI has to match with the NEXT_PUBLIC_SHOPIFY_CUSTOMER_CALLBACK, same with logout URI.

## Addition Features

### Home page Slider

Create a metaobject definitions for Slider and Slider Item. The Slider Item object should have these props:

- Title (Single line text)
- Description (Single line text)
- Button (Single line text)
- Button Link (URL)
- Background (File type)
- Background Mobile (File type)

The Slider object should contains an array of Slider Item object. Then you can add the entries for the Slider Items and SLider inside the Content -> Metaobjects. Finally set its ID as the env variable

- SHOPIFY_HOMEPAGE_SLIDER

### Top Notification Bar

Create a metaobject definations for the Store Notification. It should have these props:

- Content (Multi-line text)
- Text Color (Color)
- Background Color (Color)
- Disabled (Boolean)

Add the entry inside the Shopify Dashboard -> Content -> Metaobjects, then set the ID as the env variable:

- SHOPIFY_NOTIFICATION_ID

### Website Social Links

Define these variable to have the social links show up in the footer

- SHOPIFY_SOCIAL_FB
- SHOPIFY_SCOIAL_INSTA
- SHOPIFY_SOCIAL_YT
- SHOPIFY_SOCIAL_X

### AI Chatbot (WIP)

This feature is current a work-in-progress. Use the [ai_feature](https://github.com/WilliamD99/shopify-commerce-template-v2/tree/ai_feature) branch to test this feature.

You need to signup for the OpenAI account and get the API key from the dashboard, and then set the OPENAI_API_KEY.

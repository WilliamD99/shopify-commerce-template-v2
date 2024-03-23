import { ScrollArea } from '~/components/ui/scroll-area';
// import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor';

// let seed = {
//   id: 'gid://shopify/Product/8304636821737',
//   handle: 'nike-infinityrn-4',
//   availableForSale: true,
//   title: 'Nike InfinityRN 4',
//   description: 'With supportive cushioning built for a smooth run, the InfinityRN 4 helps you hit the ground running. Made with soft, comfortable Nike ReactX foam and updated with Nike Running\'s best-fitting Flyknit yet, this road runner helps you take off anytime, anywhere. It\'s the kind of shoe that can help give you the confidence to set a new pace, thanks to high foam stacks and an intuitive design that helps support every stride. Color Shown: Black/Velvet Brown/Earth/Baroque Brown Style: FZ3652-010',
//   descriptionHtml: '<p data-mce-fragment="1">With supportive cushioning built for a smooth run, the InfinityRN 4 helps you hit the ground running. Made with soft, comfortable Nike ReactX foam and updated with Nike Running\'s best-fitting Flyknit yet, this road runner helps you take off anytime, anywhere. It\'s the kind of shoe that can help give you the confidence to set a new pace, thanks to high foam stacks and an intuitive design that helps support every stride.</p>\n<ul class="description-preview__features pt8-sm pb6-sm ncss-list-ul">\n<li class="description-preview__color-description ncss-li">Color Shown: Black/Velvet Brown/Earth/Baroque Brown</li>\n<li class="description-preview__style-color ncss-li">Style: FZ3652-010</li>\n</ul>\n<ul class="description-preview__features pt8-sm pb6-sm ncss-list-ul" data-mce-fragment="1"></ul>',
//   options: [
//   {
//   id: 'gid://shopify/ProductOption/10504692924649',
//   name: 'Size',
//   values: [
//   'EU 40',
//   'EU 40.5',
//   'EU 41',
//   'EU 42',
//   'EU 42.5',
//   'EU 43',
//   'EU 44',
//   'EU 44.5'
// ]
// }
// ],
//   priceRange: {
//   maxVariantPrice: { amount: '120.0', currencyCode: 'CAD' },
//   minVariantPrice: { amount: '120.0', currencyCode: 'CAD' }
// },
//   featuredImage: {
//   url: 'https://cdn.shopify.com/s/files/1/0678/7733/9369/files/infinityrn-4-road-running-shoes-SzW3PR_1.webp?v=1706103956',
//   altText: null,
//   width: 1728,
//   height: 2160
// },
//   seo: { description: null, title: null },
//   tags: [],
//   updatedAt: '2024-02-07T14:58:34Z',
//   images: [
//   {
//   url: 'https://cdn.shopify.com/s/files/1/0678/7733/9369/files/infinityrn-4-road-running-shoes-SzW3PR_1.webp?v=1706103956',
//   altText: 'Nike InfinityRN 4 - infinityrn-4-road-running-shoes-SzW3PR_1',
//   width: 1728,
//   height: 2160
// },
//   {
//   url: 'https://cdn.shopify.com/s/files/1/0678/7733/9369/files/infinityrn-4-road-running-shoes-SzW3PR.webp?v=1706103958',
//   altText: 'Nike InfinityRN 4 - infinityrn-4-road-running-shoes-SzW3PR',
//   width: 1728,
//   height: 2160
// },
//   {
//   url: 'https://cdn.shopify.com/s/files/1/0678/7733/9369/files/infinityrn-4-road-running-shoes-SzW3PR.jpg?v=1706103957',
//   altText: 'Nike InfinityRN 4 - infinityrn-4-road-running-shoes-SzW3PR',
//   width: 1728,
//   height: 2160
// }
// ],
//   variants: [
//   {
//   id: 'gid://shopify/ProductVariant/46465781137641',
//   title: 'EU 40',
//   availableForSale: true,
//   selectedOptions: [ { name: 'Size', value: 'EU 40' } ],
//   price: { amount: '120.0', currencyCode: 'CAD' }
// },
//   {
//   id: 'gid://shopify/ProductVariant/46465781170409',
//   title: 'EU 40.5',
//   availableForSale: true,
//   selectedOptions: [ { name: 'Size', value: 'EU 40.5' } ],
//   price: { amount: '120.0', currencyCode: 'CAD' }
// },
//   {
//   id: 'gid://shopify/ProductVariant/46465781203177',
//   title: 'EU 41',
//   availableForSale: true,
//   selectedOptions: [ { name: 'Size', value: 'EU 41' } ],
//   price: { amount: '120.0', currencyCode: 'CAD' }
// },
//   {
//   id: 'gid://shopify/ProductVariant/46465781235945',
//   title: 'EU 42',
//   availableForSale: true,
//   selectedOptions: [ { name: 'Size', value: 'EU 42' } ],
//   price: { amount: '120.0', currencyCode: 'CAD' }
// },
//   {
//   id: 'gid://shopify/ProductVariant/46465781268713',
//   title: 'EU 42.5',
//   availableForSale: true,
//   selectedOptions: [ { name: 'Size', value: 'EU 42.5' } ],
//   price: { amount: '120.0', currencyCode: 'CAD' }
// },
//   {
//   id: 'gid://shopify/ProductVariant/46465781301481',
//   title: 'EU 43',
//   availableForSale: true,
//   selectedOptions: [ { name: 'Size', value: 'EU 43' } ],
//   price: { amount: '120.0', currencyCode: 'CAD' }
// },
//   {
//   id: 'gid://shopify/ProductVariant/46465781334249',
//   title: 'EU 44',
//   availableForSale: true,
//   selectedOptions: [ { name: 'Size', value: 'EU 44' } ],
//   price: { amount: '120.0', currencyCode: 'CAD' }
// },
//   {
//   id: 'gid://shopify/ProductVariant/46465781367017',
//   title: 'EU 44.5',
//   availableForSale: true,
//   selectedOptions: [ { name: 'Size', value: 'EU 44.5' } ],
//   price: { amount: '120.0', currencyCode: 'CAD' }
// }
// ]
// }

export function ChatList({ messages }: { messages: any[] }) {
  if (!messages.length) {
    return null;
  }
  return (
    <ScrollArea className="relative h-96">
      <div className="chatlist relative mx-auto max-w-96 overflow-x-hidden bg-white py-5 pl-4 pr-6">
        {messages.map((message, index) => (
          <div key={index} className="pb-6">
            {message.display}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

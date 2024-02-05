import Prose from 'components/prose';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from 'components/ui/accordion';
import { getShopContent } from 'lib/shopify';

export default async function ProductAccordion() {
  const shopData = await getShopContent();
  const policyData = shopData.shippingPolicy.body;

  return (
    <>
      <div className="mt-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Shipping and Return</AccordionTrigger>
            <AccordionContent>
              <Prose html={policyData} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Reviews</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>More Info</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

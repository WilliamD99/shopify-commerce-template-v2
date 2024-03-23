import { Button } from '~/components/ui/button';
import { IconArrowRight } from '~/components/ui/icons';

const exampleMessages = [
  {
    heading: 'What are the latest products?',
    message: 'What are the latest products?'
  },
  {
    heading: "What's the stock price of AAPL?",
    message: "What's the stock price of AAPL?"
  },
  {
    heading: "I'd like to buy 10 shares of MSFT",
    message: "I'd like to buy 10 shares of MSFT"
  }
];

export function EmptyScreen({ submitMessage }: { submitMessage: (message: string) => void }) {
  return (
    <div id="chatbox_empty" className="mx-auto">
      <div className="mb-2 bg-white p-5">
        <h1 className="mb-2 text-lg font-semibold text-black">
          Welcome to your personal assistant!
        </h1>
        <p className="mb-2 leading-normal text-gray-500">
          You can use this chatbox to learn more about our store, or asking it about products
        </p>
        <p className="leading-normal text-gray-500">Try an example:</p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="action h-auto p-0 text-base text-black"
              onClick={async () => {
                submitMessage(message.message);
              }}
            >
              <IconArrowRight className="mr-2 text-black" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

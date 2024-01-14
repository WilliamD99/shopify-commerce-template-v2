import { getNotificationContent } from 'lib/shopify';

export default async function NotificationBar() {
  if (!process.env.SHOPIFY_NOTIFICATION_ID) return null;

  const data = await getNotificationContent({
    id: process.env.SHOPIFY_NOTIFICATION_ID
  });

  let isDisabled = data?.fields.find((field) => field.key === 'disabled')?.value;
  if (isDisabled ? JSON.parse(isDisabled) : false) return <></>;

  let content = data?.fields.find((field) => field.key === 'content')?.value;
  let textColor = data?.fields.find((field) => field.key === 'text_color')?.value;
  let bgColor = data?.fields.find((field) => field.key === 'background_color')?.value;

  return (
    <>
      <div
        className="relative w-full py-2"
        style={{
          backgroundColor: `${bgColor ? bgColor : '#000000'}`
        }}
      >
        <p
          className="text-center"
          style={{
            color: `${textColor ? textColor : '#fff'}`
          }}
        >
          {content}
        </p>
      </div>
    </>
  );
}

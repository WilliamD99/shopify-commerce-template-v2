import { headers } from 'next/headers';

export const getAccessCodeFromHeader = () => {
  const headerList = headers();
  // This will return all the cookie as string
  const cookies = headerList.get('set-cookie');
  if (!cookies) return null;

  let cookieObj = getCookieValue(cookies, 'access');
  return cookieObj;
};

export function getCookieValue(cookieString: string, fieldName: string) {
  let cookieParts = cookieString.split(', ');

  let filtered = cookieParts.filter((str) => {
    return str.startsWith(fieldName);
  })[0];
  let atkn = filtered
    ?.split('; ')
    .filter((str) => str.startsWith(`${fieldName}=`))[0]
    ?.split(`${fieldName}=`)[1];
  return atkn;
}

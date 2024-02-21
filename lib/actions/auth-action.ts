'use server';
import { cookies } from 'next/headers';
// import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function saveToCookie(name: string, value: any) {
  //   const cookieStore = cookies();

  let maxAge = value?.expires_in ?? 60 * 60 * 24;

  //   cookieStore.set({
  //     name: name,
  //     value: JSON.stringify(value),
  //     maxAge: maxAge
  //   });
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Set-Cookie': `${name}=${JSON.stringify(
        value
      )}; sameSite=strict; httpOnly=true; maxAge=${maxAge}`
    }
  });
}

export async function navigateCheckoutWithAtkn(url: string) {
  const cookieStore = cookies();
  const accessCode = cookieStore.get('access')?.value;
  console.log(accessCode);

  const headers = { Authorization: `Bearer ${accessCode}` };
  // redirect(url);
  const res = await fetch(url, {
    headers: headers
  });

  console.log(res);
}

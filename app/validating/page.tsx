import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getAccessToken, getAuthAccessToken } from '~/lib/security/auth';
import ValidatingClient from './client';

let validatingUser = async (paramsCode: string) => {
  try {
    const authAccessToken = await getAuthAccessToken(paramsCode);

    if (authAccessToken) {
      const accessToken = await getAccessToken(authAccessToken.access_token);
      return {
        access: accessToken,
        auth: authAccessToken
      };
    } else {
      // In case can't get the auth access token
    }
  } catch (e) {
    console.log(e);
    return {
      message: 'Something went wrong'
    };
  }
};

export default async function Validating({
  searchParams
}: {
  searchParams: {
    code: string;
  };
}) {
  let searchParamsCode = searchParams.code;

  if (!searchParamsCode) {
    const cookieStore = cookies();
    let hasAccess = cookieStore.has('access');
    if (hasAccess) {
      redirect('/');
    } else {
      notFound();
    }
    // Do something when there isn't any code
  }

  const data = await validatingUser(searchParamsCode);
  if (!data) return notFound();
  if (!data.access || !data.auth) return notFound();

  return (
    <>
      <div id="validating" className="loading flex flex-col items-center justify-center pt-20">
        <p className="z-50 mb-8 text-lg font-semibold">You will be redirect shortly</p>
        <span className="loader z-50 h-10 w-10 border-black" />
        <div className="fixed left-0 top-0 z-40 h-screen w-screen backdrop-blur-sm"></div>
      </div>
      <ValidatingClient access={data.access} auth={data.auth} />
    </>
  );
}

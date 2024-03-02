'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setCookie } from '~/lib/actions/cookies';
import { AccessToken, AuthAccessToken } from '~/lib/security/auth';

export default function ValidatingClient({
  auth,
  access
}: {
  auth: AuthAccessToken;
  access: AccessToken;
}) {
  const router = useRouter();

  useEffect(() => {
    if (access?.access_token && auth?.access_token) {
      Promise.all([
        setCookie('access', access.access_token, {
          maxAge: access.expires_in
        }),
        setCookie('refresh', auth.refresh_token),
        setCookie('auth', auth.access_token, {
          maxAge: auth.expires_in
        }),
        setCookie('id_token', auth.id_token)
      ]).then((es) => {
        router.push('/account');
      });
    }
  }, []);

  return <></>;
}

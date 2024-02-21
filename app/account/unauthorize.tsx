'use client';
import { getCookie } from 'cookies-next';

export default function UnAuthorize() {
  let authAccessCode = getCookie('auth');
  //   useEffect(() => {
  //     console.log(authAccessCode);
  //   }, [authAccessCode]);

  return (
    <>
      <div>UnAuthorize</div>
    </>
  );
}

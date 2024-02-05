'use client';

import { generateState } from 'lib/security/index';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export const dynamic = 'force-dynamic';

const { NEXT_PUBLIC_SHOPIFY_STORE_ID, NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACC_CLIENT } = process.env;

export default function SignInPage() {
  const [inputState, setInputState] = useState({
    user: '',
    password: ''
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/home';
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...inputState,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACC_CLIENT) {
      const authorizationRequestUrl = new URL(
        `https://shopify.com/${NEXT_PUBLIC_SHOPIFY_STORE_ID}/auth/oauth/authorize`
      );
      authorizationRequestUrl.searchParams.append(
        'scope',
        'openid email https://api.customers.com/auth/customer.graphql'
      );
      authorizationRequestUrl.searchParams.append(
        'client_id',
        NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACC_CLIENT
      );
      authorizationRequestUrl.searchParams.append('response_type', 'code');
      authorizationRequestUrl.searchParams.append(
        'redirect_uri',
        `https://96c9-2405-4802-134a-7490-9028-65c-da77-1981.ngrok-free.app`
      );

      const state = await generateState();

      authorizationRequestUrl.searchParams.append('state', state);
      authorizationRequestUrl.searchParams.append('nonce', '<nonce>');

      // localStorage.setItem('code-verifier', verifier);
      console.log(authorizationRequestUrl.toString());
      router.push(authorizationRequestUrl.toString());
    }
  };

  return (
    <>
      <div id="signin" className="space-y-8">
        <div className="header">
          <p className="title">Welcome to Taskmaster!</p>
          <p className="subtitle">Login to your account</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="user">Username/Email</label>
            <input
              // required
              id="user"
              type="text"
              placeholder="Your username or email"
              value={inputState.user}
              onChange={handleChange}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              // required
              id="password"
              type="password"
              placeholder="Your password"
              value={inputState.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="form-cta">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

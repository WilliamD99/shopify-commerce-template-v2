'use server';

import { cookies } from 'next/headers';

async function deleteCookie(name: string, type: 'hard' | 'easy' = 'hard') {
  const cookieStore = cookies();

  // If you want to completely delete the cookie or set it emty value
  // This is meant for testing
  if (type === 'hard') {
    cookieStore.delete(name);
  } else if (type === 'easy') {
    cookieStore.set(name, '');
  }
}

export { deleteCookie };

// app/lib/dal.ts

import { decrypt } from './session'; // Assuming decrypt is used to verify JWT
import { cookies } from 'next/headers';

export async function verifySession() {
  const cookie = (await cookies()).get('session')?.value;

  if (!cookie) {
    return null;
  }

  const session = await decrypt(cookie);

  if (!session || !session.userId) {
    return null;
  }
 

  return session; // Return session if it's valid
}

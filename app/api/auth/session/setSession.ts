// app/api/auth/session/setSession.ts
import { NextResponse } from 'next/server';

export function setSession(res: NextResponse, sessionData: string) {
    res.headers.set(
        'Set-Cookie',
        `auth-token=${sessionData}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=300`
    );
}
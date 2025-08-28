// app/ lib/ session.ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";


const secretKey = process.env.NEXTAUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
type SessionPayload = {
  userId: string;
  role: string; // Add 'role' property
  expiresAt: Date;
};
export async function createSession(userId: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userId, role, expiresAt });

  // console.log("Created session token:", session); // Debugging

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}

export async function encrypt(payload: SessionPayload) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);

    console.log("Generated JWT:", token); // Debugging
    return token;
  } catch (error) {
    console.error("Error encrypting session:", error);
    throw new Error("Session encryption failed.");
  }
}
export async function decrypt(session: string | undefined = "") {
  if (!session) {
    console.error("Session cookie is empty or undefined.");

    return null;
  }

  try {
    // console.log("Session cookie:", session); // Debugging
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    // console.log("Decrypted session payload:", payload); // Debugging
    return payload;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return null;
  }
}

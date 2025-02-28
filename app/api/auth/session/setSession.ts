import { NextResponse } from "next/server";
import crypto from "crypto";

// Ensure SECRET_KEY is exactly 32 bytes
const SECRET_KEY = process.env.SESSION_SECRET_KEY
  ? Buffer.from(process.env.SESSION_SECRET_KEY, "base64") // Decode from Base64
  : crypto.randomBytes(32); // Fallback to random 32-byte key if not set

// Check if the key is exactly 32 bytes
if (SECRET_KEY.length !== 32) {
  throw new Error("SESSION_SECRET_KEY must be exactly 32 bytes long.");
}

const IV_LENGTH = 16; // AES requires a 16-byte IV

function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted; // Store IV with encrypted data
}

export function setSession(res: NextResponse, sessionData: object) {
  const encryptedData = encrypt(JSON.stringify(sessionData)); // Encrypt JSON object
  res.headers.set(
    "Set-Cookie",
    `auth-token=${encryptedData}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3000`
  );
}

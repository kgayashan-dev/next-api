import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
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

function decrypt(encryptedText: string): string {
  const iv = Buffer.from(encryptedText.substring(0, IV_LENGTH * 2), "hex");
  const encryptedData = encryptedText.substring(IV_LENGTH * 2);
  const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token");

  if (token) {
    try {
      // Decrypt session data and parse it
      const sessionData = JSON.parse(decrypt(token.value));
      // Return only the user role
      return NextResponse.json({
        message: "Session active",
        user: sessionData.role, // Send only the role
      });
    } catch (error) {
      console.error("Session decryption failed:", error);
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: "No active session" }, { status: 401 });
  }
}

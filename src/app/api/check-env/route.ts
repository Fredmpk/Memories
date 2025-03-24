// app/api/check-env/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    publicKeyDefined: !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    privateKeyDefined: !!process.env.VAPID_PRIVATE_KEY,
    publicKeyPrefix:
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.substring(0, 10) || "not-found",
    timestamp: new Date().toISOString(),
  });
}

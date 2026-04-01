import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const secretText = process.env.JWT_SECRET || "fallback_secret_for_dev";
    const secret = new TextEncoder().encode(secretText);

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({ authenticated: true, admin: payload }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

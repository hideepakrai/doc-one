import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seedLogic";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
      const secretText = process.env.JWT_SECRET || "fallback_secret_for_dev";
      const secret = new TextEncoder().encode(secretText);
      await jwtVerify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const result = await seedDatabase();
    
    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 201 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("API Seed error:", error);
    return NextResponse.json({ error: "Failed to process seed request" }, { status: 500 });
  }
}

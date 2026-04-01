import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "DB Connected Successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json({ error: error.message || "Failed to connect to database" }, { status: 500 });
  }
}

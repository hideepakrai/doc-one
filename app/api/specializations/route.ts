import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Specialization from "@/models/Specialization";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const specializations = await Specialization.find({}).sort({ doctorCount: -1 });
    return NextResponse.json(specializations, { status: 200 });
  } catch (error) {
    console.error("GET specializations error:", error);
    return NextResponse.json({ error: "Failed to fetch specializations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const newSpecialization = await Specialization.create(body);
    return NextResponse.json(newSpecialization, { status: 201 });
  } catch (error: any) {
    console.error("POST specialization error:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "Specialization already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create specialization" }, { status: 500 });
  }
}

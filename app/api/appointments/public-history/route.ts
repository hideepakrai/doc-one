import { NextRequest, NextResponse } from "next/server";
import Appointment from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name || name.length < 3) {
      return NextResponse.json({ error: "Please enter at least 3 characters of your name" }, { status: 400 });
    }

    await dbConnect();
    
    // Search for appointments by patient name (case-insensitive)
    const appointments = await Appointment.find({
      patientName: { $regex: name, $options: "i" },
    })
      .populate({
        path: "doctorId",
        select: "name specialization",
        populate: { path: "specialization", select: "name" }
      })
      .sort({ date: -1, time: -1 })
      .limit(20);

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("GET public-history error:", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

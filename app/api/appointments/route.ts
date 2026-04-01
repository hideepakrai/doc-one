import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const appointments = await Appointment.find({})
      .populate("doctorId", "name specialization")
      .sort({ createdAt: -1 });
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("GET appointments error:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const newAppointment = await Appointment.create(body);
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("POST appointment error:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}

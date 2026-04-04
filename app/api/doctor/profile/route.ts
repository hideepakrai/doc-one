import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import { getAuthContext } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth.authenticated || auth.role !== "doctor" || !auth.payload?.doctorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const doctor = await Doctor.findById(auth.payload.doctorId);
    return NextResponse.json(doctor, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth.authenticated || auth.role !== "doctor" || !auth.payload?.doctorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const body = await req.json();
    const allowed = ["availabilityStatus", "workingDays", "timeSlots", "breakTime", "blockedSlots", "nextAvailable"];
    const update: Record<string, any> = {};
    for (const key of allowed) if (body[key] !== undefined) update[key] = body[key];
    const doctor = await Doctor.findByIdAndUpdate(auth.payload.doctorId, update, { new: true, runValidators: true });
    return NextResponse.json(doctor, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import { getAuthContext } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthContext(req);
    if (!auth.authenticated || auth.role !== "doctor" || !auth.payload?.doctorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const appointment = await Appointment.findOne({ _id: params.id, doctorId: auth.payload.doctorId });
    if (!appointment) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });

    if (!["Completed", "Cancelled", "Confirmed", "Pending"].includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    appointment.status = body.status;
    await appointment.save();
    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}

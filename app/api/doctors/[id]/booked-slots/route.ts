import { NextRequest, NextResponse } from "next/server";
import { AppointmentService } from "@/services/appointment.service";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    const slots = await AppointmentService.getBookedSlots(id, date);
    return NextResponse.json(slots, { status: 200 });
  } catch (error: any) {
    console.error("GET booked-slots error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch slots" }, { status: 500 });
  }
}

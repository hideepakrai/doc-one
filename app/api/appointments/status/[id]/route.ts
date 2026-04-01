import { NextRequest, NextResponse } from "next/server";
import { AppointmentService } from "@/services/appointment.service";
import { isAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const updated = await AppointmentService.updateStatus(id, status);
    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    console.error("PATCH appointment status error:", error);
    return NextResponse.json({ error: error.message || "Failed to update status" }, { status: 500 });
  }
}

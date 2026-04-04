import { NextRequest, NextResponse } from "next/server";
import { AppointmentService } from "@/services/appointment.service";
import { getAuthContext, isAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await getAuthContext(req);
    if (!auth.authenticated || (auth.role !== "admin" && auth.role !== "doctor")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const updatedAppointment = body.date || body.time
      ? await AppointmentService.rescheduleAppointment(id, body)
      : await AppointmentService.updateStatus(id, body.status);
    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error("PATCH appointment error:", error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const Appointment = (await import("@/models/Appointment")).default;
    const deleted = await Appointment.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    return NextResponse.json({ message: "Appointment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE appointment error:", error);
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}

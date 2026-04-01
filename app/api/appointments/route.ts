import { NextRequest, NextResponse } from "next/server";
import { AppointmentService } from "@/services/appointment.service";
import { isAdmin } from "@/lib/auth";
import { isRateLimited } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  try {
    // Admin only
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const date = searchParams.get("date") || undefined;
    const status = (searchParams.get("status") as any) || undefined;
    const doctorId = searchParams.get("doctorId") || undefined;

    const result = await AppointmentService.getAppointments({
      page,
      limit,
      date,
      status,
      doctorId,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET appointments error:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Basic rate limit: 5 requests per minute per IP
    const ip = req.headers.get("x-forwarded-for") || "generic";
    if (isRateLimited(`booking-${ip}`, 5, 60000)) {
      return NextResponse.json({ error: "Too many booking attempts. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    
    // Create appointment with service (includes validation)
    const newAppointment = await AppointmentService.createAppointment(body);
    
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error: any) {
    console.error("POST appointment error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create appointment" },
      { status: error.message.includes("booked") || error.message.includes("past") ? 400 : 500 }
    );
  }
}

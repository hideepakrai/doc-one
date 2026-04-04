import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import { getAuthContext, hasRole } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthContext(req);
    if (!auth.authenticated || auth.role !== "doctor" || !auth.payload?.doctorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const doctorId = auth.payload.doctorId;
    const doctor = await Doctor.findById(doctorId).populate("specialization", "name");
    if (!doctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });

    const appointments = await Appointment.find({ doctorId }).sort({ date: 1, time: 1 }).populate("doctorId", "name specialization");
    const today = new Date().toISOString().slice(0, 10);

    return NextResponse.json({
      doctor: {
        id: doctor._id.toString(),
        name: doctor.name,
        specialty: doctor.specialization?.name || "Unknown",
        image: doctor.image,
        availabilityStatus: doctor.availabilityStatus,
      },
      todayAppointments: appointments.filter((a) => a.date === today),
      upcomingAppointments: appointments.filter((a) => a.date >= today).slice(0, 8),
      patients: Array.from(new Map(appointments.map((a) => [a.patientName, { name: a.patientName, lastVisit: a.date, status: a.status }])).values()),
    });
  } catch (error) {
    console.error("Doctor dashboard error:", error);
    return NextResponse.json({ error: "Failed to load dashboard" }, { status: 500 });
  }
}

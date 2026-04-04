import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import Specialization from "@/models/Specialization";
import { subDays, format, startOfDay } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const [totalDoctors, availableDoctors, totalAppointments, totalSpecializations, recentAppointments] = await Promise.all([
      Doctor.countDocuments(),
      Doctor.countDocuments({ availabilityStatus: "Available" }),
      Appointment.countDocuments(),
      Specialization.countDocuments(),
      Appointment.find().sort({ createdAt: -1 }).limit(5).populate("doctor", "name")
    ]);

    // Popular specialty
    const specs = await Specialization.find().sort({ doctorCount: -1 }).limit(1);
    const popularSpecialty = specs[0]?.name || "N/A";

    // 7 Days Trend
    const trends = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);

      const count = await Appointment.countDocuments({
        createdAt: { $gte: dayStart, $lte: dayEnd }
      });

      trends.push({
        date: format(date, "yyyy-MM-dd"),
        count
      });
    }

    // Specialization Distribution
    const distribution = await Specialization.find().select("name doctorCount");

    return NextResponse.json({
      stats: {
        totalDoctors,
        availableDoctors,
        totalAppointments,
        totalSpecializations,
        popularSpecialty,
        busyDoctors: totalDoctors - availableDoctors
      },
      trends,
      distribution: distribution.map(d => ({ name: d.name, value: d.doctorCount })),
      recentAppointments: recentAppointments.map(a => ({
          id: a._id,
          patient: a.patientName,
          doctor: a.doctor?.name || "Unknown",
          date: a.date,
          time: a.time,
          status: a.status
      }))
    });
  } catch (error) {
    console.error("Admin stats fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

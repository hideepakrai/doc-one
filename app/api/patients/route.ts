import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";

export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const patients = await Appointment.aggregate([
      {
        $group: {
          _id: "$patientName",
          lastAppointment: { $max: "$date" },
          totalAppointments: { $sum: 1 },
          assignedDoctorId: { $last: "$doctorId" },
          statuses: { $push: "$status" },
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "assignedDoctorId",
          foreignField: "_id",
          as: "doctor",
        },
      },
      {
        $unwind: {
          path: "$doctor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: "$_id",
          totalAppointments: 1,
          lastAppointment: 1,
          doctor: "$doctor.name",
          history: "$statuses",
        },
      },
      { $sort: { lastAppointment: -1 } },
    ]);

    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error("GET patients error:", error);
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}

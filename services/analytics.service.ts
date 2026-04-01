import Appointment from "@/models/Appointment";
import Doctor from "@/models/Doctor";
import Specialization from "@/models/Specialization";
import dbConnect from "@/lib/dbConnect";
import { format, subDays, startOfDay, endOfDay } from "date-fns";

export class AnalyticsService {
  /**
   * Get dashboard statistics
   */
  static async getDashboardStats() {
    await dbConnect();

    const today = format(new Date(), "yyyy-MM-dd");

    // 1. Total appointments today
    const appointmentsToday = await Appointment.countDocuments({ date: today });

    // 2. Busy vs Available doctors
    const busyDoctors = await Doctor.countDocuments({ availabilityStatus: "Busy" });
    const availableDoctors = await Doctor.countDocuments({ availabilityStatus: "Available" });

    // 3. Most popular specialization (by appointment count)
    const specializationStats = await Appointment.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "doctor",
        },
      },
      { $unwind: "$doctor" },
      {
        $group: {
          _id: "$doctor.specialization",
          count: { $sum: 1 },
        },
      },
      {
          $lookup: {
              from: "specializations",
              localField: "_id",
              foreignField: "_id",
              as: "spec"
          }
      },
      { $unwind: "$spec" },
      {
        $project: {
          name: "$spec.name",
          count: 1,
        },
      },
      { $sort: { count: -1 } },
    ]);

    // 4. Appointment trends (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = subDays(new Date(), i);
        return format(d, "yyyy-MM-dd");
    }).reverse();

    const trends = await Promise.all(
        last7Days.map(async (d) => {
            const count = await Appointment.countDocuments({ date: d });
            return { date: d, appointments: count };
        })
    );

    return {
      stats: {
        appointmentsToday,
        busyDoctors,
        availableDoctors,
        totalDoctors: busyDoctors + availableDoctors,
        mostPopularSpec: specializationStats[0]?.name || "N/A",
      },
      specializationStats,
      trends,
    };
  }
}

import Appointment, { IAppointment } from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { startOfDay, endOfDay, parseISO, isPast } from "date-fns";

export class AppointmentService {
  /**
   * Create a new appointment with validation
   */
  static async createAppointment(data: Partial<IAppointment>) {
    await dbConnect();

    // 1. Validate date is not in the past
    const appointmentDate = new Date(data.date!);
    if (isPast(new Date(appointmentDate.setHours(23, 59, 59, 999)))) {
        // Simple check: if date is before today
        const today = startOfDay(new Date());
        if (new Date(data.date!) < today) {
            throw new Error("Cannot book appointments for past dates.");
        }
    }

    // 2. Prevent double booking for same doctor & time slot
    const existingAppointment = await Appointment.findOne({
      doctorId: data.doctorId,
      date: data.date,
      time: data.time,
      status: { $ne: "Cancelled" },
    });

    if (existingAppointment) {
      throw new Error("This time slot is already booked for this doctor.");
    }

    // 3. Create appointment
    const appointment = await Appointment.create({
      ...data,
      status: "Pending", // Always start as Pending
    });

    return appointment;
  }

  /**
   * Get all appointments with filters and pagination
   */
  static async getAppointments(query: {
    page?: number;
    limit?: number;
    date?: string;
    status?: string;
    doctorId?: string;
  }) {
    await dbConnect();
    const { page = 1, limit = 10, date, status, doctorId } = query;

    const filter: any = {};
    if (date) filter.date = date;
    if (status) filter.status = status;
    if (doctorId) filter.doctorId = doctorId;

    const skip = (page - 1) * limit;

    const appointments = await Appointment.find(filter)
      .populate("doctorId", "name specialization")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Appointment.countDocuments(filter);

    return {
      appointments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Update appointment status
   */
  static async updateStatus(id: string, status: IAppointment["status"]) {
    await dbConnect();
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!appointment) throw new Error("Appointment not found");
    return appointment;
  }

  /**
   * Get booked slots for a doctor on a specific date
   */
  static async getBookedSlots(doctorId: string, date: string) {
    await dbConnect();
    const appointments = await Appointment.find({
      doctorId,
      date,
      status: { $ne: "Cancelled" },
    }).select("time");

    return appointments.map((app) => app.time);
  }
}

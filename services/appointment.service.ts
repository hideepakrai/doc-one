import Appointment, { IAppointment } from "@/models/Appointment";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import { startOfDay, isPast, parse } from "date-fns";

const DAY_MAP: Record<string, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

function toMinutes(value: string) {
  const parsed = parse(value.trim(), "hh:mm a", new Date());
  return parsed.getHours() * 60 + parsed.getMinutes();
}

function parseRange(range: string) {
  const [start, end] = range.split("-").map((part) => part.trim());
  if (!start || !end) return null;
  return { start, end };
}

function dayAllowed(workingDays: string | undefined, date: Date) {
  if (!workingDays) return true;
  const lower = workingDays.toLowerCase();
  const weekday = Object.entries(DAY_MAP).find(([, idx]) => idx === date.getDay())?.[0] || "mon";
  if (lower.includes("mon-sat")) return date.getDay() >= 1 && date.getDay() <= 6;
  if (lower.includes("mon-fri")) return date.getDay() >= 1 && date.getDay() <= 5;
  return lower.includes(weekday);
}

function timeInRange(time: string, workingHours: string | undefined, breakTime: string | undefined, blockedSlots: string | undefined) {
  const schedule = workingHours ? parseRange(workingHours) : null;
  if (!schedule) return true;
  const current = toMinutes(time);
  const start = toMinutes(schedule.start);
  const end = toMinutes(schedule.end);
  if (current < start || current > end) return false;

  if (breakTime) {
    const br = parseRange(breakTime);
    if (br) {
      const brStart = toMinutes(br.start);
      const brEnd = toMinutes(br.end);
      if (current >= brStart && current <= brEnd) return false;
    }
  }

  if (blockedSlots) {
    const blocked = blockedSlots.split(",").map((v) => v.trim()).filter(Boolean);
    if (blocked.includes(time.trim())) return false;
  }

  return true;
}

function assertRescheduleAllowed(target: {
  date: string;
  time: string;
}, doctor: any, appointmentId?: string) {
  const appointmentDate = new Date(target.date);
  if (isPast(new Date(appointmentDate.setHours(23, 59, 59, 999)))) {
    const today = startOfDay(new Date());
    if (new Date(target.date) < today) {
      throw new Error("Cannot schedule appointments for past dates.");
    }
  }

  if (!dayAllowed(doctor.workingDays, appointmentDate)) {
    throw new Error("Selected doctor is not available on this day.");
  }
  if (!timeInRange(target.time, doctor.timeSlots, doctor.breakTime, doctor.blockedSlots)) {
    throw new Error("Selected time is outside the doctor's working hours.");
  }

  return Appointment.findOne({
    _id: { $ne: appointmentId },
    doctorId: doctor._id,
    date: target.date,
    time: target.time,
    status: { $ne: "Cancelled" },
  });
}

export class AppointmentService {
  /**
   * Create a new appointment with validation
   */
  static async createAppointment(data: Partial<IAppointment>) {
    await dbConnect();

    if (!data.patientName || !data.doctorId || !data.date || !data.time) {
      throw new Error("Missing required appointment details.");
    }

    const doctor = await Doctor.findById(data.doctorId);
    if (!doctor) {
      throw new Error("Doctor not found.");
    }
    if (doctor.availabilityStatus === "On Leave") {
      throw new Error("Selected doctor is currently on leave.");
    }

    const appointmentDate = new Date(data.date!);
    if (!dayAllowed(doctor.workingDays, appointmentDate)) {
      throw new Error("Selected doctor is not available on this day.");
    }
    if (!timeInRange(data.time!, doctor.timeSlots, doctor.breakTime, doctor.blockedSlots)) {
      throw new Error("Selected time is outside the doctor's working hours.");
    }

    // 1. Validate date is not in the past
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

    const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
    const status = (data.status && validStatuses.includes(data.status)) ? data.status : "Pending";

    // 3. Create appointment
    const appointment = await Appointment.create({
      ...data,
      status,
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
    search?: string;
  }) {
    await dbConnect();
    const { page = 1, limit = 10, date, status, doctorId, search } = query;

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const currentTime = parse(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), "hh:mm a", new Date());
    const overdue = await Appointment.find({
      status: { $in: ["Pending", "Confirmed"] },
      $or: [
        { date: { $lt: todayStr } },
        {
          date: todayStr,
          time: { $in: [""] },
        },
      ],
    });
    const sameDayOverdue = await Appointment.find({
      status: { $in: ["Pending", "Confirmed"] },
      date: todayStr,
    });
    const sameDayIds = sameDayOverdue
      .filter((appt) => {
        const apptTime = parse(appt.time, "hh:mm a", new Date());
        return apptTime < currentTime;
      })
      .map((appt) => appt._id);
    const overdueIds = [...overdue.map((appt) => appt._id), ...sameDayIds];
    if (overdueIds.length) {
      await Appointment.updateMany(
        { _id: { $in: overdueIds } },
        { $set: { status: "Completed" } }
      );
    }

    const filter: any = {};
    if (date) filter.date = date;
    if (status) filter.status = status;
    if (doctorId) filter.doctorId = doctorId;
    if (search) filter.patientName = { $regex: search, $options: "i" };

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
    const allowed = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (!allowed.includes(status)) {
      throw new Error("Invalid appointment status.");
    }
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!appointment) throw new Error("Appointment not found");
    return appointment;
  }

  static async rescheduleAppointment(
    id: string,
    data: { date?: string; time?: string; status?: IAppointment["status"] }
  ) {
    await dbConnect();
    const appointment = await Appointment.findById(id);
    if (!appointment) throw new Error("Appointment not found");

    const doctor = await Doctor.findById(appointment.doctorId);
    if (!doctor) throw new Error("Doctor not found.");
    if (doctor.availabilityStatus === "On Leave") {
      throw new Error("Selected doctor is currently on leave.");
    }

    const nextDate = data.date || appointment.date;
    const nextTime = data.time || appointment.time;

    const conflicting = await assertRescheduleAllowed(
      { date: nextDate, time: nextTime },
      doctor,
      appointment._id.toString()
    );

    if (conflicting) {
      throw new Error("This time slot is already booked for this doctor.");
    }

    const nextStatus = data.status && ["Pending", "Confirmed", "Completed", "Cancelled"].includes(data.status)
      ? data.status
      : appointment.status;

    appointment.date = nextDate;
    appointment.time = nextTime;
    appointment.status = nextStatus;

    await appointment.save();
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

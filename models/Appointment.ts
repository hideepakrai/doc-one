import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patientName: string;
  doctorId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  status: "Booked" | "Completed" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor is required"],
    },
    date: {
      type: String,
      required: [true, "Appointment date is required"],
    },
    time: {
      type: String,
      required: [true, "Appointment time is required"],
    },
    status: {
      type: String,
      enum: ["Booked", "Completed", "Cancelled"],
      default: "Booked",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

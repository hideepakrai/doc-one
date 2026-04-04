import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  clinicName: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
}

const SettingsSchema = new Schema(
  {
    clinicName: { type: String, default: "MediCare Clinic" },
    email: { type: String, default: "hello@medicareclinic.com" },
    phone: { type: String, default: "+91 99999 88888" },
    address: { type: String, default: "Delhi, India" },
    logo: { type: String, default: "/placeholder-logo.png" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

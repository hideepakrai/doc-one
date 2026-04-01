import mongoose, { Schema, Document } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  specialization: mongoose.Types.ObjectId;
  experience: string; // The prompt said Number initially but we might want text like "15+ years" from UI, let's keep it string for flexibility or number. Actually prompt says: experience (Number, in years). Okay, Number.
  rating: number;
  reviews: number;
  location: string;
  availabilityStatus: "Available" | "Busy";
  nextAvailable: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    specialization: {
      type: Schema.Types.ObjectId,
      ref: "Specialization",
      required: [true, "Specialization is required"],
    },
    experience: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      default: "Delhi, India",
    },
    availabilityStatus: {
      type: String,
      enum: ["Available", "Busy"],
      default: "Available",
    },
    nextAvailable: {
      type: String,
      default: "Today, 5:00 PM",
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);

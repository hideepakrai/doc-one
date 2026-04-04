import mongoose, { Schema, Document } from "mongoose";

export interface ISpecialization extends Document {
  name: string;
  description: string;
  icon: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SpecializationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Specialization name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "Stethoscope",
    },
    features: {
      type: [String],
      default: [],
    },
    doctorCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Specialization ||
  mongoose.model<ISpecialization>("Specialization", SpecializationSchema);

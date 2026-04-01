import Doctor, { IDoctor } from "@/models/Doctor";
import Specialization from "@/models/Specialization";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export class DoctorService {
  /**
   * Get all doctors with search, filtering, and pagination
   */
  static async getDoctors(query: {
    page?: number;
    limit?: number;
    search?: string;
    specialization?: string;
  }) {
    await dbConnect();
    const { page = 1, limit = 10, search, specialization } = query;

    const filter: any = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (specialization && specialization !== "All") {
      // Find the specialization object by name first
      const spec = await Specialization.findOne({
          name: new RegExp(`^${specialization}$`, "i")
      });
      if (spec) {
          filter.specialization = spec._id;
      }
    }

    const skip = (page - 1) * limit;

    const doctors = await Doctor.find(filter)
      .populate("specialization", "name icon")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments(filter);

    const transformedDoctors = doctors.map(doc => ({
      id: doc._id.toString(),
      name: doc.name,
      specialty: doc.specialization?.name || "Unknown",
      image: doc.image,
      rating: doc.rating,
      reviews: doc.reviews,
      experience: `${doc.experience} years`,
      location: doc.location,
      available: doc.availabilityStatus === "Available",
      nextSlot: doc.nextAvailable,
    }));

    return {
      doctors: transformedDoctors,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Create or update doctor
   */
  static async updateDoctor(id: string, data: Partial<IDoctor>) {
    await dbConnect();
    const doctor = await Doctor.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!doctor) throw new Error("Doctor not found");
    return doctor;
  }

  /**
   * Delete doctor and update specialization counts
   */
  static async deleteDoctor(id: string) {
    await dbConnect();
    const doctor = await Doctor.findById(id);
    if (!doctor) throw new Error("Doctor not found");

    if (doctor.specialization) {
      await Specialization.findByIdAndUpdate(doctor.specialization, {
        $inc: { doctorCount: -1 },
      });
    }

    await Doctor.findByIdAndDelete(id);
    return true;
  }
}

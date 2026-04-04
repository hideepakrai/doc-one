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
    status?: string;
    isFeatured?: boolean;
    sortBy?: string;
  }) {
    await dbConnect();
    const { 
      page = 1, 
      limit = 10, 
      search, 
      specialization, 
      status, 
      isFeatured,
      sortBy = "createdAt"
    } = query;

    const filter: any = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured;
    }
    if (status) {
      filter.availabilityStatus = status;
    }
    if (specialization && specialization !== "All") {
      const spec = await Specialization.findOne({
          name: new RegExp(`^${specialization}$`, "i")
      });
      if (spec) {
          filter.specialization = spec._id;
      }
    }

    const skip = (page - 1) * limit;

    // Build sort object
    let sortObj: any = { createdAt: -1 };
    if (sortBy === "rating") sortObj = { rating: -1 };
    else if (sortBy === "experience") sortObj = { experience: -1 };
    else if (sortBy === "name") sortObj = { name: 1 };

    const doctors = await Doctor.find(filter)
      .populate("specialization", "name icon")
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments(filter);

    const transformedDoctors = doctors.map(doc => ({
      id: doc._id.toString(),
      name: doc.name,
      specialty: doc.specialization?.name || "Unknown",
      specializationId: doc.specialization?._id,
      image: doc.image || "/placeholder-user.jpg",
      rating: doc.rating,
      reviews: doc.reviews,
      experience: doc.experience,
      location: doc.location,
      availabilityStatus: doc.availabilityStatus,
      available: doc.availabilityStatus === "Available",
      nextSlot: doc.nextAvailable,
      isFeatured: !!doc.isFeatured,
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

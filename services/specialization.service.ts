import Specialization, { ISpecialization } from "@/models/Specialization";
import Doctor from "@/models/Doctor";
import dbConnect from "@/lib/dbConnect";

export class SpecializationService {
  /**
   * Get all specializations
   */
  static async getSpecializations() {
    await dbConnect();
    return Specialization.find().sort({ name: 1 });
  }

  /**
   * Create or update specialization
   */
  static async updateSpecialization(id: string, data: Partial<ISpecialization>) {
    await dbConnect();
    const specialization = await Specialization.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!specialization) throw new Error("Specialization not found");
    return specialization;
  }

  /**
   * Delete specialization (only if no doctors are linked)
   */
  static async deleteSpecialization(id: string) {
    await dbConnect();
    const doctorCount = await Doctor.countDocuments({ specialization: id });
    if (doctorCount > 0) {
      throw new Error(`Cannot delete specialization with ${doctorCount} linked doctors.`);
    }

    const specialization = await Specialization.findByIdAndDelete(id);
    if (!specialization) throw new Error("Specialization not found");
    return true;
  }
}

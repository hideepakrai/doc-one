import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import Specialization from "@/models/Specialization";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    // Auto Update Logic: Decrement doctorCount on deletion
    if (doctor.specialization) {
      await Specialization.findByIdAndUpdate(
        doctor.specialization,
        { $inc: { doctorCount: -1 } }
      );
    }

    await Doctor.findByIdAndDelete(id);

    return NextResponse.json({ message: "Doctor deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE doctor error:", error);
    return NextResponse.json({ error: "Failed to delete doctor" }, { status: 500 });
  }
}

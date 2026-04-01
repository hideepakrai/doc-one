import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import Specialization from "@/models/Specialization";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const specializationName = searchParams.get("specialization");

    let query = {};
    
    if (specializationName && specializationName !== "All" && specializationName !== "सभी") {
      // Find the specialization object by name first
      const spec = await Specialization.findOne({
        // Simple case insensitive check
        name: new RegExp(`^${specializationName}$`, "i")
      });
      
      if (spec) {
        query = { specialization: spec._id };
      }
    }

    const doctors = await Doctor.find(query)
      .populate("specialization", "name icon")
      .sort({ createdAt: -1 });

    // Transform response so frontend can consume it easily
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

    return NextResponse.json(transformedDoctors, { status: 200 });
  } catch (error) {
    console.error("GET doctors error:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Create new doctor
    const newDoctor = await Doctor.create(body);
    
    // Auto Update Logic: Increment doctorCount in Specialization
    if (newDoctor.specialization) {
      await Specialization.findByIdAndUpdate(
        newDoctor.specialization,
        { $inc: { doctorCount: 1 } }
      );
    }
    
    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error) {
    console.error("POST doctor error:", error);
    return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
  }
}

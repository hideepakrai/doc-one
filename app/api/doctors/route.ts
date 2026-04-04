import { NextRequest, NextResponse } from "next/server";
import { DoctorService } from "@/services/doctor.service";
import { isAdmin } from "@/lib/auth";
import Specialization from "@/models/Specialization";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "100"); // Standard high limit for user view unless paginated UI
    const search = searchParams.get("search") || undefined;
    const specialization = searchParams.get("specialization") || undefined;
    const status = searchParams.get("status") || undefined;
    const isFeatured = searchParams.get("isFeatured") === "true" ? true : 
                        searchParams.get("isFeatured") === "false" ? false : undefined;
    const sortBy = searchParams.get("sortBy") || undefined;

    const result = await DoctorService.getDoctors({
      page,
      limit,
      search,
      specialization,
      status,
      isFeatured,
      sortBy,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET doctors error:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Admin only
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    
    // Original logic for creating and updating specialization count
    const Doctor = (await import("@/models/Doctor")).default;
    const newDoctor = await Doctor.create(body);
    
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

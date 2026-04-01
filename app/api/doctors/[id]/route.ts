import { NextRequest, NextResponse } from "next/server";
import { DoctorService } from "@/services/doctor.service";
import { isAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    
    const updatedDoctor = await DoctorService.updateDoctor(id, body);
    return NextResponse.json(updatedDoctor, { status: 200 });
  } catch (error: any) {
    console.error("PUT doctor error:", error);
    return NextResponse.json({ error: error.message || "Failed to update doctor" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await DoctorService.deleteDoctor(id);
    return NextResponse.json({ message: "Doctor deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE doctor error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete doctor" }, { status: 500 });
  }
}

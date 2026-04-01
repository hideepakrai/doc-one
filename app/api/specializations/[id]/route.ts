import { NextRequest, NextResponse } from "next/server";
import { SpecializationService } from "@/services/specialization.service";
import { isAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    
    const updatedSpec = await SpecializationService.updateSpecialization(id, body);
    return NextResponse.json(updatedSpec, { status: 200 });
  } catch (error: any) {
    console.error("PUT specialization error:", error);
    return NextResponse.json({ error: error.message || "Failed to update specialization" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await SpecializationService.deleteSpecialization(id);
    return NextResponse.json({ message: "Specialization deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE specialization error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete specialization" }, { status: 400 });
  }
}

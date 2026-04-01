import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Specialization from "@/models/Specialization";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // We should ideally prevent deletion if doctors exist, or cascade delete.
    // For simplicity, we just delete.
    const deleted = await Specialization.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Specialization not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Specialization deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE specialization error:", error);
    return NextResponse.json({ error: "Failed to delete specialization" }, { status: 500 });
  }
}

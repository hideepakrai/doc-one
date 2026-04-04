import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const { doctorId, accessCode } = await req.json();

    if (!doctorId || !accessCode) {
      return NextResponse.json({ error: "Doctor and access code are required" }, { status: 400 });
    }

    const expected = process.env.DOCTOR_PORTAL_CODE || "doctor123";
    if (accessCode !== expected) {
      return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
    }

    await dbConnect();
    const doctor = await Doctor.findById(doctorId).populate("specialization", "name");
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const secretText = process.env.JWT_SECRET || "fallback_secret_for_dev";
    const secret = new TextEncoder().encode(secretText);
    const token = await new SignJWT({
      doctorId: doctor._id.toString(),
      name: doctor.name,
      role: "doctor",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    const response = NextResponse.json({ success: true, message: "Logged in successfully" }, { status: 200 });
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

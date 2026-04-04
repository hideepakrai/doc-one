import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { isAdmin } from "@/lib/auth";
import Settings from "@/models/Settings";

async function getSingleton() {
  await dbConnect();
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  return settings;
}

export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await getSingleton();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!(await isAdmin(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const settings = await getSingleton();
    settings.clinicName = body.clinicName ?? settings.clinicName;
    settings.email = body.email ?? settings.email;
    settings.phone = body.phone ?? settings.phone;
    settings.address = body.address ?? settings.address;
    settings.logo = body.logo ?? settings.logo;
    await settings.save();

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

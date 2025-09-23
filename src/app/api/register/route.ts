import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    // Check for duplicates by email or USN
    const exists = await Registration.findOne({ $or: [{ email: body.email }, { usn: body.usn }] });
    if (exists) {
      return NextResponse.json({ message: "User already registered" }, { status: 400 });
    }

    const newUser = await Registration.create(body);
    return NextResponse.json({ message: "Registered successfully!", user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await Registration.find().sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

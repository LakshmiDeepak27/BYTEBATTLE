import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration";

interface RegisterRequest {
  name: string;
  usn: string;
  branch: string;
  language: "C" | "C++" | "Python" | "Java";
  phone: string;
  email: string;
}

export async function POST(req: Request) {
  try {
    const body: RegisterRequest = await req.json();

    await connectDB();

    const exists = await Registration.findOne({
      $or: [{ email: body.email }, { usn: body.usn }],
    });

    if (exists) {
      return NextResponse.json({ message: "User already registered" }, { status: 400 });
    }

    const newUser = await Registration.create(body);

    return NextResponse.json({ message: "Registered successfully!", user: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    const err = error instanceof Error ? error : new Error("Unknown error");
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await Registration.find().sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Unknown error");
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

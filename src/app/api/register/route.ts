// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export interface RegisterRequest {
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

    // basic server-side validation
    if (!body.name || !body.usn || !body.email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // check duplicates by email or usn
    const { data: existing, error: checkErr } = await supabaseServer
      .from("registrations")
      .select("id")
      .or(`email.eq.${body.email},usn.eq.${body.usn}`)
      .limit(1);

    if (checkErr) throw checkErr;
    if (existing && existing.length > 0) {
      return NextResponse.json({ message: "User already registered" }, { status: 400 });
    }

    const { data, error: insertErr } = await supabaseServer
      .from("registrations")
      .insert({
        name: body.name,
        usn: body.usn,
        branch: body.branch,
        language: body.language,
        phone: body.phone,
        email: body.email,
      })
      .select()
      .single();

    if (insertErr) throw insertErr;

    return NextResponse.json({ message: "Registered successfully!", user: data }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    const err = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

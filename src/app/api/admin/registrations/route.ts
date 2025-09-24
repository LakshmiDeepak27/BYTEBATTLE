// src/app/api/admin/registrations/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const adminKey = req.headers.get("x-admin-key") ?? "";
    const expected = process.env.ADMIN_KEY ?? "";

    if (!expected || adminKey !== expected) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabaseServer
      .from("registrations")
      .select("id, name, usn, branch, language, phone, email, created_at, paid")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ registrations: data }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Admin fetch error:", msg);
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

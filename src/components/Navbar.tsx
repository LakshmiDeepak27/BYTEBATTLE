// src/components/Navbar.tsx
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black/50 backdrop-blur sticky top-0 z-50 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-red-600">
          Byte Battle
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="px-4 py-2 rounded-md bg-red-700/90 hover:bg-red-600/90 transition text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

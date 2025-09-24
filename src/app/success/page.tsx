// src/app/success/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Registration Success - Byte Battle",
  description: "Thanks for registering for Byte Battle",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full panel-on-grid rounded-2xl p-10 shadow-xl border border-red-900/30 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">You&apos;re registered 🎉</h1>
        <p className="text-gray-300 mb-4">
          Thanks for registering for Byte Battle. Check your email for confirmation (if configured) or wait for further instructions.
        </p>

        <p className="text-sm text-gray-400 mb-6">
          Next: we will add payments (Stripe) and email codes (SendGrid). For now your registration is stored in the database.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/" className="px-5 py-2 rounded-lg bg-red-700 hover:bg-red-600 transition text-white">Back to Home</Link>
          <Link href="/register" className="px-5 py-2 rounded-lg border border-red-700 text-red-200 hover:bg-red-900 transition">Register another</Link>
        </div>
      </div>
    </div>
  );
}

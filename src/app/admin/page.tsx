// src/app/admin/page.tsx
"use client";
import { useState } from "react";

type Reg = {
  id: string;
  name: string;
  usn: string;
  branch: string;
  language: string;
  phone: string;
  email: string;
  created_at: string;
  paid: boolean;
};

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState<Reg[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRegs = async () => {
    setLoading(true);
    setError(null);
    setRegistrations(null);
    try {
      const res = await fetch("/api/admin/registrations", {
        headers: { "x-admin-key": key },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to fetch");
      } else {
        setRegistrations(json.registrations || []);
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 panel-on-grid rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Admin — Registrations</h1>
            <p className="text-sm text-gray-300">Enter the admin key to view registrations (server-protected).</p>
          </div>

          <div className="flex gap-3">
            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              type="password"
              placeholder="Admin Key"
              className="p-2 rounded bg-black/30 border border-red-800 text-white"
            />
            <button onClick={fetchRegs} disabled={loading || !key} className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 transition">
              {loading ? "Loading..." : "Fetch"}
            </button>
          </div>
        </div>

        {error && <div className="mb-4 text-red-400">{error}</div>}

        {registrations && registrations.length === 0 && <div className="text-gray-300">No registrations yet.</div>}

        {registrations && registrations.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-300">
                  <th className="p-3 border-b border-red-800/30">Name</th>
                  <th className="p-3 border-b border-red-800/30">USN</th>
                  <th className="p-3 border-b border-red-800/30">Branch</th>
                  <th className="p-3 border-b border-red-800/30">Lang</th>
                  <th className="p-3 border-b border-red-800/30">Phone</th>
                  <th className="p-3 border-b border-red-800/30">Email</th>
                  <th className="p-3 border-b border-red-800/30">Paid</th>
                  <th className="p-3 border-b border-red-800/30">Registered</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((r) => (
                  <tr key={r.id} className="text-gray-200 hover:bg-white/2">
                    <td className="p-3 border-b border-red-800/10">{r.name}</td>
                    <td className="p-3 border-b border-red-800/10">{r.usn}</td>
                    <td className="p-3 border-b border-red-800/10">{r.branch}</td>
                    <td className="p-3 border-b border-red-800/10">{r.language}</td>
                    <td className="p-3 border-b border-red-800/10">{r.phone}</td>
                    <td className="p-3 border-b border-red-800/10">{r.email}</td>
                    <td className="p-3 border-b border-red-800/10">{r.paid ? "Yes" : "No"}</td>
                    <td className="p-3 border-b border-red-800/10">{new Date(r.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

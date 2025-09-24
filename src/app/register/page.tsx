"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Language = "C" | "C++" | "Python" | "Java";

interface FormData {
  name: string;
  usn: string;
  branch: string;
  language: Language;
  phone: string;
  email: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    usn: "",
    branch: "",
    language: "C",
    phone: "",
    email: "",
  });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const usnPattern = /^[0-9A-Za-z-]{5,20}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.usn.trim() || !form.email.trim()) {
      setMessage("Name, USN and Email are required.");
      return false;
    }
    if (!usnPattern.test(form.usn.trim())) {
      setMessage("USN format looks invalid.");
      return false;
    }
    const digitsOnly = form.phone.replace(/\D/g, "");
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      setMessage("Phone number looks invalid.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message || "Something went wrong.");
      if (res.ok) {
        router.push("/success");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl backdrop-blur bg-black/50 p-8 border border-red-900 neon-glow shadow-2xl">
        <h1
          className="text-3xl font-bold glitch-text text-center mb-6"
          data-text="BYTE BATTLE"
        >
          BYTE BATTLE
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="cyber-input"
          />
          <input
            name="usn"
            placeholder="USN (e.g. 1DT23CS140)"
            value={form.usn}
            onChange={handleChange}
            required
            className="cyber-input"
          />
          <input
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
            required
            className="cyber-input"
          />
          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="cyber-input"
          >
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
          <input
            name="phone"
            type="tel"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="cyber-input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="cyber-input"
          />

          <button
            type="submit"
            disabled={loading}
            className="cyber-button"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-200">{message}</p>
        )}
      </div>
    </div>
  );
}

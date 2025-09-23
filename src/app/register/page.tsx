"use client";

import { useState } from "react";

interface FormData {
  name: string;
  usn: string;
  branch: string;
  language: "C" | "C++" | "Python" | "Java";
  phone: string;
  email: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    usn: "",
    branch: "",
    language: "C",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: { message?: string } = await res.json();
      setMessage(data.message || "Something went wrong!");
    } catch (err) {
      setMessage("Failed to submit. Please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-gray-100 shadow-xl p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Byte Battle Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="usn"
            placeholder="USN (e.g. 1DT23CS140)"
            value={form.usn}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center font-semibold">{message}</p>}
      </div>
    </div>
  );
}

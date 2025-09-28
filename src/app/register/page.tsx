"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Language = "C" | "C++" | "Python" | "Java";
type Branch = "CSE AI" | "CSE AIML" | "CSE" | "ISE" | "ECE";

interface FormData {
  name: string;
  usn: string;
  branch: Branch;
  language: Language;
  phone: string;
  email: string;
  notes?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    usn: "",
    branch: "CSE AI",
    language: "C",
    phone: "",
    email: "",
  });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);

  const maxFileSize = 3 * 1024 * 1024; // 3MB
  const allowedTypes = ["image/jpeg", "image/png"];
  const usnPattern = /^[0-9A-Za-z-]{5,20}$/;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File selected:", {
      name: file.name,
      size: file.size,
      type: file.type
    });

    if (!allowedTypes.includes(file.type)) {
      setMessage("Only JPG or PNG images allowed.");
      return;
    }

    if (file.size > maxFileSize) {
      setMessage("File too large. Maximum size is 3MB.");
      return;
    }

    // Clean up previous preview URL to prevent memory leaks
    if (qrPreview) {
      URL.revokeObjectURL(qrPreview);
    }

    setQrFile(file);
    setQrPreview(URL.createObjectURL(file));
    setMessage(""); // Clear any previous messages
  };

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      if (qrPreview) {
        URL.revokeObjectURL(qrPreview);
      }
    };
  }, [qrPreview]);

  const validate = () => {
    if (!form.name.trim() || !form.usn.trim() || !form.email.trim()) {
      setMessage("Name, USN, and Email are required.");
      return false;
    }
    if (!usnPattern.test(form.usn.trim())) {
      setMessage("USN format looks invalid.");
      return false;
    }
    const digitsOnly = form.phone.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      setMessage("Phone number looks invalid.");
      return false;
    }
    if (!qrFile) {
      setMessage("Payment screenshot is required.");
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
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("usn", form.usn);
      formData.append("branch", form.branch);
      formData.append("language", form.language);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      if (form.notes) formData.append("notes", form.notes);
      if (qrFile) formData.append("paymentScreenshot", qrFile);

      console.log("Submitting registration with file:", qrFile?.name);

      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Registration response:", data);

      if (res.ok) {
        // Use the code from the response (now included directly)
        const code = data.code || data.user?.code || "";
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => {
          router.push(`/success?code=${code}`);
        }, 1000);
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl backdrop-blur bg-black/50 p-8 border border-red-900 neon-glow shadow-2xl">
        <h1 className="text-3xl font-bold glitch-text text-center mb-6">BYTE BATTLE</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <label className="flex items-center gap-1">
            <span className="text-red-500 text-sm">*</span> Full Name
          </label>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="cyber-input"
          />

          {/* USN */}
          <label className="flex items-center gap-1">
            <span className="text-red-500 text-sm">*</span> USN
          </label>
          <input
            name="usn"
            placeholder="USN (e.g. 1DT23CS140)"
            value={form.usn}
            onChange={handleChange}
            required
            className="cyber-input"
          />

          {/* Branch */}
          <label className="flex items-center gap-1">
            <span className="text-red-500 text-sm">*</span> Branch
          </label>
          <select name="branch" value={form.branch} onChange={handleChange} className="cyber-input">
            <option value="CSE AI">CSE AI</option>
            <option value="CSE AIML">CSE AIML</option>
            <option value="CSE">CSE</option>
            <option value="ISE">ISE</option>
            <option value="ECE">ECE</option>
          </select>

          {/* Language */}
          <label className="flex items-center gap-1">
            <span className="text-red-500 text-sm">*</span> Language
          </label>
          <select name="language" value={form.language} onChange={handleChange} className="cyber-input">
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>

          {/* Phone */}
          <label className="flex items-center gap-1">
            <span className="text-red-500 text-sm">*</span> Mobile Number
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="Enter valid phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="cyber-input"
          />

          {/* Email */}
          <label className="flex items-center gap-1">
            <span className="text-red-500 text-sm">*</span> Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter valid email"
            value={form.email}
            onChange={handleChange}
            required
            className="cyber-input"
          />

          {/* Payment QR Section */}
          <div className="mt-4">
            <label className="font-semibold text-red-400 mb-2 block">Official Payment QR</label>
            <img
              src="/qr/dinesh.jpg"
              alt="Official QR"
              className="w-full max-w-xs mx-auto h-auto object-contain mb-2 border border-red-600 rounded-lg shadow-md"
            />

            <label className="flex items-center gap-1 mt-2">
              <span className="text-red-500 text-sm">*</span> Upload Your Payment Screenshot
            </label>
            <input type="file" accept="image/jpeg, image/png" onChange={handleQrUpload} className="cyber-input" />
            {qrPreview && (
              <img
                src={qrPreview}
                alt="QR Preview"
                className="mt-2 w-48 h-48 object-contain border border-red-600 rounded-lg shadow-md"
              />
            )}
          </div>

          <button type="submit" disabled={loading} className="cyber-button">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-gray-200">{message}</p>}
      </div>
    </div>
  );
}

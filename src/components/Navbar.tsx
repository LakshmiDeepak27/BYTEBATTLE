"use client";
import React from "react";

export default function Navbar() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="w-full bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo scrolls to top of page.tsx content */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold font-mono text-red-600 hover:text-red-600 transition-colors"
        >
          <span style={{ textShadow: "0 0 10px #FF1E1E", pointerEvents: "none" }}>
            BYTE BATTLE
          </span>
        </button>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-red-200 font-semibold tracking-wider">
          <button onClick={() => handleScroll("about")} className="hover:text-red-50 transition-colors">
            About
          </button>
          <button onClick={() => handleScroll("rules")} className="hover:text-red-50 transition-colors">
            Rules & Regulations
          </button>
          <button onClick={() => handleScroll("event")} className="hover:text-red-50 transition-colors">
            Event Info
          </button>
          <button onClick={() => handleScroll("organisers")} className="hover:text-red-50 transition-colors">
            Organisers
          </button>
        </div>

        {/* Register Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleScroll("register")}
            className="px-6 py-2 rounded-lg font-mono font-bold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(45deg, #FF1E1E, #CC0000)",
              border: "1px solid #FF1E1E",
              boxShadow: "0 0 12px rgba(255, 30, 30, 0.4)",
              textShadow: "0 0 8px #000",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 18px rgba(255, 30, 30, 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 12px rgba(255, 30, 30, 0.4)";
            }}
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </nav>
  );
}

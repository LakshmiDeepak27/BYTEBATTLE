"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="w-full bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        
        {/* Logo scrolls to top of page.tsx content */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold font-mono text-red-600 hover:text-red-600 transition-colors"
        >
          <span style={{ textShadow: "0 0 10px #FF1E1E", pointerEvents: "none" }}>
            BYTE BATTLE
          </span>
        </button>

        {/* Hamburger - mobile only */}
        <button
          className="md:hidden p-2 rounded-lg border border-red-900/40 text-red-200 hover:bg-red-900/30"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
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

      {/* Mobile dropdown panel - overlays, does not push layout */}
      {isOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-black/90 backdrop-blur border-b border-red-900/40 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 text-red-100 font-semibold">
            <button onClick={() => { setIsOpen(false); handleScroll("about"); }} className="text-left py-2">About</button>
            <button onClick={() => { setIsOpen(false); handleScroll("rules"); }} className="text-left py-2">Rules & Regulations</button>
            <button onClick={() => { setIsOpen(false); handleScroll("event"); }} className="text-left py-2">Event Info</button>
            <button onClick={() => { setIsOpen(false); handleScroll("organisers"); }} className="text-left py-2">Organisers</button>
            <button onClick={() => { setIsOpen(false); handleScroll("register"); }} className="mt-2 py-2 text-left">Register</button>
          </div>
        </div>
      )}
    </nav>
  );
}

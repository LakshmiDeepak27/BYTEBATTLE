"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Contest Explanation", href: "#contest" },
    { name: "Prize Pool", href: "#prize" },
    { name: "Rules & Regulations", href: "#rules" },
  ];

  return (
    <nav className="fixed w-full z-50 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-black drop-shadow-lg hover:scale-105 transition-transform duration-200">
        Byte Battle
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-10 text-black font-medium">
        {navItems.map((item) => (
          <li key={item.name} className="relative group">
            <a
              href={item.href}
              className="hover:text-indigo-500 transition-colors duration-300"
            >
              {item.name}
            </a>
            {/* Neon underline */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-transparent">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-black font-medium">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <a
                  href={item.href}
                  className="hover:text-indigo-500 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

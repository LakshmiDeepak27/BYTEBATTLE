"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "../components/HeroSection";
import About from "@/components/AboutSection";
import RulesSection from "../components/RulesSection";
import EventInfoSection from "../components/EventInfoSection";
import OrganisersSection from "../components/OrganisersSection";
import RegisterCtaSection from "../components/RegisterCtaSection";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ✅ Set persistent 1-day countdown
  useEffect(() => {
    let deadline = localStorage.getItem("deadline");
    if (!deadline) {
      const newDeadline = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day from first visit
      localStorage.setItem("deadline", newDeadline.toString());
      deadline = newDeadline.toString();
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = parseInt(deadline!) - now;
      setTimeLeft(distance > 0 ? distance : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Global mouse move listener
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const formatTimeUnits = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTimeUnits(timeLeft);

  const timeBox = (value: number, label: string) => (
    <div className="flex flex-col items-center justify-center bg-red-900/40 border border-red-600 backdrop-blur-md rounded-2xl w-16 sm:w-20 md:w-28 h-16 sm:h-20 md:h-28 mx-1 sm:mx-2 p-2 animate-pulse hover:scale-105 transition-transform duration-300 shadow-lg shadow-red-700/80">
      <span className="text-lg sm:text-2xl md:text-4xl font-extrabold text-red-50">{value}</span>
      <span className="text-xs sm:text-xs md:text-sm text-red-200 uppercase mt-1">{label}</span>
    </div>
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative min-h-screen bg-black overflow-x-hidden flex flex-col items-center p-4 md:p-6"
      onMouseMove={handleMouseMove}
      style={{ "--mouse-x": `${mousePos.x}px`, "--mouse-y": `${mousePos.y}px` } as React.CSSProperties}
    >
      {/* Full-page Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="full-grid"></div>
        <div className="full-grid overlay"></div>
        <div className="pointer-glow"></div>
      </div>

      <Navbar />

      <div className="relative flex flex-col items-center w-full z-10 mt-10">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-red-400 tracking-wider mb-2 text-center animate-pulse px-4">
          Registrations Started!
        </h2>


        <div className="w-full max-w-4xl">
          <HeroSection />
        </div>

        <About />
        <RulesSection />
        <EventInfoSection />
        <OrganisersSection />
        <RegisterCtaSection />
      </div>

      <style jsx>{`
        .full-grid {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to right, rgba(231,8,8,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(231,8,8,0.3) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: moveGrid 6s linear infinite;
        }

        .overlay {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: moveGridOverlay 12s linear infinite;
        }

            .pointer-glow {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          background: radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), rgba(255,30,30,0.3), transparent 60%);
          z-index: 1;
        }

        @keyframes moveGrid {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 50px 50px, 50px 50px; }
        }

        @keyframes moveGridOverlay {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: -100px 100px, 100px -100px; }
        }
      `}</style>
    </div>
  );
}

"use client";

import CustomCursor from "../components/CustomCursor";
import Navbar from "@/components/Navbar";
// Removed HeroSection since it's not used

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      {/* You can add HeroSection here if needed */}
    </>
  );
}

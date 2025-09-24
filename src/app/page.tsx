// src/app/page.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="px-6 md:px-20 lg:px-36">
        <HeroSection />
        {/* add more sections here if needed */}
      </main>
      <Footer />
    </div>
  );
}

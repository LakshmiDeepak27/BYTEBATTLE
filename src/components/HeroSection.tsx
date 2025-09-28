// src/components/HeroSection.tsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-8 md:py-12 flex flex-col items-center text-center gap-4">
      <div className="max-w-4xl w-full panel-on-grid rounded-3xl p-6 md:p-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-red-600 hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_8px_rgba(255,30,30,0.5)] cursor-pointer">
          Byte Battle — Code to Conquer
        </h1>


        <p className="mt-4 text-gray-300">
          A fast-paced coding contest for students. Solve algorithmic puzzles, compete with peers, and win exciting prizes.
        </p>

        <div className="flex gap-4 mt-6 justify-center">
          <Link href="/register" className="inline-block">
            <button className="px-6 py-3 rounded-2xl bg-red-700 hover:bg-red-600 transition font-semibold text-white">
              Register
            </button>
          </Link>

          <a
            href="#rules"
            className="inline-block px-6 py-3 rounded-2xl border border-red-700 hover:bg-red-900 transition text-red-300"
          >
            Rules
          </a>
        </div>

      </div>
    </section>
  );
}
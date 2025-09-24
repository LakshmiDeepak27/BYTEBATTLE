// src/components/HeroSection.tsx
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 flex flex-col items-center text-center gap-6">
      <div className="max-w-4xl w-full panel-on-grid rounded-3xl p-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-red-600">
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

        <div id="rules" className="mt-8 text-left text-gray-300">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Contest Details</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Individual participation</li>
            <li>Time limit: 2 hours</li>
            <li>Languages allowed: C, C++, Python, Java</li>
            <li>Prizes for top 3 participants</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

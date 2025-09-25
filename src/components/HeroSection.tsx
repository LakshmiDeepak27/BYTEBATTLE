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

        <div id="about" className="mt-8 text-left text-gray-300">
          <h3 className="text-xl font-semibold text-red-600 mb-2">About Byte Battle</h3>
          <p className="mb-4">
            Byte Battle is a thrilling coding contest designed to challenge your problem-solving skills, sharpen your programming abilities, and ignite your passion for innovation.
            This is your arena to compete with peers, push your limits, and transform ideas into solutions.
          </p>
          <p className="mb-4">
            Whether you are a beginner or an experienced coder, Byte Battle encourages creativity, critical thinking, and perseverance.
            Join us to experience the excitement of real-time coding challenges, showcase your talent, and learn from the brightest minds.
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Open to all students with a passion for coding</li>
            <li>Encourages individual participation and teamwork</li>
            <li>Real-world algorithmic challenges to test your logic and speed</li>
            <li>Recognition and prizes for top performers</li>
            <li>A platform to learn, grow, and network with fellow coders</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

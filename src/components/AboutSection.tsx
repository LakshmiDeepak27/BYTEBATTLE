export default function About() {
  return (
    <section id="about" className="w-full max-w-5xl mt-4 sm:mt-6 scroll-mt-20">
      <div className="panel-on-grid rounded-3xl p-6 md:p-8 shadow-xl border border-red-900/30">
        <h3 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-6 hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_8px_rgba(255,30,30,0.5)] cursor-pointer">
          About Byte Battle
        </h3>

        <div className="space-y-6 text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-4 border border-white">
              <p className="mb-2">
                Byte Battle is a thrilling coding contest designed to challenge
                your problem-solving skills, sharpen your programming abilities,
                and ignite your passion for innovation.
              </p>
              <p>
                This is your arena to compete with peers, push your limits, and
                transform ideas into solutions.
              </p>
            </div>

            <div className="rounded-2xl p-4 border border-white">
              <p className="mb-2">
                Whether you are a beginner or an experienced coder, Byte Battle
                encourages creativity, critical thinking, and perseverance.
              </p>
              <p>
                Join us to experience the excitement of real-time coding
                challenges, showcase your talent, and learn from the brightest
                minds.
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-6 border border-white">
            <ul className="list-disc ml-6 space-y-2 text-base md:text-lg">
              <li>Open to all students with a passion for coding</li>
              <li>Encourages individual participation </li>
              <li>Real-world algorithmic challenges to test your logic and speed</li>
              <li>Recognition and prizes for top performers</li>
              <li>A platform to learn, grow, and network with fellow coders</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

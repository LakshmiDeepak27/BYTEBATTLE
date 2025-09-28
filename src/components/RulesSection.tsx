export default function RulesSection() {
  return (
    <section id="rules" className="w-full max-w-5xl mt-4 sm:mt-6 scroll-mt-20">
      <div className="panel-on-grid rounded-3xl p-6 md:p-8 shadow-xl border border-red-900/30">
        <h3 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-6 hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_8px_rgba(255,30,30,0.5)] cursor-pointer">
          Rules & Regulations
        </h3>

        <div className="space-y-6 text-gray-300">
          <div>
            <h4 className="text-xl font-semibold text-red-500 mb-4">General Rules</h4>
            <ul className="list-disc ml-6 space-y-3 text-base md:text-lg">
              <li>Bring your own laptop and charger - no exceptions</li>
              <li  className="text-blue-500 font-bold">Each participant must pay a registration fee of ₹50.</li>
              <li>Individual participation only; no external assistance or collaboration</li>
              <li>Time-bound rounds; fastest correct solutions win</li>
              <li>No pre-written code or templates allowed</li>
             <li className="text-blue-500 font-bold">
  🎉 All participants will receive a participation certificate from CodeChef.
</li>


            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-red-500 mb-4">Competition Format</h4>
            <ul className="list-disc ml-6 space-y-3 text-base md:text-lg">
              <li  className="text-blue-500 font-bold">The contest will consist of three rounds.</li>
              <li>Each round will have a specific time limit</li>
              <li><span className="text-red-500 font-bold">Round 1 will be an aptitude test </span>with 20 questions to be completed in 30 minutes.</li>
              <li><span  className="text-red-500 font-bold">Round 2 will be a Data Structures and Algorithms round with easy to medium level questions.</span> Participants will solve 4 to 5 questions in 1 hour 30 minutes. Qualified participants from this round will move to the final round, and a leaderboard will be displayed.</li>
              <li><span className="text-red-500 font-bold">Round 3 will be a Data Structures and Algorithms round with medium to hard level questions.</span> Participants will solve 3 to 4 questions in 2 hours.</li>
              <li>Points awarded based on correctness and speed</li>
              <li>Final ranking determined by total points across all rounds</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-red-500 mb-4">Code of Conduct</h4>
            <ul className="list-disc ml-6 space-y-3 text-base md:text-lg">
              <li>Respect fellow participants and organizers</li>
              <li>Maintain academic integrity throughout the competition</li>
              <li>Follow all instructions from the organizing team</li>
              <li>Any violation may result in immediate disqualification</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}



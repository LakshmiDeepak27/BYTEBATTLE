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
              <li>Individual participation only; no external assistance or collaboration</li>
              <li>Time-bound rounds; fastest correct solutions win</li>
              <li>Internet access will be provided for research purposes only</li>
              <li>No pre-written code or templates allowed</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold text-red-500 mb-4">Competition Format</h4>
            <ul className="list-disc ml-6 space-y-3 text-base md:text-lg">
              <li>Multiple rounds with increasing difficulty levels</li>
              <li>Each round will have a specific time limit</li>
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



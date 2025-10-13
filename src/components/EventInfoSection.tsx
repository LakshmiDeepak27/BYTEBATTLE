export default function EventInfoSection() {
  return (
    <section id="event" className="w-full max-w-5xl mt-4 sm:mt-6 scroll-mt-20">
      <div className="panel-on-grid rounded-3xl p-6 md:p-8 shadow-xl border border-red-900/30">
        <h3 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-6 hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_8px_rgba(255,30,30,0.5)] cursor-pointer">
          Event Information
        </h3>
        
        <div className="space-y-6 text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-black rounded-2xl p-4 border border-white-800">
                <h4 className="text-xl font-semibold text-red-500 mb-2">📅 Date & Time</h4>
                <p className="text-green-500 md:text-lg">23rd-OCTOBER-2025</p>
                <p className="text-base md:text-lg">9:30 AM</p>
                <p className="text-sm text-gray-400 mt-1">Stay tuned for updates</p>
              </div>
              
              <div className="bg-black rounded-2xl p-4 border border-white-800">
                <h4 className="text-xl font-semibold text-red-500 mb-2">📍 Venue</h4>
                <p className="text-base md:text-lg">DSATM</p>
                <p className="text-sm text-gray-400 mt-1">A-BLOCK 5th FLOOR</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-black rounded-2xl p-4 border border-white-800">
                <h4 className="text-xl font-semibold text-red-500 mb-2">🏆 Format</h4>
                <p className="text-base md:text-lg">Three rounds, increasing difficulty</p>
                <p className="text-sm text-gray-400 mt-1">Algorithmic challenges</p>
              </div>
              
              <div className="bg-black rounded-2xl p-4 border border-white-800">
                <h4 className="text-xl font-semibold text-red-500 mb-2">⏱️ Duration</h4>
                <p className="text-base md:text-lg">5-HOURS</p>
                <p className="text-sm text-gray-400 mt-1">Breaks Included</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl p-6 border border-white">
            <h4 className="text-xl font-semibold text-red-500 mb-4">🎯 What to Expect</h4>
            <ul className="list-disc ml-6 space-y-2 text-base md:text-lg">
              <li>Challenging algorithmic problems of varying difficulty</li>
              <li>Real-time leaderboard updates</li>
              <li>Networking opportunities with fellow coders</li>
              <li>Prizes and recognition for top performers</li>
              <li>Learning sessions and coding tips</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}



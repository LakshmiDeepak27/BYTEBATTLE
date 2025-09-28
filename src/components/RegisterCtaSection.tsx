export default function RegisterCtaSection() {
  return (
    <section id="register" className="w-full max-w-5xl mt-4 sm:mt-6 mb-6 sm:mb-8 scroll-mt-20">
      <div className="panel-on-grid rounded-3xl p-6 md:p-8 shadow-xl border border-red-900/30 text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-6 hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_8px_rgba(255,30,30,0.5)] cursor-pointer">
          Ready to Compete?
        </h3>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Join the ultimate coding challenge and test your skills against the best programmers. 
            Don&apos;t miss this opportunity to showcase your talent and win amazing prizes!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-red-900/20 rounded-2xl p-4 border border-red-800/30">
              <h4 className="text-lg font-semibold text-red-500 mb-2">🏆 Prizes</h4>
              <p className="text-sm">Exciting rewards for winners</p>
            </div>
            <div className="bg-red-900/20 rounded-2xl p-4 border border-red-800/30">
              <h4 className="text-lg font-semibold text-red-500 mb-2">📚 Learning</h4>
              <p className="text-sm">Grow your coding skills</p>
            </div>
            <div className="bg-red-900/20 rounded-2xl p-4 border border-red-800/30">
              <h4 className="text-lg font-semibold text-red-500 mb-2">🤝 Network</h4>
              <p className="text-sm">Connect with fellow coders</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <a
              href="/register"
              className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 transition-all duration-300 font-bold text-white text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              🚀 Register Now 
            </a>
            
            <p className="text-sm text-gray-400">
              Registration is completely free • Limited spots available • Don&apos;t miss out!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



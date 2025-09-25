export default function EventInfoSection() {
  return (
    <section id="event" className="w-full max-w-5xl mt-6 scroll-mt-20">
      <div className="panel-on-grid rounded-3xl p-8 border border-red-900/40 bg-black/60 backdrop-blur">
        <h3 className="text-3xl font-extrabold text-red-500 mb-3">Event Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-red-100/90">
          <div>
            <div className="text-red-400 font-semibold">Date</div>
            <div>To be announced</div>
          </div>
          <div>
            <div className="text-red-400 font-semibold">Venue</div>
            <div>Main auditorium</div>
          </div>
          <div>
            <div className="text-red-400 font-semibold">Format</div>
            <div>Multiple rounds, increasing difficulty</div>
          </div>
        </div>
      </div>
    </section>
  );
}



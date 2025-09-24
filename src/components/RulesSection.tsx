export default function RulesSection() {
  return (
    <section id="rules" className="w-full max-w-5xl mt-10 scroll-mt-28">
      <div className="panel-on-grid rounded-3xl p-8 border border-red-900/40 bg-black/60 backdrop-blur">
        <h3 className="text-3xl font-extrabold text-red-500 mb-3">Rules & Regulations</h3>
        <ul className="list-disc ml-6 space-y-2 text-red-100/90">
          <li>Bring your own laptop and charger.</li>
          <li>Individual participation; no external assistance.</li>
          <li>Time-bound rounds; fastest correct solutions win.</li>
        </ul>
      </div>
    </section>
  );
}



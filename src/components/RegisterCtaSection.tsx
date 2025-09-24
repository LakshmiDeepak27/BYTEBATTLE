export default function RegisterCtaSection() {
  return (
    <section id="register" className="w-full max-w-5xl mt-10 mb-16 scroll-mt-28">
      <div className="panel-on-grid rounded-3xl p-8 border border-red-900/40 bg-black/60 backdrop-blur text-center">
        <h3 className="text-3xl font-extrabold text-red-500 mb-3">Ready to Compete?</h3>
        <a
          href="/register"
          className="inline-block px-8 py-3 rounded-2xl bg-red-700 hover:bg-red-600 transition font-semibold text-white"
        >
          Go to Registration
        </a>
      </div>
    </section>
  );
}



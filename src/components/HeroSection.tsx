const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 to-indigo-900 text-white text-center px-6">
      <h1 className="text-6xl font-extrabold mb-6 animate-pulse">Byte Battle</h1>
      <p className="text-xl mb-10 max-w-xl">
        The ultimate coding contest to show off your skills and win amazing prizes!
      </p>
      <a
        href="/register"
        className="relative inline-block px-10 py-4 font-bold text-white rounded-full overflow-hidden group hover:scale-105 transition-transform shadow-2xl"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transition-transform transform -translate-x-full group-hover:translate-x-0"></span>
        <span className="relative z-10">Register Now</span>
      </a>
    </section>
  );
};

export default HeroSection;

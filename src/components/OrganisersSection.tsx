'use client'
import { useRef, useEffect, useState } from "react";

export default function OrganisersSection() {
  const organisers = [
    { name: "Dinesh", role: "Event Lead", image: "/organisers/Dinesh.jpg" },
    { name: "Teja", role: "Problem Setter", image: "/organisers/Teja.jpg" },
    { name: "Hemanth L", role: "Problem Setter", image: "/organisers/Hemanth_L.jpg" },
    { name: "Krithika", role: "Problem Setter", image: "/organisers/Krithika.jpg" },
    { name: "Hemanth B", role: "Problem Tester", image: "/organisers/Hemanth_B.jpg" },
    { name: "Supriya", role: "Problem Tester", image: "/organisers/Supriya.jpg" },
    { name: "Manoj", role: "Platform Manager", image: "/organisers/Manoj.jpg" },
    { name: "Deepak", role: "Technical Head", image: "/organisers/deepak.png" },
    { name: "Chaturva", role: "Technical Support", image: "/organisers/Chaturva.jpg" },
    { name: "Dhanya", role: "Technical Support", image: "/organisers/Dhanya.jpg" },
    { name: "Thanmayi", role: "Operations Logistics", image: "/organisers/Thanmayi.jpg" },
    { name: "Raghuram", role: "Operations Logistics", image: "/organisers/Raghuram.jpg" },
    { name: "Aditya", role: "Promotion/Communication Lead", image: "/organisers/Aditya.jpg" },
    { name: "Indra", role: "Judging and Evaluation", image: "/organisers/Indra.jpg" },
    { name: "Smaran", role: "Judging and Evaluation", image: "/organisers/Smaran.jpg" },
    { name: "Monish R", role: "Promotions", image: "/organisers/Monish_R.jpg" },
    { name: "Ram Kumar", role: "Promotions", image: "/organisers/ramkumar.jpg" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth looping scroll function
  const scroll = (amount: number = 250) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const maxScrollLeft = container.scrollWidth - container.offsetWidth;
    const nextScrollLeft = container.scrollLeft + amount;

    if (nextScrollLeft > maxScrollLeft) {
      // Smoothly scroll to cloned first items
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else if (nextScrollLeft < 0) {
      container.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
    } else {
      container.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) scroll(250);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="organisers" className="w-full max-w-5xl mt-4 sm:mt-6 scroll-mt-20">
      <div className="panel-on-grid rounded-3xl p-6 md:p-8 shadow-xl border border-red-900/30">
        <h3 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-6 hover:scale-105 transition-transform duration-300 hover:drop-shadow-[0_0_8px_rgba(255,30,30,0.5)] cursor-pointer">
          Meet the Organizers
        </h3>

        <div className="space-y-6 text-gray-300">
          <div className="rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-red-500 mb-4">👥 Byte Battle Team</h4>
            <p className="text-base md:text-lg leading-relaxed mb-4">
              We are a passionate group of developers, educators, and tech enthusiasts dedicated to
              fostering coding excellence and creating memorable learning experiences for students.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Our mission is to provide a platform where students can showcase their programming
              skills, learn from each other, and grow as developers in a competitive yet supportive environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black rounded-2xl p-4 border border-white">
              <h4 className="text-lg font-semibold text-red-500 mb-3">📧 Contact Information</h4>
              <p className="text-base">Email: <a
                href="mailto:chaturva2005@gmail.com"
                className="text-red-500 font-semibold hover:underline"
              >chaturva2005@gmail.com</a></p>
              <p className="text-base">Phone-1: <span className="text-green-500">6281856189</span></p>
              <p className="text-base">Phone-2: <span className="text-green-500">6300890036</span></p>
            </div>

            <div className="bg-black rounded-2xl p-4 border border-white">
              <h4 className="text-lg font-semibold text-red-500 mb-3">🌐 Follow Us on</h4>
              <p className="text-base">Instagram : <span ><a className="text-green-500 font-semibold hover:underline" href="https://www.instagram.com/byte_battle2025?igsh=ZHY3OTdvdzQ1aXhk&utm_source=ig_contact_invite" target="_blank">BYTE-BATTLE</a></span></p>
              <p className="text-base">WhatsApp: <span><a className="text-green-500 font-semibold hover:underline" href="https://chat.whatsapp.com/BoGcnkYtrl0G130KfXG742?mode=ems_wa_t" target="_blank">Join WhatsApp</a></span></p>
              <p className="text-sm text-gray-400 mt-2">Stay connected for updates</p>
            </div>
          </div>

          {/* Organizer Scroll Section */}
          <section className="w-full mt-8 sm:mt-12 scroll-mt-20 relative">
            <div className="panel-on-grid rounded-3xl p-6 md:p-8 shadow-xl border border-red-900/30">
              <h3 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-6 text-center">
                Byte Battle Crew
              </h3>

              {/* Scroll buttons */}
              <button
                onClick={() => scroll(-250)}
                className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-red-700/70 hover:bg-red-700 text-white p-2 rounded-full z-20 shadow-lg"
              >
                ◀
              </button>
              <button
                onClick={() => scroll(250)}
                className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-red-700/70 hover:bg-red-700 text-white p-2 rounded-full z-20 shadow-lg"
              >
                ▶
              </button>

              <div className="overflow-x-auto py-4" ref={scrollRef}>
                <div className="flex gap-4 min-w-max px-4">
                  {organisers.map((org, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[250px] rounded-2xl border border-red-800/30 shadow-lg bg-red-900/20 hover:scale-105 transition-transform duration-300"
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                    >
                      <div className="w-full h-40 sm:h-52 md:h-60 overflow-hidden rounded-t-2xl">
                        <img
                          src={org.image}
                          alt={org.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="text-lg font-semibold text-red-400">{org.name}</h4>
                        <p className="text-sm text-gray-300">{org.role}</p>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate first few items for smooth looping */}
                  {organisers.slice(0, 4).map((org, index) => (
                    <div
                      key={`dup-${index}`}
                      className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[250px] rounded-2xl border border-red-800/30 shadow-lg bg-red-900/20"
                    >
                      <div className="w-full h-40 sm:h-52 md:h-60 overflow-hidden rounded-t-2xl">
                        <img
                          src={org.image}
                          alt={org.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="text-lg font-semibold text-red-400">{org.name}</h4>
                        <p className="text-sm text-gray-300">{org.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="bg-black rounded-2xl p-6 border border-white">
            <h4 className="text-xl font-semibold text-red-500 mb-4">💡 Our Vision</h4>
            <p className="text-base md:text-lg leading-relaxed">
              To create an inclusive coding community where every participant, regardless of their
              experience level, can learn, compete, and grow. We believe that coding competitions
              are not just about winning, but about the journey of continuous learning and improvement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

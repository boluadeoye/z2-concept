import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521102/blog_assets/skw6qc5r8hu7ajzgmuxh.png",
    heading: "Transform Your Brand with Creative Design & Print Solutions",
    subtext: "Exceptional branding, innovative design, and high-quality printing services."
  },
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png",
    heading: "Handcrafted Frames & High-End Gallery Printing",
    subtext: "Elevate your visual memories into physical works of art."
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black pt-20">
      {slides.map((slide, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "opacity-60" : "opacity-0"}`}>
          <img src={slide.image} alt="Hero" className="w-full h-full object-cover object-center" />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-6 tracking-tight uppercase">
          {slides[current].heading}
        </h1>
        <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-10 font-medium">
          {slides[current].subtext}
        </p>

        <div className="flex flex-row items-center justify-center gap-4">
          <Link to="/contact" className="px-10 py-3.5 bg-black text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/20">
            Contact Us
          </Link>
          <Link to="/portfolio" className="px-10 py-3.5 bg-transparent border border-white/40 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
            View Work
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
        <button onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)} className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-black transition-all">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => setCurrent((prev) => (prev + 1) % slides.length)} className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-black transition-all">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === current ? "w-8 bg-accent" : "w-2 bg-white/30"}`} />
        ))}
      </div>
    </section>
  );
}

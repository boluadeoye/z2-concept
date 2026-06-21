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
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-20">
      {slides.map((slide, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? "opacity-60" : "opacity-0"}`}>
          <img src={slide.image} alt="Hero" className="w-full h-full object-cover object-center" />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        {/* 
          DETERMINISTIC SAFE ZONE: 
          - text-3xl on mobile prevents long words from breaking the container.
          - max-w-[240px] ensures 60px of clear air on each side of a 360px screen.
        */}
        <h1 className="text-3xl md:text-6xl font-black leading-[1.15] mb-6 tracking-tight max-w-[240px] sm:max-w-3xl lg:max-w-4xl mx-auto antialiased">
          {slides[current].heading}
        </h1>
        
        {/* DETERMINISTIC SAFE ZONE: max-w-[220px] prevents subtext collision with arrows */}
        <p className="text-white/80 text-sm md:text-base max-w-[220px] sm:max-w-xl mx-auto mb-10 font-medium leading-relaxed">
          {slides[current].subtext}
        </p>

        {/* CTA BUTTONS: Stacked on mobile, pill-shaped, Title Case */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-[260px] sm:max-w-none mx-auto">
          <Link 
            to="/contact" 
            className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-full font-bold text-xs tracking-wider transition-all duration-300 border border-black hover:bg-[#FF6B35] hover:border-[#FF6B35] whitespace-nowrap text-center"
          >
            Contact Us
          </Link>
          <Link 
            to="/portfolio" 
            className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/40 text-white rounded-full font-bold text-xs tracking-wider hover:bg-white hover:text-black transition-all whitespace-nowrap text-center"
          >
            View Our Work
          </Link>
        </div>
      </div>

      {/* 
        NAVIGATION ARROWS: 
        - Downscaled to w-10 on mobile.
        - Pushed to inset-x-2 (8px) to maximize central safe zone.
      */}
      <div className="absolute inset-x-2 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
        <button 
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)} 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all"
        >
          <ChevronLeft size={18} md:size={20} />
        </button>
        <button 
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)} 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all"
        >
          <ChevronRight size={18} md:size={20} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "w-8 bg-[#FF6B35]" : "w-2 bg-white/30"}`} />
        ))}
      </div>
    </section>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";

export default function HeroV2() {
  return (
    <section className="relative w-full h-[85vh] md:h-screen bg-[#0C0608] overflow-hidden block">
      <div className="absolute inset-0 w-full h-full group">
        <img 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg" 
          className="w-full h-full object-cover opacity-50 object-top transition-transform duration-1000 ease-in-out group-hover:scale-125" 
          alt="Z2 Hero" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          <span className="text-[#FF6B35] text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 block">
            Your Feature Is Today
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight uppercase mb-6">
            Book A <br />
            <span className="text-[#FF6B35]">Video / Photo</span> <br />
            Session
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-bold mb-8 max-w-md leading-relaxed">
            Events · Weddings · Birthdays · Funerals · Real Estate · Baby Showers · Graduations
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-[#FF6B35] text-black px-8 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-xl shadow-[#FF6B35]/20">
            <PhoneCall size={16} />
            Book A Session
          </Link>
        </div>
      </div>
    </section>
  );
}

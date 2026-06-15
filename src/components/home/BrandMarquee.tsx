import React from "react";

const brandLogos = [
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750098/blog_assets/dxujejs6yya0ekeqvnam.png",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777372722/blog_assets/q131tbatzcnhwmjvcjcv.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750108/blog_assets/ijq2mxzzivitson9qxtr.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750121/blog_assets/i7iqntcfqbisgxwtiwui.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750131/blog_assets/pumej7z26mxpkaiabcwv.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750146/blog_assets/qu0ucu1ui4ikqoytb4ec.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777468968/blog_assets/ie1s33hzbga7d988hf2y.jpg"
];

export default function BrandMarquee() {
  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Environmental Layer: Dark Brown Scrim */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png" 
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-[#2A1B12]/95 z-10" />

      <div className="relative z-20">
        <p className="text-center text-white/40 text-[10px] uppercase tracking-[0.4em] mb-12 font-bold">
          Some of the brands we have worked with
        </p>
        
        <div className="flex overflow-hidden select-none">
          {/* Double-buffered flex container for seamless loop */}
          <div className="flex flex-nowrap gap-8 md:gap-12 animate-marquee py-4">
            {[...brandLogos, ...brandLogos].map((logo, i) => (
              <div key={i} className="w-32 h-20 md:w-40 md:h-24 bg-white rounded-xl flex items-center justify-center p-4 md:p-6 shrink-0 shadow-2xl">
                <img 
                  src={logo} 
                  alt="Partner Brand" 
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}

import React from "react";

const brandLogos = [
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750098/blog_assets/dxujejs6yya0ekeqvnam.png",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777372722/blog_assets/q131tbatzcnhwmjvcjcv.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750108/blog_assets/ijq2mxzzivitson9qxtr.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750121/blog_assets/i7iqntcfqbisgxwtiwui.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776750131/blog_assets/pumej7z26mxpkaiabcwv.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777468968/blog_assets/ie1s33hzbga7d988hf2y.jpg"
];

export default function BrandMarquee() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-black">
      {/* Environmental Layer: High visibility banquet hall asset */}
      <div className="absolute inset-0 z-0 opacity-80">
        <img
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137243/blog_assets/x77wktu3vnbvlzlar6bm.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      
      {/* Ultra-light Scrim: Only enough to ensure white text pops */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-20">
        <p className="text-center text-white text-[10px] uppercase tracking-[0.4em] mb-16 font-black drop-shadow-md">
          Some of the brands we have worked with
        </p>

        <div className="flex overflow-hidden select-none">
          <div className="flex flex-nowrap gap-8 md:gap-12 animate-marquee py-4">
            {[...brandLogos, ...brandLogos].map((logo, i) => (
              <div key={i} className="w-32 h-20 md:w-44 md:h-28 bg-white rounded-2xl flex items-center justify-center p-6 md:p-8 shrink-0 shadow-2xl border border-white/10">
                <img
                  src={logo}
                  alt=""
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
          animation: marquee 90s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

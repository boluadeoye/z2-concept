import React from "react";

export default function MovingTooltip() {
  const text = "20% OFF YOUR FIRST ORDER • USE CODE: Z2FIRST • ";
  
  return (
    <div className="relative w-full bg-[#FF6B35] py-4 overflow-hidden border-y border-black/5 z-20">
      <div className="flex whitespace-nowrap animate-marquee-fast">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-white font-black text-[14px] md:text-[18px] uppercase tracking-[0.2em] px-4">
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          display: flex;
          animation: marquee-fast 20s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

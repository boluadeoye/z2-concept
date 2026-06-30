import React from "react";

export default function MovingTooltip() {
  const items = ["Weddings", "Birthdays", "Funerals", "Real Estate", "Baby Showers", "Graduations", "Web Design"];
  return (
    <div className="w-full bg-white py-5 overflow-hidden border-y border-white/5 block relative z-20">
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center shrink-0">
            {items.map((text, idx) => (
              <div key={idx} className="flex items-center gap-6 px-6">
                <span className="text-black font-black text-sm md:text-base uppercase tracking-widest">{text}</span>
                <span className="text-[#FF6B35] font-black">♦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
}

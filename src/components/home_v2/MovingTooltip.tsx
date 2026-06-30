import React from "react";

export default function MovingTooltip() {
  const promoItems = [
    "20% Off Your First Order",
    "Use Code: Z2First"
  ];

  return (
    <div className="relative w-full bg-[#0C0608] py-3 overflow-hidden border-y border-white/5 z-20">
      <div className="flex whitespace-nowrap animate-marquee-promo items-center">
        {[...Array(20)].map((_, i) => (
          <React.Fragment key={i}>
            {promoItems.map((text, idx) => (
              <div key={`${i}-${idx}`} className="flex items-center gap-8 px-4">
                <span className="text-white font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em]">
                  {text}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shrink-0" />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes marquee-promo {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-promo {
          display: flex;
          animation: marquee-promo 30s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}

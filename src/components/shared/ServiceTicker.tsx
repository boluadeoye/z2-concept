import React from "react";

const items = [
  "VIDEO PRODUCTION", "WEBSITE DEVELOPMENT", "GRAPHIC DESIGN", 
  "AI CONTENT CREATION", "PHOTOGRAPHY"
];

export const ServiceTicker = () => {
  return (
    <div className="bg-[#1A140F] py-4 border-y border-white/5 overflow-hidden select-none">
      <div className="flex flex-nowrap gap-10 animate-ticker whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.25em]">{item}</span>
            <span className="text-[#FF6B35] text-lg">•</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-ticker {
          display: flex;
          animation: ticker 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

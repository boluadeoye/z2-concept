import React, { useState } from "react";
import { Reveal } from "../shared/Reveal";

export default function ProductTabs({ attributes }: { attributes: any[] }) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="mb-24">
      <Reveal>
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-black/5">
          <div className="flex gap-8 border-b border-black/5 mb-12">
            <button 
              onClick={() => setActiveTab("about")}
              className={`pb-6 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                activeTab === "about" ? "text-black" : "text-black/20"
              }`}
            >
              About the product
              {activeTab === "about" && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF6B35] rounded-t-full" />}
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`pb-6 text-[11px] font-black uppercase tracking-widest transition-all ${
                activeTab === "reviews" ? "text-black" : "text-black/20"
              }`}
            >
              Reviews (0)
            </button>
          </div>

          {activeTab === "about" ? (
            <div className="space-y-6 max-w-2xl">
              {attributes && attributes.length > 0 ? attributes.map((attr, i) => (
                <div key={i} className="grid grid-cols-[180px_1fr] items-center py-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black">{attr.name}</span>
                  <div className="flex items-center gap-8">
                    <div className="w-[1px] h-8 bg-black/5" />
                    <span className="text-black/50 text-sm">{attr.options.join(", ")}</span>
                  </div>
                </div>
              )) : (
                <p className="text-black/40 text-sm italic">No specific attributes listed for this product.</p>
              )}
            </div>
          ) : (
            <div className="py-10 text-center text-black/20 font-bold uppercase tracking-widest">No reviews yet.</div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

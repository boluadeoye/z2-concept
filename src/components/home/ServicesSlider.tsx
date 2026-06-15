import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const cards = [
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521115/blog_assets/ytxsfz4o5w7brat1zx4q.png",
    title: "Photography"
  },
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png",
    title: "Video Production"
  },
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521121/blog_assets/hbgy9tg3xwufbzemj3v0.png",
    title: "Website Development"
  },
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png",
    title: "Graphic Design"
  }
];

export default function ServicesSlider() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#FDF8F0] border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit">
              <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">
                What We Offer
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight max-w-4xl uppercase">
              Kefee Home Productions x Z2 Concepts your media partner
            </h2>
            <p className="text-black/60 text-sm max-w-[65ch] leading-relaxed">
              We offer the printing of graphics, text, logos, and other branding elements onto packaging materials...
            </p>
          </div>
        </Reveal>

        <div className="flex overflow-x-auto no-scrollbar gap-6 pb-12 snap-x snap-mandatory">
          {cards.map((card, i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[320px] flex-1 snap-start group">
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 shadow-lg border border-black/5">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between px-2">
                <h3 className="text-lg md:text-xl font-bold text-black uppercase">{card.title}</h3>
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 group-hover:bg-[#FF6B35] text-[#FF6B35] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowDownRight size={18} strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-transparent border border-black/20 text-black rounded-full px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
            VIEW ALL OUR SERVICES <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35]" />
          </button>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const galleryImages = Array(9).fill("https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png");

export default function ProjectGallery() {
  return (
    <div className="mb-16">
      {/* SHARP EDGES: Removed rounded classes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        {galleryImages.map((img, i) => (
          <Reveal key={i}>
            <div className="relative aspect-square overflow-hidden shadow-md border border-black/5 group">
              <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery" />
            </div>
          </Reveal>
        ))}
      </div>

      {/* Compact Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button className="w-8 h-8 rounded bg-[#FF6B35] text-white shadow-lg text-[10px] font-bold">1</button>
        <button className="w-8 h-8 rounded bg-white border border-black/5 text-black/40 text-[10px] font-bold hover:bg-black/5">2</button>
        <button className="w-8 h-8 rounded bg-white border border-black/5 flex items-center justify-center text-black/40 hover:bg-black/5">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

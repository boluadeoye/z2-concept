import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

interface ProjectGalleryProps {
  images?: string[];
}

export default function ProjectGallery({ images = [] }: ProjectGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (!images || images.length === 0) return null;

  const totalPages = Math.ceil(images.length / itemsPerPage);
  const paginatedImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        {paginatedImages.map((img, i) => (
          <Reveal key={i}>
            <div className="relative aspect-square overflow-hidden shadow-md border border-black/5 group">
              <img 
                src={img} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Gallery Item" 
              />
            </div>
          </Reveal>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded text-[10px] font-bold transition-all ${
                  isActive
                    ? "bg-[#FF6B35] text-white shadow-lg"
                    : "bg-white border border-black/5 text-black/40 hover:bg-black/5"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button 
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="w-8 h-8 rounded bg-white border border-black/5 flex items-center justify-center text-black/40 hover:bg-black/5"
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

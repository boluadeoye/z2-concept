import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const playlist = [
  { id: "3EXu0FVcLPM", title: "Elite Media Production" },
  { id: "4cNTkwjSvoM", title: "Creative Brand Storytelling" },
  { id: "_fFk9T0H6WI", title: "Cinematic Event Coverage" },
  { id: "25Q1KkVYQVY", title: "Digital Design Showcase" },
  { id: "Fo8nsNbFJGw", title: "Signature Visuals" },
  { id: "ahdMqswCdtE", title: "Ugo Jayden's 1st Birthday" }
];

export default function VideoPlaylist() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section id="videos" className="py-24 bg-[#0C0608] px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="text-left">
            <span className="text-[#FF6B35] text-[10px] font-black uppercase tracking-widest block mb-2">Watch Us Work</span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Videos</h2>
          </div>
          
          {/* CUSTOM NAVIGATION */}
          <div className="flex gap-3">
            <button className="video-prev w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all">
              <ChevronLeft size={20} />
            </button>
            <button className="video-next w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: ".video-prev", nextEl: ".video-next" }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 }
          }}
          className="w-full overflow-visible"
        >
          {playlist.map((v) => (
            <SwiperSlide key={v.id}>
              <div className="relative aspect-video bg-black border border-white/5 group overflow-hidden">
                {playing === v.id ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1`} 
                    className="w-full h-full" 
                    allowFullScreen 
                  />
                ) : (
                  <div className="absolute inset-0 cursor-pointer" onClick={() => setPlaying(v.id)}>
                    <img 
                      src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} 
                      className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
                      alt={v.title} 
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#FF6B35] flex items-center justify-center text-black shadow-2xl transition-all group-hover:scale-110">
                        <Play size={24} fill="black" />
                      </div>
                      <h3 className="mt-6 text-white text-sm font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        {v.title}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

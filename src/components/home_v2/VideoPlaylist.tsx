import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Reveal } from "../shared/Reveal";

// Synchronized precisely with the provided YouTube assets
const playlist = [
  { id: "PScQQr7Iv_I", title: "Signature Wedding Production", thumb: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137278/blog_assets/uftpsbjdtjezhshfwu9y.jpg" },
  { id: "jOsbkl3Omak", title: "Elite Creative Direction", thumb: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138508/blog_assets/xgx29asy5mvyi9tnpner.jpg" }
];

export default function VideoPlaylist() {
  const [current, setCurrent] = useState(0);
  const [play, setPlay] = useState(false);

  const handleNext = () => { setPlay(false); setCurrent((prev) => (prev + 1) % playlist.length); };
  const handlePrev = () => { setPlay(false); setCurrent((prev) => (prev - 1 + playlist.length) % playlist.length); };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div className="text-left">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Media</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">YouTube Playlist</h2>
          </div>
          <div className="flex gap-3">
            <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Video Player Frame */}
        <Reveal>
          <div className="relative aspect-video w-full rounded-[40px] overflow-hidden bg-black shadow-2xl border border-black/5">
            {play ? (
              <iframe 
                src={`https://www.youtube.com/embed/${playlist[current].id}?autoplay=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 w-full h-full">
                <img src={playlist[current].thumb} className="w-full h-full object-cover opacity-70" alt="" />
                <div className="absolute inset-0 bg-black/20" />
                <button 
                  onClick={() => setPlay(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#FF6B35] flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all"
                >
                  <Play size={32} className="ml-1" />
                </button>
              </div>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

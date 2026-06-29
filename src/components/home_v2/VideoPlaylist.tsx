import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const playlist = [
  { id: "3EXu0FVcLPM", title: "Elite Media Production", desc: "Visual excellence captured through professional direction." },
  { id: "4cNTkwjSvoM", title: "Creative Brand Storytelling", desc: "Transforming narratives into high-impact digital experiences." },
  { id: "_fFk9T0H6WI", title: "Cinematic Event Coverage", desc: "Preserving milestones with innovative video solutions." },
  { id: "25Q1KkVYQVY", title: "Digital Design Showcase", desc: "Where creativity meets high-end technology." },
  { id: "Fo8nsNbFJGw", title: "Signature Visuals", desc: "Captivating content tailored for modern brands." },
  { 
    id: "ahdMqswCdtE", 
    title: "Ugo Jayden's 1st Birthday", 
    desc: "A joyful milestone filled with love, laughter, and gratitude as we mark the first beautiful year of his life. 🎉👑🎂" 
  }
];

export default function VideoPlaylist() {
  const [current, setCurrent] = useState(0);
  const [play, setPlay] = useState(false);

  const handleNext = () => { setPlay(false); setCurrent((prev) => (prev + 1) % playlist.length); };
  const handlePrev = () => { setPlay(false); setCurrent((prev) => (prev - 1 + playlist.length) % playlist.length); };

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-5xl mx-auto">
        
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
              <div className="absolute inset-0 w-full h-full group cursor-pointer" onClick={() => setPlay(true)}>
                <img 
                  src={`https://img.youtube.com/vi/${playlist[current].id}/maxresdefault.jpg`} 
                  className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" 
                  alt="" 
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
                  <div className="w-20 h-20 rounded-full bg-[#FF6B35] flex items-center justify-center text-white shadow-2xl mb-8 group-hover:scale-110 transition-all">
                    <Play size={32} className="ml-1" />
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight mb-4">{playlist[current].title}</h3>
                  <p className="text-white/70 text-sm md:text-base max-w-[40ch] font-medium">{playlist[current].desc}</p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

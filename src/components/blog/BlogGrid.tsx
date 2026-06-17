import React, { useState, useEffect } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWPPosts } from "../../lib/woocommerce";

// Utility to decode WordPress HTML entities
const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export default function BlogGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await getWPPosts();
      setPosts(data);
    }
    loadPosts();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* ASYMMETRIC HEADER: Corrected Casing */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 items-end mb-24">
          <Reveal>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Our Journal</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
              Insights, Stories & <br /> Creative Direction
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-black/60 text-sm md:text-base leading-relaxed lg:text-right lg:ml-auto max-w-[35ch]">
              Exploring the intersection of cinematic photography, digital systems, and premium print media.
            </p>
          </Reveal>
        </div>

        {/* 2-COLUMN EDITORIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {posts.length > 0 ? posts.map((post: any, i: number) => (
            <Reveal key={post.id} className={i % 2 !== 0 ? "md:mt-32" : ""}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[16/11] rounded-[48px] overflow-hidden mb-8 shadow-2xl border border-black/5">
                  <img 
                    src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521121/blog_assets/hbgy9tg3xwufbzemj3v0.png"} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt=""
                  />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-4 py-1.5 rounded-full bg-white border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                    Branding
                  </div>
                  <div className="flex items-center gap-1 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                    <Clock size={12} /> 5 Min Read
                  </div>
                </div>

                {/* Decoded Title: No more &#8217; */}
                <h3 className="text-3xl md:text-5xl font-black text-black leading-tight mb-8 group-hover:text-[#FF6B35] transition-colors">
                  {decodeHtml(post.title?.rendered || "The Future of Print")}
                </h3>

                <div className="flex items-center justify-between border-t border-black/5 pt-8">
                  <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-white border border-black/10 flex items-center justify-center group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] group-hover:text-white transition-all shadow-sm">
                    <ArrowUpRight size={24} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </Reveal>
          )) : (
            <div className="col-span-full text-center py-40 text-black/10 font-black uppercase tracking-[0.5em] text-2xl animate-pulse">
              Loading Journal...
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

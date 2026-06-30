import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const gallery = [
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138508/blog_assets/xgx29asy5mvyi9tnpner.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137278/blog_assets/uftpsbjdtjezhshfwu9y.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138122/blog_assets/imueq9xlwj0n9oxlz6ay.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138681/blog_assets/lms2u2ymh5c0o3qc6efb.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg"
];

export default function GalleryV2() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-20">
          <Reveal>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-[#FDF8F0] mb-6 w-fit mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Gallery</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">Image Gallery</h2>
          </Reveal>
        </div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((img, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="relative aspect-[3/4] rounded-none overflow-hidden border border-black/5 shadow-md bg-[#FDF8F0]">
                <img 
                  src={img} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  alt="Gallery Preview" 
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* BOSS-MANDATED CTA: VIEW MORE */}
        <div className="mt-16 flex justify-center">
          <Reveal delay={0.4}>
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-3 px-10 py-3.5 bg-[#0C0608] text-white rounded-full shadow-xl hover:bg-[#FF6B35] transition-all group"
            >
              <span className="text-[12px] font-black tracking-widest uppercase">View More</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={3} />
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

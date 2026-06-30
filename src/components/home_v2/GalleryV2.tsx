import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../shared/Reveal";

const gallery = [
  { name: "Weddings", count: "16 Photos", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg" },
  { name: "Birthdays", count: "17 Photos", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137278/blog_assets/uftpsbjdtjezhshfwu9y.jpg" },
  { name: "Modeling", count: "Coming Soon", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138508/blog_assets/xgx29asy5mvyi9tnpner.jpg" }
];

export default function GalleryV2() {
  return (
    <section id="gallery" className="py-24 bg-[#0C0608] px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center mb-16">
          <div className="w-full h-[1px] bg-white/10 mb-10" />
          <span className="text-[#FF6B35] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Our Work</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-10">Gallery</h2>
          <div className="w-full h-[1px] bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gallery.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Link to="/gallery" className="group relative block aspect-[3/4] overflow-hidden border border-white/5">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-150" 
                  alt={item.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                  <h3 className="text-white text-2xl font-black uppercase tracking-widest mb-1">{item.name}</h3>
                  <span className="text-[#FF6B35] text-[10px] font-black uppercase tracking-widest">{item.count}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

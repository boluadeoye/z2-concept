import React, { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function ProductMain({ product }: { product: any }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20 items-start">
      {/* LEFT: Image Card */}
      <Reveal>
        <div className="relative bg-white rounded-[32px] p-4 shadow-xl border border-black/5 group">
          <div className="relative aspect-square overflow-hidden rounded-[24px]">
            <img 
              src={product.images?.[0]?.src || "https://res.cloudinary.com/dwbjb3svx/image/upload<img 
            src={product.images?.[0]?.src || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png"} 
            className="w-full h-full object-cover"
            alt={product.name}
          />
          <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black/20 hover:text-[#FF6B35] transition-colors shadow-lg">
            <Heart size={20} />
          </button>
        </div>
      </Reveal>

      {/* RIGHT: Data Pillar */}
      <div className="flex flex-col items-start pt-4">
        <Reveal>
          <h1 className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight tracking-tight">
            {product.name || "10 x 18 Inches/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png"} 
              className="w-full h-full object-cover"
              alt={product.name}
            />
          </div>
          <button className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black/20 hover:text-[#FF6B35] transition-colors shadow-lg">
            <Heart size={20} /> Graduation Shoot Photo Frame Antique"}
          </h1>
          <p className="text-[#FF6B35] text-[11px] font-bold uppercase tracking-widest mb-8">
            Categories: <span className="text-black/40 ml-1">Frame</span>
          </p>
          
          <div className="text-black/60 text-sm leading-relaxed mb-10 max-w-[50ch]">
            <p>Sourced from a single donor to ensure cuticle alignment, our Signature Raw Cambodian Straight bundles represent the pinnacle of luxury hair. Each strand is double-drawn for consistent density from root to tip, offering a naturally high-shine finish that responds effortlessly to heat styling.</p>
          </div>


          </button>
        </div>
      </Reveal>

      {/* RIGHT: Product Data */}
      <div className="flex flex-col items-start pt-4">
        <Reveal>
          <h1 className="text-3xl md          <div className="text-4xl font-black text-[#FF6B35] mb-10">
            ₦{product.price || "15,900"}
          </div>

          <div className="flex items-center gap-6">
            :text-4xl font-black text-black mb-4 leading-tight tracking-tight">
            {product.name || "10 x 18 Inches Graduation Shoot Photo Frame Antique"}
          </h1>
          <p className="text-[#FF6B35] font-bold text-[11px] uppercase tracking-widest mb-8">
            Categories: <{/* Quantity Selector */}
            <div className="flex items-center border border-black/10 rounded-full px-4 py-2 bg-white/50">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-black/40 hover:text-black"><Minus size={16}span className="text-black/40">Frame</span>
          </p>
          
          <p className="text-black/60 text-sm md:text-base leading-relaxed mb-10 max-w-[50ch]">
            Sourced from a single donor to ensure cuticle alignment, our Signature Raw Cambodian Straight bundles represent the pinnacle of luxury hair. Each strand is double-drawn for consistent density from root to tip.
          </p>

          <div className="text- /></button>
              <span className="w-8 text-center font-bold text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2 text-black/40 hover:text-black"><Plus size={16} /></button>
            </div>
            
            {/* Add to Cart */}
            <button className="bg-white border border-black/10 text-black rounded-full px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-md">
              Add to cart
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

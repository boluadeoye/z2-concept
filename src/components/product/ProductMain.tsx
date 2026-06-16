import React, { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function ProductMain({ product }: { product: any }) {
  const [qty, setQty] = useState(1);
  const imageUrl = product.images?.[0]?.src || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch mb-20">
      <Reveal className="h-full">
        <div className="relative h-full min-h-[400px] bg-white rounded-[32px] overflow-hidden shadow-xl border border-black/5">
          <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
          <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-black/20 hover:text-[#FF6B35] transition-colors shadow-lg">
            <Heart size={20} />
          </button>
        </div>
      </Reveal>

      <div className="flex flex-col items-start py-4">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-black text-black leading-tight mb-4 tracking-tight">{product.name}</h1>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Categories:</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6B35]">{product.categories?.[0]?.name || "Frame"}</span>
          </div>
          <div className="text-black/60 text-sm md:text-base leading-relaxed mb-10 max-w-[60ch]" dangerouslySetInnerHTML={{ __html: product.short_description || product.description }} />
          <div className="text-4xl font-black text-[#FF6B35] mb-10">₦{Number(product.price || 0).toLocaleString()}</div>
          <div className="flex flex-wrap items-center gap-6 mt-auto">
            <div className="flex items-center bg-white border border-black/10 rounded-full px-4 py-2 shadow-sm">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-black/40"><Minus size={16} /></button>
              <span className="w-12 text-center font-bold text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2 text-black/40"><Plus size={16} /></button>
            </div>
            <button className="bg-white border border-black/10 text-black rounded-full px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-md">Add to cart</button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

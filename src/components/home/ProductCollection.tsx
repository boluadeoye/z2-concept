import React, { useState, useEffect } from "react";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWooProducts } from "../../lib/woocommerce";

const mockProducts = Array(8).fill(null).map((_, i) => ({
  id: `frame-${i}`,
  name: "Food Wrapper",
  price: "50.00",
  images: [{ src: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png" }]
}));

export default function ProductCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Targeting the specific Z2 Frame category
        const data = await getWooProducts("frame-products");
        if (data && data.length > 0) {
          setProducts(data.slice(0, 8));
        } else {
          setProducts(mockProducts);
        }
      } catch (e) {
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-20">
          <Reveal>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Our Collections</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase mb-4 tracking-tight">Explore Our Frame Products</h2>
            <p className="text-black/60 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
              We offer the printing of graphics, text, logos, and other branding elements onto packaging materials...
            </p>
          </Reveal>
        </div>

        {/* 4x2 GRID: Forced 4-columns on MD+ viewports */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 mb-20">
          {products.map((p, i) => (
            <Reveal key={p.id}>
              <div className="group cursor-pointer">
                {/* Square Image Container */}
                <div className="relative aspect-square rounded-[24px] overflow-hidden mb-6 border border-black/5 shadow-sm bg-white">
                  <img 
                    src={p.images?.[0]?.src} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                
                {/* Card Footer: Title/Price Left, Cart Right */}
                <div className="flex items-end justify-between px-1">
                  <div className="max-w-[70%]">
                    <h3 className="text-[13px] font-bold text-black uppercase tracking-tight mb-1 truncate">
                      {p.name}
                    </h3>
                    <p className="text-black/40 text-[11px] font-bold">
                      ${p.price}
                    </p>
                  </div>
                  
                  {/* Cart Button: Index 2 (3rd item) is forced to Deep Orange */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    i === 2 
                    ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg scale-110" 
                    : "bg-white border-black/10 text-black hover:border-[#FF6B35] hover:text-[#FF6B35]"
                  }`}>
                    <ShoppingBag size={16} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 bg-white border border-black/10 text-black rounded-full px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all group shadow-md">
            VIEW ALL PRODUCTS 
            <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white transition-colors" />
          </button>
        </div>

      </div>
    </section>
  );
}

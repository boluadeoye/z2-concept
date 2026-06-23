import React, { useState } from "react";
import { Heart, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

// Custom Trapezoidal Basket Icon for Brand Consistency
const BasketIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 10h16" /><path d="M5 10l1.5 8.5A2 2 0 0 0 8.5 20h7a2 2 0 0 0 2-1.5L19 10" /><path d="M9 10l3-6 3 6" /><line x1="10" y1="14" x2="10" y2="16" /><line x1="14" y1="14" x2="14" y2="16" />
  </svg>
);

export default function ProductMain({ product }: { product: any }) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(product.id);
  const images = product.images?.length > 0 ? product.images : [{ src: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png" }];
  
  const regularPrice = parseFloat(product.regular_price || "0");
  const salePrice = parseFloat(product.price || "0");
  const hasDiscount = regularPrice > salePrice;
  const savings = hasDiscount ? regularPrice - salePrice : 0;

  const nextImg = () => setActiveImg((prev) => (prev + 1) % images.length);
  const prevImg = () => setActiveImg((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start mb-24">
      
      {/* LEFT: EDITORIAL GALLERY */}
      <div className="space-y-6">
        <Reveal>
          <div className="relative aspect-square bg-white border border-black/5 shadow-sm overflow-hidden group">
            <img 
              src={images[activeImg].src} 
              className="w-full h-full object-cover transition-transform duration-700" 
              alt={product.name} 
            />
            
            {images.length > 1 && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevImg} className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-black hover:bg-[#FF6B35] hover:text-white transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImg} className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-black hover:bg-[#FF6B35] hover:text-white transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            <button 
              onClick={() => toggleWishlist(product)}
              className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center transition-all ${
                isFav ? "text-[#FF6B35]" : "text-black/20 hover:text-[#FF6B35]"
              }`}
            >
              <Heart size={22} className={isFav ? "fill-[#FF6B35]" : ""} />
            </button>
          </div>
        </Reveal>

        {images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {images.map((img: any, idx: number) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`relative w-20 h-20 border-2 transition-all shrink-0 ${
                  activeImg === idx ? "border-[#FF6B35]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img.src} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: INFORMATION PILLAR */}
      <div className="flex flex-col">
        <Reveal>
          <div className="space-y-1 mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-black leading-tight tracking-tight mb-4">
              {product.name}
            </h1>
            <div className="flex flex-wrap gap-y-2 gap-x-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Product Code:</span>
                <span className="text-[10px] font-bold text-black">{product.sku || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Brand:</span>
                <span className="text-[10px] font-bold text-[#8B7E3D]">Z2 Concepts</span>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-black/5 w-full mb-8" />

          <div className="mb-10">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-4xl font-black text-black">
                ₦{salePrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-lg font-bold text-black/20 line-through">
                  ₦{regularPrice.toLocaleString()}
                </span>
              )}
            </div>
            {hasDiscount && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B35]/5 rounded-full border border-[#FF6B35]/10">
                <span className="text-[10px] font-black text-[#FF6B35] uppercase tracking-widest">
                  You Save ₦{savings.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div 
            className="text-black/60 text-sm leading-relaxed mb-12 max-w-[50ch]" 
            dangerouslySetInnerHTML={{ __html: product.short_description || product.description }} 
          />

          <div className="space-y-6 mt-auto">
            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center bg-white border border-black/10 rounded-full px-4 py-2 shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 text-black/40 hover:text-black transition-colors">
                  <Minus size={16} strokeWidth={3} />
                </button>
                <span className="w-12 text-center font-black text-sm text-black">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 text-black/40 hover:text-black transition-colors">
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>

              {/* SLEEK & SLIM ADD TO CART BUTTON */}
              <button 
                onClick={() => addToCart(product, qty)}
                className="flex-1 md:flex-none bg-[#FF6B35] text-white rounded-full px-8 py-3 md:px-12 md:py-4 text-[10px] md:text-[11px] font-bold md:font-black uppercase tracking-[0.15em] hover:bg-black transition-all shadow-xl shadow-[#FF6B35]/20 flex items-center justify-center gap-3 whitespace-nowrap"
              >
                <BasketIcon className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-[#0C0608] border-b border-white/5 h-20">
      <div className="h-full w-full px-6 md:px-12 flex items-center justify-between">
        
        <Link to="/" className="flex items-baseline gap-1.5 shrink-0">
          <span className="text-2xl md:text-3xl font-black text-[#FF6B35] tracking-tighter">Z2</span>
          <span className="text-sm md:text-lg font-black text-white uppercase">Concept</span>
        </Link>

        <div className="hidden md:flex items-center gap-x-8">
          {["Home", "Videos", "Gallery", "Services", "About"].map((name) => (
            <Link key={name} to={name === "Home" ? "/" : `/${name.toLowerCase()}`} className="text-[11px] font-black text-white/70 hover:text-[#FF6B35] uppercase tracking-widest transition-colors">
              {name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-[10px] font-black rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </Link>

          {/* PARALLELOGRAM SLANTED CTA */}
          <Link to="/contact" className="hidden md:block relative group">
            <div className="bg-[#FF6B35] px-8 py-2.5 transform -skew-x-[20deg] transition-all group-hover:bg-white group-hover:-skew-x-[25deg]">
              <span className="block transform skew-x-[20deg] group-hover:skew-x-[25deg] text-black text-[10px] font-black uppercase tracking-widest transition-all">
                Book Now
              </span>
            </div>
          </Link>
          
          <button onClick={() => setIsOpen(true)} className="md:hidden text-white p-2">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-[#0C0608] z-[1000] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-[#FF6B35]">Z2 <span className="text-white">Concept</span></span>
            <button onClick={() => setIsOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {["Home", "Videos", "Gallery", "Services", "About"].map((name) => (
              <Link key={name} to="/" onClick={() => setIsOpen(false)} className="text-4xl font-black text-white uppercase tracking-tighter">{name}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

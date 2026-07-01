import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, ArrowUpRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const { user } = useAuth();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Store", href: "/store" },
    { name: "Blog", href: "/blog" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-[#0C0608] border-b border-white/5 h-20">
      <div className="h-full w-full px-4 md:px-12 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-baseline gap-1.5 shrink-0">
          <span className="text-2xl md:text-3xl font-black text-[#FF6B35] tracking-tighter">Z2</span>
          <span className="text-sm md:text-lg font-black text-white uppercase">Concept</span>
        </Link>

        {/* DESKTOP NAV - FORCED AT MD (768px) */}
        <div className="hidden md:flex items-center gap-x-6 lg:gap-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-[10px] lg:text-[11px] font-black uppercase tracking-widest transition-all ${
                location.pathname === link.href ? "text-[#FF6B35]" : "text-white/60 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            to={user ? "/dashboard" : "/login"} 
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF6B35] transition-all"
          >
            <User size={18} strokeWidth={2.5} />
          </Link>

          <Link to="/cart" className="relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <ShoppingBag size={18} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0C0608]">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/contact" className="hidden md:block relative group">
            <div className="bg-[#FF6B35] px-6 lg:px-8 py-2.5 transform -skew-x-[20deg] transition-all group-hover:bg-white">
              <span className="block transform skew-x-[20deg] text-black text-[10px] font-black uppercase tracking-widest">
                Book Now
              </span>
            </div>
          </Link>
          
          {/* HAMBURGER - STRICTLY HIDDEN AT MD */}
          <button onClick={() => setIsOpen(true)} className="md:hidden text-white p-2">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0C0608] z-[1000] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-[#FF6B35]">Z2 <span className="text-white">Concept</span></span>
            <button onClick={() => setIsOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="text-3xl font-black text-white uppercase tracking-tighter">{link.name}</Link>
            ))}
          </div>
          
          {/* MOBILE CONTACT CTA */}
          <div className="mt-auto">
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#FF6B35] text-black py-5 rounded-none font-black uppercase tracking-widest text-center flex items-center justify-center gap-2"
            >
              Contact Us <ArrowUpRight size={20} strokeWidth={3} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

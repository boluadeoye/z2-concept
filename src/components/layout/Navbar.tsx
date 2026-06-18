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
    { name: "Portfolio", href: "/portfolio" },
    { name: "Store", href: "/store" },
    { name: "Blog", href: "/blog" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black text-white border-b border-white/10 h-20">
      <div className="h-full max-w-[1440px] mx-auto px-6">
        
        {/* ==========================================
            DESKTOP GRID (Visible >= 768px)
            ========================================== */}
        <div className="hidden md:grid h-full grid-cols-[1fr_auto_1fr] items-center">
          
          {/* ZONE 1: LOGO (Left Aligned) */}
          <div className="flex justify-start flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-2xl lg:text-3xl font-black text-[#8B7E3D] tracking-tighter">Z2</span>
              <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.4em] text-white font-bold pt-1 whitespace-nowrap">
                CONCEPT X KEFEE HP
              </span>
            </Link>
          </div>

          {/* ZONE 2: LINKS (Mathematically Centered) */}
          <div className="flex justify-center items-center gap-x-4 lg:gap-x-8 px-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`relative text-[11px] lg:text-[12px] font-bold transition-all flex items-center gap-1 group whitespace-nowrap ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className="text-[9px] opacity-30 group-hover:text-[#FF6B35] group-hover:opacity-100">↘</span>
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-[1.5px] bg-white" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ZONE 3: ACTIONS (Right Aligned) */}
          <div className="flex justify-end items-center gap-4 lg:gap-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link to="/cart" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#FF6B35] hover:text-white transition-all relative">
                <ShoppingBag size={18} strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-black">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {/* Account */}
              <Link 
                to={user ? "/dashboard" : "/login"}
                className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white hover:bg-[#E76F51] transition-all"
              >
                <User size={18} strokeWidth={2.5} />
              </Link>
            </div>

            {/* RESTORED: CONTACT US PILL */}
            <Link 
              to="/contact" 
              className="bg-black text-white border border-white/20 rounded-full px-6 lg:px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] hover:border-[#FF6B35] transition-all flex items-center gap-2 whitespace-nowrap"
            >
              Contact Us <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35]" />
            </Link>
          </div>
        </div>

        {/* ==========================================
            MOBILE CONTAINER (Visible < 768px)
            ========================================== */}
        <div className="flex md:hidden h-full items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-[#8B7E3D] tracking-tighter">Z2</span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-white font-bold pt-1">
              CONCEPT X KEFEE HP
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/cart" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black relative">
              <ShoppingBag size={14} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B35] text-white text-[8px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to={user ? "/dashboard" : "/login"} className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white">
              <User size={14} />
            </Link>
            <button className="text-white p-1 ml-1" onClick={() => setIsOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-black z-[110] p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-top-5">
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <span className="text-2xl font-black text-[#8B7E3D]">Z2</span>
            <button onClick={() => setIsOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="text-3xl font-black text-white uppercase tracking-tighter hover:text-[#FF6B35] transition-colors">{link.name}</Link>
            ))}
          </div>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-auto bg-[#FF6B35] text-white text-center py-5 rounded-xl font-black uppercase tracking-widest">Contact Us ↗</Link>
        </div>
      )}
    </nav>
  );
}

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
    { name: "Gallery", href: "/portfolio" },
    { name: "Store", href: "/store" },
    { name: "Blog", href: "/blog" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-[#0C0608] border-b border-white/5 h-20">
      <div className="h-full max-w-[1440px] mx-auto px-6">
        
        {/* DESKTOP GRID */}
        <div className="hidden md:grid h-full grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex justify-start flex-shrink-0">
            <Link to="/" className="flex items-baseline gap-2 group">
              <span className="inline-block text-3xl font-black text-[#FDF8F0] tracking-tighter scale-y-[1.3] origin-bottom antialiased">
                Z2
              </span>
              <span className="text-[9px] uppercase tracking-[-0.05em] font-black text-white/40 leading-none">
                Concept x Kefee HP
              </span>
            </Link>
          </div>

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
                    <span className="absolute -bottom-2 left-0 w-full h-[1.5px] bg-[#FF6B35]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex justify-end items-center gap-4 lg:gap-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Link to="/cart" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#FF6B35] hover:text-white transition-all relative">
                <ShoppingBag size={18} strokeWidth={2.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0C0608]">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to={user ? "/dashboard" : "/login"} className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <User size={18} strokeWidth={2.5} />
              </Link>
            </div>
            <Link to="/contact" className="bg-white text-black rounded-full px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] hover:bg-[#FF6B35] hover:text-white transition-all flex items-center gap-2 whitespace-nowrap">
              Contact Us <ArrowUpRight size={14} strokeWidth={3} />
            </Link>
          </div>
        </div>

        {/* MOBILE CONTAINER: Restored Account Icon */}
        <div className="flex md:hidden h-full items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="inline-block text-2xl font-black text-[#FDF8F0] tracking-tighter scale-y-[1.3] origin-bottom">Z2</span>
            <span className="text-[8px] uppercase tracking-tighter font-black text-white/40">Concept x Kefee HP</span>
          </Link>
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black relative">
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#FF6B35] text-white text-[8px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* RESTORED: Account Icon */}
            <Link to={user ? "/dashboard" : "/login"} className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center text-white">
              <User size={16} />
            </Link>
            {/* Menu Toggle */}
            <button onClick={() => setIsOpen(true)} className="text-white p-1">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#0C0608] z-[1000] p-8 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center border-b border-white/5 pb-6 mb-12">
            <span className="text-3xl font-black text-[#FDF8F0] scale-y-[1.3] origin-bottom inline-block">Z2</span>
            <button onClick={() => setIsOpen(false)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
              <X size={32} />
            </button>
          </div>
          
          <div className="flex flex-col gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setIsOpen(false)} 
                className="text-5xl font-black text-white uppercase tracking-tighter hover:text-[#FF6B35] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-12">
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)} 
              className="w-full bg-[#FF6B35] text-white text-center py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-2xl"
            >
              Contact Us <ArrowUpRight size={20} strokeWidth={3} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

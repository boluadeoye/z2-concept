import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
      <div className="h-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* LEFT: Logo Lockup (Restored Partner Text for Mobile) */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <span className="text-2xl md:text-3xl font-black text-primary tracking-tighter">Z2</span>
            <span className="text-[7px] xs:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.45em] text-white font-bold pt-1 whitespace-nowrap">
              CONCEPT X KEFEE HP
            </span>
          </Link>
        </div>

        {/* CENTER: Nav Links (Desktop Only) */}
        <div className="hidden lg:flex items-center justify-center flex-1 px-12 gap-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-1 group whitespace-nowrap ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {link.name}
                <span className="text-[9px] opacity-40 group-hover:text-accent group-hover:opacity-100 transition-opacity">↘</span>
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[1.5px] bg-white" />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT: Actions & CTA */}
        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Cart */}
            <Link to="/store" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-primary hover:text-white transition-all">
              <ShoppingBag size={14} md:size={18} strokeWidth={2.5} />
            </Link>
            {/* Search */}
            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent-dark transition-all">
              <Search size={14} md:size={18} strokeWidth={2.5} />
            </button>
          </div>
          
          {/* CONTACT US Pill */}
          <Link 
            to="/contact" 
            className="hidden lg:flex bg-black text-white border border-white/20 rounded-full px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] hover:border-accent transition-all items-center gap-2 whitespace-nowrap"
          >
            CONTACT US <ArrowUpRight size={14} strokeWidth={3} className="text-accent" />
          </Link>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white p-1" onClick={() => setIsOpen(true)}>
            <Menu size={24} md:size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-black z-[110] p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-top-5">
          <div className="flex justify-between items-center border-b border-white/5 pb-6">
            <span className="text-2xl font-black text-primary tracking-tighter">Z2</span>
            <button onClick={() => setIsOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black text-white uppercase tracking-tighter hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Link 
            to="/contact" 
            onClick={() => setIsOpen(false)}
            className="mt-auto bg-accent text-white text-center py-5 rounded-xl font-black uppercase tracking-widest"
          >
            Contact Us ↗
          </Link>
        </div>
      )}
    </nav>
  );
}

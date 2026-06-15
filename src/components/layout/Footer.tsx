import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-black/90 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 pt-24 pb-12">
        {/* DESKTOP SPREAD */}
        <div className="hidden md:flex justify-between items-start mb-24">
          <div className="w-[30%]">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-black text-[#8B7E3D] tracking-tighter">Z2</span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold pt-1">Concept x Kefee HP</span>
            </div>
            <p className="text-white/60 text-[13px] leading-[1.8] max-w-[30ch]">Your trusted partner for designing, branding, and printing solutions.</p>
          </div>

          <div className="w-[65%] flex justify-between items-start">
            <div>
              <h4 className="text-[#F4A261] font-bold text-[12px] uppercase tracking-[0.25em] mb-10">Quick Links</h4>
              <ul className="space-y-5 text-[13px] text-white/50 font-medium">
                <li>Home</li><li>Services</li><li>Our Works</li><li>About</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F4A261] font-bold text-[12px] uppercase tracking-[0.25em] mb-10">More Links</h4>
              <ul className="space-y-5 text-[13px] text-white/50 font-medium">
                <li>FAQs</li><li>Terms</li><li>Privacy</li><li>About</li>
              </ul>
            </div>
            <div className="min-w-[240px]">
              <h4 className="text-[#F4A261] font-bold text-[12px] uppercase tracking-[0.25em] mb-10">Contact Us</h4>
              <ul className="space-y-6 text-[13px] text-white/70 font-medium">
                <li className="flex items-center gap-4"><Mail size={16} className="text-[#8B7E3D]" /> Phelzink@gmail.com</li>
                <li className="flex items-center gap-4"><Phone size={16} className="text-[#8B7E3D]" /> +234 812 582 1771</li>
                <li className="flex items-start gap-4"><MapPin size={16} className="text-[#8B7E3D] mt-1" /> 24, Oguntolu street, Shomolu, Lagos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* MOBILE STACK */}
        <div className="md:hidden flex flex-col gap-16 mb-20">
          <div className="flex items-center gap-3"><span className="text-3xl font-black text-[#8B7E3D]">Z2</span><span className="text-[9px] uppercase tracking-[0.3em] font-bold">Concept x Kefee HP</span></div>
          <div className="grid grid-cols-2 gap-10">
            <div><h4 className="text-[#F4A261] font-bold text-[11px] uppercase mb-6">Quick Links</h4><ul className="space-y-4 text-[12px] text-white/50"><li>Home</li><li>Services</li><li>Our Works</li></ul></div>
            <div><h4 className="text-[#F4A261] font-bold text-[11px] uppercase mb-6">More Links</h4><ul className="space-y-4 text-[12px] text-white/50"><li>FAQs</li><li>Terms</li><li>Privacy</li></ul></div>
          </div>
          <div><h4 className="text-[#F4A261] font-bold text-[11px] uppercase mb-6">Contact Us</h4><ul className="space-y-5 text-[13px] text-white/70"><li className="flex items-center gap-4"><Mail size={16} className="text-[#8B7E3D]" /> Phelzink@gmail.com</li><li className="flex items-center gap-4"><Phone size={16} className="text-[#8B7E3D]" /> +234 812 582 1771</li></ul></div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-white/30 text-[9px] uppercase tracking-[0.35em] font-bold">
          © 2026 Z2Concepts x Kefee Productions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

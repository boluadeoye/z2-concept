import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-24 px-6 md:px-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
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
              <h4 className="text-[#FF6B35] font-bold text-[12px] uppercase tracking-[0.25em] mb-10">Quick Links</h4>
              <ul className="space-y-5 text-[13px] text-white/50 font-medium">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors">Our Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#FF6B35] font-bold text-[12px] uppercase tracking-[0.25em] mb-10">More Links</h4>
              <ul className="space-y-5 text-[13px] text-white/50 font-medium">
                <li>FAQs</li><li>Terms</li><li>Privacy</li>
              </ul>
            </div>
            <div className="min-w-[240px]">
              <h4 className="text-[#FF6B35] font-bold text-[12px] uppercase tracking-[0.25em] mb-10">Contact Us</h4>
              <ul className="space-y-6 text-[13px] text-white/70 font-medium">
                <li className="flex items-center gap-4"><Mail size={16} className="text-[#8B7E3D]" /> Phelzink@gmail.com</li>
                <li className="flex items-center gap-4"><Phone size={16} className="text-[#8B7E3D]" /> +234 812 582 1771</li>
                <li className="flex items-start gap-4"><MapPin size={16} className="text-[#8B7E3D] mt-1" /> 24, Oguntolu street, Shomolu, Lagos</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-white/30 text-[9px] uppercase tracking-[0.35em] font-bold">
          © 2026 Z2Concepts x Kefee Productions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

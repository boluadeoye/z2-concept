import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 md:py-24 px-6 md:px-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* MAIN CONTENT WRAPPER */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-16 md:gap-0">
          
          {/* LOGO SECTION */}
          <div className="w-full md:w-[30%]">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="text-3xl font-black text-[#8B7E3D] tracking-tighter">Z2</span>
              <span className="text-[11px] tracking-widest font-bold pt-1">Concept x Kefee HP</span>
            </div>
            <p className="text-white/60 text-[13px] leading-[1.8] max-w-[30ch]">
              Your trusted partner for designing, branding, and printing solutions.
            </p>
          </div>

          {/* LINKS & CONTACT SECTION */}
          <div className="w-full md:w-[65%] grid grid-cols-2 md:flex md:justify-between gap-y-12 gap-x-6 md:gap-0">
            
            {/* QUICK LINKS */}
            <div className="flex flex-col">
              <h4 className="text-[#FF6B35] font-bold text-[14px] mb-6 md:mb-10">Quick Links</h4>
              <ul className="space-y-4 md:space-y-5 text-[13px] text-white/50 font-medium">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors">Our Works</Link></li>
              </ul>
            </div>

            {/* MORE LINKS */}
            <div className="flex flex-col">
              <h4 className="text-[#FF6B35] font-bold text-[14px] mb-6 md:mb-10">More Links</h4>
              <ul className="space-y-4 md:space-y-5 text-[13px] text-white/50 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
              </ul>
            </div>

            {/* CONTACT US */}
            <div className="col-span-2 md:col-span-1 min-w-0 md:min-w-[240px] pt-4 md:pt-0">
              <h4 className="text-[#FF6B35] font-bold text-[14px] mb-6 md:mb-10">Contact Us</h4>
              <ul className="space-y-5 md:space-y-6 text-[13px] text-white/70 font-medium">
                <li className="flex items-center gap-4">
                  <Mail size={16} className="text-[#8B7E3D] shrink-0" /> 
                  <span className="truncate">Phelzink@gmail.com</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={16} className="text-[#8B7E3D] shrink-0" /> 
                  <span>+234 812 582 1771</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="text-[#8B7E3D] mt-1 shrink-0" /> 
                  <span className="leading-relaxed">24, Oguntolu street, Shomolu, Lagos</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* COPYRIGHT BAR: Hallucinations removed, text centered */}
        <div className="pt-10 border-t border-white/10 text-center">
          <div className="text-white/30 text-[10px] font-bold tracking-[0.35em] uppercase">
            © 2026 Z2Concepts x Kefee Productions. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

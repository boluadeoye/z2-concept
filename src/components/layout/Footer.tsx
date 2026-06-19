import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0C0608] text-white py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* BACKGROUND LAYER: Photographic Depth */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" 
          alt="Footer Background" 
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* MAIN CONTENT WRAPPER */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-16 md:gap-0">
          
          {/* LOGO SECTION: Stretched Figma Geometry */}
          <div className="w-full md:w-[35%]">
            <div className="flex items-baseline gap-3 mb-8 md:mb-10">
              {/* Z2: Stretched Vertically, Gold, Origin Bottom */}
              <span className="inline-block text-6xl font-black text-[#8B7E3D] tracking-tighter leading-none scale-y-[1.5] origin-bottom antialiased">
                Z2
              </span>
              {/* Subtext: Solid Architectural Base */}
              <span className="text-[11px] font-black text-white uppercase tracking-[0.15em] leading-none">
                Concept X Kefee HP
              </span>
            </div>
            <p className="text-white/60 text-[14px] leading-relaxed max-w-[35ch]">
              Your trusted partner for designing, branding, and printing solutions that bring your vision to life.
            </p>
          </div>

          {/* LINKS & CONTACT SECTION */}
          <div className="w-full md:w-[60%] grid grid-cols-2 md:flex md:justify-between gap-y-12 gap-x-6 md:gap-0">
            
            {/* QUICK LINKS: Orange Headers */}
            <div className="flex flex-col">
              <h4 className="text-[#FF6B35] font-bold text-[15px] mb-6 md:mb-10">Quick Links</h4>
              <ul className="space-y-4 text-[14px] text-white/50 font-medium">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/portfolio" className="hover:text-white transition-colors">Our works</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>

            {/* MORE LINKS */}
            <div className="flex flex-col">
              <h4 className="text-[#FF6B35] font-bold text-[15px] mb-6 md:mb-10">More Links</h4>
              <ul className="space-y-4 text-[14px] text-white/50 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
              </ul>
            </div>

            {/* CONTACT US: Gold Icons */}
            <div className="col-span-2 md:col-span-1 min-w-0 md:min-w-[240px]">
              <h4 className="text-[#FF6B35] font-bold text-[15px] mb-6 md:mb-10">Contact Us</h4>
              <ul className="space-y-5 text-[14px] text-white/70 font-medium">
                <li className="flex items-center gap-4">
                  <Mail size={18} className="text-[#8B7E3D] shrink-0" />
                  <span className="truncate">Phelzink@gmail.com</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={18} className="text-[#8B7E3D] shrink-0" />
                  <span>+234 812 582 1771</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-[#8B7E3D] mt-1 shrink-0" />
                  <span className="leading-relaxed">24, Oguntolu street Shomolu, Lagos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* COPYRIGHT BAR: Title Case Sync */}
        <div className="pt-10 border-t border-white/10 text-center">
          <div className="text-white/30 text-[11px] font-medium tracking-tight">
            © 2026 Z2Concepts X Kefee Productions. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

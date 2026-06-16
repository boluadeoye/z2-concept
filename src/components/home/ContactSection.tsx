import React from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const info = [
  { icon: <Phone size={18} />, label: "Phone", val: ["+234 707 258 0692", "+234 812 582 1771"] },
  { icon: <Mail size={18} />, label: "Email", val: ["Phelzink@gmail.com"] },
  { icon: <MapPin size={18} />, label: "Location", val: ["24, Oguntolu street", "Shomolu, Lagos"] },
  { icon: <Clock size={18} />, label: "Business Hours", val: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"] }
];

export default function ContactSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        {/* items-stretch ensures both columns are the same height on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* LEFT COLUMN: Info & Map */}
          <div className="flex flex-col">
            <Reveal>
              <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-10">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                {info.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#8B7E3D] shrink-0 border border-black/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-1">{item.label}</h4>
                      {item.val.map((v, idx) => (
                        <p key={idx} className="text-black/60 text-[13px] leading-relaxed">{v}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Anchor - Natural Colors */}
              <div className="relative w-full h-[450px] rounded-[32px] overflow-hidden shadow-2xl border border-white group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.123!2d3.376!3d6.524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8cf2a!2s24%20Oguntolu%20St%2C%20Somolu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1716180000000"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  className="opacity-100"
                />
                <button className="absolute bottom-6 left-6 bg-white text-black px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:bg-black hover:text-white transition-all">
                  Open in Maps
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: The Stretched Form */}
          <div className="flex flex-col">
            <Reveal>
              <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-10">Send Us a Message</h2>
            </Reveal>
            
            {/* flex-1 and flex-col here allow the card to fill the column height */}
            <div className="flex-1 flex flex-col bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-black/5">
              <form className="flex-1 flex flex-col space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 ml-2">Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#FDF8F0]/30 border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 ml-2">Email</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-[#FDF8F0]/30 border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold" placeholder="Enter email" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 ml-2">Phone Number</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-[#FDF8F0]/30 border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold" placeholder="Enter phone" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/40 ml-2">Select Interested *</label>
                    <div className="relative">
                      <select className="w-full px-6 py-4 rounded-2xl bg-[#FDF8F0]/30 border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold appearance-none">
                        <option>Select a service</option>
                        <option>Photography</option>
                        <option>Video Production</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-black/20">
                        <Send size={14} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* flex-1 on this wrapper makes the textarea stretch to fill the gap */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/40 ml-2">Message</label>
                  <textarea className="flex-1 w-full px-6 py-4 rounded-2xl bg-[#FDF8F0]/30 border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold resize-none min-h-[120px]" placeholder="Enter message" />
                </div>

                <button className="w-full bg-[#FF6B35] text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-full flex items-center justify-center gap-3 hover:bg-black shadow-xl shadow-[#FF6B35]/20 transition-all mt-auto">
                  SEND MESSAGE <Send size={16} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

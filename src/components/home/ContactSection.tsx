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
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          
          {/* LEFT: Info & Natural Map */}
          <div className="w-full lg:w-1/2 space-y-16">
            <Reveal>
              <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-12">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {info.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#8B7E3D] shrink-0 border border-black/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-2">{item.label}</h4>
                      {item.val.map((v, idx) => (
                        <p key={idx} className="text-black/50 text-sm leading-relaxed">{v}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Natural Map (No Filters) */}
            <Reveal>
              <div className="relative w-full h-[380px] rounded-[32px] overflow-hidden shadow-xl border border-white group">
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

          {/* RIGHT: The Form */}
          <div className="w-full lg:w-1/2">
            <Reveal>
              <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-12">Send Us a Message</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Email</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold" placeholder="Enter email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Phone Number</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold" placeholder="Enter phone" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Select Interested *</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold appearance-none">
                      <option>Select a service</option>
                      <option>Photography</option>
                      <option>Video Production</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Message</label>
                  <textarea rows={5} className="w-full px-6 py-4 rounded-2xl bg-white border border-black/5 focus:border-[#FF6B35] outline-none transition-all text-sm font-bold resize-none" placeholder="Enter message" />
                </div>
                <button className="w-full bg-[#FF6B35] text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-full flex items-center justify-center gap-3 hover:bg-black shadow-xl shadow-[#FF6B35]/20 transition-all">
                  SEND MESSAGE <Send size={16} />
                </button>
              </form>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

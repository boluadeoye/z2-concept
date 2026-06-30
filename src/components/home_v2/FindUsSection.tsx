import React from "react";
import { MapPin, Compass } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function FindUsSection() {
  const address = "27 Abhainn Glas, Edgeworthstown, Longford, N39 TV09, Ireland";
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2371.4938634567214!2d-7.6186419!3d53.6961448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485ddf4c4a45778f%3A0xe94ab8e388ff82a5!2s27%20Abhainn%20Glas%2C%20Edgeworthstown%2C%20Co.%20Longford!5e0!3m2!1sen!2sie!4v1719239845330!5m2!1sen!2sie";

  return (
    <section id="find-us" className="py-24 bg-[#0C0608] px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="w-full h-[1px] bg-white/10 mb-10" />
          <span className="text-[#FF6B35] text-[10px] font-black uppercase tracking-[0.4em] mb-2">Studio Location</span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-10">Find Us</h2>
          <div className="w-full h-[1px] bg-white/10" />
        </div>

        {/* FORCED 2-COLUMN: ADDRESS LEFT, MAP RIGHT (Triggering at md/768px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/5 bg-[#120a0d] overflow-hidden min-h-[500px]">
          <div className="p-8 md:p-12 flex flex-col justify-center items-start gap-8 border-b md:border-b-0 md:border-r border-white/5">
            <div className="flex items-start gap-6">
              <MapPin className="text-[#FF6B35] shrink-0 mt-1" size={32} strokeWidth={1.5} />
              <div className="flex flex-col gap-3">
                <h4 className="text-[#FF6B35] font-black text-xs uppercase tracking-[0.2em]">Kefee Home Productions</h4>
                <p className="text-white font-black text-lg md:text-xl leading-tight tracking-tight">
                  27 Abhainn Glas, Edgeworthstown,<br />Longford, N39 TV09, Ireland
                </p>
              </div>
            </div>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`} target="_blank" rel="noreferrer" className="w-full bg-[#FF6B35] text-black py-5 font-black uppercase tracking-[0.2em] text-xs text-center hover:bg-white transition-all flex items-center justify-center gap-3">
              Get Directions <Compass size={18} strokeWidth={2.5} />
            </a>
          </div>
          <div className="w-full h-[400px] md:h-auto">
            <iframe src={mapUrl} className="w-full h-full border-0" allowFullScreen loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "12249000540";
  const message = encodeURIComponent("Hi Z2 Concepts, I'd like to inquire about your media and digital services.");

  // Authentic WhatsApp Logo SVG
  const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.328-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.405.015 12.044c0 2.123.554 4.197 1.608 6.037L0 24l6.163-1.617a11.83 11.83 0 005.883 1.632h.006c6.637 0 12.032-5.403 12.035-12.042a11.762 11.825 0 00-3.489-8.492z"/>
    </svg>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] bg-white rounded-[24px] shadow-2xl overflow-hidden border border-black/5"
          >
            {/* CHAT HEADER: Official WhatsApp Green */}
            <div className="bg-[#25D366] p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <WhatsAppIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">WhatsApp Chat</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] text-white/80 font-medium">Typically replies in minutes</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* CHAT BODY */}
            <div className="p-6 bg-[#E5DDD5] relative">
              {/* Chat Bubble Style */}
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm relative max-w-[90%]">
                <p className="text-black/80 text-[13px] leading-relaxed">
                  Hi there! 👋<br />
                  How can we help you with your media or digital needs today?
                </p>
                <span className="text-[9px] text-black/40 block text-right mt-1">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* CHAT ACTION */}
            <div className="p-4 bg-white">
              <a
                href={`https://wa.me/${phoneNumber}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white rounded-full py-3.5 flex items-center justify-center gap-2 text-[13px] font-bold hover:bg-[#128C7E] transition-all shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? "bg-white text-black rotate-90" : "bg-[#25D366] text-white hover:scale-110"
        }`}
      >
        {isOpen ? <X size={24} /> : <WhatsAppIcon className="w-8 h-8" />}
      </button>
    </div>
  );
}

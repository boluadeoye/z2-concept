import React from "react";

export default function WhatsAppWidget() {
  const phoneNumber = "12249000540";
  const message = encodeURIComponent("Hello Z2 Concept, I'm interested in your services.");

  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] group"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <div className="relative bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-500">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.05-.148-.471-1.138-.645-1.554-.17-.41-.344-.354-.472-.36-.121-.006-.259-.008-.398-.008-.139 0-.364.05-.554.259-.189.21-1.235 1.207-1.235 2.941 0 1.734 1.265 3.41 1.438 3.64.173.229 2.491 3.802 6.035 5.338.842.365 1.5.583 2.013.744.846.269 1.616.231 2.224.14.678-.1 2.03-.83 2.316-1.634.285-.804.285-1.493.199-1.634-.085-.14-.313-.223-.61-.372z"/>
            <path d="M12.004 2c-5.517 0-9.992 4.483-9.992 9.992 0 1.763.459 3.474 1.33 4.988L2 22l5.164-1.355c1.45.79 3.08 1.207 4.84 1.207 5.517 0 9.992-4.483 9.992-9.992 0-5.517-4.483-9.992-9.992-9.992zm0 18.32c-1.554 0-3.078-.418-4.408-1.208l-.316-.188-3.277.859.874-3.195-.207-.33a8.31 8.31 0 0 1-1.274-4.266c0-4.591 3.735-8.327 8.327-8.327 4.591 0 8.327 3.736 8.327 8.327 0 4.591-3.736 8.327-8.327 8.327z"/>
          </svg>
        </div>
      </div>
    </a>
  );
}

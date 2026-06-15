import React from "react";

export default function ContactSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div>
              <span className="font-mono text-[10px] text-[#8B7E3D] tracking-[0.2em] uppercase mb-4 inline-block">Get In Touch</span>
              <h2 className="text-3xl md:text-5xl font-bold text-black uppercase mb-8">Contact Information</h2>
              <div className="space-y-6 text-sm text-black/80">
                <div className="border-b border-black/10 pb-4">
                  <strong className="block text-[10px] uppercase tracking-widest text-[#8B7E3D] mb-1">Phone</strong>
                  <p>+234 707 288 9459</p>
                </div>
                <div className="border-b border-black/10 pb-4">
                  <strong className="block text-[10px] uppercase tracking-widest text-[#8B7E3D] mb-1">Email</strong>
                  <p>phelzink@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="h-[300px] rounded-3xl overflow-hidden border border-black/10">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.123!2d3.376!3d6.524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8cf2a!2s24%20Oguntolu%20St%2C%20Somolu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1716180000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-black/5">
            <h3 className="text-xl font-bold uppercase mb-8">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input type="text" placeholder="Name" className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0] border border-black/10 text-[10px] uppercase font-bold outline-none" />
                <input type="email" placeholder="Email" className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0] border border-black/10 text-[10px] uppercase font-bold outline-none" />
              </div>
              <input type="tel" placeholder="Phone" className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0] border border-black/10 text-[10px] uppercase font-bold outline-none" />
              <textarea rows={4} placeholder="Message" className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0] border border-black/10 text-[10px] uppercase font-bold outline-none resize-none" />
              <button className="w-full bg-[#F4A261] text-white font-bold text-[10px] uppercase tracking-widest py-5 rounded-xl hover:bg-[#E76F51] transition-colors">Send Message ↗</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

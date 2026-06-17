import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Send } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Reveal } from "../components/shared/Reveal";

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("bank");

  return (
    <main className="bg-[#FDF8F0] min-h-screen pt-32 pb-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <Link to="/store" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black/40 hover:text-[#FF6B35] mb-12 transition-colors">
          <ArrowLeft size={14} /> Back to Store
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-start">
          
          {/* LEFT: Billing Form Container */}
          <div className="w-full bg-white rounded-b-[40px] md:rounded-b-[48px] shadow-2xl border border-black/5 overflow-visible">
            
            {/* STICKY HEADER: Sharp corners, Correct Peach-Tan Color, Pinned to top */}
            <div className="sticky top-20 z-30 bg-[#F2E3D5] p-8 md:px-12 border-b border-black/5 rounded-none">
              <h2 className="text-[13px] font-black uppercase tracking-[0.35em] text-black">
                Billing Details
              </h2>
            </div>
            
            <Reveal>
              <form className="p-8 md:p-12 space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">First Name *</label>
                    <input type="text" required className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Last Name *</label>
                    <input type="text" required className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Company name (optional)</label>
                  <input type="text" className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Country / Region *</label>
                  <select className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold appearance-none">
                    <option>Nigeria</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Street address *</label>
                  <input type="text" placeholder="Enter House number and street name" required className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                  <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Town / City *</label>
                  <input type="text" placeholder="Enter Town / City" required className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">State *</label>
                  <select className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold appearance-none">
                    <option>Select state</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Phone *</label>
                  <input type="tel" placeholder="Enter phone number" required className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Email address *</label>
                  <input type="email" placeholder="Enter email address" required className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                </div>

                <div className="pt-10 border-t border-black/5">
                  <h3 className="text-[11px] font-black uppercase tracking-widest mb-8 text-black">Additional information</h3>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Order notes (optional)</label>
                    <textarea rows={5} className="w-full px-8 py-6 rounded-2xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold resize-none transition-all" placeholder="Lorem ipsum dolor sit amet consectetur. Vel sapien eu odio in" />
                  </div>
                </div>
              </form>
            </Reveal>
          </div>

          {/* RIGHT: Order Summary (STICKY ANCHOR) */}
          <aside className="w-full md:sticky md:top-28 z-30">
            <Reveal>
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl border border-black/5">
                <h3 className="text-lg font-black uppercase tracking-tight mb-8 border-b border-black/5 pb-6">Your Order</h3>
                
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center pt-4 border-t border-black/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Total</span>
                    <span className="text-sm font-black text-black">₦{subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-black">Payment methods</h4>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={paymentMethod === "bank"}
                          onChange={() => setPaymentMethod("bank")}
                          className="w-4 h-4 accent-[#FF6B35]" 
                        />
                        <span className={`text-sm font-bold transition-colors ${paymentMethod === "bank" ? 'text-black' : 'text-black/40'}`}>
                          Direct bank transfer
                        </span>
                      </label>
                      {paymentMethod === "bank" && (
                        <div className="text-[12px] text-black/50 leading-relaxed bg-[#FDF8F0] p-6 rounded-xl border border-black/5">
                          Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                        </div>
                      )}
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="payment" checked={paymentMethod === "check"} onChange={() => setPaymentMethod("check")} className="w-4 h-4 accent-[#FF6B35]" />
                      <span className={`text-sm font-bold transition-colors ${paymentMethod === "check" ? 'text-black' : 'text-black/40'}`}>Check Payment</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="payment" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="w-4 h-4 accent-[#FF6B35]" />
                      <span className={`text-sm font-bold transition-colors ${paymentMethod === "cod" ? 'text-black' : 'text-black/40'}`}>Cash on delivery</span>
                    </label>
                  </div>
                </div>

                <div className="pt-8 border-t border-black/5 mb-10">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-4 h-4 accent-[#FF6B35] rounded border-black/10" />
                    <span className="text-[12px] text-black/60 leading-relaxed">
                      Would you like to be invited to review your order? <span className="text-[#FF6B35] font-bold">ipsum dolor sit</span>
                    </span>
                  </label>
                </div>

                <button className="w-full bg-[#FF6B35] text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#FF6B35]/20">
                  PLACE ORDER <ArrowUpRight size={16} strokeWidth={3} />
                </button>
              </div>
            </Reveal>
          </aside>

        </div>
      </div>
    </main>
  );
}

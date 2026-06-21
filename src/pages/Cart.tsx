import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowLeft, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Reveal } from "../components/shared/Reveal";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-8 bg-[#FDF8F0] px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-4">Your Bag Is Empty</h2>
          <p className="text-black/40 font-medium mb-8">Looks like you haven't added any signature pieces yet.</p>
          <Link to="/store" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-black text-white font-bold text-xs uppercase tracking-widest hover:bg-[#FF6B35] transition-all shadow-xl">
            Return To Store <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    );
  }

  return (
    <main className="bg-[#FDF8F0] min-h-screen pt-32 pb-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* BREADCRUMB */}
        <Reveal>
          <Link 
            to="/store" 
            className="inline-flex items-center gap-2 text-sm font-bold text-black/40 hover:text-[#FF6B35] mb-10 transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Back to Home
          </Link>
        </Reveal>

        {/* ASYMMETRIC GRID: Side-by-side enabled from md (768px) upwards */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          
          {/* LEFT: THE CART TABLE */}
          <div className="w-full overflow-hidden">
            <Reveal>
              <div className="bg-white rounded-[32px] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden">
                {/* DESKTOP TABLE: Visible on md+ */}
                <div className="hidden md:block overflow-x-auto no-scrollbar">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-[#F2E3D5]">
                        <th className="py-6 px-8 text-sm font-bold text-black/80 text-left">Item Name</th>
                        <th className="py-6 px-4 text-sm font-bold text-black/80 text-center">Unit Price</th>
                        <th className="py-6 px-4 text-sm font-bold text-black/80 text-center">Quantity</th>
                        <th className="py-6 px-4 text-sm font-bold text-black/80 text-center">Subtotal</th>
                        <th className="py-6 px-8 text-right">
                          <MoreHorizontal size={20} className="text-black/20 ml-auto" />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.03]">
                      {cart.map((item) => (
                        <tr key={item.variationId || item.id} className="group hover:bg-[#FDF8F0]/30 transition-colors">
                          <td className="py-8 px-8">
                            <div className="flex items-center gap-6">
                              <div className="w-16 h-16 rounded-full overflow-hidden border border-black/5 bg-[#FDF8F0] shrink-0">
                                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                              </div>
                              <span className="text-sm font-bold text-black/80 leading-tight max-w-[200px]">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-8 px-4 text-center text-sm font-bold text-black">
                            ₦{item.price.toLocaleString()}
                          </td>
                          <td className="py-8 px-4">
                            <div className="flex items-center justify-between bg-white rounded-full px-4 py-2 w-[100px] mx-auto border border-black/10 shadow-sm">
                              <button onClick={() => updateQuantity(item.id, -1, item.variationId)} className="text-black/40 hover:text-[#FF6B35]"><Minus size={12} strokeWidth={3} /></button>
                              <span className="text-xs font-black text-black">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1, item.variationId)} className="text-black/40 hover:text-[#FF6B35]"><Plus size={12} strokeWidth={3} /></button>
                            </div>
                          </td>
                          <td className="py-8 px-4 text-center text-sm font-black text-black">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </td>
                          <td className="py-8 px-8 text-right">
                            <button onClick={() => removeFromCart(item.id, item.variationId)} className="w-10 h-10 rounded-full bg-[#FDF8F0] flex items-center justify-center text-red-400/40 hover:bg-red-500 hover:text-white transition-all">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE VIEW: Visible below md */}
                <div className="md:hidden divide-y divide-black/5">
                  {cart.map((item) => (
                    <div key={item.variationId || item.id} className="p-6 flex flex-col gap-6">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-black/5 shrink-0">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-sm font-bold text-black leading-tight mb-1">{item.name}</h3>
                          <p className="text-xs font-bold text-[#FF6B35]">₦{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-[#FDF8F0] rounded-full px-4 py-2 border border-black/5">
                          <button onClick={() => updateQuantity(item.id, -1, item.variationId)} className="p-1"><Minus size={14} /></button>
                          <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1, item.variationId)} className="p-1"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.variationId)} className="text-red-400 text-xs font-bold">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: CART TOTALS SIDEBAR (Anchored to the right from md+) */}
          <aside className="w-full md:sticky md:top-32">
            <Reveal disableTransform>
              <div className="bg-white rounded-[40px] p-8 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5">
                <h3 className="text-lg font-black text-black tracking-tight mb-8 border-b border-black/5 pb-6">
                  Cart Totals
                </h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-black/40 tracking-tight">Subtotal</span>
                    <span className="text-sm font-bold text-black">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-black/5">
                    <span className="text-xs font-bold text-black/40 tracking-tight">Total</span>
                    <span className="text-2xl font-black text-black">₦{subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <Link 
                  to="/checkout" 
                  className="w-full bg-[#FF6B35] text-white font-black text-[13px] py-5 rounded-full flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#FF6B35]/20 group"
                >
                  Proceed to Checkout 
                  <ArrowUpRight size={18} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </aside>

        </div>
      </div>
    </main>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Reveal } from "../components/shared/Reveal";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 bg-[#FDF8F0]">
        <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Your bag is empty</h2>
        <Link to="/store" className="btn-pill bg-black text-white">Return to Store</Link>
      </div>
    );
  }

  return (
    <main className="bg-[#FDF8F0] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link to="/store" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black/40 hover:text-[#FF6B35] mb-12 transition-colors">
          <ArrowLeft size={14} /> Back to Store
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT COLUMN: Items */}
          <div className="w-full lg:w-[70%]">
            
            {/* DESKTOP TABLE (Visible on Tablet/Desktop) */}
            <div className="hidden md:block">
              <Reveal>
                <table className="w-full border-collapse bg-white rounded-[32px] overflow-hidden shadow-xl">
                  <thead>
                    <tr className="bg-[#F5E6E8] text-left">
                      <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em]">Item Name</th>
                      <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em]">Unit Price</th>
                      <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-center">Quantity</th>
                      <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em]">Subtotal</th>
                      <th className="p-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {cart.map((item) => (
                      <tr key={item.variationId || item.id}>
                        <td className="p-8">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-black/5 shrink-0">
                              <img src={item.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="text-sm font-bold text-black max-w-[200px] leading-tight">{item.name}</span>
                          </div>
                        </td>
                        <td className="p-8 text-sm font-bold text-black">₦{item.price.toLocaleString()}</td>
                        <td className="p-8">
                          <div className="flex items-center justify-center bg-[#FDF8F0] rounded-full px-3 py-1.5 w-fit mx-auto border border-black/5">
                            <button onClick={() => updateQuantity(item.id, -1, item.variationId)} className="p-1 text-black/40 hover:text-black"><Minus size={14} /></button>
                            <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1, item.variationId)} className="p-1 text-black/40 hover:text-black"><Plus size={14} /></button>
                          </div>
                        </td>
                        <td className="p-8 text-sm font-black text-black">₦{(item.price * item.quantity).toLocaleString()}</td>
                        <td className="p-8 text-right">
                          <button onClick={() => removeFromCart(item.id, item.variationId)} className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            </div>

            {/* MOBILE CARDS (Visible on Mobile Only) */}
            <div className="md:hidden space-y-6">
              {cart.map((item) => (
                <Reveal key={item.variationId || item.id}>
                  <div className="bg-white rounded-[32px] p-6 shadow-lg border border-black/5 relative">
                    <button 
                      onClick={() => removeFromCart(item.id, item.variationId)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <div className="flex gap-4 mb-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-black/5 shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-sm font-black text-black leading-tight mb-1">{item.name}</h3>
                        <p className="text-xs font-bold text-[#FF6B35]">₦{item.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                      <div className="flex items-center bg-[#FDF8F0] rounded-full px-3 py-1 border border-black/5">
                        <button onClick={() => updateQuantity(item.id, -1, item.variationId)} className="p-1 text-black/40"><Minus size={14} /></button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1, item.variationId)} className="p-1 text-black/40"><Plus size={14} /></button>
                      </div>
                      <div className="text-right">
                        <span className="block text-[9px] uppercase font-black text-black/30 tracking-widest">Subtotal</span>
                        <span className="text-sm font-black text-black">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Totals */}
          <div className="w-full lg:w-[30%]">
            <Reveal>
              <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl border border-black/5">
                <h3 className="text-xl font-black uppercase tracking-tight mb-8 border-b border-black/5 pb-6">Cart Totals</h3>
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Subtotal</span>
                    <span className="text-sm font-bold text-black">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-black/5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Total</span>
                    <span className="text-xl font-black text-black">₦{subtotal.toLocaleString()}</span>
                  </div>
                </div>
                <Link 
                  to="/checkout" 
                  className="w-full bg-[#FF6B35] text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#FF6B35]/20"
                >
                  PROCEED TO CHECKOUT <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </main>
  );
}

import React, { useState } from "react";
import { CreditCard, Trash2, Loader2 } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function PaymentMethodTab() {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [methods, setMethods] = useState([
    { id: "1", card_type: "Visa", last4: "4242", expiry_month: "12", expiry_year: "28", is_default: true }
  ]);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this card?")) return;
    setDeleting(id);
    setTimeout(() => {
      setMethods(prev => prev.filter(m => m.id !== id));
      setDeleting(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-[#8B7E3D] uppercase tracking-wider">Saved Cards</h3>
        <span className="bg-[#FDF8F0] text-[#8B7E3D] text-[9px] px-3 py-1 rounded-full font-bold tracking-widest border border-[#8B7E3D]/10">
          SECURED BY PAYSTACK
        </span>
      </div>

      {methods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((token) => (
            <Reveal key={token.id}>
              <div className="bg-white border border-black/10 rounded-[24px] p-6 relative overflow-hidden group shadow-md">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-8 bg-black/5 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-wider">
                      {token.card_type}
                    </div>
                    <span className="text-sm font-bold text-black/80">•••• {token.last4}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(token.id)}
                    disabled={deleting === token.id}
                    className="text-black/20 hover:text-red-500 transition-colors"
                  >
                    {deleting === token.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-black/40">Expires</span>
                    <p className="text-xs font-bold text-black/80">{token.expiry_month}/{token.expiry_year}</p>
                  </div>
                  {token.is_default && (
                    <span className="text-[9px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Default</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="bg-black/[0.02] border border-black/[0.03] rounded-[24px] p-8 text-center space-y-3">
          <CreditCard size={32} className="mx-auto text-black/20 mb-2" />
          <p className="text-sm font-bold text-black/60 uppercase">No saved payment methods</p>
        </div>
      )}
    </div>
  );
}

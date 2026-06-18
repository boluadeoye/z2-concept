import React, { useState } from "react";
import { Eye, Sliders, Loader2 } from "lucide-react";
import { Reveal } from "../shared/Reveal";

interface OrdersProps {
  orders: any[];
  loading: boolean;
  onViewOrder: (order: any) => void;
  statusStyle: (status: string) => string;
}

export default function OrdersTab({ orders, loading, onViewOrder, statusStyle }: OrdersProps) {
  const [filter, setFilter] = useState("All");

  const filteredOrders = orders.filter(
    (o) => filter === "All" || o.status.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="space-y-8">
      {/* FIGMA FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3 pb-8 border-b border-black/5">
        <Sliders size={18} className="text-[#FF6B35] mr-2" />
        {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === f ? "bg-[#FF6B35] text-white shadow-lg" : "bg-white border border-black/5 text-black/40 hover:border-black/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#FF6B35]" size={32} /></div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-1">
          {filteredOrders.map((order) => (
            <div key={order.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6 border-b border-black/[0.03]">
              {/* FIGMA PRECISION: The Orange Dot */}
              <div className="flex items-center gap-4 w-40">
                <div className="w-2 h-2 rounded-full bg-[#FF6B35] shrink-0" />
                <span className="text-xs font-bold text-black/80">Order #{order.id}</span>
              </div>
              
              <span className="text-xs text-black/40 w-32">
                {new Date(order.date_created).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>

              <div className="w-28">
                <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${statusStyle(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <span className="text-xs font-black text-black w-24">₦{parseFloat(order.total).toLocaleString()}</span>

              <button 
                onClick={() => onViewOrder(order)}
                className="flex items-center gap-2 px-6 py-2.5 border border-black/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                <Eye size={14} /> View
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-sm italic text-black/20 font-bold uppercase tracking-[0.2em]">No orders found in this category</p>
        </div>
      )}
    </div>
  );
}

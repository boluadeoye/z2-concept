import React from "react";
import { Eye, Loader2 } from "lucide-react";
import { Reveal } from "../shared/Reveal";

interface OverviewProps {
  user: any;
  orders: any[];
  loading: boolean;
  onViewOrder: (order: any) => void;
  statusStyle: (status: string) => string;
}

export default function DashboardOverview({ user, orders, loading, onViewOrder, statusStyle }: OverviewProps) {
  return (
    <div className="space-y-10">
      <Reveal>
        <div className="space-y-2">
          <p className="text-sm text-black/80">Hello <span className="font-bold text-black">{user.name || "User"}</span>,</p>
          <p className="text-sm text-black/60 leading-relaxed max-w-3xl">
            Welcome to your account! From here, you can easily track your recent orders, update your shipping and billing info, or change your password and profile settings.
          </p>
        </div>
      </Reveal>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-black tracking-tight">Recent Activity</h3>
        <div className="h-[1px] bg-black/5 w-full" />
        
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#FF6B35]" /></div>
        ) : orders.length > 0 ? (
          <div className="space-y-1">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-5 border-b border-black/[0.03]">
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
                  className="flex items-center gap-2 px-5 py-2 border border-black/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  <Eye size={12} /> View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs italic text-black/30">No recent activity found.</p>
        )}
      </div>
    </div>
  );
}

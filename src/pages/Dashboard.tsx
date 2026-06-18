import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, X, LogOut, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { getCustomerOrders, getCustomerData, updateCustomerAddress } from "../lib/woocommerce";
import { Reveal } from "../components/shared/Reveal";

import DashboardOverview from "../components/dashboard/DashboardOverview";
import OrdersTab from "../components/dashboard/OrdersTab";
import AddressTab from "../components/dashboard/AddressTab";
import SavedTab from "../components/dashboard/SavedTab";
import AccountSettingsTab from "../components/dashboard/AccountSettingsTab";

const menuItems = ["Dashboard", "Orders", "Saved", "Shipping Address", "Payment method", "Account settings"];

export default function DashboardPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      setLoading(true);
      const [ordersData, customerData] = await Promise.all([
        getCustomerOrders(user.id),
        getCustomerData(user.id)
      ]);
      setOrders(ordersData);
      setCustomer(customerData);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSaveAddress = async (formData: any) => {
    if (!user?.id) return;
    const res = await updateCustomerAddress(user.id, formData);
    if (res.success) {
      const updatedCustomer = await getCustomerData(user.id);
      setCustomer(updatedCustomer);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing": return "bg-[#FEF9C3] text-[#723B13]";
      case "completed": return "bg-[#DCFCE7] text-[#03543F]";
      case "shipped": return "bg-[#FCE7F3] text-[#9D174D]";
      case "cancelled": return "bg-[#FEE2E2] text-[#991B1B]";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  if (authLoading || !user) return <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center"><Loader2 className="animate-spin text-[#FF6B35]" size={32} /></div>;

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-12 py-24 md:py-32 flex flex-col md:flex-row gap-10 items-start">
      
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white p-4 rounded-[32px] shadow-sm border border-black/5 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === item ? "bg-[#FF6B35] text-white shadow-lg" : "bg-white text-black/60 hover:bg-black/5"
              }`}
            >
              {item}
            </button>
          ))}
          <div className="pt-2">
            <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest text-[#8B7E3D] bg-[#FDF8F0] hover:bg-[#8B7E3D] hover:text-white transition-all">
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-black/5 min-h-[600px] w-full">
        {/* FIXED HEADER COLOR: text-black instead of text-primary */}
        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-6">{activeTab}</h2>
        <div className="h-[1px] bg-black/10 w-full mb-10" />

        {activeTab === "Dashboard" && (
          <DashboardOverview user={user} orders={orders} loading={loading} onViewOrder={setSelectedOrder} statusStyle={getStatusStyles} />
        )}

        {activeTab === "Orders" && (
          <OrdersTab orders={orders} loading={loading} onViewOrder={setSelectedOrder} statusStyle={getStatusStyles} />
        )}

        {activeTab === "Saved" && (
          <SavedTab />
        )}

        {activeTab === "Shipping Address" && (
          <AddressTab customer={customer} onSave={handleSaveAddress} />
        )}

        {activeTab === "Payment method" && (
          <div className="py-20 text-center space-y-4">
            <CreditCard size={40} className="mx-auto text-black/10" />
            <p className="text-sm font-bold text-black/30 uppercase tracking-widest">No saved payment methods</p>
          </div>
        )}

        {activeTab === "Account settings" && (
          <AccountSettingsTab user={user} />
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl w-full max-w-xl z-10">
              <div className="p-6 bg-black text-white flex justify-between items-center">
                <h3 className="text-lg font-bold uppercase">Order #{selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)}><X size={20} /></button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                {selectedOrder.line_items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between py-4 border-b border-black/5">
                    <span className="text-xs font-bold text-black/80">{item.name} x{item.quantity}</span>
                    <span className="text-xs font-black text-primary">₦{parseFloat(item.total).toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-6 space-y-3 border-t border-black/10 mt-6">
                  <div className="flex justify-between items-center pt-4 border-t border-black/5 mt-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-black">Order Total</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-green-600 mt-1">Payment Received ✅</span>
                    </div>
                    <span className="text-xl font-black text-primary">₦{parseFloat(selectedOrder.total).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, X, LogOut, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { getCustomerOrders, getCustomerData, updateCustomerAddress } from "../lib/woocommerce";

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

  if (authLoading || !user) return (
    <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#FF6B35]" size={32} />
    </div>
  );

  return (
    <main className="bg-[#FDF8F0] min-h-screen pt-32 pb-24 px-4 md:px-6 lg:px-8">
      {/* FIGMA ALIGNMENT: Side-by-side restored for md+ viewports */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 lg:gap-10 items-start">
        
        {/* SIDEBAR: Floating Card (Sticky removed for mobile/tablet to prevent overlap) */}
        <aside className="w-full xl:sticky xl:top-32">
          <div className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-black/5">
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`w-full text-left px-6 py-3.5 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                    activeTab === item 
                      ? "bg-[#FF6B35] text-white shadow-lg" 
                      : "text-black/40 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
            
            <div className="mt-4 pt-4 border-t border-black/5">
              <button 
                onClick={logout} 
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[13px] font-bold text-black bg-[#FDF8F0] hover:bg-black hover:text-white transition-all"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </div>
        </aside>

        {/* CONTENT AREA: Floating Card (Title Case) */}
        <section className="bg-white rounded-[32px] p-6 md:p-10 lg:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5 min-h-[600px] overflow-hidden">
          <header className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">{activeTab}</h2>
            <div className="h-[1px] bg-black/5 w-full mt-6" />
          </header>

          <div className="w-full overflow-x-auto no-scrollbar">
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
              <div className="py-24 text-center space-y-4">
                <CreditCard size={40} className="mx-auto text-black/10" />
                <p className="text-sm font-bold text-black/30">No saved payment methods</p>
              </div>
            )}

            {activeTab === "Account settings" && (
              <AccountSettingsTab user={user} />
            )}
          </div>
        </section>
      </div>

      {/* ORDER DETAIL LIGHTBOX */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={() => setSelectedOrder(null)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.98 }} 
              className="relative bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl w-full max-w-xl z-10 border border-black/5"
            >
              <div className="p-5 md:p-6 border-b border-black/5 flex justify-between items-center">
                <h3 className="text-base md:text-lg font-bold">Order #{selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                {selectedOrder.line_items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between py-4 border-b border-black/5 last:border-0">
                    <span className="text-xs md:text-sm font-medium text-black/70">{item.name} x{item.quantity}</span>
                    <span className="text-xs md:text-sm font-bold text-black">₦{parseFloat(item.total).toLocaleString()}</span>
                  </div>
                ))}
                <div className="mt-6 pt-6 border-t border-black/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base font-bold text-black">Total</span>
                    <span className="text-lg md:text-xl font-bold text-[#FF6B35]">₦{parseFloat(selectedOrder.total).toLocaleString()}</span>
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

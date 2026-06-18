import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ChevronDown, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getCustomerData, createWooOrder } from "../lib/woocommerce";
import { Reveal } from "../components/shared/Reveal";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", 
  "Imo", "Jigawa", "KD", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
  "Taraba", "Yobe", "Zamfara"
];

const STATE_MAP: { [key: string]: string } = {
  "AB": "Abia", "AD": "Adamawa", "AK": "Akwa Ibom", "AN": "Anambra", "BA": "Bauchi", 
  "BY": "Bayelsa", "BE": "Benue", "BO": "Borno", "CR": "Cross River", "DE": "Delta", 
  "EB": "Ebonyi", "ED": "Edo", "EK": "Ekiti", "EN": "Enugu", "FC": "FCT - Abuja", 
  "GO": "Gombe", "IM": "Imo", "JI": "Jigawa", "KD": "Kaduna", "KN": "Kano", 
  "KT": "Katsina", "KE": "Kebbi", "KO": "Kogi", "KW": "Kwara", "LA": "Lagos", 
  "NA": "Nasarawa", "NI": "Niger", "OG": "Ogun", "ON": "Ondo", "OS": "Osun", 
  "OY": "Oyo", "PL": "Plateau", "RI": "Rivers", "SO": "Sokoto", "TA": "Taraba", 
  "YO": "Yobe", "ZA": "Zamfara"
};

const getTranslatedStateName = (input: string) => {
  if (!input) return "";
  const upperInput = input.toUpperCase();
  if (STATE_MAP[upperInput]) return STATE_MAP[upperInput];
  if (NIGERIAN_STATES.includes(input)) return input;
  return "";
};

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState("bacs");
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");
  
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", company: "", country: "NG",
    address1: "", address2: "", city: "", state: "", phone: "", email: "", notes: ""
  });

  useEffect(() => {
    async function autoFill() {
      if (user?.id) {
        setIsFetchingProfile(true);
        const profile = await getCustomerData(user.id);
        if (profile) {
          const billing = profile.billing || {};
          const shipping = profile.shipping || {};
          
          const firstName = profile.first_name || shipping.first_name || billing.first_name || "";
          const lastName = profile.last_name || shipping.last_name || billing.last_name || "";
          const address1 = shipping.address_1 || billing.address_1 || "";
          const address2 = shipping.address_2 || billing.address_2 || "";
          const city = shipping.city || billing.city || "";
          const stateCode = shipping.state || billing.state || "";
          const phone = shipping.phone || billing.phone || "";
          const email = profile.email || billing.email || "";

          setFormData({
            firstName,
            lastName,
            company: shipping.company || billing.company || "",
            country: "NG",
            address1,
            address2,
            city,
            state: getTranslatedStateName(stateCode),
            phone,
            email,
            notes: ""
          });
        }
        setIsFetchingProfile(false);
      }
    }
    autoFill();
  }, [user]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    const requiredFields = [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "address1", label: "Street Address" },
      { key: "city", label: "Town / City" },
      { key: "state", label: "State" },
      { key: "phone", label: "Phone Number" },
      { key: "email", label: "Email Address" }
    ];

    for (const field of requiredFields) {
      if (!formData[field.key as keyof typeof formData]) {
        setValidationError(`Please fill out the required field: ${field.label}`);
        return;
      }
    }

    if (cart.length === 0) {
      setValidationError("Your cart is empty.");
      return;
    }
    
    setIsSubmitting(true);

    const orderPayload = {
      payment_method: paymentMethod,
      payment_method_title: paymentMethod === "bacs" ? "Direct Bank Transfer" : "Cash on Delivery",
      set_paid: false,
      customer_id: user?.id || 0,
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address1,
        address_2: formData.address2,
        city: formData.city,
        state: formData.state,
        country: "NG",
        email: formData.email,
        phone: formData.phone
      },
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address1,
        address_2: formData.address2,
        city: formData.city,
        state: formData.state,
        country: "NG"
      },
      line_items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      })),
      customer_note: formData.notes
    };

    const result = await createWooOrder(orderPayload);

    if (result.success) {
      setOrderSuccess(true);
      clearCart();
      setTimeout(() => navigate("/dashboard"), 3000);
    } else {
      setValidationError("WooCommerce Error: " + result.error);
    }
    setIsSubmitting(false);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] flex items-center justify-center px-6">
        <div className="bg-white p-12 rounded-[48px] shadow-2xl text-center max-w-lg border border-black/5">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Order Placed!</h2>
          <p className="text-black/60 mb-10 leading-relaxed">Your order has been received and is currently <strong>Pending</strong>. Redirecting to your dashboard...</p>
          <Link to="/dashboard" className="btn-pill bg-black text-white justify-center">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#FDF8F0] min-h-screen pt-32 pb-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link to="/store" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black/40 hover:text-[#FF6B35] mb-12 transition-colors">
          <ArrowLeft size={14} /> Back to Store
        </Link>

        {/* Master Form wrapper */}
        <form onSubmit={handlePlaceOrder} noValidate className="grid grid-cols-1 md:grid-cols-[1fr_380px] lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-start">
          
          {/* LEFT: Billing Form container */}
          <div className="w-full relative">
            {isFetchingProfile && (
              <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-[48px]">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-xl border border-black/5">
                  <Loader2 className="animate-spin text-[#FF6B35]" size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Syncing Profile...</span>
                </div>
              </div>
            )}

            <Reveal>
              <div className="bg-white rounded-b-[40px] overflow-hidden shadow-2xl border border-black/5">
                <div className="bg-[#F2E3D5] p-8 md:px-12 border-b border-black/5">
                  <h2 className="text-[13px] font-black uppercase tracking-[0.35em] text-black">Billing Details</h2>
                </div>
                
                {/* Changed inner tag to a div to prevent nesting forms */}
                <div className="p-8 md:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">First Name *</label>
                      <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Last Name *</label>
                      <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Company name (optional)</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Country / Region *</label>
                    <select disabled className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 text-sm font-bold appearance-none opacity-60">
                      <option value="NG">Nigeria</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Street address *</label>
                    <input type="text" placeholder="Enter House number and street name" value={formData.address1} onChange={(e) => setFormData({...formData, address1: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                    <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" value={formData.address2} onChange={(e) => setFormData({...formData, address2: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Town / City *</label>
                    <input type="text" placeholder="Enter Town / City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">State *</label>
                    <div className="relative">
                      <select 
                        value={formData.state} 
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold appearance-none transition-all"
                      >
                        <option value="">Select state</option>
                        {NIGERIAN_STATES.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-black/20">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Phone *</label>
                    <input type="tel" placeholder="Enter phone number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Email address *</label>
                    <input type="email" placeholder="Enter email address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 rounded-xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold transition-all" />
                  </div>

                  <div className="pt-10 border-t border-black/5">
                    <h3 className="text-[11px] font-black uppercase tracking-widest mb-8 text-black">Additional information</h3>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Order notes (optional)</label>
                      <textarea rows={5} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full px-8 py-6 rounded-2xl bg-[#FDF8F0]/40 border border-black/5 focus:border-[#FF6B35] outline-none text-sm font-bold resize-none transition-all" placeholder="Notes about your order..." />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Order Summary */}
          <aside className="w-full md:sticky md:top-28 z-30">
            <Reveal>
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl border border-black/5">
                <h3 className="text-lg font-black uppercase tracking-tight mb-8 border-b border-black/5 pb-6">Your Order</h3>
                
                <div className="space-y-4 mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs font-bold text-black/60 border-b border-black/[0.03] pb-2">
                      <span className="max-w-[22ch] truncate">{item.name} <span className="text-[#FF6B35] font-black">x{item.quantity}</span></span>
                      <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Total</span>
                    <span className="text-sm font-black text-black">₦{subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-black">Payment methods</h4>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="payment" checked={paymentMethod === "bacs"} onChange={() => setPaymentMethod("bacs")} className="w-4 h-4 accent-[#FF6B35]" />
                        <span className={`text-sm font-bold transition-colors ${paymentMethod === "bacs" ? 'text-black' : 'text-black/40'}`}>Direct bank transfer</span>
                      </label>
                      {paymentMethod === "bacs" && (
                        <div className="text-[12px] text-black/50 leading-relaxed bg-[#FDF8F0] p-6 rounded-xl border border-black/5">
                          Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                        </div>
                      )}
                    </div>
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

                {/* ERROR PANEL */}
                {validationError && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2">
                    <AlertCircle size={18} className="shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-wider">{validationError}</span>
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="w-full bg-[#FF6B35] text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-[#FF6B35]/20">
                  {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "PLACE ORDER"} <ArrowUpRight size={16} strokeWidth={3} />
                </button>
              </div>
            </Reveal>
          </aside>

        </form>
      </div>
    </main>
  );
}

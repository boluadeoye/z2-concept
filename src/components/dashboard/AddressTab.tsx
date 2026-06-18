import React, { useState } from "react";
import { Edit2, Trash2, CheckCircle, Loader2, Plus, ChevronDown } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", 
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
  "Taraba", "Yobe", "Zamfara"
];

interface AddressProps {
  customer: any;
  onSave: (data: any) => Promise<void>;
}

export default function AddressTab({ customer, onSave }: AddressProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    first_name: customer?.shipping?.first_name || customer?.first_name || "",
    last_name: customer?.shipping?.last_name || customer?.last_name || "",
    address_1: customer?.shipping?.address_1 || "",
    city: customer?.shipping?.city || "",
    state: customer?.shipping?.state || "",
    phone: customer?.shipping?.phone || customer?.billing?.phone || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
    setEditing(false);
  };

  const address = customer?.shipping;

  return (
    <div className="space-y-10">
      {editing ? (
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">First Name *</label>
                <input required placeholder="First Name" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} className="w-full border border-black/5 bg-[#FDF8F0]/40 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Last Name *</label>
                <input required placeholder="Last Name" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} className="w-full border border-black/5 bg-[#FDF8F0]/40 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Phone Number *</label>
              <input required placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border border-black/5 bg-[#FDF8F0]/40 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Street address *</label>
              <input required placeholder="Street Address" value={form.address_1} onChange={e => setForm({...form, address_1: e.target.value})} className="w-full border border-black/5 bg-[#FDF8F0]/40 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Town / City *</label>
                <input required placeholder="City" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full border border-black/5 bg-[#FDF8F0]/40 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
              </div>

              {/* FIXED: Dropdown Select on Dashboard */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">State *</label>
                <div className="relative">
                  <select 
                    required 
                    value={form.state} 
                    onChange={e => setForm({...form, state: e.target.value})} 
                    className="w-full border border-black/5 bg-[#FDF8F0]/40 rounded-xl px-4 py-3.5 text-sm font-bold outline-none focus:border-[#FF6B35] appearance-none"
                  >
                    <option value="" disabled>Select state</option>
                    {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/20">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={saving} className="bg-[#FF6B35] text-white px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#FF6B35]/20">
                {saving ? <Loader2 className="animate-spin" size={16} /> : "Save Address"}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="border border-black/10 text-black px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest">Cancel</button>
            </div>
          </form>
        </Reveal>
      ) : (
        <div className="space-y-8">
          {address?.address_1 ? (
            <Reveal>
              <div className="bg-white border border-black/10 rounded-[32px] p-10 relative group max-w-2xl">
                <div className="absolute top-8 right-8 flex gap-4">
                  <button onClick={() => setEditing(true)} className="text-black/20 hover:text-[#FF6B35] transition-colors"><Edit2 size={18} /></button>
                  <button className="text-black/20 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
                <div className="space-y-2 mb-8">
                  <h4 className="text-lg font-black text-black">{address.first_name} {address.last_name}</h4>
                  <p className="text-sm text-black/60 leading-relaxed">
                    {address.address_1}<br />
                    {address.city}, {address.state}<br />
                    {address.phone}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 w-fit px-5 py-2 rounded-full border border-green-100">
                  <CheckCircle size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Default Address</span>
                </div>
                <p className="mt-6 text-[11px] font-bold text-black/20 uppercase tracking-widest">This is your default shipping address</p>
              </div>
            </Reveal>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-black/5 rounded-[32px]">
              <p className="text-sm text-black/30 font-bold uppercase tracking-widest">No address found</p>
            </div>
          )}

          {!address?.address_1 && (
            <button onClick={() => setEditing(true)} className="bg-[#FDF8F0] text-[#8B7E3D] px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#8B7E3D] hover:text-white transition-all flex items-center gap-2">
              <Plus size={16} /> Add New Address
            </button>
          )}
        </div>
      )}
    </div>
  );
}

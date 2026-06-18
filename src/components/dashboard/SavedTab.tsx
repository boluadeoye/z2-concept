import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { Reveal } from "../shared/Reveal";

export default function SavedTab() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm italic text-black/20 font-bold uppercase tracking-[0.2em] mb-6">No saved items found</p>
        <Link to="/store" className="inline-flex bg-black text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest">
          Go to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {wishlist.map((item) => (
        <Reveal key={item.id}>
          <div className="bg-white rounded-[24px] overflow-hidden border border-black/5 hover:shadow-xl transition-all p-4 relative group">
            {/* Trash button directly updates Wishlist state */}
            <button 
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 z-10 hover:bg-red-500 hover:text-white transition-all"
            >
              <Trash2 size={14} />
            </button>
            <Link to={`/product/${item.id}`} className="block">
              <div className="aspect-square w-full overflow-hidden rounded-2xl mb-4">
                <img src={item.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex items-end justify-between px-1">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wide truncate max-w-[12ch]">{item.name}</h3>
                  <p className="text-[#8B7E3D] font-bold text-xs mt-1">₦{item.price.toLocaleString()}</p>
                </div>
                {/* Shopping bag adds to Global Cart Context */}
                <button 
                  onClick={(e) => { e.preventDefault(); addToCart(item, 1); }}
                  className="w-8 h-8 bg-[#FF6B35] text-white rounded-full flex items-center justify-center hover:bg-black transition-all"
                >
                  <ShoppingBag size={14} />
                </button>
              </div>
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

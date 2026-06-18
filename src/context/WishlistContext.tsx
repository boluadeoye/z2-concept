"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type WishlistItem = {
  id: number | string;
  name: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  toggleWishlist: (product: any) => void;
  removeFromWishlist: (id: number | string) => void;
  isInWishlist: (id: number | string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  // LAZY INITIALIZER: Reads instantly on mount, preventing race conditions
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem("z2_wishlist");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        localStorage.removeItem("z2_wishlist");
      }
    }
    return [];
  });

  // Only write to localStorage when wishlist actually changes
  useEffect(() => {
    localStorage.setItem("z2_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product: any) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(product.id));
      }
      const imageUrl = product.images?.[0]?.src || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521130/blog_assets/dsitt1fhtiod9dkndedz.png";
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: parseFloat(product.price || "0"),
          image: imageUrl,
        },
      ];
    });
  };

  const removeFromWishlist = (id: number | string) => {
    setWishlist((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const isInWishlist = (id: number | string) => {
    return wishlist.some((item) => String(item.id) === String(id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};

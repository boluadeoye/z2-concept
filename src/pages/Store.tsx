import React, { useEffect } from "react";
import { PageHero } from "../components/shared/PageHero";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import StoreGrid from "../components/store/StoreGrid";

export default function StorePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* FIGMA FIDELITY: Minimalist Header with Wedding Car Asset */}
      <PageHero 
        title="Store" 
        breadcrumb="Store" 
        image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg" 
      />
      
      <ServiceTicker />
      <StoreGrid />
    </main>
  );
}

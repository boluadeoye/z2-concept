import React, { useEffect } from "react";
import { PageHero } from "../components/shared/PageHero";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

export default function PortfolioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {/* FIGMA FIDELITY: Minimalist Header with Wedding Car Asset */}
      <PageHero 
        title="Portfolio" 
        breadcrumb="Portfolio" 
        image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg" 
      />
      
      <ServiceTicker />
      <PortfolioGrid />
    </main>
  );
}

import React, { useEffect } from "react";
import { PageHero } from "../components/shared/PageHero";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import AboutContent from "../components/about/AboutContent";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#FDF8F0]">
      {/* FIGMA FIDELITY: Corrected Hero Asset (Wedding Car) */}
      <PageHero 
        title="About" 
        breadcrumb="About" 
        image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg" 
      />
      
      <ServiceTicker />
      <AboutContent />
    </main>
  );
}

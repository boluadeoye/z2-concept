import React, { useEffect } from "react";
import { PageHero } from "../components/shared/PageHero";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import GalleryGrid from "../components/gallery/GalleryGrid";

export default function PortfolioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <PageHero 
        title="Gallery" 
        breadcrumb="Gallery" 
        image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg" 
      />
      <ServiceTicker />
      <GalleryGrid />
    </main>
  );
}

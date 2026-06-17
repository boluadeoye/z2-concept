import React, { useEffect } from "react";
import { PageHero } from "../components/shared/PageHero";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import BlogGrid from "../components/blog/BlogGrid";
import PromoSection from "../components/home/PromoSection";

export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#FDF8F0]">
      <PageHero 
        title="Journal" 
        breadcrumb="Blog" 
        image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521121/blog_assets/hbgy9tg3xwufbzemj3v0.png" 
      />
      <ServiceTicker />
      <BlogGrid />
      <PromoSection />
    </main>
  );
}

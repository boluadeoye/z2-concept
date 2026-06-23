import React, { useEffect } from "react";
import { PageHero } from "../components/shared/PageHero";
import ServicesIntro from "../components/services/ServicesIntro";
import ServicesGrid from "../components/services/ServicesGrid";
import Testimonials from "../components/home/Testimonials";
import ContactSection from "../components/home/ContactSection";

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main>
      <PageHero 
        title="Services" 
        breadcrumb="Services" 
        image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137329/blog_assets/vubakrtom9syeaeravih.jpg" 
      />
      <ServicesIntro />
      <ServicesGrid />
      <Testimonials />
      <ContactSection />
    </main>
  );
}

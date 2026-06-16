import React, { useEffect } from "react";
import ServicesIntro from "../components/services/ServicesIntro";
import ServicesGrid from "../components/services/ServicesGrid";
import Testimonials from "../components/home/Testimonials";
import ContactSection from "../components/home/ContactSection";

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main>
      <ServicesIntro />
      <ServicesGrid />
      <Testimonials />
      <ContactSection />
    </main>
  );
}

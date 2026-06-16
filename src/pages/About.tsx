import React, { useEffect } from "react";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import AboutContent from "../components/about/AboutContent";

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main>
      <ServiceTicker />
      <AboutContent />
    </main>
  );
}

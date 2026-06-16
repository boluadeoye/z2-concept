import React, { useEffect } from "react";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

export default function PortfolioPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main>
      <ServiceTicker />
      <PortfolioGrid />
    </main>
  );
}

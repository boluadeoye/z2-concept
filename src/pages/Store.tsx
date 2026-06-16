import React, { useEffect } from "react";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import StoreGrid from "../components/store/StoreGrid";

export default function StorePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main>
      <ServiceTicker />
      <StoreGrid />
    </main>
  );
}

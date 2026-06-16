import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductMain from "../components/product/ProductMain";
import ProductTabs from "../components/product/ProductTabs";
import ProductCollection from "../components/home/ProductCollection";
import { Reveal } from "../components/shared/Reveal";
import { getSingleProduct } from "../lib/woocommerce";

export default function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      setLoading(true);
      const data = await getSingleProduct(id);
      setProduct(data);
      setLoading(false);
      window.scrollTo(0, 0);
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDF8F0]">
        <div className="text-black/20 font-black uppercase tracking-[0.5em] animate-pulse text-xl">
          Loading Product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-[#FDF8F0]">
        <h2 className="text-2xl font-black text-black uppercase">Product Not Found</h2>
        <Link to="/store" className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#FDF8F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        
        <div className="mb-10">
          <Link to="/store" className="inline-flex items-center gap-2 text-[11px] font-bold text-black/40 hover:text-[#FF6B35] transition-colors">
            ← Store / <span className="text-black">{product.name}</span>
          </Link>
        </div>

        <ProductMain product={product} />
        <ProductTabs attributes={product.attributes || []} />

        <div className="pt-24 border-t border-black/5">
          <Reveal>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">More products</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-black text-center mb-16 tracking-tight">Explore Our Frame Products</h2>
          </Reveal>
          <ProductCollection />
        </div>
      </div>
    </main>
  );
}

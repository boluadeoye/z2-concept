import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWPPortfolios } from "../../lib/woocommerce";

const categories = ["All", "Photography", "Video Coverage", "Website Development", "Graphic Design"];

const mockProjects = [
  { slug: "jessicas-wedding", title: "Jessica's Wedding Shoot", active: false, img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521115/blog_assets/ytxsfz4o5w7brat1zx4q.png" },
  { slug: "event-coverage", title: "Event Coverage", active: true, img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" },
  { slug: "unstoppable-print", title: "Unstoppable Print Website", active: false, img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521121/blog_assets/hbgy9tg3xwufbzemj3v0.png" }
];

export default function PortfolioGrid() {
  const [activeCat, setActiveCat] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function loadPortfolio() {
      const data = await getWPPortfolios();
      if (data && data.length > 0) {
        // Map the WP API properties to our layout format
        const mapped = data.map((item: any, i: number) => ({
          slug: item.slug,
          title: item.title?.rendered,
          active: i === 1, // Keep second item active as per Figma
          img: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521115/blog_assets/ytxsfz4o5w7brat1zx4q.png"
        }));
        setProjects(mapped);
      } else {
        setProductsFallback();
      }
    }
    
    function setProductsFallback() {
      setProjects(mockProjects);
    }

    loadPortfolio();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* ASYMMETRIC HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 items-end mb-20">
          <div className="flex flex-col items-start">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Our Works</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight leading-[1.1] max-w-2xl">
                Kefee Home Productions x Z2 Concepts your media partner
              </h2>
            </Reveal>
          </div>
          <div className="lg:text-right">
            <Reveal>
              <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-[40ch] lg:ml-auto">
                We offer the printing of graphics, text, logos, and other branding elements onto packaging materials...
              </p>
            </Reveal>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-24 pb-4 border-b border-black/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCat === cat ? "bg-[#FF6B35] text-white shadow-xl" : "bg-white border border-black/5 text-black/40 hover:border-black/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 mb-24">
          {projects.map((project, i) => (
            <Reveal key={i}>
              <Link to={`/portfolio/${project.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 shadow-lg border border-black/5">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className={`p-8 rounded-[28px] flex items-center justify-between transition-all duration-300 flex-1 min-h-[110px] ${
                  project.active ? "bg-[#FF6B35] text-white shadow-2xl" : "bg-white text-black border border-black/5"
                }`}>
                  <h3 className="text-[17px] font-bold uppercase leading-tight pr-4">
                    {project.title}
                  </h3>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    project.active ? "bg-white/20 text-white" : "bg-[#FF6B35]/10 text-[#FF6B35]"
                  }`}>
                    <ArrowUpRight size={22} strokeWidth={3} className="rotate-45" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from "react";
import { Tag, Calendar, MapPin, Globe, ArrowDownRight } from "lucide-react";

interface ProjectMetaProps {
  category?: string;
  date?: string;
  location?: string;
  website?: string;
}

export default function ProjectMeta({ category, date, location, website }: ProjectMetaProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const metaItems = [
    ...(category ? [{ icon: <Tag size={14} />, label: "Category", val: category }] : []),
    ...(formattedDate ? [{ icon: <Calendar size={14} />, label: "Date", val: formattedDate }] : []),
    ...(location ? [{ icon: <MapPin size={14} />, label: "Location", val: location }] : []),
    ...(website ? [{ icon: <Globe size={14} />, label: "Website", val: website }] : []),
  ];

  if (metaItems.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mb-8 border-b border-black/5 pb-8">
      {metaItems.map((item, i) => (
        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 bg-white/80 shadow-sm">
          <div className="text-[#FF6B35] flex items-center gap-1.5">
            <ArrowDownRight size={12} strokeWidth={3} />
            <span className="text-black font-bold text-[10px] uppercase tracking-tight">{item.label}:</span>
          </div>
          <span className="text-black/60 text-[10px] font-medium">{item.val}</span>
        </div>
      ))}
    </div>
  );
}

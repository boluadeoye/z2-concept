import React from "react";
import { Reveal } from "../shared/Reveal";

export default function IntroStatement() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#FDF8F0] text-center">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          {/* Title Case with targeted Orange Spans */}
          <h2 className="text-2xl md:text-5xl font-black text-black leading-[1.35] tracking-tight">
            Our company offer a wide range of media services, including{" "}
            <span className="text-[#FF6B35]">photography</span>, video production,{" "}
            <span className="text-[#FF6B35]">web development</span>, graphic design, and{" "}
            <span className="text-[#FF6B35]">more.</span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

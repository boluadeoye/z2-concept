import React from "react";
import { Reveal } from "../shared/Reveal";

interface AuthLayoutProps {
  children: React.ReactNode;
  image?: string;
}

export default function AuthLayout({ 
  children, 
  image = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" 
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden">
      
      {/* FULL PAGE BACKGROUND: The Wedding Car */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521102/blog_assets/skw6qc5r8hu7ajzgmuxh.png" 
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-[#FDF8F0]/85" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* TWO SEPARATE PILLARS WITH FIGMA GAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          
          {/* PILLAR 1: The Form Card */}
          <div className="flex flex-col h-full">
            <Reveal className="h-full">
              <div className="bg-white rounded-[48px] p-10 md:p-16 lg:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 h-full flex flex-col justify-center">
                {children}
              </div>
            </Reveal>
          </div>

          {/* PILLAR 2: The Separate Image Card (Pavilion Couple) */}
          <div className="hidden md:block h-full">
            <Reveal className="h-full">
              <div className="relative h-full w-full rounded-[48px] overflow-hidden shadow-2xl border border-black/5">
                <img 
                  src={image} 
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Authentication Visual"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </main>
  );
}

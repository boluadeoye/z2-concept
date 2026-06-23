import React from "react";
import { Reveal } from "../shared/Reveal";

interface AuthLayoutProps {
  children: React.ReactNode;
  image?: string;
}

export default function AuthLayout({
  children,
  image = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg"
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden">
      
      {/* FULL PAGE BACKGROUND: The Wedding Car Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg"
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-[#FDF8F0]/90 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* ASYMMETRIC PILLAR GRID: 1fr : 380px */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 items-stretch">
          
          {/* PILLAR 1: The Form Card */}
          <div className="flex flex-col h-full">
            <Reveal className="h-full">
              <div className="bg-white rounded-[48px] p-10 md:p-16 lg:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 h-full flex flex-col justify-center">
                {children}
              </div>
            </Reveal>
          </div>

          {/* PILLAR 2: The Stretched Image Card (Pavilion Couple) */}
          <div className="hidden md:block h-full">
            <Reveal className="h-full">
              <div className="relative h-full w-full rounded-[48px] overflow-hidden shadow-2xl border border-black/5 bg-white">
                <img
                  src={image}
                  className="absolute inset-0 w-full h-full object-cover object-[center_15%] antialiased"
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

import React from "react";
import { HeaderSection } from "./HeaderSection";

const Hero: React.FC = () => {
  return (
    <section className="w-full min-h-screen relative overflow-hidden">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(56, 156, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 85% 25%, rgba(209, 220, 251, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(227, 233, 252, 0.18) 0%, transparent 50%),
            radial-gradient(circle at 75% 85%, rgba(232, 243, 253, 0.14) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(251, 252, 255, 0.1) 0%, transparent 60%),
            #FBFCFF
          `
        }}
      />

      <div className="flex flex-col w-full h-full relative z-10">
        <HeaderSection />
      </div>
    </section>
  );
};

export default Hero;
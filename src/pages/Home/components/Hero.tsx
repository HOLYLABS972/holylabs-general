import { forwardRef } from "react";
import { HeaderSection } from "./HeaderSection";

const Hero = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <style>
        {`
          @keyframes spiral-rotate-1 {
            from { transform: rotate(90deg); }
            to { transform: rotate(450deg); }
          }
          
          @keyframes spiral-rotate-2 {
            from { transform: rotate(180deg); }
            to { transform: rotate(540deg); }
          }
          
          @keyframes spiral-rotate-3 {
            from { transform: rotate(270deg); }
            to { transform: rotate(630deg); }
          }
          
          @keyframes spiral-rotate-4 {
            from { transform: rotate(45deg); }
            to { transform: rotate(405deg); }
          }
          
          .spiral-bg {
            width: 100vw;
            height: 100vh;
          }
          
          .spiral-layer {
            transition: opacity 1s ease-in-out;
          }
          
          .spiral-layer:hover {
            animation-duration: 5s !important;
          }
        `}
      </style>
      <section ref={ref} className="w-full min-h-screen relative overflow-hidden">
        {/* Layered Gradient Spiral Background */}
        <div className="spiral-bg absolute inset-0 pointer-events-none z-0">
          {/* Spiral Layer 1 */}
          <div 
            className="spiral-layer absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(206deg, #f7f4f0 17%, #c8d4ff 27%, #8a9de0 37%, #2A6DCF 58%, #020030 74%)',
              transform: 'rotate(90deg)',
              animation: 'spiral-rotate-1 80s linear infinite',
              opacity: 0.6
            }}
          />
          
          {/* Spiral Layer 2 */}
          <div 
            className="spiral-layer absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(126deg, #fef9f5 12%, #dde6ff 32%, #a8bde5 52%, #327ACC 72%, #100540 92%)',
              transform: 'rotate(180deg)',
              animation: 'spiral-rotate-2 100s linear infinite reverse',
              opacity: 0.4
            }}
          />
          
          {/* Spiral Layer 3 */}
          <div 
            className="spiral-layer absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(46deg, #ffffff 8%, #e8f0ff 28%, #b5c8e8 48%, #4A8EE0 68%, #200C50 88%)',
              transform: 'rotate(270deg)',
              animation: 'spiral-rotate-3 120s linear infinite',
              opacity: 0.3
            }}
          />
          
          {/* Spiral Layer 4 */}
          <div 
            className="spiral-layer absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(326deg, #fafcff 5%, #d1dcff 25%, #9bb1eb 45%, #4C90E5 65%, #250A60 85%)',
              transform: 'rotate(45deg)',
              animation: 'spiral-rotate-4 140s linear infinite reverse',
              opacity: 0.2
            }}
          />
        </div>

        {/* Overlay for subtle blending */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'rgba(251, 252, 255, 0.7)'
          }}
        />

        <div className="flex flex-col w-full h-full relative z-10">
          <HeaderSection />
        </div>
      </section>
    </>
  );
});

export default Hero;
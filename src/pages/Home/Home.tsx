import React, { useRef, useEffect } from 'react';
import Hero from './components/Hero';
import ServicesOverview from './components/ServicesOverview';
import HowItWorks from './components/HowItWorks';
import ComprehensiveInsights from './components/ComprehensiveInsights';
import SocialProof from './components/SocialProof';
import { FAQ } from '../../components/FAQ';

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesOverviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && heroRef.current) { // Scrolling down
        const heroRect = heroRef.current.getBoundingClientRect();
        if (heroRect.bottom <= window.innerHeight) { // If Hero is fully in view or scrolled past its bottom
          if (servicesOverviewRef.current) {
            servicesOverviewRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('wheel', handleScroll);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <Hero ref={heroRef} />
      <ServicesOverview ref={servicesOverviewRef} />
      <HowItWorks />
   
      <ComprehensiveInsights />
      <SocialProof />
      
      <FAQ />
    </div>
  );
};

export default Home; 
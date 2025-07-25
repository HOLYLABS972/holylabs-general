import React from 'react';
import Hero from './components/Hero';
import ServicesOverview from './components/ServicesOverview';
import HowItWorks from './components/HowItWorks';
import ComprehensiveInsights from './components/ComprehensiveInsights';
import SocialProof from './components/SocialProof';
import { FAQ } from '../../components/FAQ';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <ServicesOverview />
      <HowItWorks />
   
      <ComprehensiveInsights />
      <SocialProof />
      
      <FAQ />
    </div>
  );
};

export default Home; 
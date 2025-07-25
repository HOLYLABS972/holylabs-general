import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      <main className="pt-0">
        {children}
      </main>
      <Footer />
      

    </div>
  );
};

export default Layout; 
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Layout from './layouts/Layout';
import { LoaderIcon } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';

import { MetaPixel } from './lib/metaPixel';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('./pages/Home/Home'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const About = React.lazy(() => import('./pages/About/About'));
const Contact = React.lazy(() => import('./pages/Contact/Contact'));
const Blog = React.lazy(() => import('./pages/Blog/Blog'));
const BlogPost = React.lazy(() => import('./pages/Blog/BlogPost'));
const Admin = React.lazy(() => import('./pages/Admin/Admin'));
const PrivacyPolicy = React.lazy(() => import('./pages/Legal/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/Legal/TermsOfService'));
const CookiePolicy = React.lazy(() => import('./pages/Legal/CookiePolicy'));
const GDPR = React.lazy(() => import('./pages/Legal/GDPR'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-[#FBFCFF] flex items-center justify-center">
    <LoaderIcon className="w-8 h-8 animate-spin text-[#389CFF]" />
  </div>
);

// SEO Component for dynamic meta tags
const SEOUpdater: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const updateSEO = () => {
      // Check for language parameter in URL on page load
      const urlParams = new URLSearchParams(location.search);
      const langParam = urlParams.get('lang') as 'en' | 'he' | null;
      
      if (langParam && (langParam === 'en' || langParam === 'he') && langParam !== language) {
        setLanguage(langParam);
        // Clean up the URL parameter after setting the language
        urlParams.delete('lang');
        const newUrl = `${location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}${location.hash}`;
        window.history.replaceState({}, '', newUrl);
        return; // Exit early, useEffect will run again with new language
      }
      
      const baseUrl = 'https://www.theholylabs.com';
      const currentUrl = `${baseUrl}${location.pathname}`;
      
      // Update language attribute
      document.documentElement.lang = language;
      
      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', currentUrl);
      
      // Update hreflang attributes
      const hreflangEn = document.querySelector('link[hreflang="en"]');
      const hreflangHe = document.querySelector('link[hreflang="he"]');
      
      if (hreflangEn) hreflangEn.setAttribute('href', currentUrl);
      if (hreflangHe) hreflangHe.setAttribute('href', currentUrl);
      
      // Update Open Graph URL
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', currentUrl);
      
      // Update Twitter URL
      const twitterUrl = document.querySelector('meta[name="twitter:url"]');
      if (!twitterUrl) {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'twitter:url');
        meta.setAttribute('content', currentUrl);
        document.head.appendChild(meta);
      } else {
        twitterUrl.setAttribute('content', currentUrl);
      }
      
      // Track page view with Meta Pixel
      MetaPixel.trackPageView();
      
      // Initialize pixel if this is the first load
      if (location.pathname === '/' || location.pathname === '/index.html') {
        MetaPixel.init();
      }
    };

    updateSEO();
  }, [language, location.pathname]);

  return null;
};

function App() {
  return (
    <LanguageProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <SEOUpdater />
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/gdpr" element={<GDPR />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import ProjectDetail from '@/pages/ProjectDetail';
import AboutUs from '@/pages/AboutUs';
import Shop from '@/pages/Shop';
import Blogs from '@/pages/Blogs';
import BlogDetail from '@/pages/BlogDetail';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsConditions from '@/pages/TermsConditions';

// New Pages
import PackagesPage from '@/pages/PackagesPage';
import OurWorkPage from '@/pages/OurWorkPage';
import ServiceWebDevelopment from '@/pages/services/ServiceWebDevelopment';
import ServiceBrandingDesign from '@/pages/services/ServiceBrandingDesign';
import ServiceVideoAnimation from '@/pages/services/ServiceVideoAnimation';
import ServiceSocialMediaManagement from '@/pages/services/ServiceSocialMediaManagement';
import ServiceAIAutomation from '@/pages/services/ServiceAIAutomation';
import ServiceSEODigitalMarketing from '@/pages/services/ServiceSEODigitalMarketing';

// Subpages
import BusinessWebsiteDesign from '@/pages/services/sub/BusinessWebsiteDesign';
import EcommerceWebsiteDesign from '@/pages/services/sub/EcommerceWebsiteDesign';
import MobileAppDevelopment from '@/pages/services/sub/MobileAppDevelopment';
import LogoDesign from '@/pages/services/sub/LogoDesign';
import ThumbnailDesign from '@/pages/services/sub/ThumbnailDesign';
import LogoAnimation from '@/pages/services/sub/LogoAnimation';
import ExplainerVideos from '@/pages/services/sub/ExplainerVideos';
import SEOServices from '@/pages/services/sub/SEOServices';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Redirect /services to /services/web-development as requested */}
            <Route path="/services" element={<Navigate to="/services/web-development" replace />} />

            {/* Main Categories */}
            <Route path="/services/web-development" element={<ServiceWebDevelopment />} />
            <Route path="/services/branding-design" element={<ServiceBrandingDesign />} />
            <Route path="/services/video-animation" element={<ServiceVideoAnimation />} />
            <Route path="/services/social-media-management" element={<ServiceSocialMediaManagement />} />
            <Route path="/services/ai-automation" element={<ServiceAIAutomation />} />
            <Route path="/services/seo-digital-marketing" element={<ServiceSEODigitalMarketing />} />

            {/* Sub Categories */}
            <Route path="/services/web-development/business-website-design" element={<BusinessWebsiteDesign />} />
            <Route path="/services/web-development/ecommerce-website-design" element={<EcommerceWebsiteDesign />} />
            <Route path="/services/web-development/mobile-app-development" element={<MobileAppDevelopment />} />
            
            <Route path="/services/branding-design/logo-design" element={<LogoDesign />} />
            <Route path="/services/branding-design/thumbnail-design" element={<ThumbnailDesign />} />
            
            <Route path="/services/video-animation/logo-animation" element={<LogoAnimation />} />
            <Route path="/services/video-animation/explainer-videos" element={<ExplainerVideos />} />
            
            <Route path="/services/seo-digital-marketing/seo-services" element={<SEOServices />} />
            
            {/* Old Individual Service Routes Redirects */}
            <Route path="/services/websites" element={<Navigate to="/services/web-development" replace />} />
            <Route path="/services/branding" element={<Navigate to="/services/branding-design" replace />} />
            <Route path="/services/animations" element={<Navigate to="/services/video-animation" replace />} />
            <Route path="/services/video-editing" element={<Navigate to="/services/video-animation" replace />} />
            <Route path="/services/design" element={<Navigate to="/services/branding-design" replace />} />
            <Route path="/services/ai-tech" element={<Navigate to="/services/ai-automation" replace />} />

            {/* Other Pages */}
            <Route path="/packages" element={<PackagesPage />} />
            
            <Route path="/our-work" element={<OurWorkPage />} />
            <Route path="/portfolio" element={<Navigate to="/our-work" replace />} />
            
            <Route path="/our-work/:id" element={<ProjectDetail />} />
            <Route path="/portfolio/:id" element={<Navigate to="/our-work" replace />} />
            
            <Route path="/about" element={<AboutUs />} />
            <Route path="/shop" element={<Shop />} />
            
            {/* Insights / Blogs */}
            <Route path="/insights" element={<Blogs />} />
            <Route path="/insights/:id" element={<BlogDetail />} />
            <Route path="/blogs" element={<Navigate to="/insights" replace />} />
            <Route path="/blogs/:id" element={<Navigate to="/insights/:id" replace />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </HelmetProvider>
  );
}

export default App;
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Breadcrumb from '@/components/Breadcrumb';

const Layout = ({ children }) => {
  const location = useLocation();
  const showBreadcrumb = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-orange-500/30 selection:text-orange-900">
      <Navbar />
      <div className="pt-[122px]">
        {showBreadcrumb && <Breadcrumb />}
        <main>
          {children}
        </main>
      </div>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Layout;
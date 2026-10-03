'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Breadcrumb from '@/components/Breadcrumb';
import MobileActionBar from '@/components/MobileActionBar';

const Layout = ({ children }) => {
  const pathname = usePathname();
  const showBreadcrumb = pathname !== '/';

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
      <MobileActionBar />
    </div>
  );
};

export default Layout;
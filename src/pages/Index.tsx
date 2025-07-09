
import React, { lazy, Suspense } from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import MobileOptimizedSkeleton from '@/components/MobileOptimizedSkeleton';
import { useTheme } from '@/contexts/ThemeContext';

// Performance-optimized lazy loading with mobile-first approach
const ServicesSection = lazy(() => 
  import('@/components/Home/ServicesSection').then(module => ({
    default: module.default
  }))
);

const AboutSection = lazy(() => 
  import('@/components/Home/AboutSection').then(module => ({
    default: module.default
  }))
);

const PortfolioGrid = lazy(() => 
  import('@/components/Portfolio/PortfolioGrid').then(module => ({
    default: module.default
  }))
);

const ClientReviews = lazy(() => 
  import('@/components/Home/ClientReviews').then(module => ({
    default: module.default
  }))
);

const TrustedPartners = lazy(() => 
  import('@/components/Home/TrustedPartners').then(module => ({
    default: module.default
  }))
);

const FAQSection = lazy(() => 
  import('@/components/Home/FAQSection').then(module => ({
    default: module.default
  }))
);

const BlogSection = lazy(() => 
  import('@/components/Home/BlogSection').then(module => ({
    default: module.default
  }))
);

const ContactSection = lazy(() => 
  import('@/components/Home/ContactSection').then(module => ({
    default: module.default
  }))
);

const SupabaseStatus = lazy(() => 
  import('@/components/SupabaseStatus').then(module => ({
    default: module.default
  }))
);

// Mobile-optimized loading components
const SectionLoader = ({ height = "h-32" }: { height?: string }) => (
  <div className="py-8">
    <MobileOptimizedSkeleton height={height} rows={4} />
  </div>
);

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <Layout>
      {/* Supabase Status - Non-blocking */}
      <Suspense fallback={null}>
        <div className="fixed top-4 right-4 z-50">
          <SupabaseStatus />
        </div>
      </Suspense>
      
      {/* Hero Section - Critical, load immediately */}
      <section id="hero-section">
        <HeroSection />
      </section>
      
      {/* About Section - Optimized for mobile */}
      <section id="about-section">
        <Suspense fallback={<SectionLoader height="h-24" />}>
          <AboutSection />
        </Suspense>
      </section>
      
      {/* Services Section - Mobile-first loading */}
      <section id="services-section">
        <Suspense fallback={<SectionLoader height="h-40" />}>
          <ServicesSection />
        </Suspense>
      </section>
      
      {/* Portfolio Section */}
      <section id="portfolio-section" className={`py-16 ${theme === 'light' ? 'bg-background' : 'bg-slate-900'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Portfolio</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Discover our latest projects showcasing cutting-edge technology solutions that 
              have transformed businesses across various industries.
            </p>
          </div>
        </div>
        <Suspense fallback={<SectionLoader height="h-48" />}>
          <PortfolioGrid />
        </Suspense>
      </section>
      
      {/* Client Reviews */}
      <Suspense fallback={<SectionLoader height="h-32" />}>
        <ClientReviews />
      </Suspense>
      
      {/* Trusted Partners */}
      <Suspense fallback={<SectionLoader height="h-20" />}>
        <TrustedPartners />
      </Suspense>
      
      {/* Blog Section */}
      <section id="blog-section">
        <Suspense fallback={<SectionLoader height="h-40" />}>
          <BlogSection />
        </Suspense>
      </section>
      
      {/* FAQ Section */}
      <Suspense fallback={<SectionLoader height="h-36" />}>
        <FAQSection />
      </Suspense>
      
      {/* Contact Section */}
      <section id="contact-section">
        <Suspense fallback={<SectionLoader height="h-48" />}>
          <ContactSection />
        </Suspense>
      </section>
    </Layout>
  );
};

export default Index;

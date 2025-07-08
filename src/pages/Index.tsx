
import React, { lazy, Suspense } from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import { useTheme } from '@/contexts/ThemeContext';

// Immediate loading components
const AboutSection = lazy(() => import('@/components/Home/AboutSection'));

// Delayed loading components with better chunking
const ServicesSection = lazy(() => 
  import('@/components/Home/ServicesSection').then(module => {
    // Add a small delay to prevent blocking
    return new Promise(resolve => {
      setTimeout(() => resolve(module), 100);
    });
  })
);

const PortfolioGrid = lazy(() => 
  import('@/components/Portfolio/PortfolioGrid').then(module => {
    return new Promise(resolve => {
      setTimeout(() => resolve(module), 200);
    });
  })
);

// Lower priority components
const ClientReviews = lazy(() => import('@/components/Home/ClientReviews'));
const TrustedPartners = lazy(() => import('@/components/Home/TrustedPartners'));
const FAQSection = lazy(() => import('@/components/Home/FAQSection'));
const BlogSection = lazy(() => import('@/components/Home/BlogSection'));
const ContactSection = lazy(() => import('@/components/Home/ContactSection'));
const SupabaseStatus = lazy(() => import('@/components/SupabaseStatus'));

// Optimized loading placeholder
const SectionLoader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Skeleton loader for better perceived performance
const SkeletonLoader = ({ height = "py-16" }: { height?: string }) => (
  <div className={`${height} animate-pulse`}>
    <div className="container mx-auto px-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 max-w-md mx-auto"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8 max-w-2xl mx-auto"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <Layout>
      {/* Supabase Status - Lowest priority */}
      <Suspense fallback={null}>
        <div className="fixed top-4 right-4 z-50">
          <SupabaseStatus />
        </div>
      </Suspense>
      
      {/* Hero Section - Critical, immediate load */}
      <section id="hero-section">
        <HeroSection />
      </section>
      
      {/* About Section - High priority */}
      <section id="about-section">
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </section>
      
      {/* Services Section - Medium priority with skeleton */}
      <section id="services-section">
        <Suspense fallback={<SkeletonLoader />}>
          <ServicesSection />
        </Suspense>
      </section>
      
      {/* Portfolio Section - Medium priority */}
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
        <Suspense fallback={<SkeletonLoader height="py-8" />}>
          <PortfolioGrid />
        </Suspense>
      </section>
      
      {/* Lower priority sections with intersection observer optimization */}
      <Suspense fallback={<SectionLoader />}>
        <ClientReviews />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TrustedPartners />
      </Suspense>
      
      <section id="blog-section">
        <Suspense fallback={<SectionLoader />}>
          <BlogSection />
        </Suspense>
      </section>
      
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>
      
      <section id="contact-section">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </section>
    </Layout>
  );
};

export default Index;

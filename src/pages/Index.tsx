
import React, { lazy, Suspense } from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import { useTheme } from '@/contexts/ThemeContext';

// Lazy load non-critical sections to improve initial page load
const ServicesSection = lazy(() => import('@/components/Home/ServicesSection'));
const AboutSection = lazy(() => import('@/components/Home/AboutSection'));
const PortfolioGrid = lazy(() => import('@/components/Portfolio/PortfolioGrid'));
const ClientReviews = lazy(() => import('@/components/Home/ClientReviews'));
const TrustedPartners = lazy(() => import('@/components/Home/TrustedPartners'));
const FAQSection = lazy(() => import('@/components/Home/FAQSection'));
const BlogSection = lazy(() => import('@/components/Home/BlogSection'));
const ContactSection = lazy(() => import('@/components/Home/ContactSection'));
const SupabaseStatus = lazy(() => import('@/components/SupabaseStatus'));

// Lightweight loading placeholder
const SectionLoader = () => (
  <div className="flex justify-center items-center py-16">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const { theme } = useTheme();
  
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* Supabase Status Indicator - Lazy loaded */}
      <Suspense fallback={null}>
        <div className="fixed top-4 right-4 z-50">
          <SupabaseStatus />
        </div>
      </Suspense>
      
      {/* Hero Section - Critical, load immediately */}
      <section id="hero-section">
        <HeroSection />
      </section>
      
      {/* About Section - Below the fold, lazy load */}
      <section id="about-section">
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </section>
      
      {/* Services Section - Below the fold, lazy load */}
      <section id="services-section">
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
      </section>
      
      {/* Portfolio Section - Below the fold, lazy load */}
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
        <Suspense fallback={<SectionLoader />}>
          <PortfolioGrid />
        </Suspense>
      </section>
      
      {/* Client Reviews - Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <ClientReviews />
      </Suspense>
      
      {/* Trusted Partners - Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <TrustedPartners />
      </Suspense>
      
      {/* Blog Section - Lazy load */}
      <section id="blog-section">
        <Suspense fallback={<SectionLoader />}>
          <BlogSection />
        </Suspense>
      </section>
      
      {/* FAQ Section - Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <FAQSection />
      </Suspense>
      
      {/* Contact Section - Lazy load */}
      <section id="contact-section">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </section>
    </Layout>
  );
};

export default Index;


import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ServicesGrid from './ServicesGrid';
import ServicesNavigation from './ServicesNavigation';
import { staticServices } from './ServicesData';

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();
  const servicesPerPage = 6;

  // Keyboard navigation with cleanup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex + servicesPerPage < staticServices.length) {
      setCurrentIndex(currentIndex + servicesPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - servicesPerPage);
    }
  };

  const currentServices = staticServices.slice(currentIndex, currentIndex + servicesPerPage);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + servicesPerPage < staticServices.length;

  return (
    <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`} id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Our Services
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Comprehensive digital solutions tailored to transform your business and drive growth
          </p>
          <p className="text-base text-blue-600 font-semibold">
            ✨ Discover services that will revolutionize your business ✨
          </p>
        </div>

        <div className="relative">
          {/* Top Navigation */}
          <ServicesNavigation
            currentIndex={currentIndex}
            totalServices={staticServices.length}
            servicesPerPage={servicesPerPage}
            onPrev={handlePrev}
            onNext={handleNext}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
          />

          {/* Services Grid */}
          <ServicesGrid services={currentServices} />

          {/* Bottom Navigation */}
          <ServicesNavigation
            currentIndex={currentIndex}
            totalServices={staticServices.length}
            servicesPerPage={servicesPerPage}
            onPrev={handlePrev}
            onNext={handleNext}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
          />
          
          {/* Keyboard Navigation Hint */}
          <div className="text-center">
            <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Use ← → arrow keys to navigate or click the arrows above/below
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

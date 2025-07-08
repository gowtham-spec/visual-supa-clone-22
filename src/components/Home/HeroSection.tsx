
import React, { lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Star, Check } from 'lucide-react';

// Lazy load heavy 3D components
const SpaceBackground = lazy(() => import('./SpaceBackground'));
const HeroAnimation = lazy(() => import('./HeroAnimation'));

// Lightweight fallback components for better perceived performance
const SpaceBackgroundFallback = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"></div>
);

const HeroAnimationFallback = () => (
  <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"></div>
);

const HeroSection = () => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      <Suspense fallback={<SpaceBackgroundFallback />}>
        <SpaceBackground />
      </Suspense>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Immediate load */}
          <div className="text-center lg:text-left space-y-10">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Your{' '}
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                  Digital Vision
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                We create exceptional digital experiences that drive growth, engage audiences, and deliver measurable results for forward-thinking businesses.
              </p>
            </div>

            {/* Feature boxes - Optimized rendering */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: 'Cutting-edge', subtitle: 'Solutions', color: 'blue' },
                { icon: Shield, title: 'Results-driven', subtitle: 'Strategy', color: 'purple' },
                { icon: Check, title: 'Client-focused', subtitle: 'Success', color: 'green' }
              ].map(({ icon: Icon, title, subtitle, color }, index) => (
                <div key={index} className="flex items-center space-x-3 p-5 rounded-lg bg-background/50 backdrop-blur-sm border">
                  <div className={`p-3 rounded-lg bg-${color}-500/10`}>
                    <Icon className={`h-5 w-5 text-${color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 text-lg"
                onClick={scrollToPortfolio}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 px-10 py-4 bg-background hover:bg-muted/50 text-lg"
              >
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right Side - Lazy loaded animation */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Suspense fallback={<HeroAnimationFallback />}>
                <HeroAnimation />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

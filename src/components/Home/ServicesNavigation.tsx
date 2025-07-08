
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ServicesNavigationProps {
  currentIndex: number;
  totalServices: number;
  servicesPerPage: number;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

const ServicesNavigation: React.FC<ServicesNavigationProps> = ({
  currentIndex,
  totalServices,
  servicesPerPage,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-between items-center mb-6 px-4">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onPrev} 
        disabled={!canGoPrev} 
        className={`w-10 h-10 rounded-full border-2 hover:bg-white transition-all duration-300 shadow-lg ${
          theme === 'light' 
            ? 'bg-white/90 backdrop-blur text-gray-900 hover:text-gray-900' 
            : 'bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 border-slate-600'
        }`}
      >
        <ChevronLeft className={`h-5 w-5 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
      </Button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.ceil(totalServices / servicesPerPage) }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / servicesPerPage) === index
                ? theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'
                : theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onNext} 
        disabled={!canGoNext} 
        className={`w-10 h-10 rounded-full border-2 hover:bg-white transition-all duration-300 shadow-lg ${
          theme === 'light' 
            ? 'bg-white/90 backdrop-blur text-gray-900 hover:text-gray-900' 
            : 'bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 border-slate-600'
        }`}
      >
        <ChevronRight className={`h-5 w-5 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
      </Button>
    </div>
  );
};

export default ServicesNavigation;

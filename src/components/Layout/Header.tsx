
import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const { theme } = useTheme();
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleButtonClick = (buttonName: string) => {
    setClickedButton(buttonName);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setClickedButton(null);
    }, 200);
  };

  const getButtonClasses = (path: string, buttonName: string) => {
    const isClicked = clickedButton === buttonName;
    const activeRoute = isActive(path);
    
    let baseClasses = "relative px-4 py-2 rounded-md transition-all duration-200 ";
    
    if (isClicked) {
      baseClasses += theme === 'dark' 
        ? "bg-white/10 text-blue-400" 
        : "bg-black/10 text-blue-600";
    } else if (activeRoute) {
      baseClasses += theme === 'dark' 
        ? "text-blue-400" 
        : "text-blue-600";
    } else {
      baseClasses += theme === 'dark' 
        ? "text-white hover:text-blue-400" 
        : "text-black hover:text-blue-600";
    }
    
    return baseClasses;
  };

  const navigationItems = [
    { name: 'Home', path: '/', buttonName: 'home' },
    { name: 'Portfolio', path: '/portfolio', buttonName: 'portfolio' },
    { name: 'About Us', path: '/about-us', buttonName: 'about' },
    { name: 'Reviews', path: '/reviews', buttonName: 'reviews' },
    { name: 'Careers', path: '/careers', buttonName: 'careers' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <HeaderLogo />
          
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={getButtonClasses(item.path, item.buttonName)}
                onClick={() => handleButtonClick(item.buttonName)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={getButtonClasses(item.path, item.buttonName)}
                  onClick={() => {
                    handleButtonClick(item.buttonName);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

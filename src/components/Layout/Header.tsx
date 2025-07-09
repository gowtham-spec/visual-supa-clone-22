
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import HeaderLogo from './HeaderLogo';
import { useTheme } from '@/contexts/ThemeContext';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, isAdmin } = useAdmin();

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      scrollToSection('hero-section');
    } else {
      navigate('/');
    }
  };

  const handleAboutClick = () => {
    scrollToSection('about-section');
  };

  const handleReviewsClick = () => {
    if (location.pathname === '/reviews') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/reviews');
    }
    setIsMenuOpen(false);
  };

  const handleNewsClick = () => {
    navigate('/news');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  const handleCareersClick = () => {
    navigate('/careers');
    setIsMenuOpen(false);
  };

  const handleNavClick = (itemName: string, action: () => void) => {
    setActiveNavItem(itemName);
    action();
    setTimeout(() => {
      setActiveNavItem(null);
    }, 300);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/', action: handleHomeClick },
    { name: 'About', path: '/about-us', action: handleAboutClick },
    { name: 'Services', path: '/services', action: () => scrollToSection('services-section') },
    { name: 'Portfolio', path: '/portfolio', action: () => scrollToSection('portfolio-section') },
    { name: 'Blog', path: '/blog', action: () => scrollToSection('blog-section') },
    { name: 'News', path: '/news', action: handleNewsClick },
    { name: 'Reviews', path: '/reviews', action: handleReviewsClick },
    { name: 'Careers', path: '/careers', action: handleCareersClick },
    { name: 'Contact', path: '/#contact', action: () => scrollToSection('contact-section') },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getUserDisplayName = () => {
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getNavButtonClass = (itemName: string, isActive: boolean) => {
    const baseClass = "text-sm font-medium transition-all duration-300 relative px-3 py-2 rounded-md";
    const isClicked = activeNavItem === itemName;
    
    if (isClicked) {
      const boxColor = theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
      const textColor = theme === 'light' ? '#3B82F6' : '#60A5FA';
      return `${baseClass} transform scale-105 shadow-md transition-all duration-300`
        + ` ${theme === 'light' ? 'bg-black/10' : 'bg-white/10'}`
        + ` ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`;
    }
    
    if (isActive) {
      return `${baseClass} text-blue-600`;
    }
    
    return `${baseClass} ${
      theme === 'light'
        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
        : 'text-gray-300 hover:text-blue-400 hover:bg-slate-800'
    }`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'light' ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-700'}`}>
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <HeaderLogo />
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name, item.action)}
                  className={getNavButtonClass(item.name, isActivePath(item.path))}
                  style={{
                    ...(activeNavItem === item.name && {
                      backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      color: theme === 'light' ? '#3B82F6' : '#60A5FA',
                    })
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Theme toggle and Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`p-2 ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-slate-800'}`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* User Profile or Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-slate-800'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                    theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'
                  }`}>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className={`flex items-center px-4 py-2 text-sm transition-colors ${
                          theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'
                        }`}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`flex items-center px-4 py-2 text-sm transition-colors ${
                            theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'
                          }`}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                          theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'
                        }`}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`p-2 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-800'}`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-800'}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-slate-700'}`}>
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name, item.action)}
                  className={`text-sm font-medium transition-all duration-300 text-left px-3 py-2 rounded-md ${
                    activeNavItem === item.name
                      ? `${theme === 'light' ? 'bg-black/10 text-blue-600' : 'bg-white/10 text-blue-400'} transform scale-105`
                      : isActivePath(item.path)
                      ? 'text-blue-600'
                      : theme === 'light'
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-slate-800'
                  }`}
                  style={{
                    ...(activeNavItem === item.name && {
                      backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      color: theme === 'light' ? '#3B82F6' : '#60A5FA',
                    })
                  }}
                >
                  {item.name}
                </button>
              ))}
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <div className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Welcome, {getUserDisplayName()}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-fit">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  </Button>
                  {isAdmin && (
                    <Button asChild variant="outline" size="sm" className="w-fit">
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                    </Button>
                  )}
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    variant="outline" 
                    size="sm" 
                    className="w-fit"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-fit">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

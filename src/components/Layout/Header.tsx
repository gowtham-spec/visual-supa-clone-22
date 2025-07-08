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
  const location = useLocation();
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    user,
    isAdmin
  } = useAdmin();
  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };
  const handleAboutClick = () => {
    scrollToSection('about-section');
  };
  const handleReviewsClick = () => {
    if (location.pathname === '/reviews') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate('/reviews');
    }
    setIsMenuOpen(false);
  };
  const handleNewsClick = () => {
    navigate('/news');
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
    setIsMenuOpen(false);
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
  };
  const navItems = [{
    name: 'Home',
    path: '/',
    action: () => scrollToSection('hero-section')
  }, {
    name: 'About',
    path: '/about-us',
    action: handleAboutClick
  }, {
    name: 'Services',
    path: '/services',
    action: () => scrollToSection('services-section')
  }, {
    name: 'Portfolio',
    path: '/portfolio',
    action: () => scrollToSection('portfolio-section')
  }, {
    name: 'Blog',
    path: '/blog',
    action: () => scrollToSection('blog-section')
  }, {
    name: 'News',
    path: '/news',
    action: handleNewsClick
  }, {
    name: 'Reviews',
    path: '/reviews',
    action: handleReviewsClick
  }, {
    name: 'Contact',
    path: '/#contact',
    action: () => scrollToSection('contact-section')
  }];
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const getUserDisplayName = () => {
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'light' ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-700'}`}>
      <nav className="container mx-auto px-4 py-2" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <HeaderLogo />
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              {navItems.map(item => <button key={item.name} onClick={item.action} aria-label={`Navigate to ${item.name} section`} className="">
                  {item.name}
                </button>)}
            </div>
          </div>

          {/* Right side - Theme toggle and Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} className={`p-3 min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-slate-800'}`}>
              {theme === 'light' ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
            </Button>

            {/* User Profile or Sign In */}
            {user ? <div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} aria-label={`User menu for ${getUserDisplayName()}`} aria-expanded={isUserMenuOpen} aria-haspopup="menu" className={`flex items-center space-x-2 px-3 py-2 min-h-[44px] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-slate-800'}`}>
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>

                {isUserMenuOpen && <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'}`} role="menu" aria-label="User account menu">
                    <div className="py-2">
                      <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} role="menuitem" className={`flex items-center px-4 py-2 text-sm min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'}`}>
                        <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                        Profile Settings
                      </Link>
                      {isAdmin && <Link to="/admin" onClick={() => setIsUserMenuOpen(false)} role="menuitem" className={`flex items-center px-4 py-2 text-sm min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'}`}>
                          <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                          Admin Dashboard
                        </Link>}
                      <button onClick={handleSignOut} role="menuitem" aria-label="Sign out of your account" className={`flex items-center w-full px-4 py-2 text-sm min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-700'}`}>
                        <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                        Sign Out
                      </button>
                    </div>
                  </div>}
              </div> : <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Link to="/auth" aria-label="Sign in to your account">Sign In</Link>
              </Button>}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} className={`p-3 min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-800'}`}>
              {theme === 'light' ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
            </Button>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMenuOpen} aria-controls="mobile-menu" className={`p-3 min-h-[44px] min-w-[44px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300 hover:bg-slate-800'}`}>
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div id="mobile-menu" className={`lg:hidden mt-4 pb-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-slate-700'}`} role="menu" aria-label="Mobile navigation menu">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map(item => <button key={item.name} onClick={item.action} role="menuitem" aria-label={`Navigate to ${item.name} section`} className={`text-sm font-medium transition-colors duration-200 text-left min-h-[44px] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${isActivePath(item.path) ? 'text-blue-600 bg-blue-50' : theme === 'light' ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' : 'text-gray-300 hover:text-blue-400 hover:bg-slate-800'}`}>
                  {item.name}
                </button>)}
              
              {user ? <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                  <div className={`text-sm px-3 py-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Welcome, {getUserDisplayName()}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-fit min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} aria-label="Go to profile settings">Profile</Link>
                  </Button>
                  {isAdmin && <Button asChild variant="outline" size="sm" className="w-fit min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)} aria-label="Go to admin dashboard">Admin Dashboard</Link>
                    </Button>}
                  <Button onClick={() => {
              handleSignOut();
              setIsMenuOpen(false);
            }} variant="outline" size="sm" aria-label="Sign out of your account" className="w-fit min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Sign Out
                  </Button>
                </div> : <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-fit min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)} aria-label="Sign in to your account">Sign In</Link>
                </Button>}
            </div>
          </div>}
      </nav>
    </header>;
};
export default Header;
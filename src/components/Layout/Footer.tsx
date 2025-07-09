
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import FooterLogo from './FooterLogo';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogClick = () => {
    if (window.location.pathname === '/') {
      // If on home page, scroll to blog section
      const element = document.getElementById('blog-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page and then scroll to blog section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('blog-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleCaseStudiesClick = () => {
    navigate('/portfolio');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className={`${theme === 'light' ? 'bg-white text-gray-600 border-gray-200' : 'bg-slate-900 text-gray-300 border-slate-700'} border-t relative z-30`}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <FooterLogo />
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm">info@marzelet.info</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm">+91-9629997391</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm">No.7, College Road, Opp. St. Peter's Engineering College, Avadi Chennai-54</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/web-development" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Web Design & Development</Link></li>
              <li><Link to="/services/mobile-development" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Mobile App Development</Link></li>
              <li><Link to="/services/software-development" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Software Development</Link></li>
              <li><Link to="/services/digital-marketing" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Digital Marketing</Link></li>
              <li><Link to="/services/erp-crm" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Custom ERP/CRM Development</Link></li>
              <li><Link to="/services/iot-embedded" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>IoT & Embedded Solutions</Link></li>
              <li><Link to="/services/seo-branding" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>SEO & Branding</Link></li>
              <li><Link to="/services/email-marketing" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Email Marketing Services</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>About Us</Link></li>
              <li><Link to="/our-team" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Our Team</Link></li>
              <li><Link to="/careers" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Careers</Link></li>
              <li><Link to="/news" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>News</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Resources</h3>
            <ul className="space-y-2">
              <li><button onClick={handleBlogClick} className={`text-sm transition-colors text-left ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Blog</button></li>
              <li><button onClick={handleCaseStudiesClick} className={`text-sm transition-colors text-left ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Case Studies</button></li>
              <li><Link to="/documentation" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Documentation</Link></li>
              <li><Link to="/support-center" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Support Center</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Terms of Service</Link></li>
              <li><Link to="/cookie-policy" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>Cookie Policy</Link></li>
              <li><Link to="/gdpr-compliance" onClick={scrollToTop} className={`text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'}`}>GDPR Compliance</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${theme === 'light' ? 'border-gray-200' : 'border-slate-700'} mt-12 pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`text-sm text-center md:text-left ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2025 Marzelet. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-3">
                <a href="#" className={`transition-colors ${theme === 'light' ? 'text-gray-400 hover:text-blue-600' : 'text-gray-500 hover:text-blue-400'}`}>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className={`transition-colors ${theme === 'light' ? 'text-gray-400 hover:text-blue-600' : 'text-gray-500 hover:text-blue-400'}`}>
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className={`transition-colors ${theme === 'light' ? 'text-gray-400 hover:text-blue-600' : 'text-gray-500 hover:text-blue-400'}`}>
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              <button 
                onClick={scrollToTop}
                className="ml-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowRight, Code, Smartphone, Database, BarChart3, Server, Shield, Settings, Zap, Search, Palette, Monitor, Headphones, GraduationCap, Mail, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

// Static services data with updated web development name and proper service IDs
const staticServices = [{
  id: 'web-development',
  name: 'Web Design & Web Development',
  short_description: 'Transform your digital presence with cutting-edge websites that captivate and convert.',
  icon: 'code',
  color: 'bg-blue-500',
  features: ['Responsive Design', 'Modern Frameworks', 'SEO Optimized', 'Fast Loading'],
  catchyText: '🚀 Launch your digital empire with stunning websites!'
}, {
  id: 'mobile-development',
  name: 'Mobile App Development',
  short_description: 'Bring your ideas to life with powerful mobile apps that users love and can\'t put down.',
  icon: 'smartphone',
  color: 'bg-purple-500',
  features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
  catchyText: '📱 Turn your vision into the next big app sensation!'
}, {
  id: 'data-analytics',
  name: 'Data Analytics',
  short_description: 'Unlock hidden insights and make data-driven decisions that skyrocket your business growth.',
  icon: 'bar-chart',
  color: 'bg-indigo-500',
  features: ['Business Intelligence', 'Data Visualization', 'Predictive Analytics', 'Reporting'],
  catchyText: '📊 Transform raw data into pure business gold!'
}, {
  id: 'ui-ux-design',
  name: 'UI/UX Design',
  short_description: 'Create magical user experiences that turn visitors into loyal customers and brand advocates.',
  icon: 'palette',
  color: 'bg-green-500',
  features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  catchyText: '🎨 Design experiences that leave users speechless!'
}, {
  id: 'software-development',
  name: 'Software Development',
  short_description: 'Build robust, scalable software solutions that power your business to new heights.',
  icon: 'monitor',
  color: 'bg-teal-500',
  features: ['Desktop Applications', 'Enterprise Software', 'API Development', 'System Integration'],
  catchyText: '💻 Engineer software that changes the game!'
}, {
  id: 'digital-marketing',
  name: 'Digital Marketing',
  short_description: 'Dominate the digital landscape and watch your brand become the talk of the internet.',
  icon: 'search',
  color: 'bg-orange-500',
  features: ['Social Media Marketing', 'PPC Campaigns', 'Content Marketing', 'Analytics'],
  catchyText: '🎯 Make your brand impossible to ignore online!'
}, {
  id: 'it-infrastructure',
  name: 'IT Infrastructure Services',
  short_description: 'Build bulletproof IT foundations that keep your business running smoothly 24/7.',
  icon: 'server',
  color: 'bg-gray-500',
  features: ['Network Setup', 'Server Management', 'Cloud Migration', '24/7 Support'],
  catchyText: '⚡ Power up with infrastructure that never fails!'
}, {
  id: 'business-consulting',
  name: 'Business Consulting',
  short_description: 'Strategic insights and proven methodologies to accelerate your business transformation.',
  icon: 'headphones',
  color: 'bg-purple-600',
  features: ['Strategy Planning', 'Process Optimization', 'Digital Transformation', 'Growth Consulting'],
  catchyText: '🧠 Unlock your business potential with expert guidance!'
}, {
  id: 'cybersecurity',
  name: 'Cybersecurity',
  short_description: 'Shield your digital assets with fortress-level security that hackers fear to challenge.',
  icon: 'shield',
  color: 'bg-red-500',
  features: ['Security Audits', 'Threat Detection', 'Compliance', '24/7 Monitoring'],
  catchyText: '🛡️ Become unbreachable in the digital battlefield!'
}, {
  id: 'erp-crm',
  name: 'Custom ERP/CRM Development',
  short_description: 'Streamline operations with intelligent systems that work exactly how your business thinks.',
  icon: 'settings',
  color: 'bg-violet-500',
  features: ['Business Process Automation', 'Customer Management', 'Inventory Control', 'Reporting'],
  catchyText: '⚙️ Automate success with systems built for you!'
}, {
  id: 'iot-embedded',
  name: 'IoT & Embedded Solutions',
  short_description: 'Connect everything and create smart ecosystems that revolutionize how you work.',
  icon: 'zap',
  color: 'bg-yellow-500',
  features: ['Smart Devices', 'Sensor Integration', 'Real-time Monitoring', 'Automation'],
  catchyText: '🌐 Make everything smart and connected!'
}, {
  id: 'seo-branding',
  name: 'SEO & Branding',
  short_description: 'Boost your visibility and create a brand identity that resonates with your audience.',
  icon: 'search',
  color: 'bg-pink-500',
  features: ['SEO Optimization', 'Brand Strategy', 'Logo Design', 'Content Strategy'],
  catchyText: '🔍 Become the brand everyone searches for!'
}, {
  id: 'internship-training',
  name: 'Internship & Skill Training',
  short_description: 'Shape the future tech leaders with hands-on training that bridges academia and industry.',
  icon: 'graduation-cap',
  color: 'bg-emerald-500',
  features: ['Technical Training', 'Industry Mentorship', 'Real Projects', 'Career Guidance'],
  catchyText: '🎓 Launch careers that change the world!'
}, {
  id: 'email-marketing',
  name: 'Email Marketing Services',
  short_description: 'Craft email campaigns so compelling, your audience eagerly awaits your next message.',
  icon: 'mail',
  color: 'bg-cyan-500',
  features: ['Campaign Design', 'Automation', 'Analytics', 'A/B Testing'],
  catchyText: '📧 Make every email a conversion masterpiece!'
}, {
  id: 'cctv-biometric',
  name: 'CCTV & Biometric Installation',
  short_description: 'Secure your premises with cutting-edge surveillance that never blinks or sleeps.',
  icon: 'camera',
  color: 'bg-slate-500',
  features: ['CCTV Setup', 'Biometric Systems', 'Access Control', 'Maintenance'],
  catchyText: '👁️ Watch over what matters most to you!'
}];

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const {
    theme
  } = useTheme();
  const servicesPerPage = 6;

  const getIconComponent = (iconName: string) => {
    const icons: {
      [key: string]: React.ReactNode;
    } = {
      'code': <Code className="h-8 w-8 text-white" />,
      'smartphone': <Smartphone className="h-8 w-8 text-white" />,
      'bar-chart': <BarChart3 className="h-8 w-8 text-white" />,
      'palette': <Palette className="h-8 w-8 text-white" />,
      'monitor': <Monitor className="h-8 w-8 text-white" />,
      'search': <Search className="h-8 w-8 text-white" />,
      'server': <Server className="h-8 w-8 text-white" />,
      'headphones': <Headphones className="h-8 w-8 text-white" />,
      'shield': <Shield className="h-8 w-8 text-white" />,
      'settings': <Settings className="h-8 w-8 text-white" />,
      'zap': <Zap className="h-8 w-8 text-white" />,
      'graduation-cap': <GraduationCap className="h-8 w-8 text-white" />,
      'mail': <Mail className="h-8 w-8 text-white" />,
      'camera': <Camera className="h-8 w-8 text-white" />
    };
    return icons[iconName] || <Monitor className="h-8 w-8 text-white" />;
  };

  // Keyboard navigation
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

  const handleViewDetails = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  const currentServices = staticServices.slice(currentIndex, currentIndex + servicesPerPage);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + servicesPerPage < staticServices.length;

  const ArrowNavigation = () => <div className="flex justify-between items-center mb-6 px-4">
      <Button variant="outline" size="icon" onClick={handlePrev} disabled={!canGoPrev} className={`w-10 h-10 rounded-full border-2 hover:bg-white transition-all duration-300 shadow-lg ${theme === 'light' ? 'bg-white/90 backdrop-blur text-gray-900 hover:text-gray-900' : 'bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 border-slate-600'}`}>
        <ChevronLeft className={`h-5 w-5 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
      </Button>
      
      <div className="flex items-center gap-2">
        {Array.from({
        length: Math.ceil(staticServices.length / servicesPerPage)
      }).map((_, index) => (
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
      
      <Button variant="outline" size="icon" onClick={handleNext} disabled={!canGoNext} className={`w-10 h-10 rounded-full border-2 hover:bg-white transition-all duration-300 shadow-lg ${theme === 'light' ? 'bg-white/90 backdrop-blur text-gray-900 hover:text-gray-900' : 'bg-slate-800/90 backdrop-blur text-white hover:bg-slate-700 border-slate-600'}`}>
        <ChevronRight className={`h-5 w-5 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
      </Button>
    </div>;

  return <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`} id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Services</h2>
          <p className={`text-lg max-w-2xl mx-auto mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Comprehensive digital solutions tailored to transform your business and drive growth
          </p>
          <p className="text-base text-blue-600 font-semibold">
            ✨ Discover services that will revolutionize your business ✨
          </p>
        </div>

        <div className="relative">
          {/* Top Arrow Navigation */}
          <ArrowNavigation />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {currentServices.map((service, index) => <Card key={service.id} className={`backdrop-blur border transition-all duration-300 group hover:scale-105 ${theme === 'light' ? 'bg-card/50 border-border/50 hover:bg-card/70' : 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70'}`}>
                <CardHeader>
                  <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center mb-3`}>
                    {getIconComponent(service.icon)}
                  </div>
                  <CardTitle className={`text-lg mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{service.name}</CardTitle>
                  <CardDescription className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                    {service.short_description}
                  </CardDescription>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold text-xs mt-2">
                    {service.catchyText}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 mb-4">
                    {service.features.slice(0, 4).map((feature, idx) => <li key={idx} className={`flex items-center text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        <div className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                        {feature}
                      </li>)}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-sm" onClick={() => handleViewDetails(service.id)}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          {/* Bottom Arrow Navigation */}
          <ArrowNavigation />
          
          {/* Keyboard Navigation Hint */}
          <div className="text-center">
            <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              Use ← → arrow keys to navigate or click the arrows above/below
            </p>
          </div>
        </div>
      </div>
    </section>;
};

export default ServicesSection;

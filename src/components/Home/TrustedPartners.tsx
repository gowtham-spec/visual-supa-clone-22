
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const TrustedPartners = () => {
  const { theme } = useTheme();
  
  const partners = [
    {
      name: 'MP Pictures',
      logo: '/lovable-uploads/ffeb75d3-9142-4d54-9a71-892684ca1d47.png'
    },
    {
      name: 'NCloud Solutions', 
      logo: '/lovable-uploads/87d45134-6f00-44cf-b9d9-95cb9396712c.png'
    },
    {
      name: 'Nationwide',
      logo: '/lovable-uploads/8f770e4d-32c2-4b47-ac5c-9fac8cf56dc1.png'
    },
    {
      name: 'OM Murugan Auto Works',
      logo: '/lovable-uploads/9055c55c-378c-46a3-8301-d3e1a054a2a8.png'
    },
    {
      name: 'Farzi Cafe',
      logo: '/lovable-uploads/f39e332f-7c68-407f-8a2f-b21f5be135f3.png'
    },
    {
      name: 'Five Brains',
      logo: '/lovable-uploads/4b52710a-fa55-4ee3-8dde-92b57c82b55f.png'
    }
  ];

  // Duplicate the partners array to create seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-800'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Trusted by Leading Companies
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            We're proud to work with innovative companies that trust us with their digital transformation.
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right-to-left">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index} 
                className={`flex-shrink-0 flex items-center justify-center p-6 mx-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                  theme === 'light' 
                    ? 'bg-white shadow-sm hover:shadow-md' 
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                style={{ minWidth: '250px' }}
              >
                <img 
                  src={partner.logo}
                  alt={partner.name}
                  className="h-24 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;

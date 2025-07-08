
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { getIconComponent } from './ServicesIcons';

interface Service {
  id: string;
  name: string;
  short_description: string;
  icon: string;
  color: string;
  features: string[];
  catchyText: string;
}

interface ServicesGridProps {
  services: Service[];
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleViewDetails = (serviceId: string) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {services.map((service) => (
        <Card 
          key={service.id} 
          className={`backdrop-blur border transition-all duration-300 group hover:scale-105 ${
            theme === 'light' 
              ? 'bg-card/50 border-border/50 hover:bg-card/70' 
              : 'bg-slate-700/50 border-slate-600/50 hover:bg-slate-700/70'
          }`}
        >
          <CardHeader>
            <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center mb-3`}>
              {getIconComponent(service.icon)}
            </div>
            <CardTitle className={`text-lg mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {service.name}
            </CardTitle>
            <CardDescription className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              {service.short_description}
            </CardDescription>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold text-xs mt-2">
              {service.catchyText}
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 mb-4">
              {service.features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className={`flex items-center text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <div className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 text-sm" 
              onClick={() => handleViewDetails(service.id)}
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServicesGrid;


import React from 'react';
import { 
  Code, Smartphone, BarChart3, Palette, Monitor, Search, 
  Server, Headphones, Shield, Settings, Zap, GraduationCap, 
  Mail, Camera 
} from 'lucide-react';

export const getIconComponent = (iconName: string): React.ReactNode => {
  const icons: { [key: string]: React.ReactNode } = {
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

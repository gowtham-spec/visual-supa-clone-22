
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  client_name: string | null;
  project_duration: string | null;
  completion_date: string | null;
}

const PortfolioGrid = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  // Fallback static data if no projects from database
  const fallbackProjects = [
    {
      id: 'invexai',
      title: 'InvexAI',
      category: 'AI/Machine Learning',
      description: 'Advanced AI-powered investment platform with real-time market analysis, portfolio optimization, and risk assessment capabilities.',
      image: '/lovable-uploads/46337a20-9a57-4c40-a655-e6ddb30af4cb.png',
      tech: ['React', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
      client: 'FinTech Solutions Inc.',
      duration: '8 months',
      team: '12 developers',
      completionDate: '2024-03-15'
    },
    {
      id: 'smart-tracking',
      title: 'Tracking System',
      category: 'IoT/Tracking',
      description: 'Real-time asset tracking solution with IoT sensors, mobile app integration, and comprehensive analytics dashboard.',
      image: 'photo-1487058792275-0ad4aaf24ca7',
      tech: ['IoT', 'React Native', 'Node.js', 'MongoDB', 'MQTT'],
      client: 'Logistics Corp',
      duration: '6 months',
      team: '8 developers',
      completionDate: '2024-01-20'
    },
    {
      id: 'hr-erp',
      title: 'HR ERP System',
      category: 'Enterprise Software',
      description: 'Comprehensive human resources management system with payroll, attendance, performance tracking, and employee self-service portal.',
      image: 'photo-1519389950473-47ba0277781c',
      tech: ['Vue.js', 'Laravel', 'MySQL', 'Docker', 'Redis'],
      client: 'Enterprise Solutions Ltd.',
      duration: '10 months',
      team: '15 developers',
      completionDate: '2023-12-10'
    },
    {
      id: 'event-booking',
      title: 'Event Booking Management System',
      category: 'Web Application',
      description: 'Modern event booking and management platform with calendar integration, payment processing, and real-time notifications.',
      image: 'photo-1460925895917-afdab827c52f',
      tech: ['Next.js', 'Stripe', 'Calendar API', 'WebSocket', 'PostgreSQL'],
      client: 'EventTech Solutions',
      duration: '5 months',
      team: '6 developers',
      completionDate: '2024-02-28'
    },
    {
      id: 'sap-enterprise',
      title: 'SAP Enterprise Integration',
      category: 'Enterprise ERP',
      description: 'Custom SAP integration solution with modern web interface, API connectivity, and real-time data synchronization.',
      image: 'photo-1487058792275-0ad4aaf24ca7',
      tech: ['Angular', 'SAP API', 'Spring Boot', 'Oracle', 'Kubernetes'],
      client: 'Manufacturing Giant Inc.',
      duration: '12 months',
      team: '20 developers',
      completionDate: '2023-11-15'
    }
  ];

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-lg">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => {
            // Handle both database projects and fallback projects
            const isDbProject = 'technologies' in project;
            const projectId = project.id;
            const technologies = isDbProject ? project.technologies : (project as any).tech;
            const imageUrl = project.image.startsWith('/') ? project.image : 
              project.image.startsWith('photo-') ? `https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=600&h=300` : 
              project.image;
            
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech: string, techIndex: number) => (
                      <span 
                        key={techIndex}
                        className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 group-hover:bg-blue-600 group-hover:text-white transition-colors" 
                      asChild
                    >
                      <Link to={`/portfolio/${projectId}`} onClick={() => window.scrollTo(0, 0)}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;

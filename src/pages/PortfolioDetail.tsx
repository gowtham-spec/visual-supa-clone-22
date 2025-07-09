import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, ArrowRight, Star, TrendingUp, Shield, Zap } from 'lucide-react';
import LiveDemoModal from '@/components/Portfolio/LiveDemoModal';

const portfolioData = {
  'invexai': {
    title: 'InvexAI Platform',
    category: 'AI/Machine Learning', 
    description: 'Advanced AI-powered investment platform with real-time market analysis, portfolio optimization, and risk assessment capabilities designed for institutional investors.',
    image: '/lovable-uploads/46337a20-9a57-4c40-a655-e6ddb30af4cb.png',
    technologies: ['React', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL', 'Redis', 'Docker'],
    challenge: 'Creating a sophisticated AI-driven investment platform that could process vast amounts of market data in real-time while providing actionable insights for investment decisions.',
    solution: 'Developed a comprehensive platform using machine learning algorithms for market prediction, real-time data processing pipelines, and an intuitive dashboard for portfolio management.',
    features: ['Real-time market data analysis and visualization', 'AI-powered investment recommendations', 'Risk assessment and portfolio optimization', 'Advanced charting and technical analysis tools', 'Multi-asset class support (stocks, bonds, crypto)', 'Automated trading capabilities', 'Compliance and regulatory reporting', 'Mobile app for portfolio monitoring'],
    results: [{
      metric: 'Processing Speed',
      value: '99.9%',
      description: 'Faster data processing compared to legacy systems'
    }, {
      metric: 'User Adoption',
      value: '250%',
      description: 'Increase in active users within 6 months'
    }, {
      metric: 'ROI Improvement',
      value: '35%',
      description: 'Average portfolio performance improvement'
    }, {
      metric: 'System Uptime',
      value: '99.99%',
      description: 'Platform availability and reliability'
    }]
  },
  'smart-tracking': {
    title: 'Smart Tracking System',
    category: 'IoT/Tracking',
    description: 'Real-time asset tracking solution with IoT sensors, mobile app integration, and comprehensive analytics dashboard for supply chain optimization.',
    image: '/lovable-uploads/27971bcd-9e0c-4fd0-aa42-ccfefffdc8bc.png',
    technologies: ['IoT', 'React Native', 'Node.js', 'MongoDB', 'MQTT', 'AWS IoT', 'LoRaWAN'],
    challenge: 'Building a scalable IoT solution that could track thousands of assets across multiple locations with real-time updates and predictive maintenance capabilities.',
    solution: 'Implemented a comprehensive IoT ecosystem with edge computing, cloud infrastructure, and mobile applications for seamless asset monitoring and management.',
    features: ['Real-time GPS and sensor-based tracking', 'Geofencing and automated alerts', 'Predictive maintenance scheduling', 'Route optimization algorithms', 'Temperature and humidity monitoring', 'Battery life optimization for IoT devices', 'Integration with existing ERP systems', 'Advanced analytics and reporting dashboard'],
    results: [{
      metric: 'Asset Visibility',
      value: '100%',
      description: 'Complete real-time tracking coverage'
    }, {
      metric: 'Cost Reduction',
      value: '40%',
      description: 'Operational cost savings through optimization'
    }, {
      metric: 'Delivery Accuracy',
      value: '98%',
      description: 'On-time delivery performance'
    }, {
      metric: 'Device Uptime',
      value: '99.5%',
      description: 'IoT sensor reliability and connectivity'
    }]
  },
  'hr-erp': {
    title: 'HR ERP Platform',
    category: 'Enterprise Software',
    description: 'Comprehensive human resources management system with payroll, attendance, performance tracking, and employee self-service portal.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=300',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Docker', 'Redis'],
    challenge: 'Developing a unified HR platform that could handle complex payroll calculations, compliance requirements, and provide seamless user experience for thousands of employees.',
    solution: 'Built a comprehensive ERP system with modular architecture, automated workflows, and intuitive interfaces for both HR administrators and employees.',
    features: ['Employee lifecycle management', 'Automated payroll processing', 'Time and attendance tracking', 'Performance evaluation system', 'Leave management workflow', 'Recruitment and onboarding', 'Training and development tracking', 'Compliance reporting and analytics'],
    results: [{
      metric: 'Process Efficiency',
      value: '75%',
      description: 'Reduction in manual HR processes'
    }, {
      metric: 'User Satisfaction',
      value: '92%',
      description: 'Employee satisfaction with the platform'
    }, {
      metric: 'Compliance Rate',
      value: '100%',
      description: 'Regulatory compliance achievement'
    }, {
      metric: 'Time Savings',
      value: '60%',
      description: 'Reduction in HR administrative tasks'
    }]
  },
  'event-booking': {
    title: 'Event Booking Platform',
    category: 'Web Application',
    description: 'Modern event booking and management platform with calendar integration, payment processing, and real-time notifications.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=300',
    technologies: ['Next.js', 'Stripe', 'Calendar API', 'WebSocket', 'PostgreSQL'],
    challenge: 'Creating a scalable event management platform that could handle high-volume bookings, complex scheduling, and seamless payment processing.',
    solution: 'Developed a modern web application with real-time features, integrated payment gateways, and comprehensive event management tools.',
    features: ['Real-time event booking system', 'Calendar integration and scheduling', 'Multi-payment gateway support', 'Event analytics and reporting', 'Automated email notifications', 'Mobile-responsive design', 'Multi-language support', 'Social media integration'],
    results: [{
      metric: 'Booking Volume',
      value: '300%',
      description: 'Increase in online bookings'
    }, {
      metric: 'Payment Success',
      value: '99.8%',
      description: 'Transaction success rate'
    }, {
      metric: 'User Engagement',
      value: '85%',
      description: 'Return user rate'
    }, {
      metric: 'Revenue Growth',
      value: '150%',
      description: 'Client revenue increase'
    }]
  },
  'sap-enterprise': {
    title: 'SAP Enterprise Integration',
    category: 'Enterprise ERP',
    description: 'Custom SAP integration solution with modern web interface, API connectivity, and real-time data synchronization.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&h=300',
    technologies: ['Angular', 'SAP API', 'Spring Boot', 'Oracle', 'Kubernetes'],
    challenge: 'Modernizing legacy SAP systems while maintaining data integrity and ensuring seamless integration with existing business processes.',
    solution: 'Built a modern integration layer with APIs, microservices architecture, and user-friendly interfaces that bridge legacy and modern systems.',
    features: ['Real-time SAP data synchronization', 'Modern web-based interface', 'API-first architecture', 'Role-based access control', 'Advanced reporting dashboard', 'Mobile application support', 'Data migration tools', 'System monitoring and alerts'],
    results: [{
      metric: 'Data Accuracy',
      value: '99.9%',
      description: 'Real-time synchronization accuracy'
    }, {
      metric: 'User Productivity',
      value: '45%',
      description: 'Increase in operational efficiency'
    }, {
      metric: 'System Performance',
      value: '80%',
      description: 'Improvement in response times'
    }, {
      metric: 'Integration Success',
      value: '100%',
      description: 'Seamless legacy system integration'
    }]
  },
  'ecommerce-platform': {
    title: 'E-commerce Platform',
    category: 'E-commerce',
    description: 'Multi-vendor e-commerce platform with AI recommendations, advanced search, inventory management, and analytics.',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=600&h=300',
    technologies: ['React', 'Microservices', 'Elasticsearch', 'Redis', 'AWS'],
    challenge: 'Building a scalable multi-vendor platform that could handle thousands of products, complex inventory management, and provide personalized shopping experiences.',
    solution: 'Developed a comprehensive e-commerce ecosystem with AI-powered recommendations, advanced search capabilities, and robust vendor management tools.',
    features: ['Multi-vendor marketplace', 'AI-powered product recommendations', 'Advanced search and filtering', 'Inventory management system', 'Real-time analytics dashboard', 'Mobile commerce optimization', 'Payment gateway integration', 'Order tracking and management'],
    results: [{
      metric: 'Sales Growth',
      value: '200%',
      description: 'Increase in platform sales'
    }, {
      metric: 'Vendor Adoption',
      value: '500+',
      description: 'Active vendors on platform'
    }, {
      metric: 'Conversion Rate',
      value: '25%',
      description: 'Improvement in conversion'
    }, {
      metric: 'Customer Retention',
      value: '70%',
      description: 'Repeat customer rate'
    }]
  }
};

const PortfolioDetail = () => {
  const { id } = useParams();
  const [isLiveDemoOpen, setIsLiveDemoOpen] = useState(false);
  const project = portfolioData[id as keyof typeof portfolioData];

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 pt-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested project could not be found.</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Header Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="mb-8">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">{project.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
                <p className="text-xl text-muted-foreground mb-8">{project.description}</p>
                
                <Button onClick={() => setIsLiveDemoOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                  Request Live Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="relative">
                <img src={project.image} alt={project.title} className="w-full rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-red-600" />
                  The Challenge
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </Card>
              
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-green-600" />
                  Our Solution
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features Delivered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Used */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Technologies Used</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="px-4 py-2 text-lg">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Results Achieved */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Results Achieved</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {project.results.map((result, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">{result.value}</h3>
                    <h4 className="font-semibold mb-2">{result.metric}</h4>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how we can bring your vision to life with cutting-edge technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsLiveDemoOpen(true)} variant="secondary" className="px-8 py-3 text-lg">
                Request Demo
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link to="/#contact-section" className="text-black hover:shadow-gray-400 ">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <LiveDemoModal 
          isOpen={isLiveDemoOpen} 
          onClose={() => setIsLiveDemoOpen(false)} 
          projectTitle={project.title} 
          projectId={id} 
        />
      </div>
    </Layout>
  );
};

export default PortfolioDetail;

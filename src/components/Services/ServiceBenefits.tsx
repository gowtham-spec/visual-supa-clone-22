
import React from 'react';

interface Benefit {
  title: string;
  description: string;
}

interface ServiceBenefitsProps {
  benefits: Benefit[];
}

const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({ benefits }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Service
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the benefits of professional service delivery
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl">✓</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefits;

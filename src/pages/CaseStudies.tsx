
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const CaseStudies = () => {
  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FileText className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Explore our successful projects and learn how we've helped businesses 
              achieve their digital transformation goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <CardTitle>E-commerce Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  How we helped a retail company increase their online sales by 300% 
                  through digital transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <CardTitle>Healthcare Management System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Streamlining patient management and improving healthcare delivery 
                  through custom software solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <CardTitle>Manufacturing Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Implementing IoT solutions to optimize manufacturing processes 
                  and reduce operational costs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;

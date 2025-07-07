
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book } from 'lucide-react';

const Documentation = () => {
  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Book className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Comprehensive guides and documentation for our services and solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete API reference and integration guides for our services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <CardTitle>User Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Step-by-step guides to help you get the most out of our solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Industry best practices and recommendations for optimal results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Documentation;

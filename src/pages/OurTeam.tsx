
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const OurTeam = () => {
  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Users className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Meet the talented professionals behind Marzelet Info Technology who are 
              dedicated to delivering innovative solutions and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Leadership Team</h3>
                <p className="text-muted-foreground">
                  Experienced leaders guiding strategic vision and innovation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Development Team</h3>
                <p className="text-muted-foreground">
                  Skilled developers creating cutting-edge solutions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Team</h3>
                <p className="text-muted-foreground">
                  Dedicated professionals ensuring client satisfaction
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OurTeam;

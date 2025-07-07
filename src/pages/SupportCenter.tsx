
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

const SupportCenter = () => {
  const handleLiveChat = () => {
    // Open live chat widget or redirect to chat platform
    window.open('https://wa.me/919629997391', '_blank');
  };

  const handlePhoneCall = () => {
    window.open('tel:+919629997391', '_self');
  };

  const handleEmailSupport = () => {
    window.open('mailto:info@marzelet.info', '_self');
  };

  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Get help when you need it. Our support team is here to assist you 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-blue-600 mb-4" />
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Chat with our support team in real-time for immediate assistance.
                </p>
                <Button onClick={handleLiveChat} className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <Phone className="h-8 w-8 text-green-600 mb-4" />
                <CardTitle>Phone Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Call us directly for urgent issues and technical support.
                </p>
                <Button onClick={handlePhoneCall} variant="outline" className="w-full">
                  +91-9629997391
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-border/50 hover:bg-card/70 transition-all duration-300">
              <CardHeader>
                <Mail className="h-8 w-8 text-purple-600 mb-4" />
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <Button onClick={handleEmailSupport} variant="outline" className="w-full">
                  info@marzelet.info
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-8">
              Find answers to common questions about our services and solutions.
            </p>
            <Button size="lg">
              View FAQ
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SupportCenter;

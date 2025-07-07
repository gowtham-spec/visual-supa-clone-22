
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Shield, Eye, Lock, FileText, Users, AlertTriangle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </div>

          <div className="space-y-12">
            {/* Information We Collect */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We collect information you provide directly to us, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal information when you create an account</li>
                  <li>Contact information when you reach out to us</li>
                  <li>Usage data when you interact with our services</li>
                  <li>Technical information about your device and browser</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To trusted service providers who assist in operating our services</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                  <li>With your explicit consent for specific purposes</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Security</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Your Rights</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability and withdrawal of consent</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> info@marzelet.info</p>
                <p><strong>Phone:</strong> +91-9629997391</p>
                <p><strong>Address:</strong> Chennai, Tamil Nadu, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;

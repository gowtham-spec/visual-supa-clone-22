
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale, Phone } from 'lucide-react';

const TermsOfService = () => {
  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FileText className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </div>

          <div className="space-y-12">
            {/* Acceptance of Terms */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>These terms apply to all visitors, users, and customers</li>
                  <li>By using our services, you acknowledge that you have read and understood these terms</li>
                  <li>We reserve the right to update these terms at any time</li>
                </ul>
              </div>
            </div>

            {/* Use License */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Scale className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Use License</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Permission is granted to temporarily use our services for personal, non-commercial transitory viewing only. This includes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access to our web applications and services</li>
                  <li>Use of our documentation and resources</li>
                  <li>Communication through our support channels</li>
                </ul>
                <p className="font-semibold text-foreground">This license does not include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modification or copying of materials</li>
                  <li>Commercial use without written permission</li>
                  <li>Reverse engineering our software</li>
                </ul>
              </div>
            </div>

            {/* Service Availability */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Service Availability</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We strive to provide reliable services, but cannot guarantee uninterrupted access:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Services may be temporarily unavailable for maintenance</li>
                  <li>We are not liable for any downtime or service interruptions</li>
                  <li>Updates and improvements may affect service availability</li>
                  <li>We will provide reasonable notice for planned maintenance</li>
                </ul>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Disclaimer</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>The information on this website is provided on an 'as is' basis:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We make no warranties, expressed or implied</li>
                  <li>Information may be updated without notice</li>
                  <li>Technical specifications are subject to change</li>
                  <li>External links are provided for convenience only</li>
                </ul>
              </div>
            </div>

            {/* Limitations */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Limitations</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>In no event shall Marzelet Info Technology or its suppliers be liable for any damages:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Arising out of the use or inability to use our services</li>
                  <li>Loss of data or business interruption</li>
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Any damages exceeding the amount paid for our services</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Contact Information</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfService;

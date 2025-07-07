
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Shield, Users, Lock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const GDPRCompliance = () => {
  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              GDPR Compliance
            </h1>
            <p className="text-xl text-muted-foreground">
              Our commitment to protecting your personal data and privacy rights
            </p>
          </div>

          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">GDPR Overview</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection 
                  and privacy in the European Union and the European Economic Area. At Marzelet, we take data 
                  protection seriously and have implemented comprehensive measures to ensure GDPR compliance.
                </p>
              </div>
            </div>

            {/* Data We Collect */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Data We Collect</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We collect and process the following types of personal data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Technical information (IP address, browser type, device information)</li>
                  <li>Usage data (how you interact with our services)</li>
                  <li>Communication data (messages, support requests)</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Your Rights Under GDPR</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Under GDPR, you have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Right to be informed:</strong> Clear information about data collection and use</li>
                  <li><strong>Right of access:</strong> Request copies of your personal data</li>
                  <li><strong>Right to rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to restrict processing:</strong> Request limitation of data processing</li>
                  <li><strong>Right to data portability:</strong> Request transfer of your data</li>
                  <li><strong>Right to object:</strong> Object to processing of your personal data</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Security Measures</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement robust security measures to protect your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and multi-factor authentication</li>
                  <li>Staff training on data protection best practices</li>
                  <li>Incident response procedures for data breaches</li>
                </ul>
              </div>
            </div>

            {/* Legal Basis */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold">Legal Basis for Processing</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We process your personal data based on the following legal grounds:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Consent:</strong> When you have given clear consent for specific purposes</li>
                  <li><strong>Contract:</strong> When processing is necessary for contract performance</li>
                  <li><strong>Legal obligation:</strong> When we must process data to comply with law</li>
                  <li><strong>Legitimate interests:</strong> When necessary for our legitimate business interests</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Exercise Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                To exercise any of your GDPR rights or if you have questions about our data practices, 
                please contact our Data Protection Officer:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> info@marzelet.info</p>
                <p><strong>Phone:</strong> +91-9629997391</p>
                <p><strong>Address:</strong> No.7, College Road, Opp. St. Peter's Engineering College, Avadi Chennai-54</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GDPRCompliance;

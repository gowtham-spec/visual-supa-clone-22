
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Cookie, Settings, Shield, Info, ToggleLeft } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <Layout>
      <section className="py-20 bg-background pt-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Cookie className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn about how we use cookies and similar technologies on our website
            </p>
          </div>

          <div className="space-y-12">
            {/* What are Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Info className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">What are Cookies?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better browsing experience by remembering your preferences 
                  and analyzing how you use our site.
                </p>
                <p>
                  We use cookies to improve functionality, analyze website traffic, and provide personalized 
                  content. By using our website, you consent to our use of cookies in accordance with this policy.
                </p>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Types of Cookies We Use</h2>
              </div>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                  <p>These cookies are necessary for the website to function properly. They enable basic features 
                  like page navigation and access to secure areas of the website.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Performance Cookies</h3>
                  <p>These cookies collect information about how visitors use our website, such as which pages 
                  are visited most often. This data helps us improve our website's performance.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Functionality Cookies</h3>
                  <p>These cookies allow our website to remember choices you make and provide enhanced, 
                  more personal features.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Targeting Cookies</h3>
                  <p>These cookies are used to deliver advertisements more relevant to you and your interests. 
                  They also help limit the number of times you see an advertisement.</p>
                </div>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Third-Party Cookies</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We may use third-party services that set cookies on our website, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Social media plugins (Facebook, Twitter, LinkedIn)</li>
                  <li>Payment processing services</li>
                  <li>Customer support chat services</li>
                </ul>
                <p>
                  These third parties have their own cookie policies, and we recommend reviewing them 
                  to understand how they use cookies.
                </p>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <ToggleLeft className="h-6 w-6 text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold">Managing Your Cookie Preferences</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>You have several options for managing cookies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our cookie preference center to opt-out of non-essential cookies</li>
                  <li>Configure your browser settings to block or delete cookies</li>
                  <li>Use browser extensions that block tracking cookies</li>
                  <li>Opt-out of targeted advertising through industry opt-out tools</li>
                </ul>
                <p>
                  Please note that disabling certain cookies may affect the functionality of our website 
                  and your user experience.
                </p>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We will notify you of any 
                material changes by posting the new policy on this page.
              </p>
              <p className="text-muted-foreground">
                <strong>Last updated:</strong> January 1, 2025
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-card/30 backdrop-blur border border-border/30 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, 
                please contact us:
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

export default CookiePolicy;

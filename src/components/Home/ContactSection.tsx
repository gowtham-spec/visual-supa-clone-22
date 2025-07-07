import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useTheme } from '@/contexts/ThemeContext';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      // Show success animation
      setIsSuccess(true);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });

      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact-section" className={`py-16 ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Get In <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Ready to transform your business? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Contact Information</h3>
              <div className="space-y-3">
                <Card className={`p-3 ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Email</h4>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>info@marzelet.info</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`p-3 ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Phone</h4>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>+91-9629997391</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`p-3 ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Address</h4>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                          No.7, College Road, Opp. St. Peter's Engineering College, Avadi Chennai-54
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`p-3 ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Business Hours</h4>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>24/7 Available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
            <CardContent className="p-0">
              <h3 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`${
                        theme === 'light' 
                          ? 'bg-white border-gray-300 focus:border-blue-500' 
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`${
                        theme === 'light' 
                          ? 'bg-white border-gray-300 focus:border-blue-500' 
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Phone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${
                        theme === 'light' 
                          ? 'bg-white border-gray-300 focus:border-blue-500' 
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Company
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`${
                        theme === 'light' 
                          ? 'bg-white border-gray-300 focus:border-blue-500' 
                          : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`${
                      theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-blue-500' 
                        : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className={`${
                      theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-blue-500' 
                        : 'bg-slate-700 border-slate-600 text-white focus:border-blue-400'
                    }`}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 transition-all duration-300 ${
                    isSuccess 
                      ? 'bg-green-600 hover:bg-green-700 scale-105' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center animate-pulse">
                      <Check className="w-4 h-4 mr-2" />
                      Message Sent!
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

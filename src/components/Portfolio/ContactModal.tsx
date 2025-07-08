
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, projectTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: `I'm interested in learning more about the ${projectTitle} project and would like to request a demo.`
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description: "We'll get back to you within 24 hours to schedule your demo.",
    });
    onClose();
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: `I'm interested in learning more about the ${projectTitle} project and would like to request a demo.`
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" role="dialog" aria-labelledby="contact-modal-title" aria-describedby="contact-modal-description">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle id="contact-modal-title">Request Demo - {projectTitle}</DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              aria-label="Close demo request form"
              className="min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </DialogHeader>
        
        <div id="contact-modal-description" className="sr-only">
          Fill out this form to request a personalized demo of {projectTitle}. All fields marked with an asterisk are required.
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="contact-name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              aria-required="true"
              aria-describedby="name-error"
              className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div id="name-error" className="sr-only" aria-live="polite"></div>
          </div>
          
          <div>
            <Label htmlFor="contact-email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              aria-required="true"
              aria-describedby="email-error"
              className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div id="email-error" className="sr-only" aria-live="polite"></div>
          </div>
          
          <div>
            <Label htmlFor="contact-company" className="text-sm font-medium">
              Company Name
            </Label>
            <Input
              id="contact-company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter your company name (optional)"
              className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <Label htmlFor="contact-phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="contact-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number (optional)"
              className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <Label htmlFor="contact-message" className="text-sm font-medium">
              Message
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Additional details about your demo request"
              rows={4}
              className="mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-describedby="submit-description"
          >
            <Send className="h-4 w-4 mr-2" aria-hidden="true" />
            Send Demo Request
          </Button>
          <div id="submit-description" className="sr-only">
            Submit your demo request form. We'll contact you within 24 hours.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;

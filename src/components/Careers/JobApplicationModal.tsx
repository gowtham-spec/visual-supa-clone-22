
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import ResumeUpload from './ResumeUpload';
import { useToast } from '@/hooks/use-toast';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  isOtherRole?: boolean;
}

const JobApplicationModal = ({ isOpen, onClose, jobTitle, isOtherRole = false }: JobApplicationModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appliedPosition: jobTitle || '',
    roleType: isOtherRole ? 'Other' : 'Full-time',
    customRole: '',
    experienceLevel: '',
    profession: '',
    coverLetter: '',
    resumeUrl: '',
    resumeFileName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = (url: string, fileName: string) => {
    setFormData(prev => ({ 
      ...prev, 
      resumeUrl: url,
      resumeFileName: fileName 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.resumeUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload your resume.",
        variant: "destructive"
      });
      return;
    }

    if (formData.roleType === 'Other' && !formData.customRole) {
      toast({
        title: "Missing Information",
        description: "Please specify your desired role.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          applied_position: formData.roleType === 'Other' ? formData.customRole : formData.appliedPosition,
          role_type: formData.roleType,
          custom_role: formData.roleType === 'Other' ? formData.customRole : null,
          experience_level: formData.experienceLevel,
          cover_letter: `Profession: ${formData.profession}\n\n${formData.coverLetter}`,
          resume_url: formData.resumeUrl
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll be in touch soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        appliedPosition: '',
        roleType: 'Full-time',
        customRole: '',
        experienceLevel: '',
        profession: '',
        coverLetter: '',
        resumeUrl: '',
        resumeFileName: ''
      });

      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isOtherRole ? 'Submit Your Resume' : `Apply for ${jobTitle}`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role Type *
              </label>
              <Select
                value={formData.roleType}
                onValueChange={(value) => handleInputChange('roleType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Intern">Intern</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => handleInputChange('experienceLevel', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry Level">Entry Level</SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="5+ years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profession/Background *
            </label>
            <Select
              value={formData.profession}
              onValueChange={(value) => handleInputChange('profession', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your profession/background" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="College Student">College Student</SelectItem>
                <SelectItem value="Recent Graduate">Recent Graduate</SelectItem>
                <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                <SelectItem value="Working Professional">Working Professional</SelectItem>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="Career Changer">Career Changer</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.roleType === 'Other' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Role *
              </label>
              <Input
                value={formData.customRole}
                onChange={(e) => handleInputChange('customRole', e.target.value)}
                placeholder="Specify the role you're interested in"
                required
              />
            </div>
          )}

          <ResumeUpload
            onFileUpload={handleResumeUpload}
            currentFile={formData.resumeFileName}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter / Message
            </label>
            <Textarea
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              placeholder="Tell us why you're interested in this position..."
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationModal;

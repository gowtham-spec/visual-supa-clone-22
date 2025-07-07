
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { Download, Mail, Phone, Calendar, User, Briefcase, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JobApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  applied_position: string;
  role_type: string;
  custom_role: string;
  experience_level: string;
  cover_letter: string;
  resume_url: string;
  status: string;
  admin_notes: string;
  created_at: string;
}

const AdminJobApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch job applications.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status } : app
        )
      );

      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive"
      });
    }
  };

  const updateAdminNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ admin_notes: notes })
        .eq('id', id);

      if (error) throw error;

      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, admin_notes: notes } : app
        )
      );

      toast({
        title: "Notes Updated",
        description: "Admin notes have been saved successfully.",
      });
    } catch (error) {
      console.error('Error updating notes:', error);
      toast({
        title: "Error",
        description: "Failed to update admin notes.",
        variant: "destructive"
      });
    }
  };

  const deleteApplication = async (id: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApplications(prev => prev.filter(app => app.id !== id));

      toast({
        title: "Application Deleted",
        description: "Job application has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Failed to delete job application.",
        variant: "destructive"
      });
    } finally {
      setDeletingId(null);
    }
  };

  const downloadResume = async (resumeUrl: string, applicantName: string) => {
    try {
      if (!resumeUrl) {
        toast({
          title: "No Resume",
          description: "No resume file found for this application.",
          variant: "destructive"
        });
        return;
      }

      const { data } = await supabase.storage
        .from('job-applications')
        .createSignedUrl(resumeUrl.split('/').pop() || '', 60);

      if (data?.signedUrl) {
        const link = document.createElement('a');
        link.href = data.signedUrl;
        link.download = `${applicantName}_resume.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          title: "Download Started",
          description: "Resume download has started.",
        });
      } else {
        window.open(resumeUrl, '_blank');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Download Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.role_type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applied_position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="flex justify-center p-8">Loading applications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="intern">Intern</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="p-6">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">
                    {application.name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Briefcase className="w-3 h-3 mr-1" />
                      Applied for: {application.applied_position}
                    </Badge>
                    <Badge variant="secondary">
                      {application.role_type}
                    </Badge>
                    {application.custom_role && (
                      <Badge variant="outline">
                        Custom: {application.custom_role}
                      </Badge>
                    )}
                    <Badge className={getStatusColor(application.status)}>
                      {application.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {new Date(application.created_at).toLocaleDateString()}
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={deletingId === application.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Application</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this job application from {application.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteApplication(application.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <a href={`mailto:${application.email}`} className="text-blue-600 hover:underline">
                      {application.email}
                    </a>
                  </div>
                  {application.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <a href={`tel:${application.phone}`} className="text-blue-600 hover:underline">
                        {application.phone}
                      </a>
                    </div>
                  )}
                  {application.experience_level && (
                    <div className="flex items-center text-sm">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      Experience: {application.experience_level}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <Select
                      value={application.status}
                      onValueChange={(value) => updateApplicationStatus(application.id, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {application.resume_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => downloadResume(application.resume_url, application.name)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                  )}
                </div>
              </div>

              {application.cover_letter && (
                <div>
                  <label className="block text-sm font-medium mb-1">Cover Letter</label>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    {application.cover_letter}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Admin Notes</label>
                <Textarea
                  value={application.admin_notes || ''}
                  onChange={(e) => {
                    const notes = e.target.value;
                    setApplications(prev => 
                      prev.map(app => 
                        app.id === application.id ? { ...app, admin_notes: notes } : app
                      )
                    );
                  }}
                  onBlur={(e) => updateAdminNotes(application.id, e.target.value)}
                  placeholder="Add your notes about this application..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm || filter !== 'all' 
            ? 'No applications match your search criteria.' 
            : 'No job applications found.'}
        </div>
      )}
    </div>
  );
};

export default AdminJobApplications;

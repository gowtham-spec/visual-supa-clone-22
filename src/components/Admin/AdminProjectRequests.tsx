
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Mail, Phone, Building, Calendar, DollarSign } from 'lucide-react';

interface ProjectInquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service_type: string;
  project_description: string;
  budget_range?: string;
  timeline?: string;
  status: 'unfinished' | 'finished';
  priority?: string;
  assigned_to?: string;
  admin_notes?: string;
  user_id?: string;
  updated_at?: string;
}

const AdminProjectRequests = () => {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('project_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries((data || []) as ProjectInquiry[]);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch project requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, currentStatus: ProjectInquiry['status']) => {
    const newStatus = currentStatus === 'finished' ? 'unfinished' : 'finished';
    
    setUpdatingIds(prev => new Set(prev).add(id));
    
    try {
      console.log('Updating project status:', { id, currentStatus, newStatus });
      const { data, error } = await supabase
        .from('project_inquiries')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase project update error:', error);
        throw new Error(`Failed to update project status: ${error.message}`);
      }

      console.log('Project update successful:', data);
      setInquiries(prev => 
        prev.map(inquiry => 
          inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );

      toast({
        title: "Success",
        description: `Project status updated to ${newStatus}`,
      });
    } catch (error: any) {
      console.error('Project status update failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update project status",
        variant: "destructive",
      });
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const { error } = await supabase
        .from('project_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
      toast({
        title: "Success",
        description: "Inquiry deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to delete inquiry",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unfinished': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700';
      case 'finished': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading project requests...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Requests</h2>
          <p className="text-muted-foreground">Manage live demo requests and project inquiries</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Total: {inquiries.length} requests
        </div>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No project requests yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} className="hover:shadow-md transition-shadow bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {inquiry.project_description?.slice(0, 50)}...
                      <Badge className={getStatusColor(inquiry.status)}>
                        {inquiry.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {new Date(inquiry.created_at).toLocaleDateString()} • {inquiry.service_type}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(inquiry.id, inquiry.status)}
                      disabled={updatingIds.has(inquiry.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      {updatingIds.has(inquiry.id) ? 'Updating...' : 'Update Status'}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteInquiry(inquiry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{inquiry.name}</span>
                      <span className="text-muted-foreground">({inquiry.email})</span>
                    </div>
                    {inquiry.company && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{inquiry.company}</span>
                      </div>
                    )}
                    {inquiry.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{inquiry.phone}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {inquiry.budget_range && (
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{inquiry.budget_range}</span>
                      </div>
                    )}
                    {inquiry.timeline && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{inquiry.timeline}</span>
                      </div>
                    )}
                  </div>
                </div>
                {inquiry.project_description && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{inquiry.project_description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjectRequests;

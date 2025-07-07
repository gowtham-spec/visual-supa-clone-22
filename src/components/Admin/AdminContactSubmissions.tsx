
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, User } from 'lucide-react';

const AdminContactSubmissions = () => {
  const [statusFilter, setStatusFilter] = useState('all-status');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['admin-contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      console.log('Updating contact status:', { id, status });
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase update error:', error);
        throw new Error(`Failed to update status: ${error.message}`);
      }
      
      console.log('Contact update successful:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Contact status update completed:', data);
      queryClient.invalidateQueries({ queryKey: ['admin-contact-submissions'] });
      toast({
        title: "Success",
        description: "Contact status updated successfully",
      });
    },
    onError: (error: any) => {
      console.error('Contact status update failed:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update contact status",
        variant: "destructive",
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-submissions'] });
      toast({
        title: "Success",
        description: "Contact submission deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Error deleting submission:', error);
      toast({
        title: "Error",
        description: "Failed to delete contact submission",
        variant: "destructive",
      });
    }
  });

  const handleStatusUpdate = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'finished' ? 'unfinished' : 'finished';
    console.log('Contact status toggle:', { id, currentStatus, newStatus });
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finished': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700';
      case 'unfinished': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const filteredSubmissions = submissions?.filter(submission => {
    if (statusFilter === 'all-status') return true;
    return submission.status === statusFilter;
  });

  if (isLoading) {
    return <div>Loading contact submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Submissions</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="finished">Finished</SelectItem>
            <SelectItem value="unfinished">Unfinished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredSubmissions?.map((submission) => (
          <Card key={submission.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{submission.name}</h3>
                      <Badge className={getStatusColor(submission.status || 'unfinished')}>
                        {submission.status || 'unfinished'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>📧 {submission.email}</span>
                      <span>📞 {submission.phone || 'N/A'}</span>
                      <span>📅 {new Date(submission.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Subject:</p>
                      <p className="text-muted-foreground">{submission.subject || 'No subject'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Message:</p>
                      <p className="text-muted-foreground">{submission.message}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusUpdate(submission.id, submission.status || 'unfinished')}
                    disabled={updateStatusMutation.isPending}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(submission.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminContactSubmissions;

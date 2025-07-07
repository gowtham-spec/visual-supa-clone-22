
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminOverview = () => {
  const { data: blogPostsCount } = useQuery({
    queryKey: ['admin-blog-posts-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: reviewsCount } = useQuery({
    queryKey: ['admin-reviews-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: contactSubmissionsCount } = useQuery({
    queryKey: ['admin-contact-submissions-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: projectRequestsCount } = useQuery({
    queryKey: ['admin-project-requests-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('project_inquiries')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: jobApplicationsCount } = useQuery({
    queryKey: ['admin-job-applications-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('job_applications')
        .select('*', { count: 'exact', head: true });
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: recentReviews } = useQuery({
    queryKey: ['admin-recent-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Blog Posts</p>
                <p className="text-3xl font-bold">{blogPostsCount || 0}</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-3xl font-bold">{reviewsCount || 0}</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contact Submissions</p>
                <p className="text-3xl font-bold">{contactSubmissionsCount || 0}</p>
                <p className="text-xs text-muted-foreground">2 new this week</p>
              </div>
              <div className="text-4xl">📧</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Project Requests</p>
                <p className="text-3xl font-bold">{projectRequestsCount || 0}</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Job Applications</p>
                <p className="text-3xl font-bold">{jobApplicationsCount || 0}</p>
              </div>
              <div className="text-4xl">💼</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReviews?.map((review) => (
              <div key={review.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <div className="flex items-center gap-1">
                      {'⭐'.repeat(review.rating)}
                      <span className="text-sm text-muted-foreground ml-2">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;

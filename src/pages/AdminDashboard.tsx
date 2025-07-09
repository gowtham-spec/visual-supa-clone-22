
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/hooks/useAdmin';
import AdminOverview from '@/components/Admin/AdminOverview';
import AdminBlogPosts from '@/components/Admin/AdminBlogPosts';
import AdminContactSubmissions from '@/components/Admin/AdminContactSubmissions';
import AdminReviews from '@/components/Admin/AdminReviews';
import AdminProjectRequests from '@/components/Admin/AdminProjectRequests';
import AdminJobApplications from '@/components/Admin/AdminJobApplications';
import AdminNews from '@/components/Admin/AdminNews';
import AdminJobPostings from '@/components/Admin/AdminJobPostings';
import { BarChart3, FileText, MessageSquare, Star, Briefcase, Users, Newspaper, PlusSquare } from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');

  // Scroll to top when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
              <p className="text-muted-foreground">You don't have permission to access this page.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage your website content and user interactions</p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          <TabsList className="grid w-full grid-cols-8 p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 text-xs">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2 text-xs">
              <FileText className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2 text-xs">
              <Newspaper className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2 text-xs">
              <MessageSquare className="h-4 w-4" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2 text-xs">
              <Star className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2 text-xs">
              <Briefcase className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2 text-xs">
              <Users className="h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="job-postings" className="flex items-center gap-2 text-xs">
              <PlusSquare className="h-4 w-4" />
              Job Postings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="blog">
            <AdminBlogPosts />
          </TabsContent>

          <TabsContent value="news">
            <AdminNews />
          </TabsContent>

          <TabsContent value="contact">
            <AdminContactSubmissions />
          </TabsContent>

          <TabsContent value="reviews">
            <AdminReviews />
          </TabsContent>

          <TabsContent value="projects">
            <AdminProjectRequests />
          </TabsContent>

          <TabsContent value="jobs">
            <AdminJobApplications />
          </TabsContent>

          <TabsContent value="job-postings">
            <AdminJobPostings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

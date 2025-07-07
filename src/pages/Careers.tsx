
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Send, Calendar, AlertCircle } from 'lucide-react';
import JobApplicationModal from '@/components/Careers/JobApplicationModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience_level: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary_range: string;
  deadline: string;
  application_count: number;
  application_limit: number | null;
  is_active: boolean;
}

const Careers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobPostings(data || []);
    } catch (error) {
      console.error('Error fetching job postings:', error);
      toast({
        title: "Error loading job postings",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsModalOpen(true);
  };

  const isDeadlinePassed = (deadline: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const isApplicationLimitReached = (applicationCount: number, applicationLimit: number | null) => {
    if (!applicationLimit) return false;
    return applicationCount >= applicationLimit;
  };

  const isJobClosed = (job: JobPosting) => {
    return isDeadlinePassed(job.deadline) || isApplicationLimitReached(job.application_count, job.application_limit);
  };

  const getJobStatus = (job: JobPosting) => {
    if (isDeadlinePassed(job.deadline)) return { text: "Deadline Passed", variant: "destructive" as const };
    if (isApplicationLimitReached(job.application_count, job.application_limit)) return { text: "Maximum Applicants Reached", variant: "destructive" as const };
    return { text: "Active", variant: "default" as const };
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Growing Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Be part of a dynamic team that's transforming businesses through innovative technology solutions. 
              We're always looking for talented individuals who share our passion for excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>20+ Team Members</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Chennai, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Flexible Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="text-lg">Loading job openings...</div>
              </div>
            ) : jobPostings.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">No Current Openings</h3>
                <p className="text-muted-foreground">
                  We don't have any active job postings at the moment, but we're always looking for talented individuals.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {jobPostings.map((job) => {
                  const jobClosed = isJobClosed(job);
                  const jobStatus = getJobStatus(job);
                  
                  return (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{job.job_type}</Badge>
                            <Badge variant={jobStatus.variant}>
                              {jobStatus.text}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span>{job.experience_level}</span>
                          <span>{job.department}</span>
                        </div>
                        {job.salary_range && (
                          <div className="text-sm font-medium text-green-600">
                            {job.salary_range}
                          </div>
                        )}
                        {job.deadline && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            Apply by: {new Date(job.deadline).toLocaleDateString()}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{job.description}</p>
                        {job.requirements && job.requirements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Key Requirements:</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.requirements.slice(0, 3).map((requirement, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {requirement}
                                </Badge>
                              ))}
                              {job.requirements.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{job.requirements.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {job.application_count} applications
                            {job.application_limit && ` / ${job.application_limit}`}
                          </div>
                          {jobClosed ? (
                            <div className="flex items-center gap-2 text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Job Closed</span>
                            </div>
                          ) : (
                            <Button 
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleApplyClick(job.title)}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Marzelet?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Great Team Culture</h3>
                <p className="text-muted-foreground">Work with passionate professionals in a collaborative environment.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
                <p className="text-muted-foreground">Flexible working hours and a healthy work-life balance.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
                <p className="text-muted-foreground">Continuous learning and career advancement opportunities.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob}
        isOtherRole={false}
      />
    </Layout>
  );
};

export default Careers;

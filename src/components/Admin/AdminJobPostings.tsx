import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, Plus, Save, X, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import type { Json } from '@/integrations/supabase/types';

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
  is_active: boolean;
  created_at: string;
  application_count: number;
  application_limit: number | null;
  multiple_choice_questions: MultipleChoiceQuestion[];
}

interface MultipleChoiceQuestion {
  question: string;
  options: string[];
  correctAnswer?: number;
}

const AdminJobPostings = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyJob = {
    id: '',
    title: '',
    department: '',
    location: 'Chennai, Tamil Nadu',
    job_type: 'Full-time',
    experience_level: 'Entry Level',
    description: '',
    requirements: [],
    responsibilities: [],
    benefits: [],
    salary_range: '',
    deadline: '',
    is_active: true,
    created_at: '',
    application_count: 0,
    application_limit: null,
    multiple_choice_questions: []
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to ensure proper typing
      const transformedData: JobPosting[] = (data || []).map(job => ({
        ...job,
        multiple_choice_questions: Array.isArray(job.multiple_choice_questions) 
          ? job.multiple_choice_questions as unknown as MultipleChoiceQuestion[]
          : []
      }));
      
      setJobPostings(transformedData);
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

  const handlePublishToggle = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('job_postings')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast({ 
        title: !currentStatus ? "Job posting published!" : "Job posting unpublished!" 
      });
      fetchJobPostings();
    } catch (error) {
      console.error('Error updating job status:', error);
      toast({
        title: "Error updating job status",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (jobData: JobPosting) => {
    try {
      if (jobData.id) {
        // Update existing job
        const { error } = await supabase
          .from('job_postings')
          .update({
            title: jobData.title,
            department: jobData.department,
            location: jobData.location,
            job_type: jobData.job_type,
            experience_level: jobData.experience_level,
            description: jobData.description,
            requirements: jobData.requirements,
            responsibilities: jobData.responsibilities,
            benefits: jobData.benefits,
            salary_range: jobData.salary_range,
            deadline: jobData.deadline || null,
            is_active: jobData.is_active,
            application_limit: jobData.application_limit,
            multiple_choice_questions: jobData.multiple_choice_questions as unknown as Json,
          })
          .eq('id', jobData.id);

        if (error) throw error;
        toast({ title: "Job posting updated successfully!" });
      } else {
        // Create new job
        const { error } = await supabase
          .from('job_postings')
          .insert([{
            title: jobData.title,
            department: jobData.department,
            location: jobData.location,
            job_type: jobData.job_type,
            experience_level: jobData.experience_level,
            description: jobData.description,
            requirements: jobData.requirements,
            responsibilities: jobData.responsibilities,
            benefits: jobData.benefits,
            salary_range: jobData.salary_range,
            deadline: jobData.deadline || null,
            is_active: jobData.is_active,
            application_limit: jobData.application_limit,
            multiple_choice_questions: jobData.multiple_choice_questions as unknown as Json,
          }]);

        if (error) throw error;
        toast({ title: "Job posting created successfully!" });
      }

      fetchJobPostings();
      setEditingJob(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Error saving job posting:', error);
      toast({
        title: "Error saving job posting",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    try {
      const { error } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Job posting deleted successfully!" });
      fetchJobPostings();
    } catch (error) {
      console.error('Error deleting job posting:', error);
      toast({
        title: "Error deleting job posting",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const JobForm = ({ jobData, onSave, onCancel }: {
    jobData: JobPosting;
    onSave: (data: JobPosting) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState(jobData);
    const [mcQuestions, setMcQuestions] = useState<MultipleChoiceQuestion[]>(
      jobData.multiple_choice_questions || []
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ ...formData, multiple_choice_questions: mcQuestions });
    };

    const handleArrayChange = (field: keyof JobPosting, value: string) => {
      const array = value.split('\n').filter(item => item.trim());
      setFormData({ ...formData, [field]: array });
    };

    const addMCQuestion = () => {
      setMcQuestions([...mcQuestions, { question: '', options: ['', '', '', ''] }]);
    };

    const updateMCQuestion = (index: number, field: string, value: string | string[]) => {
      const updated = [...mcQuestions];
      updated[index] = { ...updated[index], [field]: value };
      setMcQuestions(updated);
    };

    const removeMCQuestion = (index: number) => {
      setMcQuestions(mcQuestions.filter((_, i) => i !== index));
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{jobData.id ? 'Edit Job Posting' : 'Create Job Posting'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Department *</label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Job Type *</label>
                <Select
                  value={formData.job_type}
                  onValueChange={(value) => setFormData({ ...formData, job_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experience Level *</label>
                <Select
                  value={formData.experience_level}
                  onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry Level">Entry Level</SelectItem>
                    <SelectItem value="Mid Level">Mid Level</SelectItem>
                    <SelectItem value="Senior Level">Senior Level</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Salary Range</label>
                <Input
                  value={formData.salary_range}
                  onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                  placeholder="e.g., $50,000 - $70,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Application Deadline</label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Application Limit</label>
                <Input
                  type="number"
                  value={formData.application_limit || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    application_limit: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  placeholder="e.g., 50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Requirements (one per line)</label>
              <Textarea
                value={formData.requirements.join('\n')}
                onChange={(e) => handleArrayChange('requirements', e.target.value)}
                rows={4}
                placeholder="Bachelor's degree in Computer Science&#10;2+ years of experience&#10;Knowledge of React/Node.js"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Responsibilities (one per line)</label>
              <Textarea
                value={formData.responsibilities.join('\n')}
                onChange={(e) => handleArrayChange('responsibilities', e.target.value)}
                rows={4}
                placeholder="Develop and maintain web applications&#10;Collaborate with design team&#10;Write clean, maintainable code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Benefits (one per line)</label>
              <Textarea
                value={formData.benefits.join('\n')}
                onChange={(e) => handleArrayChange('benefits', e.target.value)}
                rows={3}
                placeholder="Health insurance&#10;Flexible working hours&#10;Professional development opportunities"
              />
            </div>

            {/* Multiple Choice Questions Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">Multiple Choice Questions</label>
                <Button type="button" onClick={addMCQuestion} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
              
              {mcQuestions.map((question, qIndex) => (
                <Card key={qIndex} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <Input
                        placeholder={`Question ${qIndex + 1}`}
                        value={question.question}
                        onChange={(e) => updateMCQuestion(qIndex, 'question', e.target.value)}
                        className="flex-1 mr-2"
                      />
                      <Button
                        type="button"
                        onClick={() => removeMCQuestion(qIndex)}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option, oIndex) => (
                        <Input
                          key={oIndex}
                          placeholder={`Option ${oIndex + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.options];
                            newOptions[oIndex] = e.target.value;
                            updateMCQuestion(qIndex, 'options', newOptions);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  if (isCreating) {
    return (
      <JobForm
        jobData={emptyJob}
        onSave={handleSave}
        onCancel={() => setIsCreating(false)}
      />
    );
  }

  if (editingJob) {
    return (
      <JobForm
        jobData={editingJob}
        onSave={handleSave}
        onCancel={() => setEditingJob(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Postings Management</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Job Posting
        </Button>
      </div>

      <div className="grid gap-4">
        {jobPostings.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <Badge variant={job.is_active ? "default" : "secondary"}>
                      {job.is_active ? "Published" : "Unpublished"}
                    </Badge>
                    <Badge variant="outline">{job.job_type}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {job.department} • {job.location} • {job.experience_level}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Created: {new Date(job.created_at).toLocaleDateString()} • 
                    Applications: {job.application_count}
                    {job.application_limit && ` / ${job.application_limit}`}
                    {job.deadline && ` • Deadline: ${new Date(job.deadline).toLocaleDateString()}`}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublishToggle(job.id, job.is_active)}
                  >
                    {job.is_active ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        Publish
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingJob(job)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {jobPostings.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No job postings found. Create your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminJobPostings;

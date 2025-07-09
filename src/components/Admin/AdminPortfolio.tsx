
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, ExternalLink, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  image: string;
  category: string;
  technologies: string[];
  demo_link: string | null;
  github_link: string | null;
  client_name: string | null;
  project_duration: string | null;
  completion_date: string | null;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

const AdminPortfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    image: '',
    category: '',
    technologies: '',
    demo_link: '',
    github_link: '',
    client_name: '',
    project_duration: '',
    completion_date: '',
    is_published: true,
    is_featured: false
  });

  const categories = [
    'AI/Machine Learning',
    'IoT/Tracking',
    'Enterprise Software',
    'Web Application',
    'Enterprise ERP',
    'E-commerce',
    'Mobile Development',
    'Custom Software'
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
        completion_date: formData.completion_date || null,
        demo_link: formData.demo_link || null,
        github_link: formData.github_link || null,
        client_name: formData.client_name || null,
        project_duration: formData.project_duration || null,
        long_description: formData.long_description || null
      };

      if (editingProject) {
        const { error } = await supabase
          .from('portfolio_projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Project updated successfully!');
      } else {
        const { error } = await supabase
          .from('portfolio_projects')
          .insert([projectData]);

        if (error) throw error;
        toast.success('Project created successfully!');
      }

      setIsFormOpen(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      long_description: project.long_description || '',
      image: project.image,
      category: project.category,
      technologies: project.technologies.join(', '),
      demo_link: project.demo_link || '',
      github_link: project.github_link || '',
      client_name: project.client_name || '',
      project_duration: project.project_duration || '',
      completion_date: project.completion_date || '',
      is_published: project.is_published,
      is_featured: project.is_featured
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      long_description: '',
      image: '',
      category: '',
      technologies: '',
      demo_link: '',
      github_link: '',
      client_name: '',
      project_duration: '',
      completion_date: '',
      is_published: true,
      is_featured: false
    });
  };

  const openCreateForm = () => {
    setEditingProject(null);
    resetForm();
    setIsFormOpen(true);
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Management</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="long_description">Long Description</Label>
                <Textarea
                  id="long_description"
                  value={formData.long_description}
                  onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                  rows={5}
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma-separated) *</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  required
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client_name">Client Name</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="project_duration">Project Duration</Label>
                  <Input
                    id="project_duration"
                    value={formData.project_duration}
                    onChange={(e) => setFormData({ ...formData, project_duration: e.target.value })}
                    placeholder="6 months"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="completion_date">Completion Date</Label>
                  <Input
                    id="completion_date"
                    type="date"
                    value={formData.completion_date}
                    onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="demo_link">Demo Link</Label>
                  <Input
                    id="demo_link"
                    value={formData.demo_link}
                    onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="github_link">GitHub Link</Label>
                <Input
                  id="github_link"
                  value={formData.github_link}
                  onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : editingProject ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                {project.is_featured && (
                  <Badge variant="secondary" className="bg-yellow-500 text-white">
                    Featured
                  </Badge>
                )}
                <Badge variant={project.is_published ? "default" : "secondary"}>
                  {project.is_published ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <Badge variant="outline">{project.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                <span>Views: {project.view_count}</span>
                <span>Likes: {project.likes_count}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(project)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link to={`/portfolio/${project.id}`} target="_blank">
                    <Eye className="w-4 h-4" />
                  </Link>
                </Button>
                {project.demo_link && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first portfolio project.</p>
            <Button onClick={openCreateForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminPortfolio;

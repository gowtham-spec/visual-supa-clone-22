import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, Clock, Search, Filter, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const categories = ['all', ...new Set(blogs?.map(blog => blog.category).filter(Boolean) || [])];
  
  const filteredBlogs = blogs?.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = filteredBlogs?.[0];
  const otherBlogs = filteredBlogs?.slice(1) || [];

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 pt-32">
          <div className="text-center">Loading blogs...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Insights & Articles
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover the latest insights in technology, digital transformation, and industry trends
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredBlog && (
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  {featuredBlog.image && (
                    <img
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                    />
                  )}
                </div>
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Featured Article
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredBlog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredBlog.author}</span>
                    </div>
                    {featuredBlog.reading_time && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredBlog.reading_time} min read</span>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => navigate(`/blog/${featuredBlog.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Latest Articles</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div onClick={() => navigate(`/blog/${blog.id}`)}>
                    {blog.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {blog.category && (
                          <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                            {blog.category}
                          </Badge>
                        )}
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{blog.author}</span>
                        {blog.reading_time && (
                          <>
                            <span>•</span>
                            <span>{blog.reading_time} min</span>
                          </>
                        )}
                      </div>
                      <h4 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {(!blogs || blogs.length === 0) && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
                <p className="text-gray-600">Check back later for the latest insights and articles.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

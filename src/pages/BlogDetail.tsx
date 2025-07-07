import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, Eye, Home, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      if (!id) throw new Error('Blog ID is required');
      
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const handleShare = async () => {
    if (!blog) return;
    
    // Use the actual current URL which will be the published domain when deployed
    const currentUrl = window.location.href;
    
    const shareData = {
      title: blog.title,
      text: blog.excerpt || blog.title,
      url: currentUrl,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully!",
          description: "Blog post has been shared.",
        });
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(currentUrl);
        toast({
          title: "Link copied!",
          description: "Blog post link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(currentUrl);
        toast({
          title: "Link copied!",
          description: "Blog post link has been copied to your clipboard.",
        });
      } catch (clipboardError) {
        toast({
          title: "Sharing failed",
          description: "Unable to share or copy the link.",
          variant: "destructive",
        });
      }
    }
  };

  const handleLike = async () => {
    if (!blog) return;
    
    try {
      const newLikesCount = isLiked ? blog.likes_count - 1 : blog.likes_count + 1;
      
      const { error } = await supabase
        .from('blogs')
        .update({ likes_count: newLikesCount })
        .eq('id', blog.id);
      
      if (error) throw error;
      
      setIsLiked(!isLiked);
      toast({
        title: isLiked ? "Removed like" : "Liked!",
        description: isLiked ? "You unliked this blog post." : "Thank you for liking this blog post!",
      });
    } catch (error) {
      console.error('Error updating likes:', error);
      toast({
        title: "Error",
        description: "Unable to update likes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')
      .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mb-6 mt-8 text-gray-800 dark:text-white">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mb-4 mt-6 text-gray-700 dark:text-gray-200">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-semibold mb-3 mt-4 text-gray-600 dark:text-gray-300">$1</h3>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-6 py-2 italic my-4 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300">$1</blockquote>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-6 mb-1 list-decimal text-gray-800 dark:text-gray-200">$1</li>')
      .replace(/^• (.*$)/gm, '<li class="ml-6 mb-1 list-disc text-gray-800 dark:text-gray-200">$1</li>')
      .replace(/^---$/gm, '<hr class="border-t-2 border-gray-300 dark:border-gray-600 my-6" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank">$1</a>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h1>') || paragraph.includes('<h2>') || paragraph.includes('<h3>') || 
            paragraph.includes('<blockquote>') || paragraph.includes('<li>') || paragraph.includes('<hr')) {
          return paragraph;
        }
        return paragraph.trim() ? `<p class="mb-6 leading-relaxed text-gray-800 dark:text-gray-200 text-lg">${paragraph}</p>` : '';
      })
      .join('');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 pt-32">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-lg">Loading blog post...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 pt-32">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Blog Post Not Found</h1>
              <p className="text-muted-foreground mb-4">The blog post you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/blog')} className="transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 dark:bg-gray-800 border-b mt-20 transition-all duration-300">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center hover:text-blue-600 transition-all duration-300"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/blog')}
              className="hover:text-blue-600 transition-all duration-300"
            >
              Blog
            </Button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400 truncate max-w-xs">{blog.title}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 bg-background transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                {/* Hero Image with Share Button */}
                {blog.image && (
                  <div className="relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-80 object-cover transition-all duration-300"
                    />
                    {/* Share Button positioned in top-right corner */}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm shadow-lg transition-all duration-300"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                )}
                
                <div className="p-8">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      {blog.category && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 transition-all duration-300">
                          {blog.category}
                        </Badge>
                      )}
                      {blog.tags?.map((tag, index) => (
                        <Badge key={index} variant="outline" className="transition-all duration-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                      {blog.title}
                    </h1>
                    
                    {blog.excerpt && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 mb-6 transition-all duration-300">
                        <p className="text-xl text-blue-800 dark:text-blue-300 italic font-medium leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>
                    )}
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      {blog.reading_time && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{blog.reading_time} min read</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        <span>{blog.view_count || 0} views</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={`transition-all duration-300 ${isLiked ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' : ''}`}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {blog.likes_count || 0} Likes
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="transition-all duration-300"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share This Article
                    </Button>
                  </div>

                  {/* Content */}
                  <div 
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: formatContent(blog.content || '') }}
                  />

                  {/* Back Button */}
                  <div className="mt-12 pt-8 border-t">
                    <Button onClick={() => navigate('/blog')} variant="outline" className="transition-all duration-300">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to All Posts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;

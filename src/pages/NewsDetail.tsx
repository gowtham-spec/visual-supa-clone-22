
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Calendar, User, Eye, Share2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: newsItem, isLoading } = useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      if (!id) throw new Error('No news ID provided');
      
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes for faster loading
  });

  // Increment view count when component mounts
  useEffect(() => {
    if (id && newsItem) {
      const incrementViewCount = async () => {
        try {
          await supabase
            .from('news')
            .update({ view_count: (newsItem.view_count || 0) + 1 })
            .eq('id', id);
        } catch (error) {
          console.error('Error incrementing view count:', error);
        }
      };
      incrementViewCount();
    }
  }, [id, newsItem]);

  const handleShare = async () => {
    if (!newsItem) return;
    
    const shareData = {
      title: newsItem.title,
      text: newsItem.excerpt,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link copied!",
          description: "News link has been copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link copied!",
          description: "News link has been copied to clipboard",
        });
      } catch (clipboardError) {
        toast({
          title: "Share failed",
          description: "Unable to share or copy link",
          variant: "destructive",
        });
      }
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
        <div className="container mx-auto px-4 py-16 pt-32">
          <div className="text-center">Loading news article...</div>
        </div>
      </Layout>
    );
  }

  if (!newsItem) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 pt-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested news article could not be found.</p>
          <Button onClick={() => navigate('/news')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20 bg-white dark:bg-gray-900 min-h-screen relative overflow-hidden">
        {/* Floating animations around the news content */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-8 w-6 h-6 bg-blue-400/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-48 right-12 w-4 h-4 bg-purple-400/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
          <div className="absolute top-80 left-16 w-8 h-8 bg-green-400/15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute top-96 right-20 w-5 h-5 bg-pink-400/20 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-96 left-12 w-7 h-7 bg-yellow-400/18 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.8s' }}></div>
          <div className="absolute bottom-80 right-16 w-6 h-6 bg-cyan-400/22 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3.2s' }}></div>
          <div className="absolute bottom-64 left-20 w-4 h-4 bg-indigo-400/20 rounded-full animate-bounce" style={{ animationDelay: '3s', animationDuration: '2.7s' }}></div>
          <div className="absolute bottom-48 right-8 w-8 h-8 bg-orange-400/16 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '3.8s' }}></div>
          
          {/* Add a bigger circle */}
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '4.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Increase width size a little bigger */}
          <div className="max-w-5xl mx-auto">
            
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={() => navigate('/news')}
              className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>

            {/* Article Content */}
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative transition-all duration-200">
              
              {/* Featured Image - Show image fully */}
              {newsItem.image && (
                <div className="relative w-full h-[500px] mb-8">
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.title}
                    className="w-full h-full object-cover object-center transition-all duration-200"
                    style={{ imageRendering: 'crisp-edges' }}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white">
                      Breaking News
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-slate-900/80 text-white px-4 py-2 rounded text-sm font-medium">
                    {new Date(newsItem.created_at).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }).toUpperCase()}
                  </div>
                </div>
              )}

              <div className="p-12">
                {/* Article Header */}
                <header className="mb-8">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                    {newsItem.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">{new Date(newsItem.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span className="font-medium">{newsItem.author || 'Marzelet Team'}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span className="font-medium">{(newsItem.view_count || 0) + 1} views</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">5 min read</span>
                    </div>

                    <Button
                      onClick={handleShare}
                      variant="outline"
                      size="sm"
                      className="ml-auto hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Article
                    </Button>
                  </div>
                </header>

                {/* Article Content */}
                <div className="prose prose-xl max-w-none dark:prose-invert">
                  {newsItem.excerpt && (
                    <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-600 font-medium leading-relaxed">
                      {newsItem.excerpt}
                    </div>
                  )}
                  
                  <div 
                    className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-6 text-lg"
                    dangerouslySetInnerHTML={{ __html: formatContent(newsItem.content) }}
                  />
                </div>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Published on </span>
                      {new Date(newsItem.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      <span className="font-medium"> by {newsItem.author || 'Marzelet Team'}</span>
                    </div>
                    
                    <Button
                      onClick={handleShare}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;

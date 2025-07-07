
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, Clock, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const filteredNews = newsItems?.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const latestNews = filteredNews.slice(0, 3);
  const moreStories = filteredNews.slice(3);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 pt-32">
          <div className="text-center">Loading news...</div>
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
              Latest News & Updates
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Stay informed with the latest developments and insights from our industry
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest News</h2>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {filteredNews.length} {filteredNews.length === 1 ? 'Article' : 'Articles'} Found
                </span>
              </div>
            </div>

            {latestNews.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {latestNews.map((item) => (
                  <Card 
                    key={item.id} 
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate(`/news-detail/${item.id}`)}
                  >
                    {item.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white">
                          Breaking
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <User className="h-3 w-3" />
                        <span>{item.author || 'Marzelet Team'}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>5 min read</span>
                      </div>
                      <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold mb-2">No Latest News Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Check back later for the latest updates.'}
                </p>
              </div>
            )}

            {/* Separator */}
            {moreStories.length > 0 && (
              <Separator className="my-12 bg-gray-200 dark:bg-gray-700" />
            )}

            {/* More Stories Section */}
            {moreStories.length > 0 && (
              <>
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">More Stories</h2>
                <div className="space-y-6">
                  {moreStories.map((item) => (
                    <Card 
                      key={item.id} 
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => navigate(`/news-detail/${item.id}`)}
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          {item.image && (
                            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-6">
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(item.created_at).toLocaleDateString()}</span>
                              <span>•</span>
                              <User className="h-3 w-3" />
                              <span>{item.author || 'Marzelet Team'}</span>
                              <span>•</span>
                              <Clock className="h-3 w-3" />
                              <span>5 min read</span>
                            </div>
                            <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                              {item.excerpt}
                            </p>
                            <div className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                              Read Full Story
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;

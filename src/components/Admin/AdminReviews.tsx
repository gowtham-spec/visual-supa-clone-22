
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';

const AdminReviews = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles!reviews_user_id_fkey(avatar_url)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      const { error } = await supabase
        .from('reviews')
        .update({ is_featured: !isFeatured })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast({
        title: "Success",
        description: "Review status updated successfully.",
      });
    }
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast({
        title: "Success",
        description: "Review deleted successfully.",
      });
    }
  });

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reviews</h2>

      <div className="space-y-4">
        {reviews?.map((review) => (
          <Card key={review.id} className="bg-slate-800/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                    {review.profiles?.avatar_url ? (
                      <img 
                        src={review.profiles.avatar_url} 
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{review.name}</h3>
                      <span className="text-sm text-blue-400">📧 {review.company || 'Individual'}</span>
                      <Badge variant={review.is_featured ? 'default' : 'secondary'}>
                        {review.is_featured ? '⭐ Featured' : '📝 Regular'}
                      </Badge>
                      {review.is_verified && (
                        <Badge variant="outline">✅ Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {'⭐'.repeat(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.rating}/5</span>
                    </div>
                    <p className="text-muted-foreground mb-2">"{review.comment}"</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleFeaturedMutation.mutate({ id: review.id, isFeatured: review.is_featured })}
                  >
                    {review.is_featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteReviewMutation.mutate(review.id)}
                  >
                    🗑️
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

export default AdminReviews;

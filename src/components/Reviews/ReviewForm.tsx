
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReviewFormProps {
  onClose?: () => void;
}

const ReviewForm = ({ onClose }: ReviewFormProps) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [serviceType, setServiceType] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitReviewMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to submit a review');

      const { error } = await supabase
        .from('reviews')
        .insert({
          name,
          company,
          comment,
          rating,
          service_type: serviceType,
          user_id: user.id,
          is_verified: false,
          is_featured: false
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. Your review will be visible shortly.",
      });
      setName('');
      setCompany('');
      setComment('');
      setRating(5);
      setServiceType('');
      onClose?.();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReviewMutation.mutate({});
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle as="h2">Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="review-name" className="text-sm font-medium">
                Your Name *
              </Label>
              <Input
                id="review-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                aria-required="true"
                aria-describedby="name-help"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div id="name-help" className="text-xs text-gray-600">
                This will be displayed with your review
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="review-company" className="text-sm font-medium">
                Company (Optional)
              </Label>
              <Input
                id="review-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company name"
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-service-type" className="text-sm font-medium">
              Service Type (Optional)
            </Label>
            <Input
              id="review-service-type"
              type="text"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              placeholder="Which service did you use?"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Rating *
            </Label>
            <div 
              className="flex items-center space-x-1"
              role="radiogroup"
              aria-labelledby="rating-label"
              aria-required="true"
            >
              <span id="rating-label" className="sr-only">Select your rating from 1 to 5 stars</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  role="radio"
                  aria-checked={star === rating}
                  aria-label={`${star} star${star !== 1 ? 's' : ''}`}
                  className="p-1 min-h-[44px] min-w-[44px] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground" aria-live="polite">
                {rating}/5 stars selected
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-comment" className="text-sm font-medium">
              Your Review *
            </Label>
            <Textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with our services..."
              rows={4}
              required
              aria-required="true"
              aria-describedby="comment-help"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div id="comment-help" className="text-xs text-gray-600">
              Minimum 10 characters. Be specific about your experience.
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={submitReviewMutation.isPending}
              className="flex-1 min-h-[44px] bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-describedby="submit-help"
            >
              {submitReviewMutation.isPending ? "Submitting Review..." : "Submit Review"}
            </Button>
            {onClose && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                aria-label="Cancel review submission"
                className="min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </Button>
            )}
          </div>
          <div id="submit-help" className="text-xs text-gray-600">
            Your review will be reviewed before being published
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;

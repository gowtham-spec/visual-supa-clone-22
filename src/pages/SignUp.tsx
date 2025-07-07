
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Branding */}
      <div className="w-1/2 bg-slate-800 flex flex-col justify-center items-center p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 overflow-hidden">
            <img 
              src="/lovable-uploads/ea4b0375-50fd-4c5e-83fd-3830452ef78b.png" 
              alt="Marzelet Info Technology Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Logo failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6">
            Marzelet Info Technology
          </h1>
          
          <p className="text-xl text-slate-300 mb-12 max-w-md">
            Innovating the future with cutting-edge technology solutions
          </p>
          
          <div className="space-y-6 text-left max-w-md">
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Enterprise-grade security
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              24/7 expert support
            </div>
            <div className="flex items-center text-slate-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
              Global reach, local expertise
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign Up form */}
      <div className="w-1/2 bg-white flex flex-col justify-center p-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="self-start mb-8 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Create Account
            </h2>
            <p className="text-slate-600">
              Sign up to get started with us
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 bg-slate-50 border-slate-200"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-slate-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-slate-50 border-slate-200"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-slate-700 font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-slate-50 border-slate-200"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center">
              <span className="text-slate-600">Already have an account? </span>
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/auth/signin')}
                className="text-orange-500 hover:text-orange-600 p-0 font-semibold"
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

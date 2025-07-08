
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Create QueryClient with optimized settings for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Optimized loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Lazy load all pages with prefetch hints for critical pages
const Index = lazy(() => 
  import("./pages/Index").then(module => ({ default: module.default }))
);
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Careers = lazy(() => import("./pages/Careers"));
const Reviews = lazy(() => import("./pages/Reviews"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const OurTeam = lazy(() => import("./pages/OurTeam"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Service pages - grouped loading
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const MobileDevelopment = lazy(() => import("./pages/MobileDevelopment"));
const SoftwareDevelopment = lazy(() => import("./pages/SoftwareDevelopment"));
const DigitalMarketing = lazy(() => import("./pages/DigitalMarketing"));
const CustomERPCRM = lazy(() => import("./pages/CustomERPCRM"));
const IoTEmbedded = lazy(() => import("./pages/IoTEmbedded"));
const SEOBranding = lazy(() => import("./pages/SEOBranding"));
const EmailMarketing = lazy(() => import("./pages/EmailMarketing"));
const UIUXDesign = lazy(() => import("./pages/UIUXDesign"));
const DataAnalytics = lazy(() => import("./pages/DataAnalytics"));
const ITInfrastructure = lazy(() => import("./pages/ITInfrastructure"));
const BusinessConsulting = lazy(() => import("./pages/BusinessConsulting"));
const CCTVBiometric = lazy(() => import("./pages/CCTVBiometric"));
const InternshipTraining = lazy(() => import("./pages/InternshipTraining"));

// Legal and support pages - lowest priority
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const GDPRCompliance = lazy(() => import("./pages/GDPRCompliance"));
const SupportCenter = lazy(() => import("./pages/SupportCenter"));
const Documentation = lazy(() => import("./pages/Documentation"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Main pages */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                <Route path="/news" element={<News />} />
                <Route path="/news-detail/:id" element={<NewsDetail />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/reviews" element={<Reviews />} />

                {/* Authentication pages */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<ProfileSettings />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Service pages */}
                <Route path="/services/web-development" element={<WebDevelopment />} />
                <Route path="/services/mobile-development" element={<MobileDevelopment />} />
                <Route path="/services/software-development" element={<SoftwareDevelopment />} />
                <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                <Route path="/services/erp-crm" element={<CustomERPCRM />} />
                <Route path="/services/iot-embedded" element={<IoTEmbedded />} />
                <Route path="/services/seo-branding" element={<SEOBranding />} />
                <Route path="/services/email-marketing" element={<EmailMarketing />} />
                <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
                <Route path="/services/data-analytics" element={<DataAnalytics />} />
                <Route path="/services/it-infrastructure" element={<ITInfrastructure />} />
                <Route path="/services/business-consulting" element={<BusinessConsulting />} />
                <Route path="/services/cctv-biometric" element={<CCTVBiometric />} />
                <Route path="/services/internship-training" element={<InternshipTraining />} />

                {/* Legal and support pages */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/gdpr-compliance" element={<GDPRCompliance />} />
                <Route path="/support-center" element={<SupportCenter />} />
                <Route path="/documentation" element={<Documentation />} />

                {/* Catch all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

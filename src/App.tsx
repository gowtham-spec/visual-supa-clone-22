
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorBoundary from "@/components/ErrorBoundary";

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

// Lazy load all pages with better error handling
const Index = lazy(() => 
  import("./pages/Index").then(module => ({ default: module.default })).catch(err => {
    console.error('Failed to load Index page:', err);
    return { default: () => <div>Error loading home page</div> };
  })
);

const AboutUs = lazy(() => import("./pages/AboutUs").catch(err => {
  console.error('Failed to load AboutUs page:', err);
  return { default: () => <div>Error loading about page</div> };
}));

const Blog = lazy(() => import("./pages/Blog").catch(err => {
  console.error('Failed to load Blog page:', err);
  return { default: () => <div>Error loading blog page</div> };
}));

const BlogDetail = lazy(() => import("./pages/BlogDetail").catch(err => {
  console.error('Failed to load BlogDetail page:', err);
  return { default: () => <div>Error loading blog detail page</div> };
}));

const Portfolio = lazy(() => import("./pages/Portfolio").catch(err => {
  console.error('Failed to load Portfolio page:', err);
  return { default: () => <div>Error loading portfolio page</div> };
}));

const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail").catch(err => {
  console.error('Failed to load PortfolioDetail page:', err);
  return { default: () => <div>Error loading portfolio detail page</div> };
}));

const Auth = lazy(() => import("./pages/Auth").catch(err => {
  console.error('Failed to load Auth page:', err);
  return { default: () => <div>Error loading auth page</div> };
}));

const SignIn = lazy(() => import("./pages/SignIn").catch(err => {
  console.error('Failed to load SignIn page:', err);
  return { default: () => <div>Error loading sign in page</div> };
}));

const SignUp = lazy(() => import("./pages/SignUp").catch(err => {
  console.error('Failed to load SignUp page:', err);
  return { default: () => <div>Error loading sign up page</div> };
}));

const News = lazy(() => import("./pages/News").catch(err => {
  console.error('Failed to load News page:', err);
  return { default: () => <div>Error loading news page</div> };
}));

const NewsDetail = lazy(() => import("./pages/NewsDetail").catch(err => {
  console.error('Failed to load NewsDetail page:', err);
  return { default: () => <div>Error loading news detail page</div> };
}));

const Careers = lazy(() => import("./pages/Careers").catch(err => {
  console.error('Failed to load Careers page:', err);
  return { default: () => <div>Error loading careers page</div> };
}));

const Reviews = lazy(() => import("./pages/Reviews").catch(err => {
  console.error('Failed to load Reviews page:', err);
  return { default: () => <div>Error loading reviews page</div> };
}));

const AdminDashboard = lazy(() => import("./pages/AdminDashboard").catch(err => {
  console.error('Failed to load AdminDashboard page:', err);
  return { default: () => <div>Error loading admin dashboard page</div> };
}));

const OurTeam = lazy(() => import("./pages/OurTeam").catch(err => {
  console.error('Failed to load OurTeam page:', err);
  return { default: () => <div>Error loading our team page</div> };
}));

const ProfileSettings = lazy(() => import("./pages/ProfileSettings").catch(err => {
  console.error('Failed to load ProfileSettings page:', err);
  return { default: () => <div>Error loading profile settings page</div> };
}));

const ForgotPassword = lazy(() => import("./pages/ForgotPassword").catch(err => {
  console.error('Failed to load ForgotPassword page:', err);
  return { default: () => <div>Error loading forgot password page</div> };
}));

const ResetPassword = lazy(() => import("./pages/ResetPassword").catch(err => {
  console.error('Failed to load ResetPassword page:', err);
  return { default: () => <div>Error loading reset password page</div> };
}));

// Service pages - grouped loading with error handling
const WebDevelopment = lazy(() => import("./pages/WebDevelopment").catch(err => {
  console.error('Failed to load WebDevelopment page:', err);
  return { default: () => <div>Error loading web development page</div> };
}));

const MobileDevelopment = lazy(() => import("./pages/MobileDevelopment").catch(err => {
  console.error('Failed to load MobileDevelopment page:', err);
  return { default: () => <div>Error loading mobile development page</div> };
}));

const SoftwareDevelopment = lazy(() => import("./pages/SoftwareDevelopment").catch(err => {
  console.error('Failed to load SoftwareDevelopment page:', err);
  return { default: () => <div>Error loading software development page</div> };
}));

const DigitalMarketing = lazy(() => import("./pages/DigitalMarketing").catch(err => {
  console.error('Failed to load DigitalMarketing page:', err);
  return { default: () => <div>Error loading digital marketing page</div> };
}));

const CustomERPCRM = lazy(() => import("./pages/CustomERPCRM").catch(err => {
  console.error('Failed to load CustomERPCRM page:', err);
  return { default: () => <div>Error loading ERP CRM page</div> };
}));

const IoTEmbedded = lazy(() => import("./pages/IoTEmbedded").catch(err => {
  console.error('Failed to load IoTEmbedded page:', err);
  return { default: () => <div>Error loading IoT embedded page</div> };
}));

const SEOBranding = lazy(() => import("./pages/SEOBranding").catch(err => {
  console.error('Failed to load SEOBranding page:', err);
  return { default: () => <div>Error loading SEO branding page</div> };
}));

const EmailMarketing = lazy(() => import("./pages/EmailMarketing").catch(err => {
  console.error('Failed to load EmailMarketing page:', err);
  return { default: () => <div>Error loading email marketing page</div> };
}));

const UIUXDesign = lazy(() => import("./pages/UIUXDesign").catch(err => {
  console.error('Failed to load UIUXDesign page:', err);
  return { default: () => <div>Error loading UI UX design page</div> };
}));

const DataAnalytics = lazy(() => import("./pages/DataAnalytics").catch(err => {
  console.error('Failed to load DataAnalytics page:', err);
  return { default: () => <div>Error loading data analytics page</div> };
}));

const ITInfrastructure = lazy(() => import("./pages/ITInfrastructure").catch(err => {
  console.error('Failed to load ITInfrastructure page:', err);
  return { default: () => <div>Error loading IT infrastructure page</div> };
}));

const BusinessConsulting = lazy(() => import("./pages/BusinessConsulting").catch(err => {
  console.error('Failed to load BusinessConsulting page:', err);
  return { default: () => <div>Error loading business consulting page</div> };
}));

const CCTVBiometric = lazy(() => import("./pages/CCTVBiometric").catch(err => {
  console.error('Failed to load CCTVBiometric page:', err);
  return { default: () => <div>Error loading CCTV biometric page</div> };
}));

const InternshipTraining = lazy(() => import("./pages/InternshipTraining").catch(err => {
  console.error('Failed to load InternshipTraining page:', err);
  return { default: () => <div>Error loading internship training page</div> };
}));

// Legal and support pages - lowest priority with error handling
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").catch(err => {
  console.error('Failed to load PrivacyPolicy page:', err);
  return { default: () => <div>Error loading privacy policy page</div> };
}));

const TermsOfService = lazy(() => import("./pages/TermsOfService").catch(err => {
  console.error('Failed to load TermsOfService page:', err);
  return { default: () => <div>Error loading terms of service page</div> };
}));

const CookiePolicy = lazy(() => import("./pages/CookiePolicy").catch(err => {
  console.error('Failed to load CookiePolicy page:', err);
  return { default: () => <div>Error loading cookie policy page</div> };
}));

const GDPRCompliance = lazy(() => import("./pages/GDPRCompliance").catch(err => {
  console.error('Failed to load GDPRCompliance page:', err);
  return { default: () => <div>Error loading GDPR compliance page</div> };
}));

const SupportCenter = lazy(() => import("./pages/SupportCenter").catch(err => {
  console.error('Failed to load SupportCenter page:', err);
  return { default: () => <div>Error loading support center page</div> };
}));

const Documentation = lazy(() => import("./pages/Documentation").catch(err => {
  console.error('Failed to load Documentation page:', err);
  return { default: () => <div>Error loading documentation page</div> };
}));

const NotFound = lazy(() => import("./pages/NotFound").catch(err => {
  console.error('Failed to load NotFound page:', err);
  return { default: () => <div>404 - Page not found</div> };
}));

function App() {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;

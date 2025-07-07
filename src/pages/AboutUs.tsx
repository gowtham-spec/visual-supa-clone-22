
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Lightbulb } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const AboutUs = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-br from-white via-blue-50 to-purple-50' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'}`}>
      <Layout>
        <section className="py-20 pt-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                About <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Marzelet</span>
              </h1>
              <p className={`text-xl max-w-4xl mx-auto mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Empowering businesses through innovative technology solutions and digital transformation expertise.
              </p>
            </div>

            {/* Our Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Story</h2>
                <p className={`text-lg mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Founded with a vision to bridge the gap between traditional business practices and cutting-edge technology, 
                  Marzelet Info Technology has been at the forefront of digital innovation.
                </p>
                <p className={`text-lg mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  We specialize in creating comprehensive solutions that not only meet current business needs but also 
                  prepare organizations for future challenges and opportunities.
                </p>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Our team of experts combines technical excellence with business acumen to deliver solutions that drive 
                  real results and sustainable growth.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/lovable-uploads/aaa24047-6e94-4821-a7af-895469a7e43b.png" 
                  alt="Marzelet Logo" 
                  className="w-64 h-64 object-contain animate-logo-float"
                />
              </div>
            </div>

            {/* Our Values */}
            <div className="mb-16">
              <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Constantly pushing boundaries to deliver cutting-edge solutions that drive business transformation.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Working closely with our clients as partners to understand their unique needs and challenges.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Excellence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Committed to delivering the highest quality solutions with attention to detail and precision.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`text-center p-6 ${theme === 'light' ? 'bg-white/80 backdrop-blur border-gray-200' : 'bg-slate-800/80 backdrop-blur border-slate-700'}`}>
                  <CardHeader>
                    <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      Focused on delivering measurable outcomes that drive real business value and growth.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Our Mission */}
            <div className={`text-center py-16 rounded-2xl ${theme === 'light' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-700 to-purple-700'} text-white`}>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl max-w-4xl mx-auto opacity-90">
                To empower businesses worldwide with innovative technology solutions that drive digital transformation, 
                enhance operational efficiency, and create sustainable competitive advantages in an ever-evolving digital landscape.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default AboutUs;

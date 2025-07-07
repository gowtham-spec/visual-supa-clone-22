import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Target, TrendingUp, Calendar, BarChart3, UserCheck, Lightbulb } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
const AboutSection = () => {
  const {
    theme
  } = useTheme();
  return <section id="about-section" className={`py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-slate-900'}`}>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            About <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">Marzelet</span>
          </h2>
          <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            We're a passionate team of digital innovators, designers, and developers committed to transforming businesses through exceptional digital experiences.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <Card className={`p-6 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>1+</div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Year Experience</p>
            </CardContent>
          </Card>

          <Card className={`p-6 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>20+</div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Team Members</p>
            </CardContent>
          </Card>

          <Card className={`p-6 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>98%</div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Success Rate</p>
            </CardContent>
          </Card>

          <Card className={`p-6 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>50+</div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Innovations</p>
            </CardContent>
          </Card>
        </div>

        {/* Mission, Vision and Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Our Mission and Our Vision */}
          <div>
            {/* Our Mission */}
            <div className="mb-12">
              <h3 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Mission</h3>
              <p className={`text-lg leading-relaxed mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                At Marzelet, we believe in the power of digital transformation to revolutionize how businesses connect with their audiences. Our mission is to create innovative, user-centric solutions that drive growth and deliver exceptional value.
              </p>
              <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                From startups to enterprise clients, we've helped many organizations achieve their digital goals through strategic thinking, creative design, and robust development.
              </p>
            </div>

            {/* Our Vision */}
            <div>
              <h3 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Vision</h3>
              <p className={`text-lg leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                To be the leading technology partner that transforms ideas into reality, fostering digital transformation across industries globally. We envision a future where businesses of all sizes can leverage the power of technology to achieve unprecedented growth and success.
              </p>
            </div>
          </div>

          {/* Right Column - Our Values */}
          <div className="space-y-6">
            <h3 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Values</h3>
            
            <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
              <CardContent className="p-0">
                <h4 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Innovation First</h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  We embrace cutting-edge technologies and creative solutions to stay ahead of the curve.
                </p>
              </CardContent>
            </Card>

            <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
              <CardContent className="p-0">
                <h4 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Client-Centric</h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Your success is our priority. We build lasting partnerships through exceptional service.
                </p>
              </CardContent>
            </Card>

            <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
              <CardContent className="p-0">
                <h4 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Quality Driven</h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Every project meets our rigorous standards for excellence and attention to detail.
                </p>
              </CardContent>
            </Card>

            <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'}`}>
              <CardContent className="p-0">
                <h4 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Transparent Process</h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Clear communication and regular updates keep you informed throughout your project.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-20">
          <h3 className={`text-3xl font-bold text-center mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Core Values</h3>
          <p className={`text-lg text-center mb-12 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            The principles that guide our work and define our commitment to excellence
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className={`p-8 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Security First</h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  We prioritize security in every solution, ensuring your data and systems are protected against evolving threats.
                </p>
              </CardContent>
            </Card>

            <Card className={`p-8 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Results Driven</h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  Our focus is on delivering measurable outcomes that drive real business value and operational efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className={`p-8 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Client Partnership</h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  We build long-term partnerships with our clients, working collaboratively to achieve shared success.
                </p>
              </CardContent>
            </Card>

            <Card className={`p-8 text-center ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Excellence</h4>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  We maintain the highest standards of quality and professionalism in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Journey Timeline */}
        <div>
          <h3 className={`text-3xl font-bold text-center mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Our Journey</h3>
          <p className={`text-lg text-center mb-12 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            A timeline of growth, innovation, and success in transforming businesses
          </p>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full"></div>
            
            <div className="space-y-12">
              {/* 2024 - Company Founded */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600 mb-2">2024</div>
                      <h4 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Company Founded</h4>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Marzelet Info Technology established in Chennai with a vision to transform IT infrastructure.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10 flex-shrink-0"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2024 - First Major Client */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10 flex-shrink-0"></div>
                <div className="w-1/2 pl-8">
                  <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600 mb-2">2024</div>
                      <h4 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>First Major Client</h4>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Successfully delivered 30% cost savings through optimized IT asset management for enterprise client.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 2024 - Web Development Focus */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600 mb-2">2024</div>
                      <h4 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Web Development Focus</h4>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        Specialized in cutting-edge web development solutions, from responsive websites to complex web applications using modern frameworks and technologies.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10 flex-shrink-0"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2025 - Growing Impact */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10 flex-shrink-0"></div>
                <div className="w-1/2 pl-8">
                  <Card className={`p-6 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-slate-800 border-slate-700'} hover:shadow-lg transition-shadow`}>
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-blue-600 mb-2">2025</div>
                      <h4 className={`text-xl font-semibold mb-3 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Growing Impact</h4>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Focusing on solutions that matter — starting with innovation in essential public and enterprise sectors.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;
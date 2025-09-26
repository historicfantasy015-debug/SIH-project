import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, MapPin, Calendar, TrendingUp, Award } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Aptitude Assessment',
      description: 'Discover your strengths and interests through scientifically designed quizzes'
    },
    {
      icon: TrendingUp,
      title: 'Career Mapping',
      description: 'Visualize your career journey from degree to dream job'
    },
    {
      icon: MapPin,
      title: 'College Directory',
      description: 'Find government colleges near you with detailed information'
    },
    {
      icon: Calendar,
      title: 'Timeline Tracker',
      description: 'Never miss important admission deadlines and exam dates'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Get personalized recommendations based on your profile'
    },
    {
      icon: Award,
      title: 'Scholarship Info',
      description: 'Access information about scholarships and financial aid'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Students Guided' },
    { number: '1,000+', label: 'Government Colleges' },
    { number: '200+', label: 'Career Paths' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Future Starts with the
              <span className="text-yellow-400"> Right Choice</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Personalized career guidance for Class 10 & 12 students. Discover your path through government colleges and build your dream career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quiz"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
              >
                Take Aptitude Quiz
              </Link>
              <Link
                to="/colleges"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
              >
                Explore Colleges
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and guidance you need to make informed decisions about your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Path?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have found their perfect career match through our platform.
          </p>
          <Link
            to="/login"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
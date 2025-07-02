import React from 'react';
import { Heart, Users, Target, Award, Globe, Lightbulb } from 'lucide-react';

function About() {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      description: 'Education technology enthusiast with 10+ years of experience in learning platforms.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      description: 'Full-stack developer passionate about creating intuitive user experiences.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Michael Brown',
      role: 'UX Designer',
      description: 'Designer focused on making learning accessible and engaging for everyone.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Emily Davis',
      role: 'Education Specialist',
      description: 'Former teacher with expertise in educational assessment and learning psychology.',
      image: '/api/placeholder/150/150'
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Learning First',
      description: 'We believe that effective learning should be accessible, engaging, and measurable.'
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: 'Community Driven',
      description: 'Our platform grows stronger through collaboration and shared knowledge.'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-600" />,
      title: 'Innovation',
      description: 'We continuously evolve our platform to meet the changing needs of learners.'
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: 'Global Impact',
      description: 'Making quality education tools available to learners worldwide.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Users' },
    { number: '100,000+', label: 'Quizzes Created' },
    { number: '1M+', label: 'Questions Answered' },
    { number: '95%', label: 'User Satisfaction' }
  ];

  const timeline = [
    {
      year: '2023',
      title: 'The Beginning',
      description: 'QuizMaster was founded with a vision to revolutionize online learning and assessment.'
    },
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'Released our first version with core quiz creation and taking features.'
    },
    {
      year: '2024',
      title: 'Advanced Features',
      description: 'Added analytics, collaboration tools, and mobile optimization.'
    },
    {
      year: '2024',
      title: 'Growing Community',
      description: 'Reached 50,000+ users and 100,000+ quizzes created across various subjects.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About QuizMaster
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Empowering learners and educators with innovative quiz technology
          </p>
          <div className="flex items-center justify-center">
            <Heart className="h-6 w-6 text-red-400 mr-2" />
            <span className="text-lg">Made with love for learning</span>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At QuizMaster, we believe that learning should be interactive, engaging, and accessible to everyone. 
              Our mission is to provide educators, trainers, and learners with the tools they need to create 
              meaningful assessments that promote knowledge retention and skill development.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Why We Built QuizMaster
                </h3>
                <p className="text-gray-600 mb-4">
                  Traditional assessment methods often fail to capture the full picture of what learners know 
                  and can do. We saw an opportunity to create a platform that makes assessment more dynamic, 
                  immediate, and insightful.
                </p>
                <p className="text-gray-600">
                  Whether you're a teacher creating classroom assessments, a trainer developing employee 
                  evaluations, or someone who just loves trivia, QuizMaster provides the tools to make 
                  learning more effective and enjoyable.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">
              From idea to impact - here's how QuizMaster came to life
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>

            {timeline.map((event, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-blue-600 font-semibold text-lg mb-2">{event.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The passionate people behind QuizMaster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Built with Modern Technology</h2>
              <p className="text-lg opacity-90">
                We use cutting-edge technology to ensure the best possible experience
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-2">React</div>
                <div className="text-sm opacity-75">Frontend Framework</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 mb-2">Node.js</div>
                <div className="text-sm opacity-75">Backend Runtime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">MongoDB</div>
                <div className="text-sm opacity-75">Database</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-2">AWS</div>
                <div className="text-sm opacity-75">Cloud Infrastructure</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact/CTA Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Ready to transform the way you create and take quizzes?
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 sm:justify-center">
            <a
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 font-medium text-lg"
            >
              Get Started Free
            </a>
            <a
              href="/help"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-md hover:bg-white hover:text-blue-600 font-medium text-lg"
            >
              Learn More
            </a>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>Questions? We'd love to hear from you!</p>
            <p>Contact us at <a href="mailto:hello@quizmaster.com" className="underline">hello@quizmaster.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

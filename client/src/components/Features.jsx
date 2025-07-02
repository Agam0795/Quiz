import React from 'react';
import { CheckCircle, Zap, Users, Trophy, Target, Smartphone } from 'lucide-react';

function Features() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'Lightning Fast',
      description: 'Create and take quizzes in seconds with our intuitive interface.',
      details: [
        'Quick quiz creation wizard',
        'Instant results and feedback',
        'Real-time progress tracking',
        'Fast loading times'
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: 'Collaborative',
      description: 'Work together with friends and colleagues to create amazing quizzes.',
      details: [
        'Team quiz creation',
        'Share quizzes easily',
        'Collaborative editing',
        'Group challenges'
      ]
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-600" />,
      title: 'Competitive',
      description: 'Compete with others and climb the leaderboards.',
      details: [
        'Global leaderboards',
        'Achievement system',
        'Score tracking',
        'Performance analytics'
      ]
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: 'Customizable',
      description: 'Create quizzes that fit your exact needs and requirements.',
      details: [
        'Multiple question types',
        'Custom categories',
        'Time limits',
        'Difficulty levels'
      ]
    },
    {
      icon: <Smartphone className="h-8 w-8 text-indigo-600" />,
      title: 'Mobile Friendly',
      description: 'Take quizzes anywhere, anytime on any device.',
      details: [
        'Responsive design',
        'Touch-friendly interface',
        'Offline support',
        'Cross-platform compatibility'
      ]
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-emerald-600" />,
      title: 'Smart Analytics',
      description: 'Get detailed insights into quiz performance and learning progress.',
      details: [
        'Performance dashboards',
        'Learning insights',
        'Progress tracking',
        'Detailed reports'
      ]
    }
  ];

  const questionTypes = [
    {
      type: 'Multiple Choice',
      description: 'Classic multiple choice questions with up to 4 options',
      example: 'What is the capital of France?'
    },
    {
      type: 'True/False',
      description: 'Simple true or false questions for quick assessments',
      example: 'The Earth is flat. (True/False)'
    },
    {
      type: 'Short Answer',
      description: 'Open-ended questions for detailed responses',
      example: 'Explain the process of photosynthesis.'
    }
  ];

  const useCases = [
    {
      title: 'Education',
      description: 'Perfect for teachers and students',
      features: ['Classroom quizzes', 'Homework assignments', 'Study materials', 'Progress tracking']
    },
    {
      title: 'Corporate Training',
      description: 'Enhance employee learning',
      features: ['Training assessments', 'Skill evaluations', 'Team building', 'Knowledge retention']
    },
    {
      title: 'Entertainment',
      description: 'Fun quizzes for everyone',
      features: ['Trivia nights', 'Social challenges', 'Party games', 'Brain teasers']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Better Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the tools and features that make QuizMaster the best platform for creating, 
            sharing, and taking quizzes.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-lg p-3 mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Question Types Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Question Types</h2>
            <p className="text-lg text-gray-600">
              Support for multiple question formats to suit any learning need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {questionTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{type.type}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Example:</p>
                  <p className="text-sm text-gray-600 italic">{type.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect for Every Use Case</h2>
            <p className="text-lg text-gray-600">
              Whether you're teaching, training, or entertaining, QuizMaster has you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Features</h2>
            <p className="text-lg text-gray-600">
              Take your quizzes to the next level with these powerful tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quiz Management</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Time Limits:</strong>
                    <span className="text-gray-600 ml-1">Set custom time limits for each quiz</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Question Randomization:</strong>
                    <span className="text-gray-600 ml-1">Shuffle questions and answers automatically</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Categories & Tags:</strong>
                    <span className="text-gray-600 ml-1">Organize quizzes with custom categories</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Public/Private:</strong>
                    <span className="text-gray-600 ml-1">Control quiz visibility and access</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Insights</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Performance Tracking:</strong>
                    <span className="text-gray-600 ml-1">Detailed score and progress analytics</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Export Results:</strong>
                    <span className="text-gray-600 ml-1">Download results as PDF or CSV</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Question Analysis:</strong>
                    <span className="text-gray-600 ml-1">See which questions are most challenging</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Learning Insights:</strong>
                    <span className="text-gray-600 ml-1">Identify knowledge gaps and strengths</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Features */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integration</h2>
            <p className="text-lg text-gray-600">
              QuizMaster works with your existing workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Google OAuth</h3>
              <p className="text-sm text-gray-600">Quick sign-in with Google accounts</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mobile Ready</h3>
              <p className="text-sm text-gray-600">Responsive design for all devices</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">API Access</h3>
              <p className="text-sm text-gray-600">Integrate with existing systems</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-yellow-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gamification</h3>
              <p className="text-sm text-gray-600">Badges, points, and achievements</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience All These Features?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of educators, trainers, and quiz enthusiasts who are already using QuizMaster.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 sm:justify-center">
              <a
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                Get Started Free
              </a>
              <a
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;

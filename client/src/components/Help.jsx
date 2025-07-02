import React, { useState } from 'react';
import { Search, HelpCircle, Book, Video, MessageCircle, Mail, Phone } from 'lucide-react';

function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: 'All Topics', icon: <Book className="h-5 w-5" /> },
    { id: 'getting-started', name: 'Getting Started', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'creating-quizzes', name: 'Creating Quizzes', icon: <Book className="h-5 w-5" /> },
    { id: 'taking-quizzes', name: 'Taking Quizzes', icon: <Video className="h-5 w-5" /> },
    { id: 'account', name: 'Account & Settings', icon: <MessageCircle className="h-5 w-5" /> }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I create my first quiz?',
      answer: 'To create your first quiz, sign up for an account, go to your dashboard, and click "Create New Quiz". Follow the wizard to add questions, set options, and publish your quiz.'
    },
    {
      category: 'getting-started',
      question: 'Is QuizMaster free to use?',
      answer: 'Yes! QuizMaster offers a free tier that includes creating unlimited quizzes, taking quizzes, and basic analytics. Premium features are available with paid plans.'
    },
    {
      category: 'creating-quizzes',
      question: 'What types of questions can I create?',
      answer: 'You can create multiple choice questions, true/false questions, and short answer questions. Each question can include explanations and point values.'
    },
    {
      category: 'creating-quizzes',
      question: 'Can I add images or videos to my questions?',
      answer: 'Yes! You can upload images and embed videos in your questions to make them more engaging and interactive.'
    },
    {
      category: 'creating-quizzes',
      question: 'How do I share my quiz with others?',
      answer: 'You can share your quiz by making it public and sharing the link, or by sending direct invitations to specific users via email.'
    },
    {
      category: 'taking-quizzes',
      question: 'Can I retake a quiz?',
      answer: 'Yes, you can retake most quizzes unless the creator has disabled retakes. Your best score will be recorded on the leaderboard.'
    },
    {
      category: 'taking-quizzes',
      question: 'What happens if I run out of time during a quiz?',
      answer: 'If a quiz has a time limit and you run out of time, it will automatically submit with your current answers. Make sure to manage your time wisely!'
    },
    {
      category: 'account',
      question: 'How do I change my password?',
      answer: 'Go to your profile settings and click "Change Password". You\'ll need to enter your current password and your new password twice.'
    },
    {
      category: 'account',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from your profile settings. Note that this action is permanent and cannot be undone.'
    },
    {
      category: 'account',
      question: 'How do I sign in with Google?',
      answer: 'Click "Sign in with Google" on the login page. You\'ll be redirected to Google to authorize the connection, then back to QuizMaster.'
    }
  ];

  const tutorials = [
    {
      title: 'Creating Your First Quiz',
      description: 'Step-by-step guide to creating and publishing your first quiz',
      duration: '5 min read',
      difficulty: 'Beginner'
    },
    {
      title: 'Advanced Question Types',
      description: 'Learn how to use all question types effectively',
      duration: '8 min read',
      difficulty: 'Intermediate'
    },
    {
      title: 'Analytics and Insights',
      description: 'Understanding your quiz performance data',
      duration: '6 min read',
      difficulty: 'Intermediate'
    },
    {
      title: 'Collaboration Features',
      description: 'Working with others to create amazing quizzes',
      duration: '4 min read',
      difficulty: 'Advanced'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600">Find answers to common questions and learn how to use QuizMaster</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Getting Started</h3>
            <p className="text-gray-600 text-sm">New to QuizMaster? Start here for the basics</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Video className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-gray-600 text-sm">Watch step-by-step video guides</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 text-sm">Get help from our support team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Filter */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.icon}
                    <span className="ml-3">{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Tutorials Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                    <p className="text-gray-600 mb-4">{tutorial.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{tutorial.duration}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {filteredFaqs.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No articles found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <details key={index} className="bg-white rounded-lg shadow-sm">
                      <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 font-medium text-gray-900">
                        {faq.question}
                      </summary>
                      <div className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600">Our support team is here to help you succeed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">Get detailed help via email</p>
              <a href="mailto:support@quizmaster.com" className="text-blue-600 hover:text-blue-800 font-medium">
                support@quizmaster.com
              </a>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Chat with us in real-time</p>
              <button className="text-green-600 hover:text-green-800 font-medium">
                Start Chat
              </button>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">Speak directly with our team</p>
              <a href="tel:+1-555-0123" className="text-purple-600 hover:text-purple-800 font-medium">
                +1 (555) 012-3456
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              NO Response time: Email within 20 hours • NO Chat available 10 AM - 5 PM EST • NO Phone support for premium users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;

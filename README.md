# QuizMaster 🎯

A modern, full-stack quiz application built with React, Node.js, and MongoDB. Create, share, and take quizzes with multimedia support, real-time scoring, and comprehensive analytics.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure login/registration with Google OAuth support
- **Quiz Creation** - Rich quiz builder with multimedia support (images, videos)
- **Quiz Taking** - Interactive quiz interface with real-time scoring
- **Leaderboards** - Track performance and compete with others
- **Analytics Dashboard** - Comprehensive insights and statistics

### Advanced Features
- **Time Limits** - Configurable time constraints per question
- **Categories & Tags** - Organize quizzes with flexible categorization
- **Media Upload** - Support for images and videos in questions
- **Responsive Design** - Works seamlessly on desktop and mobile
- **MongoDB MCP Integration** - Advanced database operations through VS Code

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Context API** - State management for authentication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Passport.js** - Authentication middleware
- **Express Session** - Session management

### DevOps & Tools
- **MongoDB Atlas** - Cloud database hosting
- **MCP (Model Context Protocol)** - Database integration for VS Code
- **ESLint** - Code linting and formatting
- **Git** - Version control

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

## ⚡ Quick Start

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/Agam0795/Quiz.git
cd Quiz
\`\`\`

### 2. Install Dependencies

#### Backend Setup
\`\`\`bash
cd server
npm install
\`\`\`

#### Frontend Setup
\`\`\`bash
cd client
npm install
\`\`\`

### 3. Environment Configuration

Create a \`.env\` file in the \`server\` directory:

\`\`\`env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/quizmaster?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_API_KEY=your_google_api_key
CLIENT_URL=http://localhost:5173
\`\`\`

### 4. Start the Application

#### Start Backend Server
\`\`\`bash
cd server
npm start
\`\`\`

#### Start Frontend Development Server
\`\`\`bash
cd client
npm run dev
\`\`\`

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📁 Project Structure

\`\`\`
Quiz/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── uploads/            # File uploads
└── .vscode/               # VS Code configuration
    └── mcp.json           # MongoDB MCP setup
\`\`\`

## 🗄️ Database Schema

### Users Collection
- Authentication (local & Google OAuth)
- Profile management
- Role-based access control

### Quizzes Collection
- Quiz metadata and questions
- Multimedia support
- Category and tag system

### Scores Collection
- Performance tracking
- Leaderboard data
- Historical records

## 🔧 Available Scripts

### Backend (server/)
- \`npm start\` - Start production server
- \`npm run dev\` - Start development server with nodemon

### Frontend (client/)
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## 🚀 VS Code Integration

This project includes MongoDB MCP (Model Context Protocol) integration for enhanced database operations directly within VS Code.

### Setup MCP
1. Ensure the \`.vscode/mcp.json\` file is configured
2. Restart VS Code
3. Enter your MongoDB credentials when prompted

### Available MCP Commands
- Analyze database schema
- Generate mock data
- Performance optimization
- Natural language database queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Agam** - [GitHub Profile](https://github.com/Agam0795)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the robust database solution
- All contributors and the open-source community

---

**Happy Quizzing! 🎉**

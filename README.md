# Quiz Application Frontend

This is the frontend application for the Quiz/Test platform built with React.

## Features

- User Authentication (Login/Register)
- Admin Dashboard
  - Question Management (Create, Edit, Delete)
  - Test Statistics
  - User Management
- Candidate Dashboard
  - Take Tests
  - View Results
  - Track Progress
- Real-time Test Timer
- Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   Replace the URL with your backend API URL.

## Running the Application

To start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:
```bash
npm run build
```

This will create a `build` directory with optimized production files.

## Project Structure

```
src/
  ├── components/      # Reusable UI components
  ├── context/        # React Context for state management
  ├── pages/          # Page components
  ├── services/       # API service functions
  ├── App.jsx         # Main application component
  └── index.js        # Application entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

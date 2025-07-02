require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Passport config
require('./config/passport');

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/quizzes', require('./routes/api/quizzes'));
app.use('/api/scores', require('./routes/api/scores'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/uploads', require('./routes/api/uploads'));
app.use('/api/analytics', require('./routes/api/analytics'));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected...');
        console.log('Database Name:', mongoose.connection.db.databaseName);
    })
    .catch(err => {
        console.log('MongoDB Connection Error:', err);
    });

app.get('/', (req, res) => {
    res.send('QuizMaster API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

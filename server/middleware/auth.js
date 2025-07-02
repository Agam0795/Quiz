const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Handle demo token for development
        if (token === 'demo-token-12345') {
            req.user = {
                id: 'demo-user-123',
                name: 'Demo User',
                email: 'demo@example.com'
            };
            return next();
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        console.log('Token verification failed:', e.message);
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;
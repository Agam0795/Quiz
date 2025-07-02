const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

// @desc    Auth with Google
// @route   GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const payload = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                // Redirect to frontend with token
                res.redirect(`http://localhost:5173/?token=${token}&user=${encodeURIComponent(JSON.stringify(payload))}`);
            }
        );
    }
);

// @desc    Logout user
// @route   GET /api/auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
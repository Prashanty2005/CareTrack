const verifyToken = require('./auth');

const isAdmin = (req, res, next) => {
    // First, verify the token using the existing middleware
    // Since isAdmin is usually used *after* verifyToken in the route definition,
    // req.user will already exist. But just in case:
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }

    next();
};

module.exports = isAdmin;

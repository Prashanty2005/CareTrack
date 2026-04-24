const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
// Secure CORS Configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // Set this in production, e.g., 'https://my-aws-domain.com'
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

const medicineRoutes = require('./routes/medicines');
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');
const adminRoutes = require('./routes/admin');

app.use('/api/medicines', medicineRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/admin', adminRoutes);
// Basic Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        // Hide stack trace in production
        ...(process.env.NODE_ENV === 'production' ? {} : { stack: err.stack })
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

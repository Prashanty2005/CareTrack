const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const verifyToken = require('../middleware/auth');

// Apply JWT verification middleware to all routes in this router
router.use(verifyToken);

router.post('/', watchlistController.addToWatchlist);
router.get('/', watchlistController.getWatchlist);
router.delete('/:medicine_id', watchlistController.removeFromWatchlist);

module.exports = router;

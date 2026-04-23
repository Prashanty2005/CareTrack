const pool = require('../config/db');

exports.addToWatchlist = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { medicine_id } = req.body;

        if (!medicine_id) {
            return res.status(400).json({ error: 'medicine_id is required' });
        }

        // Check if medicine exists
        const [medicines] = await pool.execute('SELECT id FROM medicines WHERE id = ?', [medicine_id]);
        if (medicines.length === 0) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        // Insert into watchlist (IGNORE if already exists due to composite primary key, though manual check is better for messaging)
        const [existingEntry] = await pool.execute(
            'SELECT * FROM watchlists WHERE user_id = ? AND medicine_id = ?',
            [userId, medicine_id]
        );

        if (existingEntry.length > 0) {
            return res.status(400).json({ error: 'Medicine is already in your watchlist' });
        }

        await pool.execute(
            'INSERT INTO watchlists (user_id, medicine_id) VALUES (?, ?)',
            [userId, medicine_id]
        );

        res.status(201).json({ message: 'Medicine added to watchlist successfully' });
    } catch (error) {
        console.error('Add to Watchlist Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getWatchlist = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Join watchlists with medicines table to get the full details
        const query = `
            SELECT m.*, w.created_at as saved_at 
            FROM medicines m
            INNER JOIN watchlists w ON m.id = w.medicine_id
            WHERE w.user_id = ?
            ORDER BY w.created_at DESC
        `;
        const [rows] = await pool.execute(query, [userId]);

        res.json(rows);
    } catch (error) {
        console.error('Get Watchlist Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.removeFromWatchlist = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { medicine_id } = req.params;

        if (!medicine_id) {
            return res.status(400).json({ error: 'medicine_id is required' });
        }

        const [result] = await pool.execute(
            'DELETE FROM watchlists WHERE user_id = ? AND medicine_id = ?',
            [userId, medicine_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medicine not found in your watchlist' });
        }

        res.json({ message: 'Medicine removed from watchlist' });
    } catch (error) {
        console.error('Remove from Watchlist Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

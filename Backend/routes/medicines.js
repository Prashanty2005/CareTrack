const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middleware/auth');

// Get all medicines (optionally with search and sort parameters)
router.get('/', async (req, res) => {
    try {
        const { search, sort } = req.query;
        let query = 'SELECT * FROM medicines';
        let queryParams = [];

        if (search) {
            query += ' WHERE name LIKE ? OR generic_name LIKE ? OR company_name LIKE ?';
            const searchPattern = `%${search}%`;
            queryParams.push(searchPattern, searchPattern, searchPattern);
        }

        if (sort === 'price_asc') {
            query += ' ORDER BY regulated_price ASC';
        } else if (sort === 'price_desc') {
            query += ' ORDER BY regulated_price DESC';
        } else if (sort === 'rank') {
            query += ' ORDER BY rank_score DESC';
        } else {
            query += ' ORDER BY name ASC';
        }

        const [rows] = await pool.execute(query, queryParams);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get medicine by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute('SELECT * FROM medicines WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        const medicine = rows[0];

        // Fetch associated pharmacy links
        const [pharmacies] = await pool.execute(
            'SELECT id, pharmacy_name, url, current_price, in_stock FROM pharmacy_links WHERE medicine_id = ? ORDER BY current_price ASC',
            [id]
        );

        medicine.pharmacies = pharmacies;

        res.json(medicine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get medicines by generic name
router.get('/generic/:generic_name', async (req, res) => {
    try {
        const { generic_name } = req.params;
        const [rows] = await pool.execute(
            'SELECT * FROM medicines WHERE generic_name = ? ORDER BY regulated_price ASC', 
            [generic_name]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

const pool = require('../config/db');

exports.createMedicine = async (req, res) => {
    try {
        const { name, generic_name, company_name, mrp, regulated_price, pills_per_day, description, rank_score } = req.body;

        if (!name || !generic_name || !company_name || !mrp || !regulated_price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const [result] = await pool.execute(
            `INSERT INTO medicines 
            (name, generic_name, company_name, mrp, regulated_price, pills_per_day, description, rank_score) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, generic_name, company_name, mrp, regulated_price, pills_per_day || 1, description || '', rank_score || 0.0]
        );

        res.status(201).json({ message: 'Medicine created successfully', id: result.insertId });
    } catch (error) {
        console.error('Create Medicine Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, generic_name, company_name, mrp, regulated_price, pills_per_day, description, rank_score } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid medicine ID' });
        }

        if (!name || !generic_name || !company_name || !mrp || !regulated_price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const [result] = await pool.execute(
            `UPDATE medicines 
            SET name = ?, generic_name = ?, company_name = ?, mrp = ?, regulated_price = ?, pills_per_day = ?, description = ?, rank_score = ?
            WHERE id = ?`,
            [name, generic_name, company_name, mrp, regulated_price, pills_per_day || 1, description || '', rank_score || 0.0, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        res.json({ message: 'Medicine updated successfully' });
    } catch (error) {
        console.error('Update Medicine Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid medicine ID' });
        }

        const [result] = await pool.execute('DELETE FROM medicines WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        res.json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        console.error('Delete Medicine Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

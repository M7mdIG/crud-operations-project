const db = require('../db');

// Create a new record
exports.createRecord = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO records (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all records
exports.getAllRecords = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM records ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one record by ID
exports.getRecordById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM records WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Record not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a record
exports.updateRecord = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await db.query(
      'UPDATE records SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Record not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a record
exports.deleteRecord = async (req, res) => {
  try {
    const result = await db.query('DELETE FROM records WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

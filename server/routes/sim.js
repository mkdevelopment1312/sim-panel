
import express from 'express';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateSimRegistration } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', authenticateToken, validateSimRegistration, async (req, res) => {
  try {
    const { network, phone_number, serial_number } = req.body;

    // Check if phone number already exists
    const existingSim = await db.query(
      'SELECT * FROM sim_registrations WHERE phone_number = $1',
      [phone_number]
    );

    if (existingSim.rows.length > 0) {
      return res.status(400).json({ error: 'Numer telefonu już zarejestrowany' });
    }

    const result = await db.query(
      'INSERT INTO sim_registrations (user_id, network, phone_number, serial_number, status, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [req.user.id, network, phone_number, serial_number, 'pending', new Date()]
    );

    res.status(201).json({ 
      message: 'Rejestracja karty SIM zgłoszona',
      sim: result.rows[0]
    });
  } catch (error) {
    console.error('SIM registration error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.get('/my-sims', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM sim_registrations WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({ sims: result.rows });
  } catch (error) {
    console.error('Get SIMs error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

export default router;


import express from 'express';
import db from '../config/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/sims', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT sr.*, u.first_name, u.last_name, u.email, u.pesel, t.amount, t.currency, t.status as payment_status
      FROM sim_registrations sr 
      JOIN users u ON sr.user_id = u.id 
      LEFT JOIN transactions t ON sr.transaction_id = t.id
      ORDER BY sr.created_at DESC
    `);

    res.json({ sims: result.rows });
  } catch (error) {
    console.error('Admin get SIMs error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.post('/sim/confirm/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'confirmed' or 'rejected'

    const result = await db.query(
      'UPDATE sim_registrations SET status = $1, updated_at = $2 WHERE id = $3 RETURNING *',
      [status, new Date(), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nie znaleziono rejestracji SIM' });
    }

    await db.query(
      'INSERT INTO admin_logs (action, details, created_at) VALUES ($1, $2, $3)',
      [`SIM ${status}`, `SIM ID: ${id}`, new Date()]
    );

    res.json({ 
      message: `Rejestracja SIM ${status === 'confirmed' ? 'potwierdzona' : 'odrzucona'}`,
      sim: result.rows[0]
    });
  } catch (error) {
    console.error('Admin confirm SIM error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.get('/tickets', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT st.*, u.first_name, u.last_name, u.email
      FROM support_tickets st 
      JOIN users u ON st.user_id = u.id 
      ORDER BY st.created_at DESC
    `);

    res.json({ tickets: result.rows });
  } catch (error) {
    console.error('Admin get tickets error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.post('/tickets/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.query(
      'UPDATE support_tickets SET status = $1, updated_at = $2 WHERE id = $3 RETURNING *',
      [status, new Date(), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nie znaleziono ticketu' });
    }

    res.json({ 
      message: 'Status ticketu zaktualizowany',
      ticket: result.rows[0]
    });
  } catch (error) {
    console.error('Admin update ticket error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

export default router;

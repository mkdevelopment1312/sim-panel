
import express from 'express';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateTicket } from '../middleware/validation.js';

const router = express.Router();

router.post('/tickets', authenticateToken, validateTicket, async (req, res) => {
  try {
    const { subject, description } = req.body;

    const result = await db.query(
      'INSERT INTO support_tickets (user_id, subject, description, status, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, subject, description, 'open', new Date()]
    );

    res.status(201).json({ 
      message: 'Ticket utworzony',
      ticket: result.rows[0]
    });
  } catch (error) {
    console.error('Ticket creation error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.get('/tickets', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM support_tickets WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({ tickets: result.rows });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.post('/tickets/:id/messages', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    // Verify ticket belongs to user
    const ticketResult = await db.query(
      'SELECT * FROM support_tickets WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (ticketResult.rows.length === 0) {
      return res.status(404).json({ error: 'Nie znaleziono ticketu' });
    }

    const result = await db.query(
      'INSERT INTO support_messages (ticket_id, user_id, message, is_admin, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, req.user.id, message, false, new Date()]
    );

    res.status(201).json({ 
      message: 'Wiadomość dodana',
      support_message: result.rows[0]
    });
  } catch (error) {
    console.error('Add message error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.get('/tickets/:id/messages', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ticket belongs to user
    const ticketResult = await db.query(
      'SELECT * FROM support_tickets WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (ticketResult.rows.length === 0) {
      return res.status(404).json({ error: 'Nie znaleziono ticketu' });
    }

    const result = await db.query(
      'SELECT sm.*, u.first_name, u.last_name FROM support_messages sm JOIN users u ON sm.user_id = u.id WHERE sm.ticket_id = $1 ORDER BY sm.created_at ASC',
      [id]
    );

    res.json({ messages: result.rows });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

export default router;

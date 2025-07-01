
import express from 'express';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { SIM_PRICE, BLIK_PRICE } from '../config/constants.js';

const router = express.Router();

const formatCryptoAmount = (amount) => {
  return parseFloat(amount.toFixed(8));
};

router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { sim_id, currency } = req.body;

    // Verify SIM belongs to user
    const simResult = await db.query(
      'SELECT * FROM sim_registrations WHERE id = $1 AND user_id = $2',
      [sim_id, req.user.id]
    );

    if (simResult.rows.length === 0) {
      return res.status(404).json({ error: 'Nie znaleziono rejestracji SIM' });
    }

    const amount = currency === 'BLIK' ? BLIK_PRICE : formatCryptoAmount(SIM_PRICE);
    
    const result = await db.query(
      'INSERT INTO transactions (user_id, amount, currency, status, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, amount, currency, 'pending', new Date()]
    );

    await db.query(
      'UPDATE sim_registrations SET transaction_id = $1 WHERE id = $2',
      [result.rows[0].id, sim_id]
    );

    const paymentDetails = currency === 'BLIK' 
      ? { code: Math.random().toString().substring(2, 8) }
      : { address: `mock-${currency.toLowerCase()}-address-${result.rows[0].id}` };

    res.json({ 
      transaction: result.rows[0],
      payment_details: paymentDetails
    });
  } catch (error) {
    console.error('Payment generation error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.get('/my-transactions', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({ transactions: result.rows });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

export default router;

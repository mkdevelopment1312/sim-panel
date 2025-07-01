
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import { validateRegistration } from '../middleware/validation.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { sendVerificationEmail } from '../services/emailService.js';

const router = express.Router();

router.post('/register', authLimiter, validateRegistration, async (req, res) => {
  try {
    const { email, password, first_name, last_name, pesel } = req.body;

    // Check if user exists
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Użytkownik już istnieje' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const result = await db.query(
      'INSERT INTO users (email, password, first_name, last_name, pesel, verification_code, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email',
      [email, hashedPassword, first_name, last_name, pesel, verificationCode, new Date()]
    );

    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ 
      message: 'Rejestracja udana. Sprawdź e-mail w celu weryfikacji.',
      userId: result.rows[0].id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { email, code } = req.body;

    const result = await db.query(
      'UPDATE users SET is_verified = true, verification_code = null WHERE email = $1 AND verification_code = $2 RETURNING *',
      [email, code]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Nieprawidłowy kod weryfikacyjny' });
    }

    res.json({ message: 'Konto zweryfikowane pomyślnie' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
    }

    const user = result.rows[0];
    if (!user.is_verified) {
      return res.status(401).json({ error: 'Konto nie zostało zweryfikowane' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_admin: user.is_admin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

export default router;

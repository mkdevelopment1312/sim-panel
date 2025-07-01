
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { generalLimiter } from './middleware/rateLimit.js';

// Routes
import authRoutes from './routes/auth.js';
import simRoutes from './routes/sim.js';
import paymentRoutes from './routes/payments.js';
import supportRoutes from './routes/support.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3001', 'https://sim.xaxa.win'],
  credentials: true
}));
app.use(express.json());
app.use(generalLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sim', simRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Coś poszło nie tak!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint nie znaleziony' });
});

app.listen(PORT, () => {
  console.log(`🚀 SIM.XAXA.WIN Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

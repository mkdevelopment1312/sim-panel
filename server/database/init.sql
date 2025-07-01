
-- Create database schema for SIM.XAXA.WIN

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  pesel TEXT NOT NULL CHECK (pesel ~ '^[0-9]{11}$'),
  is_verified BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  verification_code TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sim_registrations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  network TEXT NOT NULL CHECK (network IN ('Orange', 'Plus', 'T-Mobile', 'Play', 'Virgin Mobile', 'Heyah', 'NJU Mobile', 'Lyca Mobile')),
  phone_number TEXT NOT NULL CHECK (phone_number ~ '^[0-9]{9}$'),
  serial_number TEXT NOT NULL CHECK (length(serial_number) <= 20),
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'rejected')),
  transaction_id INTEGER REFERENCES transactions(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('BTC', 'LTC', 'BLIK')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'failed')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE support_tickets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'closed')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE support_messages (
  id SERIAL PRIMARY KEY,
  ticket_id INTEGER REFERENCES support_tickets(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE admin_logs (
  id SERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sim_user_id ON sim_registrations(user_id);
CREATE INDEX idx_sim_phone ON sim_registrations(phone_number);
CREATE INDEX idx_transaction_user_id ON transactions(user_id);
CREATE INDEX idx_ticket_user_id ON support_tickets(user_id);
CREATE INDEX idx_message_ticket_id ON support_messages(ticket_id);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password, first_name, last_name, pesel, is_verified, is_admin, created_at) 
VALUES ('admin@sim.xaxa.win', '$2b$10$8K1p/a9GRW7RQDr7aIz4LuHdY3nITvQgdCKlZ9ZHs6m5vGjJ2k8Pe', 'Admin', 'System', '12345678901', true, true, NOW());

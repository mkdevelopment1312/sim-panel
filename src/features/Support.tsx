
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import api from '../lib/api';

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
}

const Support: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [form, setForm] = useState({
    subject: '',
    description: ''
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await api.get('/support/tickets');
      setTickets(response.data.tickets);
    } catch (error) {
      toast.error('Błąd pobierania ticketów');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/support/tickets', form);
      toast.success('Ticket utworzony pomyślnie');
      setForm({ subject: '', description: '' });
      setShowForm(false);
      fetchTickets();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd tworzenia ticketu');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'closed': return 'text-gray-500';
      case 'in_progress': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'closed': return 'Zamknięty';
      case 'in_progress': return 'W trakcie';
      default: return 'Otwarty';
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow mb-2">
            SIM.XAXA.WIN
          </h1>
          <p className="text-gray-400">Wsparcie techniczne</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-mono text-neon-green">Twoje tickety</h2>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Anuluj' : 'Nowy ticket'}
          </Button>
        </div>

        {showForm && (
          <Card title="Nowy ticket wsparcia" className="mb-6">
            <form onSubmit={handleSubmit}>
              <Input
                label="Temat"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />

              <div className="mb-4">
                <label className="block text-neon-green font-mono mb-2 uppercase text-sm">
                  Opis problemu *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-transparent border-2 border-gray-600 text-white px-4 py-3 focus:border-neon-green focus:outline-none transition-colors font-mono"
                  placeholder="Opisz szczegółowo problem..."
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Tworzę...' : 'Utwórz ticket'}
              </Button>
            </form>
          </Card>
        )}

        <Card title="Lista ticketów">
          {tickets.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">Brak ticketów wsparcia</div>
              <Button onClick={() => setShowForm(true)}>
                Utwórz pierwszy ticket
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-700 rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-neon-green font-mono font-bold">
                      #{ticket.id} - {ticket.subject}
                    </h3>
                    <span className={`font-mono text-sm ${getStatusColor(ticket.status)}`}>
                      {getStatusText(ticket.status)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{ticket.description}</p>
                  <div className="text-gray-500 text-xs font-mono">
                    Utworzony: {new Date(ticket.created_at).toLocaleString('pl')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Support;

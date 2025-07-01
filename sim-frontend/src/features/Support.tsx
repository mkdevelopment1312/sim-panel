
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import api from '../lib/api';

const Support: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [messages, setMessages] = useState([]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: ''
  });

  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await api.get('/support/tickets');
      setTickets(response.data.tickets);
    } catch (error: any) {
      toast.error('Błąd ładowania ticketów');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/support/tickets', newTicket);
      toast.success('Ticket utworzony!');
      setNewTicket({ subject: '', description: '' });
      setShowForm(false);
      loadTickets();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd tworzenia ticketu');
    }
  };

  const loadMessages = async (ticketId: number) => {
    try {
      const response = await api.get(`/support/tickets/${ticketId}/messages`);
      setMessages(response.data.messages);
      setSelectedTicket(tickets.find((t: any) => t.id === ticketId));
    } catch (error: any) {
      toast.error('Błąd ładowania wiadomości');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await api.post(`/support/tickets/${selectedTicket.id}/messages`, {
        message: newMessage
      });
      setNewMessage('');
      loadMessages(selectedTicket.id);
      toast.success('Wiadomość wysłana!');
    } catch (error: any) {
      toast.error('Błąd wysyłania wiadomości');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-500';
      case 'closed': return 'text-red-500';
      case 'in_progress': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Otwarty';
      case 'closed': return 'Zamknięty';
      case 'in_progress': return 'W trakcie';
      default: return status;
    }
  };

  if (selectedTicket) {
    return (
      <div className="min-h-screen bg-cyber-dark p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow">
                SIM.XAXA.WIN
              </h1>
              <p className="text-gray-400">Ticket #{selectedTicket.id}: {selectedTicket.subject}</p>
            </div>
            <Button onClick={() => setSelectedTicket(null)} variant="secondary">
              ← Powrót
            </Button>
          </div>

          <Card title={`Status: ${getStatusText(selectedTicket.status)}`}>
            <div className="mb-6">
              <h3 className="text-lg font-mono text-white mb-2">Opis:</h3>
              <p className="text-gray-300 bg-black p-4">{selectedTicket.description}</p>
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className={`p-4 ${msg.is_admin ? 'bg-neon-green bg-opacity-10 border-l-4 border-neon-green' : 'bg-gray-800'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm text-neon-green">
                      {msg.is_admin ? 'Administrator' : `${msg.first_name} ${msg.last_name}`}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(msg.created_at).toLocaleString('pl-PL')}
                    </span>
                  </div>
                  <p className="text-white">{msg.message}</p>
                </div>
              ))}
            </div>

            {selectedTicket.status !== 'closed' && (
              <form onSubmit={handleSendMessage}>
                <div className="mb-4">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Napisz wiadomość..."
                    className="w-full bg-transparent border-2 border-gray-600 text-white px-4 py-3 focus:border-neon-green focus:outline-none transition-colors font-mono h-24 resize-none"
                    required
                  />
                </div>
                <Button type="submit">Wyślij wiadomość</Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow">
              SIM.XAXA.WIN
            </h1>
            <p className="text-gray-400">System wsparcia</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Anuluj' : 'Nowy ticket'}
            </Button>
            <Button onClick={() => navigate('/dashboard')} variant="secondary">
              Panel główny
            </Button>
          </div>
        </div>

        {showForm && (
          <Card title="Nowy ticket wsparcia" className="mb-6">
            <form onSubmit={handleCreateTicket}>
              <Input
                label="Temat"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                required
              />
              <div className="mb-4">
                <label className="block text-neon-green font-mono mb-2 uppercase text-sm">
                  Opis problemu *
                </label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  className="w-full bg-transparent border-2 border-gray-600 text-white px-4 py-3 focus:border-neon-green focus:outline-none transition-colors font-mono h-32 resize-none"
                  required
                />
              </div>
              <Button type="submit">Utwórz ticket</Button>
            </form>
          </Card>
        )}

        <Card title="Moje tickety">
          {loading ? (
            <p className="text-center text-gray-400">Ładowanie...</p>
          ) : tickets.length === 0 ? (
            <p className="text-center text-gray-400">Brak ticketów</p>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket: any) => (
                <div
                  key={ticket.id}
                  className="border border-gray-600 p-4 cursor-pointer hover:border-neon-green transition-colors"
                  onClick={() => loadMessages(ticket.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-mono">#{ticket.id}: {ticket.subject}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {new Date(ticket.created_at).toLocaleDateString('pl-PL')}
                      </p>
                    </div>
                    <div className={`font-mono text-sm ${getStatusColor(ticket.status)}`}>
                      {getStatusText(ticket.status)}
                    </div>
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

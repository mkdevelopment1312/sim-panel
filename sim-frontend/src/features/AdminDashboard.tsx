
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';
import api from '../lib/api';
import { clearAuth } from '../lib/auth';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'sims' | 'tickets'>('sims');
  const [sims, setSims] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [simsRes, ticketsRes] = await Promise.all([
        api.get('/admin/sims'),
        api.get('/admin/tickets')
      ]);
      
      setSims(simsRes.data.sims);
      setTickets(ticketsRes.data.tickets);
    } catch (error: any) {
      toast.error('Błąd ładowania danych administratora');
    } finally {
      setLoading(false);
    }
  };

  const handleSimAction = async (simId: number, status: 'confirmed' | 'rejected') => {
    try {
      await api.post(`/admin/sim/confirm/${simId}`, { status });
      toast.success(`Rejestracja SIM ${status === 'confirmed' ? 'potwierdzona' : 'odrzucona'}`);
      loadData();
    } catch (error: any) {
      toast.error('Błąd aktualizacji statusu SIM');
    }
  };

  const handleTicketStatus = async (ticketId: number, status: string) => {
    try {
      await api.post(`/admin/tickets/${ticketId}/status`, { status });
      toast.success('Status ticketu zaktualizowany');
      loadData();
    } catch (error: any) {
      toast.error('Błąd aktualizacji statusu ticketu');
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/auth');
    toast.success('Wylogowano pomyślnie');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-500';
      case 'rejected': return 'text-red-500';
      case 'closed': return 'text-red-500';
      case 'open': return 'text-green-500';
      case 'in_progress': return 'text-yellow-500';
      default: return 'text-yellow-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-neon-green font-mono">Ładowanie panelu administratora...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow">
              SIM.XAXA.WIN
            </h1>
            <p className="text-gray-400">Panel administratora</p>
          </div>
          <Button onClick={handleLogout} variant="secondary">
            Wyloguj
          </Button>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('sims')}
            variant={activeTab === 'sims' ? 'primary' : 'secondary'}
          >
            Rejestracje SIM ({sims.filter((s: any) => s.status === 'pending').length})
          </Button>
          <Button
            onClick={() => setActiveTab('tickets')}
            variant={activeTab === 'tickets' ? 'primary' : 'secondary'}
          >
            Tickety wsparcia ({tickets.filter((t: any) => t.status === 'open').length})
          </Button>
        </div>

        {activeTab === 'sims' && (
          <Card title="Rejestracje kart SIM">
            {sims.length === 0 ? (
              <p className="text-center text-gray-400">Brak rejestracji</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 text-neon-green font-mono">ID</th>
                      <th className="text-left py-3 text-neon-green font-mono">Użytkownik</th>
                      <th className="text-left py-3 text-neon-green font-mono">PESEL</th>
                      <th className="text-left py-3 text-neon-green font-mono">Sieć</th>
                      <th className="text-left py-3 text-neon-green font-mono">Numer</th>
                      <th className="text-left py-3 text-neon-green font-mono">Status</th>
                      <th className="text-left py-3 text-neon-green font-mono">Płatność</th>
                      <th className="text-left py-3 text-neon-green font-mono">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sims.map((sim: any) => (
                      <tr key={sim.id} className="border-b border-gray-700">
                        <td className="py-3 text-white font-mono">{sim.id}</td>
                        <td className="py-3 text-white">
                          <div>{sim.first_name} {sim.last_name}</div>
                          <div className="text-gray-400 text-xs">{sim.email}</div>
                        </td>
                        <td className="py-3 text-gray-300 font-mono">{sim.pesel}</td>
                        <td className="py-3 text-white">{sim.network}</td>
                        <td className="py-3 text-white font-mono">{sim.phone_number}</td>
                        <td className={`py-3 font-mono ${getStatusColor(sim.status)}`}>
                          {sim.status}
                        </td>
                        <td className="py-3">
                          {sim.amount ? (
                            <span className={`font-mono ${getStatusColor(sim.payment_status)}`}>
                              {sim.amount} {sim.currency}
                            </span>
                          ) : (
                            <span className="text-gray-500">Brak</span>
                          )}
                        </td>
                        <td className="py-3">
                          {sim.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSimAction(sim.id, 'confirmed')}
                                className="px-3 py-1 bg-green-600 text-white text-xs hover:bg-green-700 transition-colors"
                              >
                                Potwierdź
                              </button>
                              <button
                                onClick={() => handleSimAction(sim.id, 'rejected')}
                                className="px-3 py-1 bg-red-600 text-white text-xs hover:bg-red-700 transition-colors"
                              >
                                Odrzuć
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'tickets' && (
          <Card title="Tickety wsparcia">
            {tickets.length === 0 ? (
              <p className="text-center text-gray-400">Brak ticketów</p>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket: any) => (
                  <div key={ticket.id} className="border border-gray-600 p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white font-mono">#{ticket.id}: {ticket.subject}</h3>
                        <p className="text-gray-400 text-sm">
                          {ticket.first_name} {ticket.last_name} ({ticket.email})
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(ticket.created_at).toLocaleString('pl-PL')}
                        </p>
                      </div>
                      <div className={`font-mono text-sm ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </div>
                    </div>
                    
                    <div className="bg-black p-3 mb-4">
                      <p className="text-gray-300">{ticket.description}</p>
                    </div>

                    <div className="flex gap-2">
                      {ticket.status === 'open' && (
                        <button
                          onClick={() => handleTicketStatus(ticket.id, 'in_progress')}
                          className="px-3 py-1 bg-yellow-600 text-white text-xs hover:bg-yellow-700 transition-colors"
                        >
                          W trakcie
                        </button>
                      )}
                      {ticket.status !== 'closed' && (
                        <button
                          onClick={() => handleTicketStatus(ticket.id, 'closed')}
                          className="px-3 py-1 bg-red-600 text-white text-xs hover:bg-red-700 transition-colors"
                        >
                          Zamknij
                        </button>
                      )}
                      {ticket.status === 'closed' && (
                        <button
                          onClick={() => handleTicketStatus(ticket.id, 'open')}
                          className="px-3 py-1 bg-green-600 text-white text-xs hover:bg-green-700 transition-colors"
                        >
                          Otwórz ponownie
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

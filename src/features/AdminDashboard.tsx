
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';
import api from '../lib/api';

interface SimRegistration {
  id: number;
  user_id: number;
  network: string;
  phone_number: string;
  serial_number: string;
  status: string;
  created_at: string;
  user_email: string;
  user_name: string;
}

const AdminDashboard: React.FC = () => {
  const [sims, setSims] = useState<SimRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSims();
  }, []);

  const fetchSims = async () => {
    try {
      const response = await api.get('/admin/sim-registrations');
      setSims(response.data.sims);
    } catch (error) {
      toast.error('Błąd pobierania rejestracji');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (simId: number, status: 'confirmed' | 'rejected') => {
    try {
      await api.post(`/admin/sim/confirm/${simId}`, { status });
      toast.success(`Rejestracja ${status === 'confirmed' ? 'potwierdzona' : 'odrzucona'}`);
      fetchSims();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd zmiany statusu');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow mb-2">
            SIM.XAXA.WIN - ADMIN
          </h1>
          <p className="text-gray-400">Panel administratora</p>
        </div>

        <Card title="Rejestracje kart SIM">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-neon-green">Ładowanie...</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 text-neon-green">ID</th>
                    <th className="text-left py-3 text-neon-green">Użytkownik</th>
                    <th className="text-left py-3 text-neon-green">Sieć</th>
                    <th className="text-left py-3 text-neon-green">Numer</th>
                    <th className="text-left py-3 text-neon-green">Status</th>
                    <th className="text-left py-3 text-neon-green">Data</th>
                    <th className="text-left py-3 text-neon-green">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {sims.map((sim) => (
                    <tr key={sim.id} className="border-b border-gray-700">
                      <td className="py-3">#{sim.id}</td>
                      <td className="py-3">
                        <div>{sim.user_name}</div>
                        <div className="text-gray-400 text-xs">{sim.user_email}</div>
                      </td>
                      <td className="py-3">{sim.network}</td>
                      <td className="py-3">{sim.phone_number}</td>
                      <td className={`py-3 ${getStatusColor(sim.status)}`}>
                        {sim.status}
                      </td>
                      <td className="py-3">
                        {new Date(sim.created_at).toLocaleDateString('pl')}
                      </td>
                      <td className="py-3">
                        {sim.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleStatusChange(sim.id, 'confirmed')}
                              className="text-xs px-2 py-1"
                            >
                              Potwierdź
                            </Button>
                            <Button
                              onClick={() => handleStatusChange(sim.id, 'rejected')}
                              variant="secondary"
                              className="text-xs px-2 py-1"
                            >
                              Odrzuć
                            </Button>
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
      </div>
    </div>
  );
};

export default AdminDashboard;

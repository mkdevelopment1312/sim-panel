
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { getUser, logout } from '../lib/auth';
import api from '../lib/api';
import { toast } from 'react-toastify';

interface Sim {
  id: number;
  network: string;
  phone_number: string;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [sims, setSims] = useState<Sim[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    fetchSims();
  }, []);

  const fetchSims = async () => {
    try {
      const response = await api.get('/sim/my-sims');
      setSims(response.data.sims);
    } catch (error) {
      toast.error('Błąd pobierania danych');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Potwierdzona';
      case 'rejected': return 'Odrzucona';
      default: return 'Oczekuje';
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow mb-2">
              SIM.XAXA.WIN
            </h1>
            <p className="text-gray-400">Witaj, {user.first_name} {user.last_name}</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/sim/register')}>
              Zarejestruj kartę SIM
            </Button>
            <Button onClick={() => navigate('/support')} variant="secondary">
              Wsparcie
            </Button>
            <Button onClick={logout} variant="secondary">
              Wyloguj
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-neon-green mb-2">
                {sims.length}
              </div>
              <div className="text-gray-400">Łącznie kart</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-green-500 mb-2">
                {sims.filter(s => s.status === 'confirmed').length}
              </div>
              <div className="text-gray-400">Potwierdzone</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-yellow-500 mb-2">
                {sims.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-gray-400">Oczekujące</div>
            </div>
          </Card>
        </div>

        {/* SIM Cards List */}
        <Card title="Twoje karty SIM">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-neon-green">Ładowanie...</div>
            </div>
          ) : sims.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">Nie masz jeszcze żadnych kart SIM</div>
              <Button onClick={() => navigate('/sim/register')}>
                Zarejestruj pierwszą kartę
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full font-mono">
                <thead>
                  <tr className="border-b border-gray-600">
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
                      <td className="py-3">{sim.network}</td>
                      <td className="py-3">{sim.phone_number}</td>
                      <td className={`py-3 ${getStatusColor(sim.status)}`}>
                        {getStatusText(sim.status)}
                      </td>
                      <td className="py-3">
                        {new Date(sim.created_at).toLocaleDateString('pl')}
                      </td>
                      <td className="py-3">
                        {sim.status === 'pending' && (
                          <Button 
                            onClick={() => navigate(`/payment/${sim.id}`)}
                            className="text-xs px-3 py-1"
                          >
                            Opłać
                          </Button>
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

export default Dashboard;

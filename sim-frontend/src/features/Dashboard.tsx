
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';
import api from '../lib/api';
import { getUser, clearAuth } from '../lib/auth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [sims, setSims] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [simsRes, transactionsRes] = await Promise.all([
        api.get('/sim/my-sims'),
        api.get('/payments/my-transactions')
      ]);
      
      setSims(simsRes.data.sims);
      setTransactions(transactionsRes.data.transactions);
    } catch (error: any) {
      toast.error('Błąd ładowania danych');
    } finally {
      setLoading(false);
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
      default: return 'text-yellow-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Potwierdzona';
      case 'rejected': return 'Odrzucona';
      case 'pending': return 'Oczekiwanie';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-neon-green font-mono">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow">
              SIM.XAXA.WIN
            </h1>
            <p className="text-gray-400">Panel użytkownika - {user?.first_name} {user?.last_name}</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/sim/register')}>
              Nowa karta SIM
            </Button>
            <Button onClick={() => navigate('/support')} variant="secondary">
              Wsparcie
            </Button>
            <Button onClick={handleLogout} variant="secondary">
              Wyloguj
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Moje karty SIM">
            {sims.length === 0 ? (
              <p className="text-gray-400 text-center py-4">Brak zarejestrowanych kart SIM</p>
            ) : (
              <div className="space-y-4">
                {sims.map((sim: any) => (
                  <div key={sim.id} className="border border-gray-600 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-white font-mono">{sim.network}</div>
                        <div className="text-gray-400 text-sm">{sim.phone_number}</div>
                        <div className="text-gray-500 text-sm">S/N: {sim.serial_number}</div>
                      </div>
                      <div className={`font-mono text-sm ${getStatusColor(sim.status)}`}>
                        {getStatusText(sim.status)}
                      </div>
                    </div>
                    {sim.status === 'pending' && !sim.transaction_id && (
                      <Button
                        onClick={() => navigate(`/payment/${sim.id}`)}
                        className="mt-2 text-sm px-4 py-2"
                      >
                        Opłać →
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Moje transakcje">
            {transactions.length === 0 ? (
              <p className="text-gray-400 text-center py-4">Brak transakcji</p>
            ) : (
              <div className="space-y-4">
                {transactions.map((tx: any) => (
                  <div key={tx.id} className="border border-gray-600 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-white font-mono">{tx.amount} {tx.currency}</div>
                        <div className="text-gray-400 text-sm">
                          {new Date(tx.created_at).toLocaleDateString('pl-PL')}
                        </div>
                      </div>
                      <div className={`font-mono text-sm ${getStatusColor(tx.status)}`}>
                        {getStatusText(tx.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

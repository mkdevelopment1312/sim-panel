
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import api from '../lib/api';
import { getUser } from '../lib/auth';

const POLISH_NETWORKS = [
  'Orange',
  'Plus',
  'T-Mobile',
  'Play',
  'Virgin Mobile',
  'Heyah',
  'NJU Mobile',
  'Lyca Mobile'
];

const SimForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const [form, setForm] = useState({
    network: '',
    phone_number: '',
    serial_number: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/sim/register', form);
      toast.success('Rejestracja karty SIM zgłoszona pomyślnie!');
      navigate(`/payment/${response.data.sim.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd rejestracji karty SIM');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow mb-2">
            SIM.XAXA.WIN
          </h1>
          <p className="text-gray-400">Rejestracja karty SIM</p>
        </div>

        <Card title="Dane karty SIM">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-neon-green font-mono mb-2 uppercase text-sm">
                Sieć komórkowa *
              </label>
              <select
                value={form.network}
                onChange={(e) => setForm({ ...form, network: e.target.value })}
                required
                className="w-full bg-transparent border-2 border-gray-600 text-white px-4 py-3 focus:border-neon-green focus:outline-none transition-colors font-mono"
              >
                <option value="">Wybierz sieć</option>
                {POLISH_NETWORKS.map(network => (
                  <option key={network} value={network} className="bg-cyber-dark">
                    {network}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Numer telefonu"
              value={form.phone_number}
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
              placeholder="123456789 (9 cyfr)"
              required
            />

            <Input
              label="Numer seryjny karty SIM"
              value={form.serial_number}
              onChange={(e) => setForm({ ...form, serial_number: e.target.value })}
              placeholder="Numer z karty SIM (max 20 znaków)"
              required
            />

            <div className="bg-gray-800 p-4 rounded mb-6">
              <h3 className="text-neon-green font-mono mb-2">Twoje dane:</h3>
              <p className="text-gray-300 font-mono text-sm">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-gray-400 font-mono text-xs">
                Dane z profilu będą użyte do rejestracji
              </p>
            </div>

            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Anuluj
              </Button>
              <Button 
                type="submit" 
                disabled={loading} 
                className="flex-1"
              >
                {loading ? 'Rejestruję...' : 'Zarejestruj kartę'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SimForm;

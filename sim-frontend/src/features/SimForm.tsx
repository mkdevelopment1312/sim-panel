
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import api from '../lib/api';

const NETWORKS = [
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
      toast.success('Rejestracja karty SIM zgłoszona!');
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

        <Card title="Formularz rejestracji">
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
                <option value="" className="bg-cyber-lighter">Wybierz sieć</option>
                {NETWORKS.map(network => (
                  <option key={network} value={network} className="bg-cyber-lighter">
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
              label="Numer seryjny karty"
              value={form.serial_number}
              onChange={(e) => setForm({ ...form, serial_number: e.target.value })}
              placeholder="Wprowadź numer seryjny"
              required
            />

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => navigate('/dashboard')}
              >
                Anuluj
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Przetwarzam...' : 'Zarejestruj kartę SIM →'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SimForm;

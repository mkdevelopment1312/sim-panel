
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { setAuth } from '../lib/auth';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    pesel: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tymczasowe logowanie na losowych danych
      if (isLogin) {
        // Symulacja logowania
        setTimeout(() => {
          const mockUser = {
            id: 1,
            email: form.email,
            first_name: 'Jan',
            last_name: 'Kowalski',
            is_admin: false
          };
          
          setAuth('mock-token-' + Date.now(), mockUser);
          toast.success('Zalogowano pomyślnie!');
          navigate('/dashboard');
          setLoading(false);
        }, 1000);
      } else {
        // Symulacja rejestracji
        setTimeout(() => {
          toast.success('Rejestracja udana! Możesz się teraz zalogować.');
          setIsLogin(true);
          setLoading(false);
        }, 1000);
      }
    } catch (error: any) {
      toast.error('Błąd uwierzytelniania');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Navigation */}
      <nav className="border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-mono font-bold text-neon-green animate-glow hover:text-white transition-colors"
          >
            SIM.XAXA.WIN
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4 py-20">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow mb-2">
              {isLogin ? 'LOGOWANIE' : 'REJESTRACJA'}
            </h1>
            <p className="text-gray-400">
              {isLogin ? 'Zaloguj się do swojego konta' : 'Stwórz nowe konto'}
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <Input
                label="E-mail"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <Input
                label="Hasło"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              {!isLogin && (
                <>
                  <Input
                    label="Imię"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    required
                  />

                  <Input
                    label="Nazwisko"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    required
                  />

                  <Input
                    label="PESEL"
                    value={form.pesel}
                    onChange={(e) => setForm({ ...form, pesel: e.target.value })}
                    placeholder="11 cyfr"
                    required
                  />
                </>
              )}

              <Button type="submit" disabled={loading} className="w-full mb-4">
                {loading ? 'Przetwarzam...' : (isLogin ? 'ZALOGUJ SIĘ' : 'ZAREJESTRUJ SIĘ')}
              </Button>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-neon-green hover:text-white transition-colors font-mono text-sm"
              >
                {isLogin ? 'Nie masz konta? Zarejestruj się' : 'Masz już konto? Zaloguj się'}
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

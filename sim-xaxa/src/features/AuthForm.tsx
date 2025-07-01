
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import api from '../lib/api';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    pesel: '',
    verification_code: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.post('/auth/login', {
          email: form.email,
          password: form.password
        });
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Zalogowano pomyślnie!');
        window.location.href = '/dashboard';
      } else {
        await api.post('/auth/register', {
          email: form.email,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          pesel: form.pesel
        });
        
        toast.success('Rejestracja udana! Sprawdź e-mail w celu weryfikacji.');
        setShowVerification(true);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd uwierzytelniania');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/verify', {
        email: form.email,
        code: form.verification_code
      });
      
      toast.success('Konto zweryfikowane! Możesz się teraz zalogować.');
      setShowVerification(false);
      setIsLogin(true);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd weryfikacji');
    } finally {
      setLoading(false);
    }
  };

  if (showVerification) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow mb-2">
              SIM.XAXA.WIN
            </h1>
            <p className="text-gray-400">Weryfikacja konta</p>
          </div>

          <Card title="Wprowadź kod weryfikacyjny">
            <form onSubmit={handleVerification}>
              <Input
                label="Kod z e-mail"
                value={form.verification_code}
                onChange={(e) => setForm({ ...form, verification_code: e.target.value })}
                placeholder="Wprowadź 6-znakowy kod"
                required
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Weryfikuję...' : 'Zweryfikuj konto'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow mb-2">
            SIM.XAXA.WIN
          </h1>
          <p className="text-gray-400">Profesjonalna rejestracja kart SIM</p>
        </div>

        <Card title={isLogin ? 'Logowanie' : 'Rejestracja'}>
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
              {loading ? 'Przetwarzam...' : (isLogin ? 'Zaloguj się' : 'Zarejestruj się')}
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
  );
};

export default AuthForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import api from '../lib/api';
import { setAuth } from '../lib/auth';

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    pesel: ''
  });

  const [verifyForm, setVerifyForm] = useState({
    email: '',
    code: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', loginForm);
      setAuth(response.data.token, response.data.user);
      toast.success('Zalogowano pomyślnie!');
      
      if (response.data.user.is_admin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd logowania');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/register', registerForm);
      setVerifyForm({ ...verifyForm, email: registerForm.email });
      setMode('verify');
      toast.success('Rejestracja udana! Sprawdź e-mail.');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd rejestracji');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/auth/verify', verifyForm);
      toast.success('Konto zweryfikowane! Możesz się zalogować.');
      setMode('login');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd weryfikacji');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'verify') {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
        <Card title="Weryfikacja E-mail" className="w-full max-w-md">
          <form onSubmit={handleVerify}>
            <Input
              label="E-mail"
              value={verifyForm.email}
              onChange={(e) => setVerifyForm({ ...verifyForm, email: e.target.value })}
              type="email"
              required
            />
            <Input
              label="Kod weryfikacyjny"
              value={verifyForm.code}
              onChange={(e) => setVerifyForm({ ...verifyForm, code: e.target.value })}
              placeholder="XXXXXX"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Weryfikuję...' : 'Zweryfikuj'}
            </Button>
          </form>
          <p className="mt-4 text-center text-gray-400">
            <button
              onClick={() => setMode('login')}
              className="text-neon-green hover:underline"
            >
              Powrót do logowania
            </button>
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <Card title={mode === 'login' ? 'Logowanie' : 'Rejestracja'} className="w-full max-w-md">
        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <Input
              label="E-mail"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              type="email"
              required
            />
            <Input
              label="Hasło"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              type="password"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Loguję...' : 'Zaloguj'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <Input
              label="E-mail"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              type="email"
              required
            />
            <Input
              label="Hasło"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              type="password"
              required
            />
            <Input
              label="Imię"
              value={registerForm.first_name}
              onChange={(e) => setRegisterForm({ ...registerForm, first_name: e.target.value })}
              required
            />
            <Input
              label="Nazwisko"
              value={registerForm.last_name}
              onChange={(e) => setRegisterForm({ ...registerForm, last_name: e.target.value })}
              required
            />
            <Input
              label="PESEL"
              value={registerForm.pesel}
              onChange={(e) => setRegisterForm({ ...registerForm, pesel: e.target.value })}
              placeholder="11 cyfr"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Rejestruję...' : 'Zarejestruj'}
            </Button>
          </form>
        )}
        
        <p className="mt-4 text-center text-gray-400">
          {mode === 'login' ? (
            <>
              Nie masz konta?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-neon-green hover:underline"
              >
                Zarejestruj się
              </button>
            </>
          ) : (
            <>
              Masz już konto?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-neon-green hover:underline"
              >
                Zaloguj się
              </button>
            </>
          )}
        </p>
      </Card>
    </div>
  );
};

export default AuthForm;

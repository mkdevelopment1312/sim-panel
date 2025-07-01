
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';
import api from '../lib/api';

const Payment: React.FC = () => {
  const { simId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<'BTC' | 'LTC' | 'BLIK'>('BLIK');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  const generatePayment = async () => {
    setLoading(true);
    try {
      const response = await api.post('/payments/generate', {
        sim_id: simId,
        currency
      });
      
      setPaymentDetails(response.data);
      toast.success('Dane płatności wygenerowane');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd generowania płatności');
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number, curr: string) => {
    if (curr === 'BLIK') {
      return `${amount.toFixed(2)} PLN`;
    }
    return `${amount.toFixed(8)} ${curr}`;
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-neon-green animate-glow mb-2">
            SIM.XAXA.WIN
          </h1>
          <p className="text-gray-400">Płatność za rejestrację karty SIM</p>
        </div>

        <Card title="Wybierz metodę płatności">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {(['BLIK', 'BTC', 'LTC'] as const).map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`p-4 border-2 rounded font-mono transition-all ${
                  currency === curr
                    ? 'border-neon-green bg-neon-green bg-opacity-20 text-neon-green'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="text-lg font-bold">{curr}</div>
                <div className="text-sm">
                  {curr === 'BLIK' ? '25.00 PLN' : '0.00014368 ' + curr}
                </div>
              </button>
            ))}
          </div>

          {!paymentDetails ? (
            <Button 
              onClick={generatePayment} 
              disabled={loading} 
              className="w-full"
            >
              {loading ? 'Generuję...' : 'Wygeneruj płatność'}
            </Button>
          ) : (
            <div className="bg-gray-800 p-6 rounded mb-6">
              <h3 className="text-neon-green font-mono mb-4">Dane do płatności:</h3>
              
              <div className="space-y-3 font-mono text-sm">
                <div>
                  <span className="text-gray-400">Kwota: </span>
                  <span className="text-white">
                    {formatAmount(paymentDetails.transaction.amount, currency)}
                  </span>
                </div>
                
                {currency === 'BLIK' ? (
                  <div>
                    <span className="text-gray-400">Kod BLIK: </span>
                    <span className="text-neon-green text-lg font-bold">
                      {paymentDetails.payment_details.code}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-gray-400">Adres: </span>
                    <div className="text-neon-green break-all bg-gray-900 p-2 rounded mt-1">
                      {paymentDetails.payment_details.address}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-4">
                  Po dokonaniu płatności, administrator zweryfikuje i potwierdzi rejestrację.
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Button 
              variant="secondary" 
              onClick={() => navigate('/dashboard')}
              className="flex-1"
            >
              Powrót do dashboardu
            </Button>
            {paymentDetails && (
              <Button 
                onClick={() => {
                  toast.info('Administrator zostanie powiadomiony o płatności');
                  navigate('/dashboard');
                }}
                className="flex-1"
              >
                Zakończ
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Payment;

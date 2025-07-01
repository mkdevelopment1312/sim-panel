
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Card from '../components/Card';
import api from '../lib/api';

interface PaymentDetails {
  address?: string;
  code?: string;
}

const Payment: React.FC = () => {
  const { simId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<'BTC' | 'LTC' | 'BLIK'>('BTC');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [transaction, setTransaction] = useState<any>(null);

  const prices = {
    BTC: '0.00014368 BTC',
    LTC: '0.00014368 LTC', 
    BLIK: '25.00 PLN'
  };

  const handleGeneratePayment = async () => {
    setLoading(true);
    try {
      const response = await api.post('/payments/generate', {
        sim_id: simId,
        currency
      });
      
      setTransaction(response.data.transaction);
      setPaymentDetails(response.data.payment_details);
      toast.success('Szczegóły płatności wygenerowane!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Błąd generowania płatności');
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
          <p className="text-gray-400">Płatność za rejestrację SIM</p>
        </div>

        <Card title="Wybierz metodę płatności">
          <div className="space-y-4 mb-6">
            {Object.entries(prices).map(([curr, price]) => (
              <label key={curr} className="flex items-center p-4 border-2 border-gray-600 cursor-pointer hover:border-neon-green transition-colors">
                <input
                  type="radio"
                  name="currency"
                  value={curr}
                  checked={currency === curr}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="mr-4"
                />
                <div>
                  <div className="text-white font-mono font-bold">{curr}</div>
                  <div className="text-neon-green font-mono">{price}</div>
                </div>
              </label>
            ))}
          </div>

          {!paymentDetails ? (
            <Button 
              onClick={handleGeneratePayment} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Generuję...' : 'Generuj płatność'}
            </Button>
          ) : (
            <Card title="Szczegóły płatności" className="mt-6 border-neon-green">
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400">Kwota:</span>
                  <span className="text-neon-green ml-2 font-mono font-bold">
                    {prices[currency]}
                  </span>
                </div>
                
                {paymentDetails.address && (
                  <div>
                    <span className="text-gray-400">Adres:</span>
                    <div className="bg-black p-3 mt-2 font-mono text-sm break-all text-neon-green">
                      {paymentDetails.address}
                    </div>
                  </div>
                )}
                
                {paymentDetails.code && (
                  <div>
                    <span className="text-gray-400">Kod BLIK:</span>
                    <div className="bg-black p-3 mt-2 font-mono text-2xl text-center text-neon-green font-bold">
                      {paymentDetails.code}
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-600 pt-4 text-center text-gray-400 text-sm">
                  <p>Status płatności: <span className="text-yellow-500">Oczekiwanie</span></p>
                  <p className="mt-2">Administrator zweryfikuje płatność i aktywuje kartę SIM.</p>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="secondary"
                className="w-full mt-6"
              >
                Powrót do panelu
              </Button>
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Payment;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { formatCurrency } from '../lib/utils';
import { ShieldCheck, Smartphone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // In a real app, we'd get this from location.state
  // For safety, if they navigate directly here, we redirect back
  const tempState = localStorage.getItem('temp-payment-state');
  const state = location.state as {
    total: number;
    userInfo: any;
  } | null || (tempState ? JSON.parse(tempState) : null);
  if (!state) {
    navigate('/cart');
    return null;
  }
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !pin) {
      toast.error('Please enter your MonCash phone number and PIN');
      return;
    }
    setIsProcessing(true);
    // Simulate API call to MonCash using the public key from env
    // const publicKey = import.meta.env.VITE_MONCASH_PUBLIC_KEY;
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success('Payment successful!');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20 pb-12 px-4">
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          
          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              delay: 0.2,
              type: 'spring'
            }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            
            <CheckCircle className="h-12 w-12 text-green-500" />
          </motion.div>
          <h2 className="text-3xl font-bold text-[#0A1628] mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500 mb-6">
            Thank you, {state.userInfo.name}. Your order has been placed and
            paid via MonCash.
          </p>
          <p className="text-sm text-gray-400">Redirecting to home...</p>
        </motion.div>
      </div>);

  }
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-[#E3000F] p-6 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-1 tracking-wider">
                MonCash
              </h1>
              <p className="text-white/80 text-sm">Secure Payment Gateway</p>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-gray-500 text-sm mb-1">Amount to pay</p>
              <h2 className="text-4xl font-bold text-[#0A1628]">
                {formatCurrency(state.total)}
              </h2>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 flex items-center">
                  <Smartphone className="h-4 w-4 mr-2 text-gray-400" />
                  MonCash Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="e.g. 3XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg" />
                
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2 text-gray-400" />
                  MonCash PIN
                </label>
                <Input
                  type="password"
                  placeholder="••••"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="text-lg text-center tracking-widest" />
                
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#E3000F] hover:bg-[#C2000D] text-white shadow-red-500/20"
                isLoading={isProcessing}>
                
                Pay Now
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Secured by MonCash API
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
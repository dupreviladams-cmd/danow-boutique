import React, { useState, Component } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { formatCurrency } from '../lib/utils';
import { MessageCircle } from 'lucide-react';
import { UserInfo } from '../types';
export function CheckoutPage() {
  const { state } = useCart();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    address: '',
    phone: '',
    email: '',
    notes: ''
  });
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };
  const generateWhatsAppLink = () => {
    const itemsList = state.items.
    map(
      (item) =>
      `• ${item.name} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`
    ).
    join('\n');
    const message =
    `*NEW ORDER - ADY ZONE HAITI* 🛍️\n\n` +
    `*Customer Details:*\n` +
    `👤 Name: ${userInfo.name}\n` +
    `📍 Address: ${userInfo.address}\n` +
    `📱 Phone: ${userInfo.phone}\n` +
    `📧 Email: ${userInfo.email || 'N/A'}\n` +
    `📝 Notes: ${userInfo.notes || 'None'}\n\n` +
    `*Order Summary:*\n${itemsList}\n\n` +
    `*GRAND TOTAL: ${formatCurrency(state.total)}*`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/50949321962?text=${encodedMessage}`;
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#0A1628] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                placeholder="John Doe"
                required />
              
              <Input
                label="Address"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                placeholder="123 Street, Port-au-Prince"
                required />
              
              <Input
                label="Phone Number"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                placeholder="+509 XXXX XXXX"
                required />
              
              <Input
                label="Email (Optional)"
                name="email"
                type="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="john@example.com" />
              
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Order Notes
                </label>
                <textarea
                  name="notes"
                  value={userInfo.notes}
                  onChange={handleChange}
                  className="w-full min-h-[100px] rounded-xl border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  placeholder="Special instructions for delivery..." />
                
              </div>
            </div>
          </div>

          {/* Order Summary & Action */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="max-h-60 overflow-y-auto space-y-3 mb-4 pr-2">
                {state.items.map((item) =>
                <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} (x{item.quantity})
                    </span>
                    <span className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                )}
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg text-[#0A1628]">
                <span>Total to Pay</span>
                <span>{formatCurrency(state.total)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block">
                
                <Button
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-green-500/20"
                  disabled={
                  !userInfo.name || !userInfo.address || !userInfo.phone
                  }>
                  
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </Button>
              </a>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <Button
                size="lg"
                className="w-full bg-[#E3000F] hover:bg-[#C2000D] text-white shadow-red-500/20"
                disabled={
                !userInfo.name || !userInfo.address || !userInfo.phone
                }
                onClick={() => {
                  // In a real app, we'd use useNavigate from react-router-dom
                  // Since we can't easily add the hook here without rewriting the top of the file,
                  // we'll use window.location for simplicity, but pass state via localStorage temporarily
                  // Actually, let's just use a Link wrapper or add useNavigate
                  window.location.href = '/payment';
                  localStorage.setItem(
                    'temp-payment-state',
                    JSON.stringify({
                      total: state.total,
                      userInfo
                    })
                  );
                }}>
                
                Pay with MonCash
              </Button>
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
              Choose your preferred method to complete the order.
            </p>
          </div>
        </div>
      </div>
    </div>);

}
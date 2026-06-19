import React, { lazy } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
export function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#0A1628] mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/">
            <Button size="lg" className="w-full">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>);

  }
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-[#0A1628] mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {state.items.map((item) =>
              <motion.div
                key={item.id}
                layout
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  x: -100
                }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                
                  <div className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100">
                    <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy" />
                  
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-[#F59E0B] font-medium">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg bg-gray-50">
                      <button
                      onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                      disabled={item.quantity <= 1}>
                      
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                      onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors">
                      
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-[#0A1628] mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(state.total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg text-[#0A1628]">
                  <span>Total</span>
                  <span>{formatCurrency(state.total)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full group">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
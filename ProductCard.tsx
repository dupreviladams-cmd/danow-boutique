import React, { useState, lazy } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import { Button } from './ui/Button';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true
      }}
      whileHover={{
        y: -8
      }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      
      {/* Image Placeholder */}
      <div className="h-48 w-full relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.classList.add(product.imageColor);
          }} />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        {/* Quick Actions Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-lg hover:text-red-500 transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-sm text-gray-500 font-medium">
            {product.rating}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-[#0A1628]">
            {formatCurrency(product.price)}
          </span>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className={`transition-all duration-300 ${isAdded ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20' : ''}`}>
            
            {isAdded ?
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              className="flex items-center">
              
                <Check className="h-4 w-4 mr-1" />
                Added
              </motion.div> :

            <div className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </div>
            }
          </Button>
        </div>
      </div>
    </motion.div>);

}
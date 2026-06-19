import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, MapPin, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state } = useCart();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  const links = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Electronics',
    path: '/electronics'
  },
  {
    name: 'Medical',
    path: '/medical'
  },
  {
    name: 'Parfums',
    path: '/perfume'
  },
  {
    name: 'Location',
    path: '/location'
  },
  {
    name: 'Admin',
    path: '/admin'
  }];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ?
        'bg-white/80 backdrop-blur-md shadow-lg py-2' :
        'bg-[#0A1628] py-4'
      )}>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div
              className={cn(
                'p-2 rounded-lg transition-colors',
                scrolled ?
                'bg-[#0A1628] text-[#F59E0B]' :
                'bg-[#F59E0B] text-[#0A1628]'
              )}>
              
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span
              className={cn(
                'text-xl font-bold tracking-tight transition-colors',
                scrolled ? 'text-[#0A1628]' : 'text-white'
              )}>
              
              Danow<span className="text-[#F59E0B]">-Shop</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-[#F59E0B]',
                location.pathname === link.path ?
                'text-[#F59E0B]' :
                scrolled ?
                'text-gray-700' :
                'text-gray-300'
              )}>
              
                {link.name}
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative group">
              <motion.div
                whileHover={{
                  scale: 1.1
                }}
                whileTap={{
                  scale: 0.9
                }}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  scrolled ?
                  'hover:bg-gray-100 text-gray-700' :
                  'hover:bg-white/10 text-white'
                )}>
                
                <ShoppingCart className="h-6 w-6" />
                <AnimatePresence>
                  {totalItems > 0 &&
                  <motion.span
                    initial={{
                      scale: 0
                    }}
                    animate={{
                      scale: 1
                    }}
                    exit={{
                      scale: 0
                    }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F59E0B] text-[10px] font-bold text-[#0A1628]">
                    
                      {totalItems}
                    </motion.span>
                  }
                </AnimatePresence>
              </motion.div>
            </Link>

            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ?
              <X
                className={cn(
                  'h-6 w-6',
                  scrolled ? 'text-gray-900' : 'text-white'
                )} /> :


              <Menu
                className={cn(
                  'h-6 w-6',
                  scrolled ? 'text-gray-900' : 'text-white'
                )} />

              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-white border-t">
          
            <div className="container mx-auto px-4 py-4 space-y-4">
              {links.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'block text-base font-medium p-2 rounded-lg',
                location.pathname === link.path ?
                'bg-[#F59E0B]/10 text-[#F59E0B]' :
                'text-gray-700 hover:bg-gray-50'
              )}>
              
                  {link.name}
                </Link>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}
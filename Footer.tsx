import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                Danow<span className="text-[#F59E0B]">-Shop</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre boutique en ligne pour l'électronique, le matériel médical
              et les parfums de luxe. Qualité et service d'exception.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-[#F59E0B]">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  to="/electronics"
                  className="hover:text-white transition-colors">
                  
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/medical"
                  className="hover:text-white transition-colors">
                  
                  Medical Supplies
                </Link>
              </li>
              <li>
                <Link
                  to="/perfume"
                  className="hover:text-white transition-colors">
                  
                  Parfums
                </Link>
              </li>
              <li>
                <Link
                  to="/location"
                  className="hover:text-white transition-colors">
                  
                  Store Location
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-[#F59E0B]">
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#F59E0B] flex-shrink-0" />
                <span>Port-au-Prince, Haiti</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#F59E0B] flex-shrink-0" />
                <a
                  href="https://wa.me/50949321962"
                  className="hover:text-white transition-colors">
                  
                  +509 4932 1962
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#F59E0B] flex-shrink-0" />
                <a
                  href="mailto:duprevilyvano18@gmail.com"
                  className="hover:text-white transition-colors">
                  
                  duprevilyvano18@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-[#F59E0B]">Founder</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <p className="font-medium text-white mb-1">
                Duprevil Yvano Wood Adams
              </p>
              <p className="text-sm text-gray-400">Visionary & Entrepreneur</p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors">
                  
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors">
                  
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Danow-Shop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>);

}
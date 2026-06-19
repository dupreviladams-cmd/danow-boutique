import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { ArrowRight, Smartphone, Activity, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
export function HomePage() {
  const { allFeatured } = useProducts();
  const categories = [
  {
    name: 'Électronique',
    icon: Smartphone,
    description: 'Derniers gadgets & appareils',
    link: '/electronics',
    color: 'bg-blue-500'
  },
  {
    name: 'Médical',
    icon: Activity,
    description: 'Équipement professionnel',
    link: '/medical',
    color: 'bg-teal-500'
  },
  {
    name: 'Parfums',
    icon: Sparkles,
    description: 'Fragrances de luxe',
    link: '/perfume',
    color: 'bg-pink-500'
  }];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <Hero
          title="Bienvenue chez Danow-Shop"
          subtitle="Votre destination premium pour l'électronique, le matériel médical et les parfums de luxe. Qualité et service d'exception."
          ctaText="Découvrir"
          ctaLink="/electronics"
          backgroundImage="https://images.unsplash.com/photo-1531297461136-82lw9z1a113d?q=80&w=2070&auto=format&fit=crop" />
        

        {/* Categories */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-[#0A1628] mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, index) =>
            <Link key={cat.name} to={cat.link}>
                <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.1
                }}
                whileHover={{
                  y: -5
                }}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100">
                
                  <div
                  className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                  
                    <cat.icon className="h-32 w-32" />
                  </div>
                  <div
                  className={`inline-flex p-3 rounded-xl ${cat.color} text-white mb-4 shadow-lg`}>
                  
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-gray-500 mb-4">{cat.description}</p>
                  <div className="flex items-center text-[#F59E0B] font-medium group-hover:translate-x-2 transition-transform">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </motion.div>
              </Link>
            )}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#0A1628]">
              Featured Products
            </h2>
            <Link
              to="/electronics"
              className="text-[#F59E0B] font-medium hover:underline">
              
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allFeatured.map((product) =>
            <ProductCard key={product.id} product={product} />
            )}
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 bg-[#0A1628] rounded-3xl relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-8 relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-6">Meet the Founder</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                "Our mission at Ady Zone Haiti is to bridge the gap between
                quality international products and the Haitian market. We
                believe in fair pricing, exceptional service, and contributing
                to our local economy."
              </p>
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 bg-[#F59E0B] rounded-full flex items-center justify-center text-2xl font-bold text-[#0A1628] mb-4">
                  DY
                </div>
                <h3 className="text-xl font-bold">Duprevil Yvano Wood Adams</h3>
                <p className="text-[#F59E0B]">Founder & CEO</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>);

}
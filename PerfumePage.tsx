import React, { useState, Children } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
export function PerfumePage() {
  const { allPerfume } = useProducts();
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>(
    'all'
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;
  const filtered = allPerfume.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesGender =
    genderFilter === 'all' ||
    p.gender === 'unisex' ||
    p.gender === genderFilter;
    return matchesSearch && matchesGender;
  });
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentProducts = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <Hero
          title="Parfumerie de Luxe"
          subtitle="Découvrez notre collection exclusive de parfums pour homme et femme."
          ctaText="Découvrir"
          ctaLink="#"
          backgroundImage="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2070&auto=format&fit=crop" />
        

        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={genderFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => setGenderFilter('all')}
              size="sm">
              
              Tous
            </Button>
            <Button
              variant={genderFilter === 'men' ? 'primary' : 'outline'}
              onClick={() => setGenderFilter('men')}
              size="sm">
              
              Homme
            </Button>
            <Button
              variant={genderFilter === 'women' ? 'primary' : 'outline'}
              onClick={() => setGenderFilter('women')}
              size="sm">
              
              Femme
            </Button>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher un parfum..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }} />
            
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            staggerChildren: 0.1
          }}>
          
          {currentProducts.map((product) =>
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4
            }}>
            
              <ProductCard product={product} />
            </motion.div>
          )}
        </motion.div>

        {filtered.length === 0 &&
        <div className="text-center py-12">
            <p className="text-gray-500">
              Aucun parfum trouvé. Ajoutez-en via l'admin.
            </p>
          </div>
        }

        {totalPages > 1 &&
        <div className="flex justify-center space-x-2">
            {Array.from(
            {
              length: Math.min(5, totalPages)
            },
            (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${page === p ? 'bg-[#0A1628] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                  
                    {p}
                  </button>);

            }
          )}
          </div>
        }
      </div>
    </div>);

}
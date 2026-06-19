import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { Input } from '../components/ui/Input';
import { Search } from 'lucide-react';
import { Hero } from '../components/Hero';
import { Button } from '../components/ui/Button';
export function TennisPage() {
  const { allTennis } = useProducts();
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'men' | 'women'>(
    'all'
  );
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;
  const filtered = allTennis.filter((p) => {
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
          title="Tennis Pro Shop"
          subtitle="Gear up for victory with premium tennis equipment and apparel."
          ctaText="Shop Gear"
          ctaLink="#"
          backgroundImage="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop" />
        

        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={genderFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => setGenderFilter('all')}
              size="sm">
              
              All
            </Button>
            <Button
              variant={genderFilter === 'men' ? 'primary' : 'outline'}
              onClick={() => setGenderFilter('men')}
              size="sm">
              
              Men
            </Button>
            <Button
              variant={genderFilter === 'women' ? 'primary' : 'outline'}
              onClick={() => setGenderFilter('women')}
              size="sm">
              
              Women
            </Button>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search tennis gear..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }} />
            
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {currentProducts.map((product) =>
          <ProductCard key={product.id} product={product} />
          )}
        </div>

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
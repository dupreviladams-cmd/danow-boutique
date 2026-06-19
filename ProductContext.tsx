import React, { useEffect, useState, createContext, useContext } from 'react';
import { Product } from '../types';
import {
  electronics,
  medical,
  perfume,
  featuredProducts as staticFeatured } from
'../data/products';
interface ProductContextType {
  customProducts: Product[];
  allElectronics: Product[];
  allMedical: Product[];
  allPerfume: Product[];
  allFeatured: Product[];
  addCustomProduct: (product: Omit<Product, 'id'>) => void;
  deleteCustomProduct: (id: string) => void;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);
export function ProductProvider({ children }: {children: React.ReactNode;}) {
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem('danow-shop-custom-products');
    if (saved) {
      try {
        setCustomProducts(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse custom products', e);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      'danow-shop-custom-products',
      JSON.stringify(customProducts)
    );
  }, [customProducts]);
  const addCustomProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `custom-${Date.now()}`
    };
    setCustomProducts((prev) => [...prev, newProduct]);
  };
  const deleteCustomProduct = (id: string) => {
    setCustomProducts((prev) => prev.filter((p) => p.id !== id));
  };
  const allElectronics = [
  ...customProducts.filter((p) => p.category === 'electronics'),
  ...electronics];

  const allMedical = [
  ...customProducts.filter((p) => p.category === 'medical'),
  ...medical];

  const allPerfume = [
  ...customProducts.filter((p) => p.category === 'perfume'),
  ...perfume];

  // Produits vedettes = les 6 derniers ajoutés
  const allFeatured = customProducts.slice(-6).reverse();
  return (
    <ProductContext.Provider
      value={{
        customProducts,
        allElectronics,
        allMedical,
        allPerfume,
        allFeatured,
        addCustomProduct,
        deleteCustomProduct
      }}>
      
      {children}
    </ProductContext.Provider>);

}
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
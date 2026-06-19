import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ElectronicsPage } from './pages/ElectronicsPage';
import { MedicalPage } from './pages/MedicalPage';
import { PerfumePage } from './pages/PerfumePage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LocationPage } from './pages/LocationPage';
import { PaymentPage } from './pages/PaymentPage';
import { AdminLayout } from './components/AdminLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ProductsPage } from './pages/admin/ProductsPage';
import { LoginPage } from './pages/admin/LoginPage';
import { ProductProvider } from './context/ProductContext';
import { Toaster } from 'sonner';
export function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans text-gray-900 antialiased">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/electronics" element={<ElectronicsPage />} />
                <Route path="/medical" element={<MedicalPage />} />
                <Route path="/perfume" element={<PerfumePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="products" element={<ProductsPage />} />
                </Route>
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-center" richColors />
          </div>
        </Router>
      </CartProvider>
    </ProductProvider>);

}
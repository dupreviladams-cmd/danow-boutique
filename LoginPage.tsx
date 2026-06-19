import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
export function LoginPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe admin (à changer dans le code)
    const ADMIN_PASSWORD = 'danow2024';
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-auth', 'true');
      toast.success('Connexion réussie');
      navigate('/admin');
    } else {
      toast.error('Mot de passe incorrect');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1a2942] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#0A1628] mb-2">
            Admin Danow-Shop
          </h1>
          <p className="text-gray-500">
            Entrez votre mot de passe pour continuer
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            type="password"
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="text-center text-lg tracking-wider" />
          

          <Button type="submit" size="lg" className="w-full">
            Se connecter
          </Button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Mot de passe par défaut :{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">danow2024</code>
        </p>
      </div>
    </div>);

}
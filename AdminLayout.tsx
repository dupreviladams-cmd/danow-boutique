import React, { useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin-auth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);
  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth');
    navigate('/admin/login');
  };
  const links = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Products',
    path: '/admin/products',
    icon: Package
  }];

  return (
    <div className="min-h-screen bg-gray-50 flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#0A1628]">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'flex items-center px-4 py-3 rounded-xl transition-colors',
                  isActive ?
                  'bg-[#0A1628] text-white' :
                  'text-gray-600 hover:bg-gray-100'
                )}>
                
                <link.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{link.name}</span>
              </Link>);

          })}
        </nav>
        <div className="p-4 border-t space-y-2">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            
            <span className="font-medium">← Retour au site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>);

}
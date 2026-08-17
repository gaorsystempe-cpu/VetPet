import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, Scissors, ShoppingBag, 
  Users, DollarSign, LogOut, Dog, Menu, X 
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { cn } from '../../lib/utils';

interface AdminLayoutProps {
  onLogout: () => void;
}

export default function AdminLayout({ onLogout }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/appointments', icon: Calendar, label: 'Citas' },
    { path: '/admin/services', icon: Scissors, label: 'Servicios' },
    { path: '/admin/products', icon: ShoppingBag, label: 'Productos' },
    { path: '/admin/clients', icon: Users, label: 'Clientes' },
    { path: '/admin/sales', icon: DollarSign, label: 'Ventas' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-8 flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-xl">
              <Dog className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-green-800 tracking-tight">VetPet Admin</span>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all",
                    isActive 
                      ? "bg-green-600 text-white shadow-lg shadow-green-100" 
                      : "text-gray-500 hover:bg-green-50 hover:text-green-600"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">Administrador</p>
              <p className="text-xs text-gray-500">VetPet Veterinaria</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

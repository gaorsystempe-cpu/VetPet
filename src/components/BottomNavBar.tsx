import React from 'react';
import { Home, Sparkles, ShoppingBag, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BottomNavBarProps {
  activeTab: 'inicio' | 'servicios' | 'productos' | 'favoritos';
  setActiveTab: (tab: 'inicio' | 'servicios' | 'productos' | 'favoritos') => void;
  onOpenFavorites: () => void;
}

export default function BottomNavBar({ activeTab, setActiveTab, onOpenFavorites }: BottomNavBarProps) {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-gray-100 dark:border-gray-800 flex items-center gap-6 sm:gap-8 pointer-events-auto transition-all">
        {/* Inicio */}
        <button
          onClick={() => {
            setActiveTab('inicio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors relative py-1 cursor-pointer ${
            activeTab === 'inicio' ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] leading-tight font-medium">Inicio</span>
          {activeTab === 'inicio' && (
            <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full absolute -bottom-0.5" />
          )}
        </button>

        {/* Servicios */}
        <button
          onClick={() => {
            setActiveTab('servicios');
            const el = document.getElementById('servicios-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors relative py-1 cursor-pointer ${
            activeTab === 'servicios' ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Sparkles className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] leading-tight font-medium">Servicios</span>
          {activeTab === 'servicios' && (
            <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full absolute -bottom-0.5" />
          )}
        </button>

        {/* Petshop / Menú */}
        <button
          onClick={() => {
            setActiveTab('productos');
            const el = document.getElementById('productos-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-colors relative py-1 cursor-pointer ${
            activeTab === 'productos' ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] leading-tight font-medium">Petshop</span>
          {activeTab === 'productos' && (
            <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full absolute -bottom-0.5" />
          )}
        </button>

        {/* Favoritos */}
        <button
          onClick={onOpenFavorites}
          className={`flex flex-col items-center gap-1 transition-colors relative py-1 cursor-pointer ${
            activeTab === 'favoritos' ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Heart className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] leading-tight font-medium">Favoritos</span>
        </button>

        {/* Carrito */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors relative py-1 cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-orange-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-tight font-medium">Carrito</span>
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function FavoritesModal({
  isOpen,
  onClose,
  products,
  onSelectProduct
}: FavoritesModalProps) {
  const { favorites, toggleFavorite, addToCart } = useCart();

  if (!isOpen) return null;

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/70 text-red-500 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Tus Favoritos</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {favoriteProducts.length} {favoriteProducts.length === 1 ? 'artículo guardado' : 'artículos guardados'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3">
            {favoriteProducts.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="text-base font-black text-gray-800 dark:text-gray-200 mb-1">Aún no tienes favoritos</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Presiona el corazón en cualquier producto o alimento para guardarlo aquí y comprarlo más rápido.
                </p>
              </div>
            ) : (
              favoriteProducts.map(product => (
                <div
                  key={product.id}
                  className="flex items-center gap-3.5 p-3 bg-gray-50/80 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-white dark:bg-gray-700 shrink-0 border border-gray-100 dark:border-gray-700 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="text-sm font-bold text-gray-900 dark:text-white truncate cursor-pointer hover:text-green-700 dark:hover:text-green-400"
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs font-black text-green-700 dark:text-green-400 block mt-0.5">
                      S/ {Number(product.price).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 shadow-sm active:scale-95 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Añadir al carrito"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="p-2.5 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-300 hover:text-red-500 active:scale-95 cursor-pointer"
                      title="Quitar de favoritos"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

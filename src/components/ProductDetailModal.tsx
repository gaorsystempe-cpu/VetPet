import React, { useState } from 'react';
import { X, Heart, Plus, Minus, MessageCircle, ShoppingBag, Check, Flame } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = '51987654321';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const favorite = isFavorite(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppInquiry = () => {
    const message = `🐾 *CONSULTA SOBRE PRODUCTO - VETPET* 🐾
-----------------------------------------
*Producto:* ${product.name}
*Precio:* S/ ${Number(product.price).toFixed(2)}
*Categoría:* ${product.category}

¡Hola! Me gustaría saber más información o consultar stock disponible de este producto. 🐶🐱`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Container */}
          <div className="relative aspect-[4/3] w-full bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isBestSeller && (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
                  <Flame className="w-3 h-3 fill-current" />
                  MÁS PEDIDO
                </span>
              )}
              {product.isPromo && !product.isBestSeller && (
                <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  PROMO
                </span>
              )}
            </div>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 transition-all active:scale-90 cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black tracking-widest uppercase text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/70 border border-transparent dark:border-green-800/40 px-2.5 py-1 rounded-lg">
                  {product.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">
                  Stock: {product.stock} disp.
                </span>
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black text-gray-900 dark:text-white">
                  S/ {Number(product.price).toFixed(2)}
                </span>
                {product.original_price && (
                  <span className="text-sm font-bold text-gray-400 line-through">
                    S/ {Number(product.original_price).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector & Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Cantidad
                </span>
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-bold shadow-sm cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-black text-gray-900 dark:text-white w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm font-bold shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="py-3.5 px-4 bg-green-50 dark:bg-green-950/60 hover:bg-green-100 dark:hover:bg-green-900/80 text-green-700 dark:text-green-300 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 border border-green-200 dark:border-green-800/60 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar WhatsApp</span>
                </button>

                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`py-3.5 px-4 text-white rounded-2xl font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                    addedAnimation
                      ? 'bg-green-600 shadow-green-200 dark:shadow-none'
                      : 'bg-orange-500 hover:bg-orange-600 shadow-orange-200 dark:shadow-none'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Añadido!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Añadir (S/ {(product.price * quantity).toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

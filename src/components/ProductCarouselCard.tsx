import React from 'react';
import { Heart, Plus, Flame } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

interface ProductCarouselCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCarouselCard: React.FC<ProductCarouselCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectProduct(product)}
      className="shrink-0 w-[170px] sm:w-[210px] bg-white dark:bg-gray-900 rounded-[24px] overflow-hidden border border-gray-100/90 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:border-gray-700 transition-all cursor-pointer flex flex-col group relative"
    >
      {/* Image & Badges Container */}
      <div className="relative aspect-square w-full bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Badge: MÁS PEDIDO or PROMO */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
            <Flame className="w-2.5 h-2.5 fill-current" />
            <span>MÁS PEDIDO</span>
          </div>
        )}

        {product.isPromo && !product.isBestSeller && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
            PROMO
          </div>
        )}

        {product.badge && !product.isBestSeller && !product.isPromo && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-green-600 text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
            {product.badge}
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={handleToggleFavorite}
          aria-label="Añadir a favoritos"
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 dark:bg-gray-800/90 backdrop-blur-md shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-700 transition-all active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* Info Container */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-extrabold text-gray-900 dark:text-white text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
            {product.name}
          </h4>
          <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add Button */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800">
          <div>
            <div className="text-sm sm:text-base font-black text-gray-900 dark:text-white">
              S/ {Number(product.price).toFixed(2)}
            </div>
            {product.original_price && (
              <div className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">
                S/ {Number(product.original_price).toFixed(2)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="Añadir al carrito"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white border border-orange-200/60 dark:border-orange-800/40 shadow-sm flex items-center justify-center transition-all active:scale-90 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.8]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCarouselCard;

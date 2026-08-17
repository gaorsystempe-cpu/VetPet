import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      layout
      className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image_url || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400"} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-green-700">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-extrabold text-green-600">{formatCurrency(product.price)}</span>
          <button className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

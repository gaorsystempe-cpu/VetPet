import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { motion } from 'motion/react';

interface ServiceCardProps {
  service: Service;
  onSelectService: (service: Service) => void;
  onBookService?: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelectService(service)}
      className="bg-white dark:bg-gray-900 rounded-[24px] overflow-hidden border border-gray-100/90 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:border-gray-700 transition-all flex flex-col group cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] sm:h-44 overflow-hidden bg-gray-50 dark:bg-gray-800">
        <img
          src={
            service.image_url ||
            'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600'
          }
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {service.badge && (
          <div className="absolute top-2.5 left-2.5 bg-green-600 text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
            {service.badge}
          </div>
        )}

        <div className="absolute bottom-2.5 right-2.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm flex items-center gap-1">
          <Clock className="w-3 h-3 text-green-600 dark:text-green-400" />
          <span>
            {service.duration_minutes >= 1440
              ? 'Por día'
              : `${service.duration_minutes} min`}
          </span>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-black text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors line-clamp-1 leading-snug">
            {service.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
              Precio desde
            </span>
            <span className="text-sm sm:text-base font-black text-green-700 dark:text-green-400">
              S/ {Number(service.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectService(service);
            }}
            className="px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-950/60 hover:bg-green-600 dark:hover:bg-green-600 text-green-700 dark:text-green-300 hover:text-white dark:hover:text-white transition-all text-xs font-bold flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>Ver detalle</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

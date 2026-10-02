import React from 'react';
import { X, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Service } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookDirect: (service: Service) => void;
}

export default function ServiceDetailModal({ service, onClose, onBookDirect }: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col relative max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative aspect-[16/10] w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <img
              src={
                service.image_url ||
                'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600'
              }
              alt={service.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {service.badge && (
              <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                {service.badge}
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-200 shadow-md flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              <span>
                {service.duration_minutes >= 1440
                  ? 'Por día completo'
                  : `${service.duration_minutes} min aprox.`}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/70 border border-transparent dark:border-green-800/40 px-2.5 py-1 rounded-lg">
                Servicio Veterinario
              </span>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mt-2 leading-snug">
                {service.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-green-700 dark:text-green-400">
                  S/ {Number(service.price).toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  precio base
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/80 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-750">
              {service.description}
            </p>

            {/* Included highlights */}
            <div className="space-y-2 pt-1 text-xs text-gray-700 dark:text-gray-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                <span>Atención por médicos veterinarios titulados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                <span>Ambiente climatizado, seguro y libre de estrés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                <span>Reportes y recordatorios directos por WhatsApp</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => {
                  onClose();
                  onBookDirect(service);
                }}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-xs sm:text-sm transition-all shadow-lg shadow-green-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Cita</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

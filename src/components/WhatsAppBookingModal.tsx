import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Dog, MessageCircle } from 'lucide-react';
import { Service } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = '51987654321';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: Service | null;
  services: Service[];
  onConfirmLocal?: (bookingData: any) => void;
}

export default function WhatsAppBookingModal({
  isOpen,
  onClose,
  selectedService,
  services,
  onConfirmLocal
}: WhatsAppBookingModalProps) {
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<'Perro' | 'Gato' | 'Otro'>('Perro');
  const [breed, setBreed] = useState('');
  const [serviceId, setServiceId] = useState<string>(selectedService?.id || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync selected service if changed
  React.useEffect(() => {
    if (selectedService) {
      setServiceId(selectedService.id);
    }
  }, [selectedService]);

  if (!isOpen) return null;

  const currentService = services.find(s => s.id === serviceId) || selectedService;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceName = currentService ? currentService.name : 'Servicio General';
    const priceText = currentService ? `(S/ ${Number(currentService.price).toFixed(2)})` : '';

    const message = `🐾 *SOLICITUD DE CITA VETERINARIA - VETPET* 🐾
-----------------------------------------
*Dueño:* ${ownerName}
*Teléfono:* ${phone}
*Mascota:* ${petName} (${species}${breed ? ` - ${breed}` : ''})
*Servicio:* ${serviceName} ${priceText}
*Fecha preferida:* ${date || 'A coordinar'}
*Hora preferida:* ${time || 'A coordinar'}
${notes ? `*Notas adicionales:* ${notes}\n` : ''}-----------------------------------------
¡Hola VetPet! Quisiera agendar esta cita para mi mascota por favor. 🐶🐱`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    if (onConfirmLocal) {
      onConfirmLocal({
        ownerName,
        petName,
        species,
        breed,
        serviceId,
        date,
        time,
        phone,
        notes
      });
    }

    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-emerald-900 p-6 text-white relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-black tracking-wider uppercase bg-white/20 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              Veterinaria & Spa
            </span>
            <h3 className="text-xl sm:text-2xl font-black leading-tight">
              {submitted ? '¡Cita Solicitada!' : 'Agendar Cita Médica'}
            </h3>
            <p className="text-xs text-green-100 mt-1">
              Coordinamos fecha y hora directamente contigo en WhatsApp
            </p>
          </div>

          {/* Form or Success State */}
          {submitted ? (
            <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 flex-1">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center shadow-lg">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-black text-gray-900 dark:text-white">
                  ¡Solicitud Registrada con Éxito!
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs mx-auto">
                  En breve nos comunicaremos por WhatsApp para la confirmación de tu cita.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full max-w-xs py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-xs transition-all shadow-md active:scale-95 cursor-pointer mt-2"
              >
                <span>Cita Registrada • Entendido</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
            {/* Service Selection */}
            <div>
              <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                Servicio a Solicitar *
              </label>
              <select
                required
                value={serviceId}
                onChange={e => setServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">Selecciona un servicio</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} (S/ {Number(s.price).toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {/* Owner & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Tu Nombre y Apellido *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Ana Torres"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Teléfono / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    placeholder="987654321"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Pet info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Mascota *
                </label>
                <div className="relative">
                  <Dog className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Toby"
                    value={petName}
                    onChange={e => setPetName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Especie
                </label>
                <select
                  value={species}
                  onChange={e => setSpecies(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-800 dark:text-gray-100 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="Perro">🐶 Perro</option>
                  <option value="Gato">🐱 Gato</option>
                  <option value="Otro">🐰 Otro</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Raza (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Poodle"
                  value={breed}
                  onChange={e => setBreed(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            {/* Date & Time preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Fecha Preferida
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                  Hora Preferida
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                Síntomas o Indicaciones Especiales
              </label>
              <textarea
                rows={2}
                placeholder="Describe si presenta algún síntoma, alergia o requerimiento particular..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-xs sm:text-sm transition-all shadow-xl shadow-green-100 dark:shadow-none flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enviar y Abrir WhatsApp para Confirmar</span>
              </button>
            </div>
          </form>
        )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

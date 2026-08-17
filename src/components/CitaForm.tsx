import React from 'react';
import { Calendar, User, Dog, Phone, Clock, Scissors } from 'lucide-react';
import { Service } from '../types';

interface CitaFormProps {
  services: Service[];
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export default function CitaForm({ services, onSubmit, isSubmitting }: CitaFormProps) {
  const [formData, setFormData] = React.useState({
    ownerName: '',
    petName: '',
    species: 'Perro',
    serviceId: '',
    date: '',
    time: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Dueño</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              required
              type="text" 
              value={formData.ownerName}
              onChange={e => setFormData({...formData, ownerName: e.target.value})}
              className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
              placeholder="Ej. Juan Pérez"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Mascota</label>
          <div className="relative">
            <Dog className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              required
              type="text" 
              value={formData.petName}
              onChange={e => setFormData({...formData, petName: e.target.value})}
              className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
              placeholder="Ej. Toby"
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Especie</label>
          <select 
            value={formData.species}
            onChange={e => setFormData({...formData, species: e.target.value})}
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
          >
            <option>Perro</option>
            <option>Gato</option>
            <option>Otro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Servicio</label>
          <div className="relative">
            <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select 
              required
              value={formData.serviceId}
              onChange={e => setFormData({...formData, serviceId: e.target.value})}
              className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
            >
              <option value="">Seleccionar servicio</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Fecha</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              required
              type="date" 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Hora</label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              required
              type="time" 
              value={formData.time}
              onChange={e => setFormData({...formData, time: e.target.value})}
              className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono de contacto</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            required
            type="tel" 
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
            placeholder="Ej. 987654321"
          />
        </div>
      </div>

      <button 
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Calendar className="w-5 h-5" />
            Confirmar Reserva
          </>
        )}
      </button>
    </form>
  );
}

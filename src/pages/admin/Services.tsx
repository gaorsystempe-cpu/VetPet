import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Service } from '../../types';
import { Scissors, Plus, Trash2, Edit2, Clock, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const { data } = await supabase.from('services').select('*');
    if (data) setServices(data);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Servicios</h1>
          <p className="text-gray-500 font-medium">Configura los servicios que ofreces en la veterinaria.</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Servicio
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-green-100 p-4 rounded-2xl text-green-600">
                <Scissors className="w-6 h-6" />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-2">{service.description}</p>
            <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-bold text-gray-900">{formatCurrency(service.price)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-bold text-gray-500">{service.duration_minutes} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

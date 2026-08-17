import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Client, Pet } from '../../types';
import { Users, Plus, Search, Mail, Phone, MapPin, ChevronRight, Dog } from 'lucide-react';

export default function Clients() {
  const [clients, setClients] = useState<(Client & { pets?: Pet[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const { data: clientsData } = await supabase.from('clients').select('*, pets(*)');
    if (clientsData) setClients(clientsData);
    setLoading(false);
  }

  const filteredClients = clients.filter(c => 
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Clientes y Mascotas</h1>
          <p className="text-gray-500 font-medium">Base de datos de dueños y sus compañeros peludos.</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Buscar por nombre o teléfono..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-5 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                  {client.full_name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">{client.full_name}</h3>
                  <p className="text-sm text-gray-500 font-medium">Cliente desde 2024</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-bold">{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-bold truncate">{client.email || 'No registrado'}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Mascotas</p>
              <div className="flex flex-wrap gap-3">
                {client.pets?.map(pet => (
                  <div key={pet.id} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-100">
                    <Dog className="w-4 h-4" />
                    <span className="text-sm font-bold">{pet.name}</span>
                    <span className="text-[10px] bg-green-200 px-1.5 py-0.5 rounded-md uppercase">{pet.species}</span>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-bold">Agregar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { 
  Users, Calendar, ShoppingBag, DollarSign, 
  TrendingUp, ArrowUpRight, ArrowDownRight, Package
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { supabase } from '../../lib/supabase';
import { formatCurrency, cn } from '../../lib/utils';

export default function Dashboard() {
  const [stats, setStats] = useState({
    citasHoy: 0,
    ingresosMes: 0,
    stockBajo: 0,
    totalClientes: 0
  });

  const data = [
    { name: 'Lun', ingresos: 4000 },
    { name: 'Mar', ingresos: 3000 },
    { name: 'Mie', ingresos: 2000 },
    { name: 'Jue', ingresos: 2780 },
    { name: 'Vie', ingresos: 1890 },
    { name: 'Sab', ingresos: 2390 },
    { name: 'Dom', ingresos: 3490 },
  ];

  useEffect(() => {
    setStats({
      citasHoy: 12,
      ingresosMes: 15400,
      stockBajo: 5,
      totalClientes: 1240
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className={cn("p-4 rounded-2xl", color)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg",
            trend > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
          )}>
            {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-gray-500 font-bold uppercase tracking-wider text-xs mb-2">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 font-medium">Bienvenido de nuevo, esto es lo que pasa hoy.</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Nueva Cita
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          title="Citas Hoy" 
          value={stats.citasHoy} 
          icon={Calendar} 
          trend={12} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Ingresos Mes" 
          value={formatCurrency(stats.ingresosMes)} 
          icon={DollarSign} 
          trend={8} 
          color="bg-green-600" 
        />
        <StatCard 
          title="Stock Bajo" 
          value={stats.stockBajo} 
          icon={Package} 
          trend={-2} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Total Clientes" 
          value={stats.totalClientes} 
          icon={Users} 
          trend={5} 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-extrabold text-gray-900">Ingresos Semanales</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  cursor={{fill: '#f9fafb'}}
                />
                <Bar dataKey="ingresos" fill="#16a34a" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-extrabold text-gray-900 mb-8">Citas Recientes</h3>
          <div className="space-y-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold">
                    T
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Toby (Perro)</p>
                    <p className="text-xs text-gray-500 font-medium">Baño y Corte • 14:30 PM</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Pendiente
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

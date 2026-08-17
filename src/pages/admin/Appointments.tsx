import { Calendar as CalendarIcon, Clock, User, Dog, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '../../lib/utils';
import { useCitas } from '../../hooks/useCitas';

export default function Appointments() {
  const { appointments, loading, updateStatus } = useCitas();

  const statusColors = {
    pendiente: 'bg-yellow-100 text-yellow-700',
    confirmada: 'bg-blue-100 text-blue-700',
    completada: 'bg-green-100 text-green-700',
    cancelada: 'bg-red-100 text-red-700'
  };

  const statusIcons = {
    pendiente: AlertCircle,
    confirmada: CheckCircle,
    completada: CheckCircle,
    cancelada: XCircle
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Gestión de Citas</h1>
          <p className="text-gray-500 font-medium">Administra las reservas y el calendario semanal.</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all">
          Nueva Cita
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Mascota / Dueño</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Servicio</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.length > 0 ? appointments.map((apt) => {
                const StatusIcon = statusIcons[apt.status];
                return (
                  <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                          <Dog className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{apt.pet?.name}</p>
                          <p className="text-xs text-gray-500">{apt.client?.full_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-gray-700">{apt.service?.name}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          {format(new Date(apt.appointment_date), "d 'de' MMMM", { locale: es })}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {format(new Date(apt.appointment_date), "HH:mm 'hrs'")}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                        statusColors[apt.status]
                      )}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-green-600 font-bold hover:text-green-700 px-3 py-1 rounded-lg hover:bg-green-50 transition-all">
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-gray-500 font-medium">
                    No hay citas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

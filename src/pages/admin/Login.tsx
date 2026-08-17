import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Dog, Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 1200));

    const adminUser = import.meta.env.VITE_ADMIN_USER || 'admin';
    const adminPass = import.meta.env.VITE_ADMIN_PASS || 'admin123';

    if (username === adminUser && password === adminPass) {
      onLogin();
    } else {
      setError('Usuario o contraseña incorrectos.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left Side: Visual/Branding (SaaS Style) */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-90" />
        
        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700" />

        <div className="relative z-10 w-full flex flex-col justify-center px-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white p-3 rounded-2xl shadow-xl">
              <Dog className="text-green-600 w-8 h-8" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">VetPet SaaS</span>
          </div>
          
          <h2 className="text-5xl font-extrabold text-white leading-tight mb-8">
            La plataforma definitiva para <br />
            <span className="text-green-200">gestionar tu veterinaria.</span>
          </h2>
          
          <div className="space-y-8">
            {[
              { title: 'Gestión de Citas', desc: 'Calendario inteligente y recordatorios automáticos.' },
              { title: 'Control de Inventario', desc: 'Stock en tiempo real y alertas de productos bajos.' },
              { title: 'Historial Clínico', desc: 'Toda la información de tus pacientes en un solo lugar.' }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1 bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                  <ArrowRight className="text-white w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{feature.title}</h4>
                  <p className="text-green-100 opacity-80">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-10 h-10 rounded-full border-2 border-green-600" alt="User" referrerPolicy="no-referrer" />
                ))}
              </div>
              <p className="text-green-50 text-sm font-medium">
                Únete a más de <span className="font-bold">2,000 veterinarias</span> que ya confían en nosotros.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/50">
        <div className="max-w-md w-full">
          <div className="lg:hidden flex items-center gap-2 mb-12 justify-center">
            <div className="bg-green-600 p-2 rounded-xl">
              <Dog className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-green-800 tracking-tight">VetPet</span>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Bienvenido de nuevo</h1>
            <p className="text-gray-500 font-medium">Ingresa tus credenciales para acceder al panel administrativo.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Usuario Administrador</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-gray-700">Contraseña</label>
                <a href="#" className="text-xs font-bold text-green-600 hover:text-green-700">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <label htmlFor="remember" className="text-sm text-gray-600 font-medium">Recordar sesión por 30 días</label>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-200 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-gray-500 text-sm">
            ¿No tienes una cuenta? <a href="#" className="text-green-600 font-bold hover:underline">Contacta con ventas</a>
          </p>
        </div>
      </div>
    </div>
  );
}

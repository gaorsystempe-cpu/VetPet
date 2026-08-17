import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Calendar, ShoppingBag, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

interface HeroFloatingPetProps {
  onOpenBooking: () => void;
  onExplorePetshop: () => void;
}

export default function HeroFloatingPet({ onOpenBooking, onExplorePetshop }: HeroFloatingPetProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking for 3D parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section className="pt-2 pb-6">
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-[36px] overflow-hidden bg-gradient-to-b from-green-50/80 via-white to-emerald-50/50 dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-950 border border-green-100 dark:border-gray-800 shadow-sm p-6 sm:p-10 text-center flex flex-col items-center select-none transition-colors duration-300"
      >
        {/* Ambient Decorative Dots in Brand Green */}
        <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-green-200/60 dark:bg-green-500/20 blur-[0.5px]" />
        <div className="absolute top-1/3 right-6 w-3 h-3 rounded-full bg-emerald-200/60 dark:bg-emerald-500/20 blur-[0.5px]" />
        <div className="absolute bottom-12 left-10 w-2.5 h-2.5 rounded-full bg-teal-200/50 dark:bg-teal-500/20" />
        <div className="absolute top-16 right-1/4 w-2 h-2 rounded-full bg-green-300/60 dark:bg-green-500/20" />

        {/* Soft Radial Glow behind mascot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] bg-gradient-to-tr from-green-200/40 via-emerald-100/40 to-teal-100/30 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-teal-900/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Top Brand Pill in VetPet Green */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-100/90 dark:bg-green-950/80 border border-green-200 dark:border-green-800/60 text-green-800 dark:text-green-300 font-black text-xs tracking-wider uppercase shadow-xs mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
          <span>VETPET EXPRESS</span>
        </motion.div>

        {/* 2. Headline with Highlighted Word in VetPet Green */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto space-y-1 z-10"
        >
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            Cuidado que <br />
            <span className="relative inline-block text-green-600 dark:text-green-400 font-black drop-shadow-xs">
              Despierta
              <span className="absolute left-0 -bottom-1 w-full h-2 bg-green-200/80 dark:bg-green-900/80 rounded-full -z-10 transform -rotate-1" />
            </span>{' '}
            Su Felicidad
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium max-w-md mx-auto pt-2 leading-relaxed">
            Atención veterinaria integral, spa de mascotas y petshop con delivery rápido para tu consentido.
          </p>
        </motion.div>

        {/* 3. Floating Interactive Pet Mascot (Hero Centerpiece) */}
        <div className="relative my-4 sm:my-6 w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center">
          
          {/* Main Floating Mascot Container */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
            animate={{
              y: [0, -14, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="relative w-full h-full flex items-center justify-center cursor-pointer"
          >
            {/* Cutout High Resolution Floating Dog Image */}
            <motion.img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=650"
              alt="Mascota Feliz VetPet"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-[230px] sm:w-[290px] h-[230px] sm:h-[290px] object-cover rounded-full shadow-[0_20px_45px_rgba(22,101,52,0.18)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)] border-4 border-white dark:border-gray-800 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />

            {/* Floating Particle 1: Snacks 🦴 */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 15, -5, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2
              }}
              className="absolute top-4 left-2 sm:-left-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-lg border border-green-100 dark:border-gray-700 flex items-center gap-1.5 text-xs font-black text-green-900 dark:text-green-300"
            >
              <span className="text-lg">🦴</span>
              <span className="hidden sm:inline text-[11px]">Snacks Ricos</span>
            </motion.div>

            {/* Floating Particle 2: Sparkle / 100% Amor ⭐ */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.7
              }}
              className="absolute top-8 right-2 sm:right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-2 sm:p-2.5 rounded-2xl shadow-lg border border-green-100 dark:border-gray-700 flex items-center gap-1 text-xs font-black text-green-700 dark:text-green-400"
            >
              <Sparkles className="w-4 h-4 text-green-500 dark:text-green-400 fill-green-400" />
              <span className="text-[11px]">100% Amor</span>
            </motion.div>

            {/* Floating Particle 3: Cuidado VIP ❤️ */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.1
              }}
              className="absolute bottom-6 left-4 sm:left-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 py-1.5 rounded-full shadow-md text-xs font-black flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span className="text-[10px]">Cuidado VIP</span>
            </motion.div>

            {/* Floating Particle 4: Delivery / Vet Badge 🐾 */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4
              }}
              className="absolute -bottom-2 right-4 sm:right-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 rounded-xl bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 flex items-center justify-center font-black text-xs">
                🐾
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase leading-none">Veterinaria</p>
                <p className="text-[11px] font-black text-green-800 dark:text-green-300 leading-tight">Citas al Instante</p>
              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* 4. Action Buttons in Brand Green Palette */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 z-10 pt-1"
        >
          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-green-600/25 dark:shadow-none flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Cita Médica</span>
          </button>

          <button
            onClick={onExplorePetshop}
            className="px-6 py-3.5 rounded-2xl bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-gray-700 text-green-900 dark:text-green-300 border border-green-200 dark:border-gray-700 font-black text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span>Ver Productos Petshop</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dog, Cat, Scissors, Syringe, HeartPulse, Hotel, 
  Phone, Mail, MapPin, Instagram, Facebook, MessageCircle,
  Star, ShoppingBag, Calendar,
  Flame, Sparkles, ArrowRight, CheckCircle2, Heart, Clock, Stethoscope
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Service, Product, Category } from '../types';
import { INITIAL_SERVICES, INITIAL_PRODUCTS } from '../data/catalogData';
import { useCart } from '../context/CartContext';

// Components
import BottomNavBar from '../components/BottomNavBar';
import ProductCarouselCard from '../components/ProductCarouselCard';
import ServiceCard from '../components/ServiceCard';
import CartDrawer from '../components/CartDrawer';
import WhatsAppBookingModal from '../components/WhatsAppBookingModal';
import ServiceDetailModal from '../components/ServiceDetailModal';
import ProductDetailModal from '../components/ProductDetailModal';
import FavoritesModal from '../components/FavoritesModal';
import HeroFloatingPet from '../components/HeroFloatingPet';
import ThemeToggle from '../components/ThemeToggle';

const WHATSAPP_NUMBER = '51987654321';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'servicios' | 'productos' | 'favoritos'>('inicio');
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  
  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<Service | null>(null);
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<Service | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: servicesData } = await supabase.from('services').select('*');
      const { data: productsData } = await supabase.from('products').select('*');
      
      if (servicesData && servicesData.length > 0) {
        setServices(servicesData);
      }
      if (productsData && productsData.length > 0) {
        setProducts(productsData);
      }
    } catch (error) {
      console.warn('Using initial catalog data', error);
    }
  }

  // Best Sellers (Lo más pedido)
  const bestSellers = useMemo(() => {
    const list = products.filter(p => p.isBestSeller);
    return list.length > 0 ? list : products.slice(0, 4);
  }, [products]);

  // Promotions
  const promotions = useMemo(() => {
    const list = products.filter(p => p.isPromo);
    return list.length > 0 ? list : products.slice(4, 8);
  }, [products]);

  // Filtered Products for the general catalog
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      return matchesCategory;
    });
  }, [products, activeCategory]);

  // Open booking with specific service
  const handleOpenBooking = (service?: Service) => {
    setSelectedServiceForBooking(service || null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 pb-28 selection:bg-green-100 selection:text-green-800 transition-colors duration-300">
      
      {/* Top Header (Clean App-style without search bar) */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 shadow-[0_2px_15px_rgba(0,0,0,0.03)] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="bg-green-600 text-white p-2 rounded-2xl shadow-md shadow-green-100 dark:shadow-none flex items-center justify-center">
                <Dog className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">VetPet</span>
                  <span className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-400 text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase">
                    Express
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                  <MapPin className="w-3 h-3 text-green-600 dark:text-green-400" />
                  <span>Lima, Perú • Atención hoy hasta 8:00 PM</span>
                </div>
              </div>
            </div>

            {/* Actions: Theme Toggle, WhatsApp button & Booking */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Theme Toggle Button */}
              <ThemeToggle />

              <button
                onClick={() => handleOpenBooking()}
                className="hidden sm:flex items-center gap-1.5 bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/80 border border-transparent dark:border-green-800/50 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Cita</span>
              </button>
              
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola VetPet! Quiero hacer una consulta sobre sus productos y servicios 🐶🐱')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-full text-xs font-black transition-all shadow-md shadow-green-200 dark:shadow-none"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero Interactive Floating Pet Banner */}
        <HeroFloatingPet
          onOpenBooking={() => handleOpenBooking()}
          onExplorePetshop={() => {
            const el = document.getElementById('productos-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 1. Lo más pedido Carousel */}
        <section className="py-5">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>Lo más pedido</span>
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Los favoritos de nuestros clientes este mes</p>
            </div>

            <button
              onClick={() => {
                setActiveCategory('all');
                const el = document.getElementById('productos-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-black text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:underline flex items-center gap-1"
            >
              <span>Ver todo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal scroll container */}
          <div className="flex gap-3.5 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {bestSellers.map(product => (
              <ProductCarouselCard
                key={product.id}
                product={product}
                onSelectProduct={prod => setSelectedProductForDetail(prod)}
              />
            ))}
          </div>
        </section>

        {/* 2. Promociones Carousel */}
        <section className="py-5">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>Promociones</span>
                <span className="bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Hasta 30% OFF
                </span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Descuentos especiales por tiempo limitado</p>
            </div>

            <button
              onClick={() => {
                setActiveCategory('all');
                const el = document.getElementById('productos-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-black text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:underline flex items-center gap-1"
            >
              <span>Ver todo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal scroll container */}
          <div className="flex gap-3.5 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {promotions.map(product => (
              <ProductCarouselCard
                key={product.id}
                product={product}
                onSelectProduct={prod => setSelectedProductForDetail(prod)}
              />
            ))}
          </div>
        </section>

        {/* 3. Servicios Veterinarios & Spa (Modo App Compacto con Modal de Detalle) */}
        <section id="servicios-section" className="py-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/70 border border-transparent dark:border-green-800/40 px-3 py-1 rounded-full mb-1">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Atención Médica & Spa</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Nuestros Servicios
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                Toca cualquier servicio para ver detalles completos y agendar
              </p>
            </div>

            <button
              onClick={() => handleOpenBooking()}
              className="self-start sm:self-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xs font-black transition-all shadow-md shadow-green-100 dark:shadow-none flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Directo</span>
            </button>
          </div>

          {/* Compact 2-column on mobile, 3-column on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={srv => setSelectedServiceForDetail(srv)}
                onBookService={srv => handleOpenBooking(srv)}
              />
            ))}
          </div>
        </section>

        {/* 4. Catálogo Petshop Completo con Filtros Priorizados */}
        <section id="productos-section" className="py-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-green-800 dark:text-green-400 bg-green-100 dark:bg-green-950/70 border border-transparent dark:border-green-800/40 px-3 py-1 rounded-full">
                Tienda Petshop
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight mt-1.5">
                Farmacia, Alimentos & Accesorios
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                Productos 100% originales con entrega rápida a tu domicilio
              </p>
            </div>

            {/* Category Filter Pills (Ordered by Priority) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { key: 'all', label: '🐾 Todos' },
                { key: 'medicamentos', label: '💊 Farmacia' },
                { key: 'alimentos', label: '🥩 Alimentos' },
                { key: 'accesorios', label: '🎾 Accesorios' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as any)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.key
                      ? 'bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-none scale-102'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800">
              <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-700 dark:text-gray-200">No encontramos productos en esta categoría</h3>
              <button
                onClick={() => setActiveCategory('all')}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredProducts.map(product => (
                <ProductCarouselCard
                  key={product.id}
                  product={product}
                  onSelectProduct={prod => setSelectedProductForDetail(prod)}
                />
              ))}
            </div>
          )}
        </section>

        {/* 5. Banner de Reserva Rápida Directa a WhatsApp */}
        <section id="reserva-rapida" className="py-6">
          <div className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 dark:from-green-950 dark:via-emerald-950 dark:to-gray-900 rounded-[32px] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-green-600/30 dark:border-green-800/40">
            {/* Background glow */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-white/20 dark:bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold">
                <Clock className="w-3.5 h-3.5 text-yellow-300" />
                <span>Atención Rápida • Médicos Colegiados</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                ¿Tu mascota necesita <span className="text-yellow-300">atención o baño?</span>
              </h2>
              <p className="text-xs sm:text-sm text-green-100 dark:text-green-200/80 font-medium leading-relaxed">
                Agenda su cita en segundos. Te responderemos directamente por WhatsApp para confirmar fecha y horario.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto shrink-0">
              <button
                onClick={() => handleOpenBooking()}
                className="w-full md:w-auto px-6 py-3.5 bg-white hover:bg-green-50 text-green-800 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2.5 active:scale-95 group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-green-600 text-green-600 group-hover:scale-110 transition-transform" />
                <span>Agendar Cita por WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-green-700 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white pt-14 pb-20 mt-12 border-t border-transparent dark:border-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-green-600 p-2 rounded-xl">
                  <Dog className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-black tracking-tight">VetPet Veterinaria</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Atención médica veterinaria con pasión y respeto por los animales. Servicios integrales y tienda especializada.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">Horario & Atención</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Lunes a Sábado: 8:00 AM - 8:00 PM <br />
                Domingos: 9:00 AM - 2:00 PM <br />
                <span className="text-green-400 font-bold">Emergencias 24/7 vía WhatsApp</span>
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">Ubicación & Contacto</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                📍 Av. Las Mascotas 123, Lima, Perú <br />
                📞 +51 987 654 321 <br />
                <a href="/admin" className="text-[11px] text-green-400 hover:underline inline-block mt-2 font-bold">
                  🔐 Acceso al Panel de Administración
                </a>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 dark:border-gray-900 text-center text-gray-500 text-xs">
            <p>&copy; 2026 VetPet. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Navigation Bar (PedidosYa App Style) */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola VetPet! Quiero información para atender a mi mascota 🐾')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
        className="fixed bottom-20 right-4 sm:right-6 z-40 bg-green-500 hover:bg-green-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group border-2 border-white dark:border-gray-800 animate-pulse"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
      </a>

      {/* Modals & Drawers */}
      <CartDrawer />

      <WhatsAppBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedService={selectedServiceForBooking}
        services={services}
      />

      {/* Dedicated Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForDetail}
        onClose={() => setSelectedServiceForDetail(null)}
        onBookDirect={srv => handleOpenBooking(srv)}
      />

      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        products={products}
        onSelectProduct={prod => setSelectedProductForDetail(prod)}
      />

    </div>
  );
}

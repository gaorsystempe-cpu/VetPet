import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, MapPin, Phone, User, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = '51987654321';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount, totalItems, isCartOpen, setIsCartOpen } = useCart();
  
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = deliveryType === 'delivery' ? (totalAmount > 100 ? 0 : 5) : 0;
  const finalTotal = totalAmount + deliveryFee;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    const itemsText = cart
      .map(
        item =>
          `• ${item.quantity}x ${item.product.name} (S/ ${(item.product.price * item.quantity).toFixed(2)})`
      )
      .join('\n');

    const message = `🐾 *NUEVO PEDIDO - VETPET PETSHOP* 🐾
-------------------------------------
*Cliente:* ${clientName || 'Cliente'}
*Teléfono:* ${clientPhone || 'No especificado'}
*Modalidad:* ${deliveryType === 'delivery' ? '🛵 Envío a Domicilio' : '🏪 Recojo en Tienda'}
${deliveryType === 'delivery' ? `*Dirección:* ${clientAddress || 'Por coordinar'}\n` : ''}
*DETALLE DE PRODUCTOS:*
${itemsText}
-------------------------------------
*Subtotal:* S/ ${totalAmount.toFixed(2)}
*Envío:* ${deliveryFee === 0 ? 'Gratis' : `S/ ${deliveryFee.toFixed(2)}`}
*TOTAL A PAGAR:* S/ ${finalTotal.toFixed(2)}

¡Hola! Deseo confirmar este pedido para mi mascota. 🐶🐱`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
      setIsCartOpen(false);
    }, 2000);
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Drawer panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white">Tu Carrito</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'} seleccionados
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-600 mb-4">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">Tu carrito está vacío</h3>
                  <p className="text-xs text-gray-400 max-w-xs mt-1">
                    Explora nuestro petshop y agrega los alimentos, farmacia o accesorios que tu consentido necesita.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Ver Productos
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800"
                      >
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                            {item.product.name}
                          </h4>
                          <div className="text-xs font-black text-green-700 dark:text-green-400 mt-0.5">
                            S/ {(item.product.price * item.quantity).toFixed(2)}
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-gray-100 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-200 hover:bg-gray-100 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-pointer"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Mode selector */}
                  <div className="pt-3">
                    <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-2">
                      Tipo de Entrega
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('delivery')}
                        className={`p-3 rounded-2xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          deliveryType === 'delivery'
                            ? 'bg-green-50 dark:bg-green-950/70 border-green-600 text-green-800 dark:text-green-300 shadow-sm'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        🛵 Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryType('pickup')}
                        className={`p-3 rounded-2xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          deliveryType === 'pickup'
                            ? 'bg-green-50 dark:bg-green-950/70 border-green-600 text-green-800 dark:text-green-300 shadow-sm'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        🏪 Recojo en Tienda
                      </button>
                    </div>
                  </div>

                  {/* Checkout Fields */}
                  <div className="space-y-2.5 pt-2">
                    <div>
                      <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                        Tu Nombre
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="Nombre y Apellido"
                          value={clientName}
                          onChange={e => setClientName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          placeholder="987654321"
                          value={clientPhone}
                          onChange={e => setClientPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      </div>
                    </div>

                    {deliveryType === 'delivery' && (
                      <div>
                        <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-1">
                          Dirección de Entrega
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="Calle, Número, Distrito"
                            value={clientAddress}
                            onChange={e => setClientAddress(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Footer Summary & Order Button */}
            {cart.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/80 space-y-3">
                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900 dark:text-white">S/ {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Costo de envío</span>
                    <span className="font-bold text-green-700 dark:text-green-400">
                      {deliveryFee === 0 ? 'Gratis (Compras > S/100)' : `S/ ${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total a Pagar</span>
                    <span className="text-green-700 dark:text-green-400">S/ {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleSendWhatsAppOrder}
                  disabled={orderPlaced}
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-xs sm:text-sm transition-all shadow-xl shadow-green-100 dark:shadow-none flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  {orderPlaced ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>¡Pedido Enviado a WhatsApp!</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Confirmar Pedido por WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

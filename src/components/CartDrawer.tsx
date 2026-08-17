import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, MapPin, Phone, User, CheckCircle2, QrCode, CreditCard, Banknote, Copy, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = '51987654321';

type PaymentMethod = 'yape' | 'bcp' | 'contraentrega';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount, totalItems, isCartOpen, setIsCartOpen } = useCart();
  
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('yape');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = deliveryType === 'delivery' ? (totalAmount > 100 ? 0 : 5) : 0;
  const finalTotal = totalAmount + deliveryFee;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getPaymentDetails = () => {
    switch (paymentMethod) {
      case 'yape':
        return {
          label: '🟣 Yape / Plin (987 654 321)',
          note: '📸 *Adjunto en breve la constancia/captura de mi pago por Yape para su validación.*'
        };
      case 'bcp':
        return {
          label: '🏦 Transferencia BCP (Cta: 191-98765432-0-12)',
          note: '📸 *Adjunto en breve el comprobante de transferencia BCP para confirmar el pedido.*'
        };
      case 'contraentrega':
        return {
          label: '💵 Pago Contra Entrega (Efectivo / POS)',
          note: '💵 *Realizaré el pago al momento de recibir/recoger los productos.*'
        };
    }
  };

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    const itemsText = cart
      .map(
        item =>
          `• ${item.quantity}x ${item.product.name} (S/ ${(item.product.price * item.quantity).toFixed(2)})`
      )
      .join('\n');

    const paymentInfo = getPaymentDetails();

    const message = `🐾 *NUEVO PEDIDO - VETPET PETSHOP* 🐾
-------------------------------------
*Cliente:* ${clientName || 'Cliente'}
*Teléfono:* ${clientPhone || 'No especificado'}
*Modalidad:* ${deliveryType === 'delivery' ? '🛵 Envío a Domicilio' : '🏪 Recojo en Tienda'}
${deliveryType === 'delivery' ? `*Dirección:* ${clientAddress || 'Por coordinar'}\n` : ''}*Método de Pago:* ${paymentInfo.label}
-------------------------------------
*DETALLE DE PRODUCTOS:*
${itemsText}
-------------------------------------
*Subtotal:* S/ ${totalAmount.toFixed(2)}
*Envío:* ${deliveryFee === 0 ? 'Gratis' : `S/ ${deliveryFee.toFixed(2)}`}
*TOTAL A PAGAR:* S/ ${finalTotal.toFixed(2)}

${paymentInfo.note}
¡Hola VetPet! Quiero confirmar este pedido para mi mascota. 🐶🐱`;

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
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
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
                  {/* List of items */}
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
                  <div>
                    <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block mb-2">
                      1. Tipo de Entrega
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

                  {/* Customer Data */}
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block">
                      2. Datos del Cliente
                    </label>
                    <div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="Nombre y Apellido *"
                          value={clientName}
                          onChange={e => setClientName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          placeholder="Teléfono / WhatsApp *"
                          value={clientPhone}
                          onChange={e => setClientPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      </div>
                    </div>

                    {deliveryType === 'delivery' && (
                      <div>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="Dirección exacta de entrega *"
                            value={clientAddress}
                            onChange={e => setClientAddress(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Payment Methods */}
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block">
                      3. Método de Pago *
                    </label>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('yape')}
                        className={`p-2.5 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          paymentMethod === 'yape'
                            ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-600 text-purple-800 dark:text-purple-300 ring-2 ring-purple-500/20'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        <QrCode className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-[11px]">Yape / Plin</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bcp')}
                        className={`p-2.5 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          paymentMethod === 'bcp'
                            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-800 dark:text-blue-300 ring-2 ring-blue-500/20'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-[11px]">Cta. BCP</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('contraentrega')}
                        className={`p-2.5 rounded-2xl text-xs font-bold border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          paymentMethod === 'contraentrega'
                            ? 'bg-green-50 dark:bg-green-950/60 border-green-600 text-green-800 dark:text-green-300 ring-2 ring-green-500/20'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        <Banknote className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-[11px]">Al recibir</span>
                      </button>
                    </div>

                    {/* Payment Details Box */}
                    <div className="p-3.5 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-750 text-xs space-y-2">
                      {paymentMethod === 'yape' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                Número Yape / Plin (9 dígitos)
                              </span>
                              <span className="text-sm font-black text-purple-700 dark:text-purple-400">
                                987 654 321
                              </span>
                              <span className="text-[10px] text-gray-500 block">Titular: VetPet Express SAC</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('987654321', 'yape')}
                              className="px-2.5 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/60 hover:bg-purple-200 text-purple-700 dark:text-purple-300 text-[11px] font-black flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                            >
                              {copiedKey === 'yape' ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-green-600" />
                                  <span>¡Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copiar</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900/80 p-2 rounded-xl border border-purple-100 dark:border-purple-900/40">
                            💡 Al confirmar, se abrirá WhatsApp para que adjuntes la captura del Yape/Plin.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'bcp' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                Cta. Corriente BCP Soles
                              </span>
                              <span className="text-xs font-black text-blue-700 dark:text-blue-400 font-mono">
                                191-98765432-0-12
                              </span>
                              <span className="text-[10px] text-gray-500 block">Titular: VetPet Express SAC</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('19198765432012', 'bcp')}
                              className="px-2.5 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 hover:bg-blue-200 text-blue-700 dark:text-blue-300 text-[11px] font-black flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                            >
                              {copiedKey === 'bcp' ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-green-600" />
                                  <span>¡Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copiar</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 dark:border-gray-700">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                                Código Interbancario (CCI)
                              </span>
                              <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200 font-mono">
                                002-191-0098765432012-55
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard('002191009876543201255', 'cci')}
                              className="px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-700 dark:text-gray-200 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                            >
                              {copiedKey === 'cci' ? '¡Listo!' : 'Copiar'}
                            </button>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'contraentrega' && (
                        <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                          💵 Podrás pagar con <strong>efectivo exacto</strong> o solicitar que el repartidor lleve <strong>POS para tarjeta de débito/crédito</strong>.
                        </p>
                      )}
                    </div>
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
                      <span>Enviar Pedido y Adjuntar Pago</span>
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

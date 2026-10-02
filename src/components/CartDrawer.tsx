import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, MapPin, Phone, User, CheckCircle2, QrCode, CreditCard, Banknote, Copy, Check, AlertCircle } from 'lucide-react';
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
  const [formError, setFormError] = useState('');
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    clientName: string;
    total: number;
    whatsappUrl: string;
  } | null>(null);

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

    if (!clientName.trim()) {
      setFormError('Por favor ingresa tu Nombre y Apellido.');
      return;
    }
    if (!clientPhone.trim()) {
      setFormError('Por favor ingresa tu Teléfono / WhatsApp.');
      return;
    }
    if (deliveryType === 'delivery' && !clientAddress.trim()) {
      setFormError('Por favor ingresa la dirección de entrega.');
      return;
    }

    setFormError('');

    const itemsText = cart
      .map(
        item =>
          `• ${item.quantity}x ${item.product.name} (S/ ${(item.product.price * item.quantity).toFixed(2)})`
      )
      .join('\n');

    const paymentInfo = getPaymentDetails();

    const message = `🐾 *NUEVO PEDIDO - VETPET PETSHOP* 🐾
-------------------------------------
*Cliente:* ${clientName.trim()}
*Teléfono:* ${clientPhone.trim()}
*Modalidad:* ${deliveryType === 'delivery' ? '🛵 Envío a Domicilio' : '🏪 Recojo en Tienda'}
${deliveryType === 'delivery' ? `*Dirección:* ${clientAddress.trim()}\n` : ''}*Método de Pago:* ${paymentInfo.label}
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

    setLastOrderDetails({
      clientName: clientName.trim(),
      total: finalTotal,
      whatsappUrl
    });

    setOrderPlaced(true);
    clearCart();
  };

  const handleClose = () => {
    setOrderPlaced(false);
    setLastOrderDetails(null);
    setFormError('');
    setIsCartOpen(false);
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
          onClick={handleClose}
          className="absolute inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer panel wrapper */}
        <div className="fixed inset-y-0 right-0 w-full sm:w-auto max-w-full flex justify-end">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full sm:w-[440px] bg-white dark:bg-gray-900 shadow-2xl flex flex-col justify-between h-full border-l border-gray-100 dark:border-gray-800"
          >
            {/* Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 flex items-center justify-center font-bold shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white leading-tight">
                    Tu Carrito
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {orderPlaced
                      ? 'Pedido confirmado'
                      : `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'} seleccionados`}
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ORDER SUCCESS SCREEN */}
            {orderPlaced ? (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center shadow-lg border-2 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2 max-w-sm">
                  <span className="inline-block bg-green-100 dark:bg-green-950/80 text-green-800 dark:text-green-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-green-200 dark:border-green-800/50">
                    ¡Pedido Realizado con Éxito!
                  </span>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">
                    ¡Gracias, {lastOrderDetails?.clientName || 'Cliente'}!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    En breve nos comunicaremos contigo para coordinar el envío de tu pedido.
                  </p>
                </div>

                <div className="w-full max-w-xs bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                    <span>Estado del pedido:</span>
                    <span className="font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-2 py-0.5 rounded-md">
                      En proceso 🛵
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 pt-1 border-t border-gray-200/60 dark:border-gray-700">
                    <span>Monto registrado:</span>
                    <span className="font-black text-gray-900 dark:text-white text-sm">
                      S/ {lastOrderDetails?.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="w-full max-w-xs space-y-3 pt-2">
                  {lastOrderDetails?.whatsappUrl && (
                    <a
                      href={lastOrderDetails.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-green-50 dark:bg-green-950/60 hover:bg-green-100 text-green-800 dark:text-green-300 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-green-200 dark:border-green-800/60 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current text-green-600 dark:text-green-400" />
                      <span>Reabrir mensaje de WhatsApp</span>
                    </a>
                  )}

                  <button
                    onClick={handleClose}
                    className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-green-200 dark:shadow-none transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Pedido Realizado • Entendido</span>
                  </button>
                </div>
              </div>
            ) : (
              /* CART FORM & ITEMS */
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-5">
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
                      onClick={handleClose}
                      className="mt-6 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      Ver Productos
                    </button>
                  </div>
                ) : (
                  <>
                    {/* List of items */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Productos en Carrito
                        </span>
                        <button
                          onClick={clearCart}
                          className="text-[11px] font-bold text-red-500 hover:text-red-600 hover:underline cursor-pointer"
                        >
                          Vaciar todo
                        </button>
                      </div>

                      {cart.map(item => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-800"
                        >
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0"
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
                            <div className="flex items-center gap-2 mt-1.5">
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
                    <div className="space-y-1.5 pt-1">
                      <label className="text-[11px] font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider block">
                        1. Tipo de Entrega
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryType('delivery')}
                          className={`p-3 rounded-2xl text-xs font-bold border text-center transition-all cursor-pointer ${
                            deliveryType === 'delivery'
                              ? 'bg-green-50 dark:bg-green-950/70 border-green-600 text-green-800 dark:text-green-300 shadow-xs'
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
                              ? 'bg-green-50 dark:bg-green-950/70 border-green-600 text-green-800 dark:text-green-300 shadow-xs'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          🏪 Recojo en Tienda
                        </button>
                      </div>
                    </div>

                    {/* Customer Data */}
                    <div className="space-y-2">
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
                            onChange={e => {
                              setClientName(e.target.value);
                              if (formError) setFormError('');
                            }}
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
                            onChange={e => {
                              setClientPhone(e.target.value);
                              if (formError) setFormError('');
                            }}
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
                              onChange={e => {
                                setClientAddress(e.target.value);
                                if (formError) setFormError('');
                              }}
                              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 3. Payment Methods */}
                    <div className="space-y-2">
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
                                <span className="text-[10px] text-gray-500 dark:text-gray-400 block">Titular: VetPet Express SAC</span>
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
                              💡 Al confirmar, enviarás el mensaje por WhatsApp para validar la constancia.
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
                                <span className="text-[10px] text-gray-500 dark:text-gray-400 block">Titular: VetPet Express SAC</span>
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
            )}

            {/* Footer Summary & Order Button */}
            {!orderPlaced && cart.length > 0 && (
              <div className="px-4 sm:px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/90 dark:bg-gray-800/90 space-y-3 pb-8 sm:pb-5">
                {formError && (
                  <div className="flex items-center gap-2 p-2.5 bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

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
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-xs sm:text-sm transition-all shadow-lg shadow-green-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Enviar Pedido y Adjuntar Pago</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

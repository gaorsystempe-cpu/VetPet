import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Sale, Product } from '../../types';
import { DollarSign, Plus, ShoppingCart, Search, Trash2, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showNewSale, setShowNewSale] = useState(false);

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  async function fetchSales() {
    const { data } = await supabase.from('sales').select('*').order('created_at', { ascending: false });
    if (data) setSales(data);
  }

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*');
    if (data) setProducts(data);
  }

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Ventas</h1>
          <p className="text-gray-500 font-medium">Registra ventas y revisa el historial de ingresos.</p>
        </div>
        <button 
          onClick={() => setShowNewSale(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Venta
        </button>
      </div>

      {showNewSale && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-extrabold text-gray-900 mb-6">Seleccionar Productos</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white overflow-hidden shrink-0">
                      <img src={product.image_url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-green-600 font-bold">{formatCurrency(product.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm sticky top-8">
              <div className="flex items-center gap-3 mb-8">
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-extrabold text-gray-900">Carrito</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.product.price)}</p>
                    </div>
                    <p className="font-bold text-gray-900">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                ))}
                {cart.length === 0 && (
                  <p className="text-center text-gray-400 py-8">El carrito está vacío</p>
                )}
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-xl font-extrabold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <button 
                  disabled={cart.length === 0}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Finalizar Venta
                </button>
                <button 
                  onClick={() => {setCart([]); setShowNewSale(false);}}
                  className="w-full py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h3 className="text-xl font-extrabold text-gray-900">Historial de Ventas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">ID Venta</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 font-mono text-xs text-gray-500">
                    #{sale.id.slice(0, 8)}
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-900">
                    {new Date(sale.created_at).toLocaleString()}
                  </td>
                  <td className="px-8 py-6 font-extrabold text-green-600">
                    {formatCurrency(sale.total_amount)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-gray-400 hover:text-green-600 font-bold">Ver Detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

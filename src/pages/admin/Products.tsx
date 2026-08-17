import { useState } from 'react';
import { Package, Plus, Search, Filter, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { formatCurrency, cn } from '../../lib/utils';
import { useProductos } from '../../hooks/useProductos';

export default function Products() {
  const { products, loading, deleteProduct } = useProductos();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Inventario</h1>
          <p className="text-gray-500 font-medium">Gestiona el stock de tu petshop y farmacia.</p>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Producto
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-5 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-all">
          <Filter className="w-5 h-5" />
          Filtros
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                        <img 
                          src={product.image_url || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=100"} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">ID: {product.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "font-bold",
                        product.stock <= 5 ? "text-red-500" : "text-gray-900"
                      )}>
                        {product.stock} unidades
                      </span>
                      {product.stock <= 5 && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
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

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product, Category } from '../types';

export function useProductos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (product: Partial<Product>) => {
    try {
      const { error } = product.id 
        ? await supabase.from('products').update(product).eq('id', product.id)
        : await supabase.from('products').insert([product]);
      
      if (error) throw error;
      await fetchProducts();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      await fetchProducts();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, fetchProducts, saveProduct, deleteProduct };
}

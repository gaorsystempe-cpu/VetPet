export type Category = 'alimentos' | 'accesorios' | 'medicamentos' | 'higiene' | 'servicios';
export type AppointmentStatus = 'pendiente' | 'confirmada' | 'completada' | 'cancelada';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  icon: string;
  image_url?: string;
  badge?: string;
  popular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  stock: number;
  category: Category;
  image_url: string;
  badge?: string;
  isPromo?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Client {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface Pet {
  id: string;
  client_id: string;
  name: string;
  species: string;
  race: string;
  birth_date?: string;
}

export interface Appointment {
  id: string;
  pet_id: string;
  service_id: string;
  appointment_date: string;
  status: AppointmentStatus;
  notes?: string;
  // Joined fields
  pet?: Pet;
  service?: Service;
  client?: Client;
}

export interface Sale {
  id: string;
  client_id?: string;
  total_amount: number;
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}

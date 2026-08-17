-- SQL para configurar la base de datos en Supabase

-- Crear esquema petshop
CREATE SCHEMA IF NOT EXISTS petshop;

-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Servicios
CREATE TABLE IF NOT EXISTS petshop.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  icon TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS petshop.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL CHECK (category IN ('alimentos', 'accesorios', 'medicamentos')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS petshop.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Mascotas
CREATE TABLE IF NOT EXISTS petshop.pets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES petshop.clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  race TEXT,
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Citas
CREATE TABLE IF NOT EXISTS petshop.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pet_id UUID REFERENCES petshop.pets(id) ON DELETE CASCADE,
  service_id UUID REFERENCES petshop.services(id) ON DELETE SET NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'confirmada', 'completada', 'cancelada')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Ventas
CREATE TABLE IF NOT EXISTS petshop.sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES petshop.clients(id) ON DELETE SET NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Items de Venta
CREATE TABLE IF NOT EXISTS petshop.sale_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID REFERENCES petshop.sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES petshop.products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL
);

-- SEGURIDAD - Row Level Security (RLS)
-- NOTA: Se ha desactivado la verificación de auth.role() porque se está usando un login personalizado.
-- En producción, se recomienda usar Supabase Auth para mayor seguridad.

ALTER TABLE petshop.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE petshop.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE petshop.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE petshop.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE petshop.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE petshop.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE petshop.sale_items ENABLE ROW LEVEL SECURITY;

-- Políticas para Servicios
CREATE POLICY "Servicios lectura publica" ON petshop.services FOR SELECT USING (true);
CREATE POLICY "Servicios admin total" ON petshop.services FOR ALL USING (true);

-- Políticas para Productos
CREATE POLICY "Productos lectura publica" ON petshop.products FOR SELECT USING (true);
CREATE POLICY "Productos admin total" ON petshop.products FOR ALL USING (true);

-- Políticas para Clientes
CREATE POLICY "Clientes admin total" ON petshop.clients FOR ALL USING (true);

-- Políticas para Mascotas
CREATE POLICY "Mascotas admin total" ON petshop.pets FOR ALL USING (true);

-- Políticas para Citas
CREATE POLICY "Citas admin total" ON petshop.appointments FOR ALL USING (true);

-- Políticas para Ventas
CREATE POLICY "Ventas admin total" ON petshop.sales FOR ALL USING (true);

-- Políticas para Items de Venta
CREATE POLICY "SaleItems admin total" ON petshop.sale_items FOR ALL USING (true);

-- Datos de ejemplo
INSERT INTO petshop.services (name, description, price, duration_minutes) VALUES
('Baño y Corte', 'Servicio completo de estética para tu mascota.', 45.00, 60),
('Consulta Veterinaria', 'Revisión general por un médico veterinario.', 30.00, 30),
('Vacunación', 'Aplicación de vacunas según calendario.', 25.00, 15);

INSERT INTO petshop.products (name, description, price, stock, category) VALUES
('Pro Plan Adulto 3kg', 'Alimento premium para perros adultos.', 85.00, 10, 'alimentos'),
('Collar de Cuero', 'Collar resistente y elegante.', 15.00, 20, 'accesorios'),
('Antipulgas Bravecto', 'Protección por 3 meses.', 120.00, 15, 'medicamentos');

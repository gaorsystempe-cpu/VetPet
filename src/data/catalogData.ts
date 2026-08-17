import { Product, Service } from '../types';

// Services ordered by priority:
// 1. Consulta Médica & Vacunas
// 2. Desparasitación & Medicina preventiva
// 3. Baño & Spa Canino/Felino
// 4. Hospedaje & Hotel
// 5. Cirugía & Especialidades
export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-2',
    name: 'Consulta Médica General & Diagnóstico',
    description: 'Evaluación física completa por médicos veterinarios certificados, control de constantes, auscultación y plan de salud.',
    price: 35.0,
    duration_minutes: 30,
    icon: 'consulta',
    image_url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600',
    badge: '1° Prioridad',
    popular: true
  },
  {
    id: 'srv-3',
    name: 'Vacunación Séxtuple & Antirrábica',
    description: 'Inmunización con vacunas importadas de alta calidad, registro en cartilla oficial y chequeo médico previo.',
    price: 35.0,
    duration_minutes: 20,
    icon: 'vacunas',
    image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600',
    badge: 'Prevención'
  },
  {
    id: 'srv-4',
    name: 'Desparasitación Interna & Externa',
    description: 'Dosis personalizada según peso contra parásitos intestinales, pulgas, garrapatas y ácaros.',
    price: 25.0,
    duration_minutes: 15,
    icon: 'desparasitación',
    image_url: 'https://images.unsplash.com/photo-1597233545214-422f9d992102?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'srv-1',
    name: 'Baño & Spa Estético Completo',
    description: 'Agua temperada, shampoo hipoalergénico, corte higiénico, limpieza profunda de oídos, corte de uñas y perfumería pet.',
    price: 45.0,
    duration_minutes: 60,
    icon: 'baño',
    image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600',
    badge: 'Popular',
    popular: true
  },
  {
    id: 'srv-5',
    name: 'Hospedaje & Hotel Canino/Felino',
    description: 'Cuidado personalizado 24 horas, ambiente climatizado, paseos diarios, juegos y reportes diarios vía WhatsApp.',
    price: 45.0,
    duration_minutes: 1440,
    icon: 'hospedaje',
    image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600',
    badge: 'Hotel 5⭐'
  },
  {
    id: 'srv-6',
    name: 'Cirugías & Profilaxis Dental',
    description: 'Esterilizaciones seguras, limpieza dental con ultrasonido y cirugías menores en quirófano esterilizado.',
    price: 160.0,
    duration_minutes: 120,
    icon: 'cirugía',
    image_url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Farmacia & Medicamentos (Prioridad de Salud)
  {
    id: 'prod-2',
    name: 'Antipulgas Bravecto Perros (10 - 20 kg)',
    description: 'Comprimido masticable con protección continua durante 12 semanas contra pulgas y garrapatas.',
    price: 125.0,
    original_price: 145.0,
    stock: 18,
    category: 'medicamentos',
    image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=500',
    isBestSeller: true,
    isPromo: true
  },
  {
    id: 'prod-4',
    name: 'NexGard Spectra Antiparasitario Completo',
    description: 'Tableta masticable sabor a carne que elimina pulgas, garrapatas y parásitos intestinales en 1 toma.',
    price: 68.0,
    original_price: 78.0,
    stock: 20,
    category: 'medicamentos',
    image_url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=500',
    isBestSeller: true
  },
  {
    id: 'prod-8',
    name: 'Shampoo Medicado Clorhexidina 250ml',
    description: 'Tratamiento dermocosmético antiséptico para dermatitis bacteriana y micótica en perros y gatos.',
    price: 34.0,
    original_price: 42.0,
    stock: 22,
    category: 'medicamentos',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=500',
    isPromo: true
  },
  {
    id: 'prod-11',
    name: 'Gotas Oftálmicas Antibióticas Tobramicina',
    description: 'Solución estéril para conjuntivitis, infecciones oculares y lagrimeo excesivo.',
    price: 28.0,
    stock: 14,
    category: 'medicamentos',
    image_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=500'
  },

  // 2. Alimentos & Nutrición
  {
    id: 'prod-1',
    name: 'Pro Plan Adulto Razas Medianas 3kg',
    description: 'Nutrición avanzada con carne fresca de pollo y tecnología OptiHealth para defensas naturales.',
    price: 89.9,
    original_price: 105.0,
    stock: 24,
    category: 'alimentos',
    image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=500',
    isBestSeller: true,
    isPromo: true
  },
  {
    id: 'prod-5',
    name: 'Ricocan Adulto Carne y Cereales 15kg',
    description: 'Alimento balanceado con Omegas 3 y 6 para pelaje brillante y digestión saludable.',
    price: 119.0,
    original_price: 139.0,
    stock: 15,
    category: 'alimentos',
    image_url: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=500',
    isPromo: true
  },
  {
    id: 'prod-7',
    name: 'Royal Canin Mini Adult 2.5kg',
    description: 'Fórmula especializada para perros pequeños de 10 meses a 8 años con requerimientos energéticos altos.',
    price: 98.0,
    original_price: 115.0,
    stock: 16,
    category: 'alimentos',
    image_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=500',
    isPromo: true
  },
  {
    id: 'prod-12',
    name: 'Snacks Dentales Pedigree Dentastix 7 u.',
    description: 'Barras masticables que reducen la formación de sarro hasta en un 80% con uso diario.',
    price: 18.0,
    stock: 35,
    category: 'alimentos',
    image_url: 'https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&q=80&w=500'
  },

  // 3. Accesorios & Juguetes
  {
    id: 'prod-3',
    name: 'Arnés Ergonómico Antijaloneo Acolchado',
    description: 'Diseño reflectante de alta resistencia para paseos cómodos y seguros sin presión en el cuello.',
    price: 42.0,
    original_price: 55.0,
    stock: 30,
    category: 'accesorios',
    image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=500',
    isBestSeller: true
  },
  {
    id: 'prod-6',
    name: 'Cama Ortopédica Nube Antiestrés XL',
    description: 'Felpa ultrasuave con relleno viscoelástico para aliviar dolores articulares y relajar a tu mascota.',
    price: 79.0,
    original_price: 110.0,
    stock: 12,
    category: 'accesorios',
    image_url: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=500',
    isPromo: true
  },
  {
    id: 'prod-9',
    name: 'Juguete Kong Classic Dispensador de Snacks',
    description: 'Goma natural ultra duradera para estimulación mental y prevención de ansiedad por separación.',
    price: 48.0,
    stock: 25,
    category: 'accesorios',
    image_url: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'prod-10',
    name: 'Arena Sanitaria Aglomerante Gatos 10kg',
    description: 'Control máximo de olores con aroma a lavanda y fácil recogida de heces y orina.',
    price: 36.0,
    stock: 40,
    category: 'accesorios',
    image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500'
  }
];

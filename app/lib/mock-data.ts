export interface Supplier {
  id: string;
  name: string;
  avatar: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
}

export interface Listing {
  id: string;
  name: string;
  category: 'talent' | 'space' | 'media';
  subcategory: string;
  description: string;
  longDescription: string;
  price: number;
  priceUnit: 'hora' | 'evento' | 'día' | 'semana' | 'mes';
  rating: number;
  reviewCount: number;
  images: string[];
  location: {
    address: string;
    city: string;
    sector: string;
    lat: number;
    lng: number;
  };
  supplier: Supplier;
  verified: boolean;
  tags: string[];
  availability: string[];
}

const BASE = 'https://images.unsplash.com/photo';

export const listings: Listing[] = [
  // ── TALENTOS (10) ────────────────────────────────────────────────────────
  {
    id: 'talent-001',
    name: 'DJ Miguel Santos',
    category: 'talent',
    subcategory: 'DJ',
    description: 'DJ profesional con más de 10 años de experiencia en eventos corporativos y bodas.',
    longDescription:
      'DJ Miguel Santos es el DJ de referencia en Santo Domingo. Con más de 10 años mezclando música en los mejores eventos de la capital, ofrece una selección musical personalizada que va desde salsa y merengue hasta reggaetón, electrónica y música internacional. Equipos de sonido profesional incluidos.',
    price: 15000,
    priceUnit: 'evento',
    rating: 4.9,
    reviewCount: 87,
    images: [
      `${BASE}-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop`,
      `${BASE}-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop`,
      `${BASE}-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. Winston Churchill 55', city: 'Santo Domingo', sector: 'Naco', lat: 18.48, lng: -69.915 },
    supplier: { id: 's-001', name: 'Miguel Santos', avatar: `${BASE}-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face`, memberSince: '2021', rating: 4.9, reviewCount: 87 },
    verified: true,
    tags: ['DJ', 'Bodas', 'Corporativo', 'Electrónica'],
    availability: ['2024-02-10', '2024-02-15', '2024-02-20']
  },
  {
    id: 'talent-002',
    name: 'Carlos Fotografías',
    category: 'talent',
    subcategory: 'Fotógrafo',
    description: 'Fotógrafo profesional especializado en bodas, quinceañeras y eventos corporativos.',
    longDescription:
      'Carlos lleva 8 años capturando los momentos más especiales de sus clientes. Su estilo combina fotografía documental con retratos artísticos. Entrega galería editada en 72 horas, álbum físico opcional y todos los derechos de uso para el cliente.',
    price: 8500,
    priceUnit: 'evento',
    rating: 4.8,
    reviewCount: 124,
    images: [
      `${BASE}-1542038374-5b4c97d97b69?w=800&h=600&fit=crop`,
      `${BASE}-1471341971476-ae15ff5dd4ea?w=800&h=600&fit=crop`,
      `${BASE}-1530103862676-de8c9debad1d?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle 5ta esq. Independencia', city: 'Santo Domingo', sector: 'Piantini', lat: 18.4712, lng: -69.925 },
    supplier: { id: 's-002', name: 'Carlos Medina', avatar: `${BASE}-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face`, memberSince: '2020', rating: 4.8, reviewCount: 124 },
    verified: true,
    tags: ['Fotografía', 'Bodas', 'Quinceañeras', 'Corporativo'],
    availability: ['2024-02-12', '2024-02-18', '2024-02-25']
  },
  {
    id: 'talent-003',
    name: 'Chef Marco Rosario',
    category: 'talent',
    subcategory: 'Chef Privado',
    description: 'Chef ejecutivo para cenas privadas, catering de eventos y clases de cocina.',
    longDescription:
      'Marco Rosario es chef con formación en España y 12 años de experiencia en restaurantes de alta cocina. Ofrece menús personalizados de cocina dominicana contemporánea, mediterránea y fusión. Puede atender desde 10 hasta 200 personas. Incluye mise en place, servicio y limpieza.',
    price: 12000,
    priceUnit: 'evento',
    rating: 4.7,
    reviewCount: 56,
    images: [
      `${BASE}-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop`,
      `${BASE}-1551218808-f8b0d7e3e3c7?w=800&h=600&fit=crop`,
      `${BASE}-1414235077428-338989a2e8c0?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. Abraham Lincoln 205', city: 'Santo Domingo', sector: 'Gazcue', lat: 18.474, lng: -69.945 },
    supplier: { id: 's-003', name: 'Marco Rosario', avatar: `${BASE}-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`, memberSince: '2022', rating: 4.7, reviewCount: 56 },
    verified: true,
    tags: ['Chef', 'Catering', 'Cenas Privadas', 'Alta Cocina'],
    availability: ['2024-02-11', '2024-02-14', '2024-02-21']
  },
  {
    id: 'talent-004',
    name: 'Animador Juanito',
    category: 'talent',
    subcategory: 'Animador Infantil',
    description: 'Animador para fiestas infantiles, cumpleaños y eventos familiares.',
    longDescription:
      'Juanito anima cumpleaños y eventos infantiles con shows de magia, payasería y actividades interactivas. Incluye decoración temática, globoflexia, cara pintada y sorteos. Más de 500 eventos realizados con 100% de satisfacción.',
    price: 4500,
    priceUnit: 'evento',
    rating: 5.0,
    reviewCount: 203,
    images: [
      `${BASE}-1596422846543-75c6fc197f07?w=800&h=600&fit=crop`,
      `${BASE}-1530103862676-de8c9debad1d?w=800&h=600&fit=crop`,
      `${BASE}-1544378730-15ef5c07a3bd?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle Hadith 18', city: 'Santo Domingo', sector: 'Arroyo Hondo', lat: 18.5, lng: -69.96 },
    supplier: { id: 's-004', name: 'Juan Peralta', avatar: `${BASE}-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face`, memberSince: '2019', rating: 5.0, reviewCount: 203 },
    verified: true,
    tags: ['Animación', 'Infantil', 'Magia', 'Cumpleaños'],
    availability: ['2024-02-10', '2024-02-17', '2024-02-24']
  },
  {
    id: 'talent-005',
    name: 'Banda Los Compadres',
    category: 'talent',
    subcategory: 'Banda en Vivo',
    description: 'Banda de merengue y bachata para bodas, quinceañeras y eventos corporativos.',
    longDescription:
      'Los Compadres es una agrupación de 8 músicos con más de 15 años en escena. Interpretan merengue típico, bachata romántica, salsa y ritmos internacionales. Cuentan con sonido profesional incluido y pueden adaptar su setlist al tipo de evento.',
    price: 35000,
    priceUnit: 'evento',
    rating: 4.9,
    reviewCount: 67,
    images: [
      `${BASE}-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop`,
      `${BASE}-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop`,
      `${BASE}-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. George Washington 102', city: 'Santo Domingo', sector: 'Bella Vista', lat: 18.465, lng: -69.93 },
    supplier: { id: 's-005', name: 'Agencia Los Compadres', avatar: `${BASE}-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face`, memberSince: '2018', rating: 4.9, reviewCount: 67 },
    verified: true,
    tags: ['Merengue', 'Bachata', 'Banda', 'Bodas'],
    availability: ['2024-02-10', '2024-02-17', '2024-03-01']
  },
  {
    id: 'talent-006',
    name: 'Lorena Flores — Cantante',
    category: 'talent',
    subcategory: 'Cantante',
    description: 'Cantante solista para ceremonias, cocktails y cenas de gala.',
    longDescription:
      'Lorena tiene una voz privilegiada de soprano ligero con repertorio de baladas, boleros, pop internacional y música sacra para ceremonias religiosas. Trabaja con playback profesional o piano en vivo. Ideal para bodas civiles y religiosas, graduaciones y eventos de lujo.',
    price: 9000,
    priceUnit: 'evento',
    rating: 4.8,
    reviewCount: 41,
    images: [
      `${BASE}-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop`,
      `${BASE}-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop`,
      `${BASE}-1516280440614-37939bbacd81?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle Las Mercedes 45', city: 'Santo Domingo', sector: 'Mirador Sur', lat: 18.458, lng: -69.94 },
    supplier: { id: 's-006', name: 'Lorena Flores', avatar: `${BASE}-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face`, memberSince: '2021', rating: 4.8, reviewCount: 41 },
    verified: false,
    tags: ['Canto', 'Bodas', 'Ceremonias', 'Gala'],
    availability: ['2024-02-13', '2024-02-16', '2024-02-22']
  },
  {
    id: 'talent-007',
    name: 'Roberto Mago Show',
    category: 'talent',
    subcategory: 'Mago y Entretenedor',
    description: 'Espectáculos de magia e ilusionismo para empresas y eventos privados.',
    longDescription:
      'Roberto ha presentado su show en más de 300 eventos corporativos y privados. Sus espectáculos combinan mentalismo, ilusionismo y comedia, con una duración de 45 a 90 minutos. Adaptable a cualquier tipo de audiencia, desde niños hasta ejecutivos.',
    price: 7500,
    priceUnit: 'evento',
    rating: 4.6,
    reviewCount: 38,
    images: [
      `${BASE}-1576502200916-3808e07386a5?w=800&h=600&fit=crop`,
      `${BASE}-1544378730-15ef5c07a3bd?w=800&h=600&fit=crop`,
      `${BASE}-1530103862676-de8c9debad1d?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle El Conde 78', city: 'Santo Domingo', sector: 'Ciudad Nueva', lat: 18.478, lng: -69.895 },
    supplier: { id: 's-007', name: 'Roberto Guzmán', avatar: `${BASE}-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face`, memberSince: '2020', rating: 4.6, reviewCount: 38 },
    verified: true,
    tags: ['Magia', 'Mentalismo', 'Entretenimiento', 'Corporativo'],
    availability: ['2024-02-11', '2024-02-15', '2024-02-19']
  },
  {
    id: 'talent-008',
    name: 'Fitness con Ana',
    category: 'talent',
    subcategory: 'Instructora de Fitness',
    description: 'Clases de fitness, yoga y zumba para empresas, hoteles y eventos.',
    longDescription:
      'Ana ofrece sesiones grupales e individuales de fitness, yoga, pilates y zumba. Certificada internacionalmente en yoga y nutrición. Ideal para wellness days corporativos, retiros de bienestar y coaching de vida saludable.',
    price: 2500,
    priceUnit: 'hora',
    rating: 4.9,
    reviewCount: 92,
    images: [
      `${BASE}-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop`,
      `${BASE}-1518611012118-696072aa579a?w=800&h=600&fit=crop`,
      `${BASE}-1544367654-20fc35db7673?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. Núñez de Cáceres 321', city: 'Santo Domingo', sector: 'Los Prados', lat: 18.495, lng: -69.945 },
    supplier: { id: 's-008', name: 'Ana Rodríguez', avatar: `${BASE}-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face`, memberSince: '2022', rating: 4.9, reviewCount: 92 },
    verified: true,
    tags: ['Fitness', 'Yoga', 'Zumba', 'Wellness'],
    availability: ['2024-02-10', '2024-02-11', '2024-02-12']
  },
  {
    id: 'talent-009',
    name: 'Alejandro Films',
    category: 'talent',
    subcategory: 'Videógrafo',
    description: 'Producción audiovisual profesional para bodas, eventos y marcas.',
    longDescription:
      'Alejandro Films es un estudio boutique de videografía con equipo cinema 4K, drones y grabación subacuática. Ofrece paquetes para bodas con película de 10 minutos y highlights de 3 minutos, así como producción de contenido para redes sociales y comerciales de TV.',
    price: 18000,
    priceUnit: 'evento',
    rating: 4.8,
    reviewCount: 74,
    images: [
      `${BASE}-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop`,
      `${BASE}-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop`,
      `${BASE}-1542038374-5b4c97d97b69?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle Fantino Falco 9', city: 'Santo Domingo', sector: 'Piantini', lat: 18.472, lng: -69.92 },
    supplier: { id: 's-009', name: 'Alejandro Tejada', avatar: `${BASE}-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face`, memberSince: '2021', rating: 4.8, reviewCount: 74 },
    verified: true,
    tags: ['Video', 'Bodas', 'Drone', '4K', 'Comerciales'],
    availability: ['2024-02-12', '2024-02-19', '2024-02-26']
  },
  {
    id: 'talent-010',
    name: 'DJ María — Electrónica',
    category: 'talent',
    subcategory: 'DJ Electrónica',
    description: 'DJ especializada en música electrónica, house y reggaetón para clubs y eventos.',
    longDescription:
      'María es una de las DJs más reconocidas de la escena electrónica dominicana. Ha tocado en los principales clubs de SD y el Caribe. Ofrece sets desde 2 hasta 6 horas. Equipo incluido con sistema de iluminación LED.',
    price: 12000,
    priceUnit: 'evento',
    rating: 4.7,
    reviewCount: 58,
    images: [
      `${BASE}-1578022761797-b8636ac1773c?w=800&h=600&fit=crop`,
      `${BASE}-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop`,
      `${BASE}-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. Sarasota 35', city: 'Santo Domingo', sector: 'Naco', lat: 18.481, lng: -69.91 },
    supplier: { id: 's-010', name: 'María Contreras', avatar: `${BASE}-1508214235872-45b4cd4fa429?w=100&h=100&fit=crop&crop=face`, memberSince: '2022', rating: 4.7, reviewCount: 58 },
    verified: true,
    tags: ['DJ', 'Electrónica', 'House', 'Reggaetón', 'Club'],
    availability: ['2024-02-10', '2024-02-16', '2024-02-23']
  },

  // ── ESPACIOS (7) ──────────────────────────────────────────────────────────
  {
    id: 'space-001',
    name: 'Salón El Caribe',
    category: 'space',
    subcategory: 'Salón de Eventos',
    description: 'Elegante salón de eventos para bodas, quinceañeras y reuniones corporativas de hasta 300 personas.',
    longDescription:
      'El Salón El Caribe cuenta con 600 m² de área climatizada, cocina profesional, pista de baile de madera, iluminación LED programable y sistema de sonido. Ubicado en el corazón de Gazcue, ofrece catering propio o permite catering externo. Estacionamiento para 80 vehículos.',
    price: 45000,
    priceUnit: 'evento',
    rating: 4.7,
    reviewCount: 142,
    images: [
      `${BASE}-1519167758481-83f550bb49b3?w=800&h=600&fit=crop`,
      `${BASE}-1464366400600-ac2779c6b5e4?w=800&h=600&fit=crop`,
      `${BASE}-1505236858219-8359eb29e329?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. Independencia 501', city: 'Santo Domingo', sector: 'Gazcue', lat: 18.476, lng: -69.942 },
    supplier: { id: 's-011', name: 'Eventos El Caribe SRL', avatar: `${BASE}-1560179406-1a9ef6fc21e8?w=100&h=100&fit=crop`, memberSince: '2018', rating: 4.7, reviewCount: 142 },
    verified: true,
    tags: ['Salón', 'Bodas', 'Corporativo', 'Quinceañeras', 'Capacidad 300'],
    availability: ['2024-02-10', '2024-02-17', '2024-02-24']
  },
  {
    id: 'space-002',
    name: 'Rooftop 57 — Azotea',
    category: 'space',
    subcategory: 'Rooftop',
    description: 'Terraza panorámica en el piso 12 con vista al mar. Ideal para cocktails y lanzamientos.',
    longDescription:
      'El Rooftop 57 ofrece una de las mejores vistas del Malecón de Santo Domingo. Capacidad para 150 personas en cocktail, 80 sentados en cenas. Incluye bar fijo, mesas altas, iluminación ambiental y acceso exclusivo al piso. Disponible para eventos privados de 4pm a 2am.',
    price: 25000,
    priceUnit: 'evento',
    rating: 4.9,
    reviewCount: 88,
    images: [
      `${BASE}-1464146072230-91cabc968266?w=800&h=600&fit=crop`,
      `${BASE}-1519167758481-83f550bb49b3?w=800&h=600&fit=crop`,
      `${BASE}-1505236858219-8359eb29e329?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. George Washington 57, Piso 12', city: 'Santo Domingo', sector: 'Centro', lat: 18.4861, lng: -69.9312 },
    supplier: { id: 's-012', name: 'Rooftop 57 Management', avatar: `${BASE}-1549880338-ad6a621e0e4a?w=100&h=100&fit=crop`, memberSince: '2020', rating: 4.9, reviewCount: 88 },
    verified: true,
    tags: ['Rooftop', 'Vista al Mar', 'Cocktail', 'Lanzamiento', 'Exclusivo'],
    availability: ['2024-02-10', '2024-02-14', '2024-02-21']
  },
  {
    id: 'space-003',
    name: 'Estudio Lumina',
    category: 'space',
    subcategory: 'Estudio Fotográfico',
    description: 'Estudio fotográfico profesional con ciclorama, fondos y equipos de iluminación.',
    longDescription:
      'Estudio Lumina cuenta con 3 sets fotográficos, ciclorama blanco de 6m, fondos de papel y tela en 20 colores, equipo de iluminación Profoto, y sala de maquillaje y vestuario. Disponible por horas, incluye asistente de set. Ideal para sesiones de moda, publicidad y contenido digital.',
    price: 3500,
    priceUnit: 'hora',
    rating: 4.8,
    reviewCount: 176,
    images: [
      `${BASE}-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop`,
      `${BASE}-1542038374-5b4c97d97b69?w=800&h=600&fit=crop`,
      `${BASE}-1471341971476-ae15ff5dd4ea?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle Seminario 22', city: 'Santo Domingo', sector: 'Naco', lat: 18.483, lng: -69.918 },
    supplier: { id: 's-013', name: 'Estudio Lumina RD', avatar: `${BASE}-1560179406-1a9ef6fc21e8?w=100&h=100&fit=crop`, memberSince: '2019', rating: 4.8, reviewCount: 176 },
    verified: true,
    tags: ['Estudio', 'Fotografía', 'Moda', 'Publicidad', 'Ciclorama'],
    availability: ['2024-02-10', '2024-02-11', '2024-02-12']
  },
  {
    id: 'space-004',
    name: 'Cancha Deportiva Norte',
    category: 'space',
    subcategory: 'Cancha Deportiva',
    description: 'Cancha multideportiva techada con gradas, camerinos y tablero electrónico.',
    longDescription:
      'Instalación deportiva de primer nivel con canchas de baloncesto y voleibol. Gradas con capacidad para 200 espectadores, camerinos con duchas, tablero electrónico y sistemas de sonido. Disponible para torneos, ligas empresariales y eventos deportivos.',
    price: 5000,
    priceUnit: 'día',
    rating: 4.5,
    reviewCount: 63,
    images: [
      `${BASE}-1546519638-68e109498ffc?w=800&h=600&fit=crop`,
      `${BASE}-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop`,
      `${BASE}-1544378730-15ef5c07a3bd?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle Ortega y Gasset 15', city: 'Santo Domingo', sector: 'Arroyo Hondo', lat: 18.505, lng: -69.955 },
    supplier: { id: 's-014', name: 'Deportivo Norte SRL', avatar: `${BASE}-1560179406-1a9ef6fc21e8?w=100&h=100&fit=crop`, memberSince: '2021', rating: 4.5, reviewCount: 63 },
    verified: false,
    tags: ['Cancha', 'Baloncesto', 'Deportes', 'Torneo'],
    availability: ['2024-02-10', '2024-02-17', '2024-02-24']
  },
  {
    id: 'space-005',
    name: 'Villa Mirador Privada',
    category: 'space',
    subcategory: 'Villa para Eventos',
    description: 'Villa privada con piscina y jardín para eventos exclusivos de hasta 80 personas.',
    longDescription:
      'Villa de lujo con jardín de 800 m², piscina climatizada, bar exterior, área BBQ y terraza panorámica. Mobiliario elegante incluido, cocina completa, y espacio para carpa opcional. Ideal para cumpleaños íntimos, retiros ejecutivos y celebraciones de alto nivel.',
    price: 30000,
    priceUnit: 'día',
    rating: 4.9,
    reviewCount: 34,
    images: [
      `${BASE}-1564013799919-ab600027ffc6?w=800&h=600&fit=crop`,
      `${BASE}-1464146072230-91cabc968266?w=800&h=600&fit=crop`,
      `${BASE}-1505236858219-8359eb29e329?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle El Vergel 4', city: 'Santo Domingo', sector: 'Mirador Sur', lat: 18.46, lng: -69.935 },
    supplier: { id: 's-015', name: 'Villas Premium RD', avatar: `${BASE}-1549880338-ad6a621e0e4a?w=100&h=100&fit=crop`, memberSince: '2020', rating: 4.9, reviewCount: 34 },
    verified: true,
    tags: ['Villa', 'Piscina', 'Exclusivo', 'Jardín', 'Lujo'],
    availability: ['2024-02-16', '2024-02-23', '2024-03-01']
  },
  {
    id: 'space-006',
    name: 'Sala de Juntas Premium',
    category: 'space',
    subcategory: 'Sala Corporativa',
    description: 'Sala de conferencias equipada con tecnología AV para reuniones y capacitaciones.',
    longDescription:
      'Sala corporativa con capacidad para 30 personas, pantalla LED 85", sistema de videoconferencia 4K, pizarra digital, conexión de fibra óptica 1Gbps, catering opcional y recepcionista incluida. Disponible medio día o día completo.',
    price: 8000,
    priceUnit: 'día',
    rating: 4.6,
    reviewCount: 97,
    images: [
      `${BASE}-1497366216548-37526070297c?w=800&h=600&fit=crop`,
      `${BASE}-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop`,
      `${BASE}-1519167758481-83f550bb49b3?w=800&h=600&fit=crop`
    ],
    location: { address: 'Torre Piantini, Av. 27 de Febrero 201', city: 'Santo Domingo', sector: 'Piantini', lat: 18.47, lng: -69.926 },
    supplier: { id: 's-016', name: 'BizSpace RD', avatar: `${BASE}-1560179406-1a9ef6fc21e8?w=100&h=100&fit=crop`, memberSince: '2021', rating: 4.6, reviewCount: 97 },
    verified: true,
    tags: ['Sala', 'Corporativo', 'Conferencias', 'Coworking'],
    availability: ['2024-02-10', '2024-02-11', '2024-02-12']
  },
  {
    id: 'space-007',
    name: 'Terraza Garden Events',
    category: 'space',
    subcategory: 'Jardín para Eventos',
    description: 'Jardín natural y terraza con vista al jardín para bodas al aire libre y eventos temáticos.',
    longDescription:
      'Espacio verde de 1200 m² con zona pavimentada, carpa disponible, barra de bebidas y acceso a cocina industrial. Rodeado de vegetación tropical, ideal para bodas bohemias, celebraciones temáticas y fotografías en exteriores.',
    price: 20000,
    priceUnit: 'evento',
    rating: 4.8,
    reviewCount: 51,
    images: [
      `${BASE}-1505236858219-8359eb29e329?w=800&h=600&fit=crop`,
      `${BASE}-1464366400600-ac2779c6b5e4?w=800&h=600&fit=crop`,
      `${BASE}-1519167758481-83f550bb49b3?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle Los Ríos 12', city: 'Santo Domingo', sector: 'Los Cacicazgos', lat: 18.51, lng: -69.9 },
    supplier: { id: 's-017', name: 'Garden Events RD', avatar: `${BASE}-1549880338-ad6a621e0e4a?w=100&h=100&fit=crop`, memberSince: '2020', rating: 4.8, reviewCount: 51 },
    verified: true,
    tags: ['Jardín', 'Al Aire Libre', 'Bodas', 'Bohemio'],
    availability: ['2024-02-11', '2024-02-18', '2024-02-25']
  },

  // ── MEDIA (5) ────────────────────────────────────────────────────────────
  {
    id: 'media-001',
    name: 'Valla Digital Autopista Duarte km 18',
    category: 'media',
    subcategory: 'Valla Publicitaria',
    description: 'Valla LED digital de alto impacto en la autopista Duarte, 100,000+ vehículos diarios.',
    longDescription:
      'Valla digital de 12x6 metros ubicada en el kilómetro 18 de la Autopista Duarte, con más de 100,000 vehículos de impresión diarios. Pantalla full HD con rotación de anuncios cada 8 segundos. Incluye diseño gráfico básico y reporte de impresiones.',
    price: 85000,
    priceUnit: 'semana',
    rating: 4.8,
    reviewCount: 43,
    images: [
      `${BASE}-1486325212027-8081e485255e?w=800&h=600&fit=crop`,
      `${BASE}-1504711434969-e33886168f5c?w=800&h=600&fit=crop`,
      `${BASE}-1486325212027-8081e485255e?w=800&h=600&fit=crop`
    ],
    location: { address: 'Autopista Duarte Km 18', city: 'Santo Domingo', sector: 'Villa Mella', lat: 18.49, lng: -69.88 },
    supplier: { id: 's-018', name: 'OOH Media RD', avatar: `${BASE}-1560179406-1a9ef6fc21e8?w=100&h=100&fit=crop`, memberSince: '2018', rating: 4.8, reviewCount: 43 },
    verified: true,
    tags: ['Valla', 'Digital', 'OOH', 'Alto Impacto', 'Autopista'],
    availability: ['2024-02-10', '2024-02-17', '2024-02-24']
  },
  {
    id: 'media-002',
    name: 'El Digital RD — Pauta Web',
    category: 'media',
    subcategory: 'Periódico Digital',
    description: 'Pauta publicitaria en el periódico digital líder en RD. 500,000 visitas mensuales.',
    longDescription:
      'El Digital RD es uno de los portales de noticias más visitados de República Dominicana con 500,000 visitas mensuales y 150,000 seguidores en redes sociales. Ofrece banners, artículos patrocinados, menciones en redes sociales y newsletter a 45,000 suscriptores.',
    price: 25000,
    priceUnit: 'semana',
    rating: 4.5,
    reviewCount: 28,
    images: [
      `${BASE}-1504711434969-e33886168f5c?w=800&h=600&fit=crop`,
      `${BASE}-1486325212027-8081e485255e?w=800&h=600&fit=crop`,
      `${BASE}-1590602847861-f357a9332bbc?w=800&h=600&fit=crop`
    ],
    location: { address: 'Calle Las Damas 5', city: 'Santo Domingo', sector: 'Zona Colonial', lat: 18.4726, lng: -69.8858 },
    supplier: { id: 's-019', name: 'El Digital RD', avatar: `${BASE}-1560179406-1a9ef6fc21e8?w=100&h=100&fit=crop`, memberSince: '2019', rating: 4.5, reviewCount: 28 },
    verified: true,
    tags: ['Digital', 'Banner', 'Contenido Patrocinado', 'Newsletter'],
    availability: ['2024-02-10', '2024-02-17', '2024-02-24']
  },
  {
    id: 'media-003',
    name: 'Podcast "El Pulso RD"',
    category: 'media',
    subcategory: 'Podcast',
    description: 'Menciones y entrevistas en el podcast líder de negocios y tecnología en RD.',
    longDescription:
      '"El Pulso RD" es el podcast de negocios y tecnología número 1 de República Dominicana con 80,000 escuchas mensuales y presencia en Spotify, Apple Podcasts y YouTube. Ofrece menciones pre-roll, entrevistas de 15-30 minutos y contenido patrocinado.',
    price: 15000,
    priceUnit: 'mes',
    rating: 4.9,
    reviewCount: 19,
    images: [
      `${BASE}-1590602847861-f357a9332bbc?w=800&h=600&fit=crop`,
      `${BASE}-1478737270239-2f02b77fc618?w=800&h=600&fit=crop`,
      `${BASE}-1504711434969-e33886168f5c?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. Tiradentes 45', city: 'Santo Domingo', sector: 'Naco', lat: 18.482, lng: -69.913 },
    supplier: { id: 's-020', name: 'El Pulso Media', avatar: `${BASE}-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face`, memberSince: '2021', rating: 4.9, reviewCount: 19 },
    verified: true,
    tags: ['Podcast', 'Negocios', 'Tecnología', 'Spotify', 'YouTube'],
    availability: ['2024-02-10', '2024-03-01', '2024-04-01']
  },
  {
    id: 'media-004',
    name: 'Radio HIT 93.3 FM',
    category: 'media',
    subcategory: 'Radio',
    description: 'Pauta radial en la emisora líder del Caribe para el segmento joven 18-35 años.',
    longDescription:
      'HIT 93.3 FM es la emisora líder en Santo Domingo para el segmento de 18-35 años con más de 300,000 oyentes diarios. Ofrece cuñas de 30 segundos, menciones en vivo, patrocinio de segmentos y activaciones en exteriores con los animadores.',
    price: 45000,
    priceUnit: 'semana',
    rating: 4.6,
    reviewCount: 37,
    images: [
      `${BASE}-1478737270239-2f02b77fc618?w=800&h=600&fit=crop`,
      `${BASE}-1590602847861-f357a9332bbc?w=800&h=600&fit=crop`,
      `${BASE}-1504711434969-e33886168f5c?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. Abraham Lincoln 1001', city: 'Santo Domingo', sector: 'Centro', lat: 18.487, lng: -69.928 },
    supplier: { id: 's-021', name: 'HIT Media Group', avatar: `${BASE}-1560179406-1a9ef6fc21e8?w=100&h=100&fit=crop`, memberSince: '2018', rating: 4.6, reviewCount: 37 },
    verified: true,
    tags: ['Radio', 'FM', 'Cuña', 'Pauta', 'Joven'],
    availability: ['2024-02-10', '2024-02-17', '2024-02-24']
  },
  {
    id: 'media-005',
    name: 'Influencer @mariadigital.rd',
    category: 'media',
    subcategory: 'Influencer',
    description: 'Contenido patrocinado para Instagram y TikTok con 280K seguidores en RD.',
    longDescription:
      'María es una de las principales influencers de República Dominicana con 280K seguidores en Instagram y 150K en TikTok. Especializada en lifestyle, moda, gastronomía y eventos. Ofrece posts, stories, reels y TikToks patrocinados con tasas de engagement superiores al 6%.',
    price: 18000,
    priceUnit: 'mes',
    rating: 4.8,
    reviewCount: 24,
    images: [
      `${BASE}-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop`,
      `${BASE}-1504711434969-e33886168f5c?w=800&h=600&fit=crop`,
      `${BASE}-1486325212027-8081e485255e?w=800&h=600&fit=crop`
    ],
    location: { address: 'Av. Anacaona 25', city: 'Santo Domingo', sector: 'Bella Vista', lat: 18.466, lng: -69.927 },
    supplier: { id: 's-022', name: 'María Pérez', avatar: `${BASE}-1531746020798-e6853928e6a0?w=100&h=100&fit=crop&crop=face`, memberSince: '2022', rating: 4.8, reviewCount: 24 },
    verified: true,
    tags: ['Instagram', 'TikTok', 'Influencer', 'Lifestyle', 'Moda'],
    availability: ['2024-02-10', '2024-03-01', '2024-04-01']
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  talent: 'Talento',
  space: 'Espacio',
  media: 'Media'
};

export const CATEGORY_COLORS: Record<string, string> = {
  talent: '#7C3AED',
  space: '#F97316',
  media: '#3B82F6'
};

export const CATEGORY_BADGE: Record<string, string> = {
  talent: 'bg-purple-100 text-purple-700',
  space: 'bg-orange-100 text-orange-700',
  media: 'bg-blue-100 text-blue-700'
};

export const CATEGORY_EMOJI: Record<string, string> = {
  talent: '🎭',
  space: '🏢',
  media: '📣'
};

// Mock bookings for supplier dashboard / orders
export interface Booking {
  id: string;
  listingId: string;
  listingName: string;
  listingImage: string;
  clientName: string;
  clientAvatar: string;
  date: string;
  time?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  notes?: string;
}

export const mockBookings: Booking[] = [
  { id: 'b-001', listingId: 'talent-001', listingName: 'DJ Miguel Santos', listingImage: `${BASE}-1516450360452-9312f5e86fc7?w=200&h=150&fit=crop`, clientName: 'Ana García', clientAvatar: `${BASE}-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face`, date: '2024-02-15', time: '20:00', status: 'confirmed', totalAmount: 15000, notes: 'Boda en Salón El Caribe' },
  { id: 'b-002', listingId: 'space-001', listingName: 'Salón El Caribe', listingImage: `${BASE}-1519167758481-83f550bb49b3?w=200&h=150&fit=crop`, clientName: 'Pedro Méndez', clientAvatar: `${BASE}-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face`, date: '2024-02-20', time: '18:00', status: 'pending', totalAmount: 45000 },
  { id: 'b-003', listingId: 'talent-002', listingName: 'Carlos Fotografías', listingImage: `${BASE}-1542038374-5b4c97d97b69?w=200&h=150&fit=crop`, clientName: 'Luisa Torres', clientAvatar: `${BASE}-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face`, date: '2024-01-28', time: '10:00', status: 'completed', totalAmount: 8500 },
  { id: 'b-004', listingId: 'talent-005', listingName: 'Banda Los Compadres', listingImage: `${BASE}-1598488035139-bdbb2231ce04?w=200&h=150&fit=crop`, clientName: 'Roberto Jiménez', clientAvatar: `${BASE}-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face`, date: '2024-02-10', time: '21:00', status: 'cancelled', totalAmount: 35000, notes: 'Canceló por lluvia' },
  { id: 'b-005', listingId: 'space-002', listingName: 'Rooftop 57', listingImage: `${BASE}-1464146072230-91cabc968266?w=200&h=150&fit=crop`, clientName: 'Carla Reyes', clientAvatar: `${BASE}-1508214235872-45b4cd4fa429?w=60&h=60&fit=crop&crop=face`, date: '2024-02-25', time: '19:00', status: 'confirmed', totalAmount: 25000 },
  { id: 'b-006', listingId: 'talent-008', listingName: 'Fitness con Ana', listingImage: `${BASE}-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop`, clientName: 'Empresa Tech RD', clientAvatar: `${BASE}-1560179406-1a9ef6fc21e8?w=60&h=60&fit=crop`, date: '2024-01-15', time: '09:00', status: 'completed', totalAmount: 12500 }
];

export const weeklyRevenue = [
  { day: 'Lun', amount: 15000 },
  { day: 'Mar', amount: 8500 },
  { day: 'Mié', amount: 22000 },
  { day: 'Jue', amount: 5000 },
  { day: 'Vie', amount: 35000 },
  { day: 'Sáb', amount: 45000 },
  { day: 'Dom', amount: 12000 }
];

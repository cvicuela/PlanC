-- ============================================================
-- TalentHub — Seed Data
-- 15 listings con coordenadas reales de Santo Domingo, RD
-- ============================================================
-- NOTA: Reemplaza los UUIDs de supplier_id con IDs reales de
-- usuarios creados previamente en auth.users / profiles.
-- Para pruebas locales puedes usar los UUIDs hardcodeados abajo
-- después de insertar los perfiles de prueba.
-- ============================================================

-- ── Demo supplier profiles ────────────────────────────────────────────────────
INSERT INTO public.profiles (id, name, avatar_url, role, phone, location_address, created_at)
VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Miguel Santos',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    'supplier',
    '+1-809-555-0101',
    'Av. Winston Churchill 55, Naco, Santo Domingo',
    NOW() - INTERVAL '6 months'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Carlos Medina',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    'supplier',
    '+1-809-555-0202',
    'Calle 5ta esq. Independencia, Piantini, Santo Domingo',
    NOW() - INTERVAL '8 months'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'Eventos El Caribe SRL',
    'https://images.unsplash.com/photo-1560179406-1a9ef6fc21e8?w=100&h=100&fit=crop',
    'supplier',
    '+1-809-555-0303',
    'Av. Independencia 501, Gazcue, Santo Domingo',
    NOW() - INTERVAL '1 year'
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'OOH Media RD',
    'https://images.unsplash.com/photo-1549880338-ad6a621e0e4a?w=100&h=100&fit=crop',
    'supplier',
    '+1-809-555-0404',
    'Av. 27 de Febrero 88, Piantini, Santo Domingo',
    NOW() - INTERVAL '2 years'
  )
ON CONFLICT (id) DO NOTHING;

-- ── Listings ──────────────────────────────────────────────────────────────────

INSERT INTO public.listings
  (id, supplier_id, category, subcategory, title, description, long_description,
   price, price_unit, images, location_lat, location_lng, location_address,
   location_sector, rating, reviews_count, is_active, verified, tags)
VALUES

-- 1. DJ Miguel Santos
(
  gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'talent', 'DJ',
  'DJ Miguel Santos — Eventos & Bodas',
  'DJ profesional con más de 10 años de experiencia en eventos corporativos y bodas.',
  'DJ Miguel Santos es el DJ de referencia en Santo Domingo. Con más de 10 años mezclando música en los mejores eventos de la capital, ofrece una selección musical personalizada que va desde salsa y merengue hasta reggaetón, electrónica y música internacional. Equipos de sonido profesional incluidos.',
  15000, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
  ],
  18.4800, -69.9150,
  'Av. Winston Churchill 55, Naco', 'Naco',
  4.9, 87, true, true,
  ARRAY['DJ', 'Bodas', 'Corporativo', 'Electrónica', 'Merengue']
),

-- 2. Fotógrafo Carlos
(
  gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'talent', 'Fotógrafo',
  'Carlos Fotografías — Bodas & Quinceañeras',
  'Fotógrafo profesional especializado en bodas, quinceañeras y eventos corporativos.',
  'Carlos lleva 8 años capturando los momentos más especiales. Su estilo combina fotografía documental con retratos artísticos. Entrega galería editada en 72 horas, álbum físico opcional y todos los derechos de uso.',
  8500, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1542038374-5b4c97d97b69?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&h=600&fit=crop'
  ],
  18.4712, -69.9250,
  'Calle 5ta esq. Independencia, Piantini', 'Piantini',
  4.8, 124, true, true,
  ARRAY['Fotografía', 'Bodas', 'Quinceañeras', 'Corporativo']
),

-- 3. Chef Marco
(
  gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'talent', 'Chef Privado',
  'Chef Marco Rosario — Alta Cocina',
  'Chef ejecutivo para cenas privadas, catering de eventos y clases de cocina.',
  'Marco Rosario es chef con formación en España y 12 años de experiencia en restaurantes de alta cocina. Ofrece menús personalizados de cocina dominicana contemporánea, mediterránea y fusión. Puede atender desde 10 hasta 200 personas.',
  12000, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop'
  ],
  18.4740, -69.9450,
  'Av. Abraham Lincoln 205, Gazcue', 'Gazcue',
  4.7, 56, true, true,
  ARRAY['Chef', 'Catering', 'Cenas Privadas', 'Alta Cocina']
),

-- 4. Animador Juanito
(
  gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'talent', 'Animador Infantil',
  'Animador Juanito — Fiestas Infantiles',
  'Animador para fiestas infantiles, cumpleaños y eventos familiares.',
  'Juanito anima cumpleaños y eventos infantiles con shows de magia, payasería y actividades interactivas. Incluye decoración temática, globoflexia, cara pintada y sorteos. Más de 500 eventos realizados.',
  4500, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&h=600&fit=crop'
  ],
  18.5000, -69.9600,
  'Calle Hadith 18, Arroyo Hondo', 'Arroyo Hondo',
  5.0, 203, true, true,
  ARRAY['Animación', 'Infantil', 'Magia', 'Cumpleaños']
),

-- 5. Banda Los Compadres
(
  gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'talent', 'Banda en Vivo',
  'Banda Los Compadres — Merengue & Bachata',
  'Banda de merengue y bachata para bodas, quinceañeras y eventos corporativos.',
  'Los Compadres es una agrupación de 8 músicos con más de 15 años en escena. Interpretan merengue típico, bachata romántica, salsa y ritmos internacionales. Sonido profesional incluido.',
  35000, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'
  ],
  18.4650, -69.9300,
  'Av. George Washington 102, Bella Vista', 'Bella Vista',
  4.9, 67, true, true,
  ARRAY['Merengue', 'Bachata', 'Banda', 'Bodas', 'Salsa']
),

-- 6. Cantante Lorena
(
  gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'talent', 'Cantante',
  'Lorena Flores — Cantante Solista',
  'Cantante solista para ceremonias, cocktails y cenas de gala.',
  'Lorena tiene una voz privilegiada de soprano ligero con repertorio de baladas, boleros, pop internacional y música sacra para ceremonias religiosas. Trabaja con playback profesional o piano en vivo.',
  9000, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'
  ],
  18.4580, -69.9400,
  'Calle Las Mercedes 45, Mirador Sur', 'Mirador Sur',
  4.8, 41, true, false,
  ARRAY['Canto', 'Bodas', 'Ceremonias', 'Gala', 'Boleros']
),

-- 7. Videógrafo Alejandro
(
  gen_random_uuid(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'talent', 'Videógrafo',
  'Alejandro Films — Producción 4K',
  'Producción audiovisual profesional para bodas, eventos y marcas.',
  'Alejandro Films es un estudio boutique de videografía con equipo cinema 4K, drones y grabación subacuática. Ofrece paquetes para bodas con película de 10 minutos y highlights de 3 minutos.',
  18000, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop'
  ],
  18.4720, -69.9200,
  'Calle Fantino Falco 9, Piantini', 'Piantini',
  4.8, 74, true, true,
  ARRAY['Video', 'Bodas', 'Drone', '4K', 'Comerciales']
),

-- 8. Salón El Caribe
(
  gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'space', 'Salón de Eventos',
  'Salón El Caribe — Hasta 300 personas',
  'Elegante salón de eventos para bodas, quinceañeras y reuniones corporativas de hasta 300 personas.',
  'El Salón El Caribe cuenta con 600 m² de área climatizada, cocina profesional, pista de baile de madera, iluminación LED programable y sistema de sonido. Estacionamiento para 80 vehículos.',
  45000, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1464366400600-ac2779c6b5e4?w=800&h=600&fit=crop'
  ],
  18.4760, -69.9420,
  'Av. Independencia 501, Gazcue', 'Gazcue',
  4.7, 142, true, true,
  ARRAY['Salón', 'Bodas', 'Corporativo', 'Quinceañeras', 'Capacidad 300']
),

-- 9. Rooftop 57
(
  gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'space', 'Rooftop',
  'Rooftop 57 — Vista al Mar',
  'Terraza panorámica en el piso 12 con vista al mar. Ideal para cocktails y lanzamientos.',
  'El Rooftop 57 ofrece una de las mejores vistas del Malecón de Santo Domingo. Capacidad para 150 personas en cocktail, 80 sentados en cenas. Incluye bar fijo, mesas altas e iluminación ambiental.',
  25000, 'event',
  ARRAY[
    'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&h=600&fit=crop'
  ],
  18.4861, -69.9312,
  'Av. George Washington 57, Piso 12, Centro', 'Centro',
  4.9, 88, true, true,
  ARRAY['Rooftop', 'Vista al Mar', 'Cocktail', 'Lanzamiento', 'Exclusivo']
),

-- 10. Estudio Lumina
(
  gen_random_uuid(), 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'space', 'Estudio Fotográfico',
  'Estudio Lumina — Sets Profesionales',
  'Estudio fotográfico profesional con ciclorama, fondos y equipos de iluminación.',
  'Estudio Lumina cuenta con 3 sets fotográficos, ciclorama blanco de 6m, fondos de papel y tela en 20 colores, equipo de iluminación Profoto y sala de maquillaje.',
  3500, 'hour',
  ARRAY[
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
  ],
  18.4830, -69.9180,
  'Calle Seminario 22, Naco', 'Naco',
  4.8, 176, true, true,
  ARRAY['Estudio', 'Fotografía', 'Moda', 'Publicidad', 'Ciclorama']
),

-- 11. Villa Mirador
(
  gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'space', 'Villa para Eventos',
  'Villa Mirador — Piscina & Jardín Privado',
  'Villa privada con piscina y jardín para eventos exclusivos de hasta 80 personas.',
  'Villa de lujo con jardín de 800 m², piscina climatizada, bar exterior, área BBQ y terraza panorámica. Mobiliario elegante incluido, cocina completa y espacio para carpa opcional.',
  30000, 'day',
  ARRAY[
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
  ],
  18.4600, -69.9350,
  'Calle El Vergel 4, Mirador Sur', 'Mirador Sur',
  4.9, 34, true, true,
  ARRAY['Villa', 'Piscina', 'Exclusivo', 'Jardín', 'Lujo']
),

-- 12. Sala de Juntas Premium
(
  gen_random_uuid(), 'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'space', 'Sala Corporativa',
  'Sala de Juntas Premium — Torre Piantini',
  'Sala de conferencias equipada con tecnología AV para reuniones y capacitaciones.',
  'Sala corporativa con capacidad para 30 personas, pantalla LED 85", sistema de videoconferencia 4K, pizarra digital, fibra óptica 1Gbps y catering opcional.',
  8000, 'day',
  ARRAY[
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
  ],
  18.4700, -69.9260,
  'Torre Piantini, Av. 27 de Febrero 201', 'Piantini',
  4.6, 97, true, true,
  ARRAY['Sala', 'Corporativo', 'Conferencias', 'Coworking', 'AV']
),

-- 13. Valla Digital Duarte
(
  gen_random_uuid(), 'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'media', 'Valla Publicitaria',
  'Valla Digital Autopista Duarte km 18',
  'Valla LED digital de alto impacto en la autopista Duarte, 100,000+ vehículos diarios.',
  'Valla digital de 12x6 metros en el km 18 de la Autopista Duarte con más de 100,000 vehículos de impresión diarios. Pantalla full HD con rotación de anuncios cada 8 segundos. Incluye diseño gráfico básico.',
  85000, 'week',
  ARRAY[
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop'
  ],
  18.4900, -69.8800,
  'Autopista Duarte Km 18, Villa Mella', 'Villa Mella',
  4.8, 43, true, true,
  ARRAY['Valla', 'Digital', 'OOH', 'Alto Impacto', 'Autopista']
),

-- 14. Podcast El Pulso RD
(
  gen_random_uuid(), 'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'media', 'Podcast',
  'Podcast "El Pulso RD" — 80K escuchas/mes',
  'Menciones y entrevistas en el podcast líder de negocios y tecnología en RD.',
  '"El Pulso RD" es el podcast de negocios y tecnología número 1 de República Dominicana con 80,000 escuchas mensuales. Ofrece menciones pre-roll, entrevistas de 15-30 minutos y contenido patrocinado.',
  15000, 'month',
  ARRAY[
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=600&fit=crop'
  ],
  18.4820, -69.9130,
  'Av. Tiradentes 45, Naco', 'Naco',
  4.9, 19, true, true,
  ARRAY['Podcast', 'Negocios', 'Tecnología', 'Spotify', 'YouTube']
),

-- 15. Influencer @mariadigital.rd
(
  gen_random_uuid(), 'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'media', 'Influencer',
  'Influencer @mariadigital.rd — 280K seguidores',
  'Contenido patrocinado para Instagram y TikTok con 280K seguidores en RD.',
  'María es una de las principales influencers de República Dominicana con 280K seguidores en Instagram y 150K en TikTok. Especializada en lifestyle, moda y gastronomía. Engagement superior al 6%.',
  18000, 'month',
  ARRAY[
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop'
  ],
  18.4660, -69.9270,
  'Av. Anacaona 25, Bella Vista', 'Bella Vista',
  4.8, 24, true, true,
  ARRAY['Instagram', 'TikTok', 'Influencer', 'Lifestyle', 'Moda']
);

-- ── Demo waitlist entries ──────────────────────────────────────────────────────
INSERT INTO public.waitlist (email, name, role)
VALUES
  ('demo-usuario@talenthub.do',   'María García',  'user'),
  ('demo-suplidor@talenthub.do',  'Pedro Méndez',  'supplier'),
  ('test@example.com',            'Test User',     'user')
ON CONFLICT (email) DO NOTHING;

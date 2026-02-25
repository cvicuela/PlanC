import Link from 'next/link';
import { Check, ArrowRight, Star } from 'lucide-react';
import SearchBar from '@/components/landing/search-bar';
import MetricsSection from '@/components/landing/metrics-counter';
import WaitlistForm from '@/components/landing/waitlist-form';

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    emoji: '🎭',
    title: 'Talentos & Recursos',
    description: 'Fotógrafos, músicos, chefs, animadores, técnicos y más',
    badge: '2,400+ disponibles',
    href: '#talentos',
    accent: '#7C3AED',
    bg: 'bg-purple-50',
    badgeBg: 'bg-purple-100 text-purple-700',
  },
  {
    emoji: '🏢',
    title: 'Espacios & Venues',
    description: 'Salones, rooftops, estudios, canchas, restaurantes y más',
    badge: '800+ espacios',
    href: '#espacios',
    accent: '#F97316',
    bg: 'bg-orange-50',
    badgeBg: 'bg-orange-100 text-orange-700',
  },
  {
    emoji: '📣',
    title: 'Media Center',
    description: 'Vallas, prensa digital, YouTube, podcasts, radio y más',
    badge: '150+ medios',
    href: '#media',
    accent: '#059669',
    bg: 'bg-emerald-50',
    badgeBg: 'bg-emerald-100 text-emerald-700',
  },
];

const steps = [
  {
    emoji: '🔍',
    title: 'Busca',
    description: 'Describe lo que necesitas para tu evento y filtra por categoría, ubicación y precio.',
  },
  {
    emoji: '📊',
    title: 'Compara',
    description: 'Ve precios, reviews y disponibilidad en tiempo real de todos los suplidores.',
  },
  {
    emoji: '📅',
    title: 'Reserva',
    description: 'Confirma al instante con pago 100% seguro. Sin llamadas ni trámites.',
  },
  {
    emoji: '✅',
    title: 'Listo',
    description: 'Disfruta tu evento. Califica y comparte tu experiencia con la comunidad.',
  },
];

const testimonials = [
  {
    name: 'Ana García',
    city: 'Santo Domingo',
    role: 'Organizadora de eventos',
    quote:
      'Encontré un fotógrafo profesional en 10 minutos. La calidad fue increíble y el precio, justo. ¡Definitivamente lo volvería a usar!',
    rating: 5,
    initials: 'AG',
    color: 'bg-purple-500',
  },
  {
    name: 'Carlos Martínez',
    city: 'Santiago',
    role: 'Dueño de venue',
    quote:
      'Renté mi salón todos los fines de semana desde que lo puse en TalentHub. Se convirtió en mi fuente de ingresos principal.',
    rating: 5,
    initials: 'CM',
    color: 'bg-orange-500',
  },
  {
    name: 'María López',
    city: 'La Romana',
    role: 'Empresaria',
    quote:
      'Llegué a 50,000 personas con una sola campaña en vallas digitales. Nunca pensé que sería tan fácil y accesible hacer marketing.',
    rating: 5,
    initials: 'ML',
    color: 'bg-emerald-500',
  },
];

const pricingPlans = [
  {
    name: 'Gratis',
    price: 0,
    description: 'Para quienes buscan y reservan',
    features: [
      'Búsqueda ilimitada',
      'Reservas instantáneas',
      'Chat con suplidores',
      'Pago seguro integrado',
    ],
    cta: 'Crear cuenta gratis',
    href: '/sign-up',
    featured: false,
  },
  {
    name: 'Suplidor',
    price: 29,
    description: 'Para suplidores que inician',
    features: [
      'Hasta 3 listings activos',
      'Analytics básicos',
      'Perfil verificado',
      'Soporte por email',
    ],
    cta: 'Empezar prueba gratis',
    href: '/sign-up',
    featured: true,
  },
  {
    name: 'Pro',
    price: 79,
    description: 'Para suplidores que escalan',
    features: [
      'Listings ilimitados',
      'Posición destacada en búsquedas',
      'Analytics avanzados',
      'Soporte prioritario 24/7',
    ],
    cta: 'Empezar prueba gratis',
    href: '/sign-up',
    featured: false,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#6D28D9] pt-20 pb-36">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#F97316]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left column */}
            <div className="lg:col-span-6">
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white mb-6 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Disponible en Santo Domingo · Santiago · La Romana
              </div>

              <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Todo lo que necesitas para tu evento —
                <span className="text-[#F97316]"> en un solo lugar</span>
              </h1>

              <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg">
                Talentos, espacios y publicidad. Disponibles ahora mismo, cerca de ti.
              </p>

              {/* Search bar (client component) */}
              <SearchBar />

              {/* Popular searches */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-white/50 text-sm">Popular:</span>
                {['DJ en Santo Domingo', 'Salón para 100 personas', 'Valla publicitaria'].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="text-xs bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1.5 transition-colors backdrop-blur-sm"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Right column — stacked mockup cards */}
            <div className="lg:col-span-6 mt-16 lg:mt-0">
              <div className="relative h-80 lg:h-96 mx-auto max-w-sm lg:max-w-none">
                {/* Card 1 — Talent */}
                <div className="absolute top-0 left-4 lg:left-8 w-64 bg-white rounded-2xl shadow-2xl p-4 transform rotate-2 z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-purple-100 flex items-center justify-center text-xl flex-shrink-0">
                      📸
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Juan Fotografía</p>
                      <p className="text-xs text-gray-500">Fotografía profesional</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">★★★★★</span>
                      <span className="text-xs text-gray-400">4.9 (127 reseñas)</span>
                    </div>
                    <span className="text-sm font-bold text-[#7C3AED]">$150/hr</span>
                  </div>
                  <div className="mt-3 w-full py-2 bg-[#7C3AED] text-white text-xs font-semibold rounded-lg text-center">
                    Ver disponibilidad
                  </div>
                </div>

                {/* Card 2 — Space */}
                <div className="absolute top-24 left-12 lg:left-20 w-64 bg-white rounded-2xl shadow-2xl p-4 z-20">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">
                      🏛️
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Salón Gran Ballroom</p>
                      <p className="text-xs text-gray-500">200 personas · Gazcue</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">★★★★★</span>
                      <span className="text-xs text-gray-400">4.8 (84)</span>
                    </div>
                    <span className="text-sm font-bold text-[#F97316]">$800/evento</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Disponible hoy
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      A/C incluido
                    </span>
                  </div>
                </div>

                {/* Card 3 — Media */}
                <div className="absolute top-48 left-20 lg:left-36 w-64 bg-white rounded-2xl shadow-2xl p-4 transform -rotate-1 z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-emerald-100 flex items-center justify-center text-xl flex-shrink-0">
                      📺
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Valla Av. 27 de Febrero</p>
                      <p className="text-xs text-gray-500">Santo Domingo Norte</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">50K impresiones/sem</span>
                    <span className="text-sm font-bold text-emerald-600">$2,500/sem</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                      Digital
                    </span>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                      Alta demanda
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORÍAS
      ═══════════════════════════════════════════════════════ */}
      <section id="talentos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              ¿Qué necesitas para tu evento?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Tres categorías, miles de opciones — todas en un solo lugar
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3" id="espacios">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className={`${cat.bg} rounded-3xl p-8 flex flex-col gap-5 group hover:shadow-lg transition-shadow`}
              >
                <div
                  className="text-5xl h-16 w-16 flex items-center justify-center rounded-2xl bg-white shadow-sm"
                >
                  {cat.emoji}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{cat.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{cat.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${cat.badgeBg}`}>
                    {cat.badge}
                  </span>
                  <Link
                    href={cat.href}
                    className="flex items-center gap-1 text-sm font-semibold transition-colors"
                    style={{ color: cat.accent }}
                  >
                    Explorar <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CÓMO FUNCIONA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white" id="media">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">¿Cómo funciona?</h2>
            <p className="mt-4 text-lg text-gray-500">
              En 4 pasos sencillos, tu evento listo para brillar
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                {/* Step number */}
                <div className="relative mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#F97316] flex items-center justify-center text-3xl shadow-lg">
                    {step.emoji}
                  </div>
                  <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-white border-2 border-[#7C3AED] flex items-center justify-center text-xs font-bold text-[#7C3AED]">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>

                {/* Connector arrow (desktop only, not on last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#F97316] text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Empieza ahora gratis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MÉTRICAS (client component — animadas al scroll)
      ═══════════════════════════════════════════════════════ */}
      <MetricsSection />

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIOS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Historias reales de personas que ya confían en TalentHub
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed flex-1">"{t.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                  <div
                    className={`h-10 w-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">
                      {t.role} · {t.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA SUPLIDORES — Waitlist
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-[#7C3AED] to-[#F97316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl leading-tight">
                ¿Tienes talento, espacio o medios?
                <span className="block mt-1">Empieza a ganar hoy.</span>
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Miles de clientes están buscando exactamente lo que tú ofreces. Únete a la lista de
                espera y sé de los primeros suplidores en República Dominicana.
              </p>
              <ul className="mt-6 space-y-2">
                {[
                  'Sin costos de inscripción',
                  'Pagos seguros y rápidos',
                  'Soporte dedicado para suplidores',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <Check className="h-4 w-4 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 lg:mt-0">
              <p className="text-white font-semibold mb-4">
                Regístrate y te avisamos cuando lancemos:
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════════ */}
      <section id="precios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Planes para todos</h2>
            <p className="mt-4 text-lg text-gray-500">
              Empieza gratis. Escala cuando estés listo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 flex flex-col gap-6 ${
                  plan.featured
                    ? 'bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white shadow-2xl scale-105'
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-xs font-bold px-4 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                )}

                <div>
                  <h3
                    className={`text-xl font-bold ${plan.featured ? 'text-white' : 'text-gray-900'}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${plan.featured ? 'text-white/70' : 'text-gray-500'}`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-extrabold ${plan.featured ? 'text-white' : 'text-gray-900'}`}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={`text-sm ${plan.featured ? 'text-white/60' : 'text-gray-400'}`}
                  >
                    /mes
                  </span>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check
                        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-[#F97316]' : 'text-[#7C3AED]'}`}
                      />
                      <span
                        className={`text-sm ${plan.featured ? 'text-white/90' : 'text-gray-700'}`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                    plan.featured
                      ? 'bg-white text-[#7C3AED] hover:bg-white/90'
                      : 'bg-gradient-to-r from-[#7C3AED] to-[#F97316] text-white hover:opacity-90'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-gray-400">
            Todos los planes incluyen 14 días de prueba gratis. Sin tarjeta de crédito.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer id="contacto" className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#F97316]">
                  <span className="text-white text-sm font-bold">⚡</span>
                </div>
                <span className="text-white font-bold text-lg">TalentHub</span>
              </div>
              <p className="text-sm leading-relaxed">
                Encuentra el talento, el espacio y la visibilidad que necesitas — ahora mismo.
              </p>
              <div className="mt-5 flex gap-4">
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors text-sm"
                  aria-label="WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Plataforma */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Plataforma
              </h4>
              <ul className="space-y-2 text-sm">
                {['Talentos', 'Espacios', 'Media', 'Precios'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Empresa
              </h4>
              <ul className="space-y-2 text-sm">
                {['Sobre nosotros', 'Blog', 'Prensa', 'Contacto'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                {['Términos de uso', 'Política de privacidad', 'Cookies'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 TalentHub. República Dominicana. Todos los derechos reservados.</p>
            <p className="text-xs text-gray-600">Hecho con ❤️ en Santo Domingo</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

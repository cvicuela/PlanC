# TalentHub

Plataforma que conecta usuarios con talentos, espacios y medios publicitarios en **República Dominicana**.

## Stack

| Capa | Tecnología |
|------|-----------|
| **Landing** | Next.js 15 + Tailwind CSS v4 + Drizzle ORM |
| **App / Dashboard** | Next.js 14 + Tailwind CSS v3 + Supabase + react-leaflet |
| **Backend** | Supabase (Auth + Postgres + Storage + Realtime) |
| **Pagos** | Stripe (checkout, webhooks) |
| **Maps** | Leaflet + OpenStreetMap |
| **Deploy** | Vercel (landing + app como proyectos separados) |

## Estructura

```
talenthub/
├── landing/          # Marketing site & waitlist
├── app/              # Dashboard web (usuarios + suplidores)
├── .github/workflows # CI/CD — build + deploy a Vercel
└── package.json      # Workspaces root
```

## Setup rápido

```bash
# 1. Clonar
git clone <tu-repo>
cd talenthub

# 2. Instalar dependencias
npm run install:all

# 3. Configurar variables de entorno
cp app/.env.local.example app/.env.local
# Llena las variables de Supabase y Stripe

# 4. Iniciar en desarrollo
npm run dev
```

## URLs locales

- **Landing:** http://localhost:3000
- **App:** http://localhost:3001

## Variables de entorno (app)

| Variable | Descripción |
|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key pública de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (solo server-side) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

## Deploy a producción

Cada carpeta (`landing/` y `app/`) se despliega como un proyecto independiente en Vercel. El archivo `vercel.json` ya está configurado en cada una.

### GitHub Secrets necesarios

| Secret | Uso |
|--------|-----|
| `VERCEL_TOKEN` | Token de la API de Vercel |
| `VERCEL_ORG_ID` | ID de tu organización en Vercel |
| `VERCEL_LANDING_PROJECT_ID` | Project ID del landing en Vercel |
| `VERCEL_APP_PROJECT_ID` | Project ID del app en Vercel |
| `NEXT_PUBLIC_SUPABASE_URL` | Para el build de la app en CI |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Para el build de la app en CI |

## Scripts

```bash
npm run dev            # Inicia landing (3000) + app (3001)
npm run dev:landing    # Solo landing
npm run dev:app        # Solo app
npm run install:all    # Instala deps en landing + app
```

## Checklist de funcionalidades

- [x] Landing con branding TalentHub y formulario de waitlist
- [x] Login/registro con Supabase Auth
- [x] `/explore` con mapa interactivo + cards de listings
- [x] Detalle de listing con galería de fotos y info del suplidor
- [x] Flujo de reserva completo (3 pasos)
- [x] Bottom navigation en mobile (< 768px)
- [x] Dashboard de suplidor (`/supplier/dashboard`)
- [x] Mensajería entre usuarios y suplidores
- [x] PWA optimizada para mobile (manifest, icons, meta tags)
- [x] OG image para compartir en WhatsApp

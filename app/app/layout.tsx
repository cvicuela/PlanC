import { Metadata, Viewport } from 'next';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import {
  ConditionalNavbar,
  ConditionalFooter,
  ConditionalMain
} from '@/components/ui/ConditionalChrome';
import 'styles/main.css';

const title = 'TalentHub — Talento, Espacios y Publicidad en RD';
const description =
  'Encuentra el talento, el espacio y la visibilidad que necesitas. Mercado de servicios para República Dominicana.';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#7C3AED'
};

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TalentHub'
  },
  openGraph: {
    title: title,
    description: description,
    siteName: 'TalentHub',
    type: 'website',
    locale: 'es_DO',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TalentHub — Talento, Espacios y Publicidad en RD'
      }
    ]
  },
  other: {
    'mobile-web-app-capable': 'yes'
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
      </head>
      <body className="bg-black">
        <ConditionalNavbar />
        <ConditionalMain>{children}</ConditionalMain>
        <ConditionalFooter />
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}

import { Metadata } from 'next';
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

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="es">
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

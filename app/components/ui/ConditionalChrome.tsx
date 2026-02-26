'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const DASHBOARD_PATHS = [
  '/explore',
  '/booking',
  '/supplier',
  '/orders',
  '/messages'
];

function isDashboardRoute(pathname: string) {
  return DASHBOARD_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export function ConditionalNavbar() {
  const pathname = usePathname();
  if (isDashboardRoute(pathname)) return null;
  return <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  if (isDashboardRoute(pathname)) return null;
  return <Footer />;
}

export function ConditionalMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDash = isDashboardRoute(pathname);
  return (
    <main
      id="skip"
      className={!isDash ? 'min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-5rem)]' : ''}
    >
      {children}
    </main>
  );
}

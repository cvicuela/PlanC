'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, ClipboardList, MessageSquare, User, LayoutDashboard, Package } from 'lucide-react';

const userNav = [
  { href: '/explore', icon: Compass, label: 'Explorar' },
  { href: '/orders', icon: ClipboardList, label: 'Reservas' },
  { href: '/messages', icon: MessageSquare, label: 'Mensajes' },
  { href: '/account', icon: User, label: 'Perfil' }
];

const supplierNav = [
  { href: '/supplier/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/supplier/listings', icon: Package, label: 'Listings' },
  { href: '/orders', icon: ClipboardList, label: 'Reservas' },
  { href: '/messages', icon: MessageSquare, label: 'Mensajes' }
];

export default function BottomNav({ role }: { role: string }) {
  const pathname = usePathname();
  const nav = role === 'supplier' ? supplierNav : userNav;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 flex items-stretch justify-around z-50 pb-[env(safe-area-inset-bottom,0px)]">
      {nav.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-xs font-medium transition-colors relative ${
              active ? 'text-[#7C3AED]' : 'text-gray-400'
            }`}
          >
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#7C3AED]" />
            )}
            <Icon className={`h-5 w-5 ${active ? 'text-[#7C3AED]' : ''}`} strokeWidth={active ? 2.5 : 2} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  ClipboardList,
  MessageSquare,
  User,
  LayoutDashboard,
  Package,
  CalendarDays,
  LogOut,
  Zap,
  PlusCircle
} from 'lucide-react';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

const userLinks = [
  { href: '/explore', icon: Compass, label: 'Explorar' },
  { href: '/orders', icon: ClipboardList, label: 'Mis reservas' },
  { href: '/messages', icon: MessageSquare, label: 'Mensajes' },
  { href: '/account', icon: User, label: 'Mi perfil' }
];

const supplierLinks = [
  { href: '/supplier/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/supplier/listings', icon: Package, label: 'Mis listings' },
  { href: '/orders', icon: CalendarDays, label: 'Reservas' },
  { href: '/messages', icon: MessageSquare, label: 'Mensajes' },
  { href: '/account', icon: User, label: 'Mi perfil' }
];

interface Props {
  role: string;
  userEmail?: string;
}

export default function AppSidebar({ role, userEmail }: Props) {
  const pathname = usePathname();
  const router = getRedirectMethod() === 'client' ? useRouter() : null;
  const links = role === 'supplier' ? supplierLinks : userLinks;

  function isActive(href: string) {
    if (href === '/supplier/listings') {
      return pathname === '/supplier/listings' || pathname.startsWith('/supplier/listings/');
    }
    return pathname === href || (href !== '/explore' && pathname.startsWith(href + '/'));
  }

  return (
    <aside className="hidden md:flex md:flex-col w-60 bg-white border-r border-gray-200 flex-shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <Link href={role === 'supplier' ? '/supplier/dashboard' : '/explore'} className="flex items-center gap-2.5">
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
          >
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">TalentHub</span>
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
        <p className="text-sm font-medium text-gray-900 truncate">{userEmail ?? 'Usuario'}</p>
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full text-xs font-medium"
          style={
            role === 'supplier'
              ? { background: '#EDE9FE', color: '#7C3AED' }
              : { background: '#FFF7ED', color: '#F97316' }
          }
        >
          {role === 'supplier' ? '⚡ Suplidor' : '🔍 Usuario'}
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {links.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'text-[#7C3AED]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              style={active ? { background: '#EDE9FE' } : undefined}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-[#7C3AED]' : ''}`} />
              {label}
            </Link>
          );
        })}

        {role === 'supplier' && (
          <div className="pt-3">
            <Link
              href="/supplier/listings/new"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
            >
              <PlusCircle className="h-4 w-4" />
              Nuevo listing
            </Link>
          </div>
        )}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-gray-100 flex-shrink-0">
        <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
          <input type="hidden" name="pathName" value={pathname} />
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}

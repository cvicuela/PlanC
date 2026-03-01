'use client';

import Link from 'next/link';
import { useState, Suspense, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Home, LogOut, Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const navLinks = [
  { href: '#talentos', label: 'Talentos' },
  { href: '#espacios', label: 'Espacios' },
  { href: '#media', label: 'Media' },
  { href: '/pricing', label: 'Precios' },
  { href: '#contacto', label: 'Contacto' },
];

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  if (!user) {
    return (
      <>
        <Button asChild variant="outline" className="rounded-full border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5">
          <Link href="/sign-up">Soy Suplidor</Link>
        </Button>
        <Button
          asChild
          className="rounded-full text-white border-0 bg-gradient-to-r from-[#7C3AED] to-[#F97316] hover:opacity-90 transition-opacity"
        >
          <Link href="/sign-up">Empieza Gratis</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback className="bg-[#7C3AED] text-white">
            {(user.name || user.email)
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  return (
    <header ref={menuRef} className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#F97316]">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">TalentHub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-[#7C3AED] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Suspense fallback={<div className="h-9 w-40" />}>
            <UserMenu />
          </Suspense>
        </div>

        {/* Mobile toggle — visible only < 768px, aligned right */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu — slide-down animation via CSS max-height transition */}
      <div
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <div className="border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 px-2 text-sm font-medium text-gray-700 hover:text-[#7C3AED] rounded-lg hover:bg-purple-50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
            <Button asChild variant="outline" className="w-full border-[#7C3AED] text-[#7C3AED]">
              <Link href="/sign-up" onClick={() => setMobileOpen(false)}>Soy Suplidor</Link>
            </Button>
            <Button
              asChild
              className="w-full text-white border-0 bg-gradient-to-r from-[#7C3AED] to-[#F97316]"
            >
              <Link href="/sign-up" onClick={() => setMobileOpen(false)}>Empieza Gratis</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}

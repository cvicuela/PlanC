'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" aria-label="TalentHub" className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
          >
            TH
          </div>
          <span className="text-white font-bold text-lg tracking-tight">TalentHub</span>
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          <Link href="/" className={s.link}>
            Precios
          </Link>
          {user && (
            <Link href="/explore" className={s.link}>
              Explorar
            </Link>
          )}
          {user && (
            <Link href="/account" className={s.link}>
              Mi cuenta
            </Link>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-4">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Salir
            </button>
          </form>
        ) : (
          <>
            <Link href="/signin" className={s.link}>
              Iniciar sesión
            </Link>
            <Link
              href="/signin/signup"
              className="px-4 py-2 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
            >
              Empieza Gratis
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

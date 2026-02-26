'use client';

import Button from '@/components/ui/Button';
import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';

interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<'user' | 'supplier'>('user');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form noValidate className="mb-4" onSubmit={handleSubmit}>
        <div className="grid gap-3">
          {/* Role selector */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-gray-300">¿Cómo usarás TalentHub?</label>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  role === 'user'
                    ? 'border-[#7C3AED] bg-[#7C3AED]/15 text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="sr-only"
                />
                <span className="text-2xl">🔍</span>
                <span className="text-xs font-semibold text-center leading-tight">Busco servicios</span>
              </label>
              <label
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  role === 'supplier'
                    ? 'border-[#F97316] bg-[#F97316]/15 text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="supplier"
                  checked={role === 'supplier'}
                  onChange={() => setRole('supplier')}
                  className="sr-only"
                />
                <span className="text-2xl">⚡</span>
                <span className="text-xs font-semibold text-center leading-tight">Soy suplidor</span>
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email" className="text-sm">Email</label>
            <input
              id="email"
              placeholder="nombre@ejemplo.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-[#7C3AED] outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password" className="text-sm">Contraseña</label>
            <input
              id="password"
              placeholder="Mínimo 8 caracteres"
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:border-[#7C3AED] outline-none transition-colors"
            />
          </div>

          <Button variant="slim" type="submit" className="mt-1" loading={isSubmitting}>
            Crear cuenta
          </Button>
        </div>
      </form>

      <p className="text-sm text-zinc-400">¿Ya tienes cuenta?</p>
      <p>
        <Link href="/signin/password_signin" className="font-light text-sm text-[#7C3AED] hover:underline">
          Inicia sesión con email y contraseña
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="font-light text-sm text-[#7C3AED] hover:underline">
            Iniciar sesión con magic link
          </Link>
        </p>
      )}
    </div>
  );
}

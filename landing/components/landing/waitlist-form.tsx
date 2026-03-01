'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  function validateEmail(value: string): boolean {
    if (!value.trim()) {
      setEmailError('El email es requerido.');
      return false;
    }
    if (!EMAIL_RE.test(value.trim())) {
      setEmailError('Ingresa un email válido.');
      return false;
    }
    setEmailError('');
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setStatus('loading');
    setServerMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.status === 201) {
        setStatus('success');
        setEmail('');
        return;
      }

      const data = await res.json();

      if (res.status === 409) {
        setStatus('duplicate');
        return;
      }

      setStatus('error');
      setServerMessage(data.error || 'Algo salió mal, intenta de nuevo.');
    } catch {
      setStatus('error');
      setServerMessage('Error de conexión. Intenta de nuevo.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-green-500/20 border border-green-400/40 px-5 py-4 text-white">
        <span className="text-2xl" aria-hidden>🚀</span>
        <p className="font-medium">¡Listo! Te avisamos cuando lancemos 🚀</p>
      </div>
    );
  }

  if (status === 'duplicate') {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-green-500/20 border border-green-400/40 px-5 py-4 text-white">
        <span className="text-2xl" aria-hidden>👍</span>
        <p className="font-medium">¡Ya estás en la lista! 👍</p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
      >
        <div className="flex-1 flex flex-col gap-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => email && validateEmail(email)}
            placeholder="tu@email.com"
            aria-label="Correo electrónico"
            aria-invalid={!!emailError}
            className={[
              'w-full rounded-xl border-0 bg-white/20 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 text-sm',
              emailError ? 'ring-2 ring-red-400/80' : 'focus:ring-white/40',
            ].join(' ')}
          />
          {emailError && (
            <p className="text-red-300 text-xs px-1">{emailError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap rounded-xl bg-white px-6 py-3 font-semibold text-[#7C3AED] hover:bg-white/90 transition-colors disabled:opacity-60 text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando…
            </>
          ) : (
            'Quiero ser suplidor'
          )}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-3 text-red-300 text-sm bg-red-500/10 rounded-lg px-3 py-2 max-w-md mx-auto lg:mx-0">
          {serverMessage || 'Algo salió mal, intenta de nuevo.'}
        </p>
      )}
    </div>
  );
}

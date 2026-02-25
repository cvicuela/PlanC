'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage('¡Gracias! Te avisaremos cuando estés listo para empezar a ganar.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Algo salió mal. Intenta de nuevo.');
      }
    } catch {
      setStatus('error');
      setMessage('Error de conexión. Intenta de nuevo.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center gap-3 text-white py-2">
        <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
        <p className="text-lg font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-1 rounded-xl border-0 bg-white/20 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap rounded-xl bg-white px-6 py-3 font-semibold text-[#7C3AED] hover:bg-white/90 transition-colors disabled:opacity-60 text-sm"
        >
          {status === 'loading' ? 'Enviando…' : 'Quiero ser suplidor'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-3 text-red-200 text-sm">{message}</p>
      )}
    </div>
  );
}

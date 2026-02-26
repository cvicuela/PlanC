'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Calendar, ChevronRight } from 'lucide-react';
import { mockBookings, Booking } from '@/lib/mock-data';

type Tab = 'active' | 'completed' | 'cancelled';

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700'
};
const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  completed: 'Completada',
  cancelled: 'Cancelada'
};

function bookingTab(b: Booking): Tab {
  if (b.status === 'completed') return 'completed';
  if (b.status === 'cancelled') return 'cancelled';
  return 'active';
}

export default function OrdersPage() {
  const [tab, setTab] = useState<Tab>('active');

  const filtered = mockBookings.filter((b) => bookingTab(b) === tab);

  const counts: Record<Tab, number> = {
    active: mockBookings.filter((b) => bookingTab(b) === 'active').length,
    completed: mockBookings.filter((b) => bookingTab(b) === 'completed').length,
    cancelled: mockBookings.filter((b) => bookingTab(b) === 'cancelled').length
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'active', label: 'Activas' },
    { key: 'completed', label: 'Completadas' },
    { key: 'cancelled', label: 'Canceladas' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Mis reservas</h1>
      <p className="text-sm text-gray-500 mb-5">{mockBookings.length} reservas en total</p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === key ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
            <span className={`h-5 min-w-5 px-1.5 rounded-full text-xs font-bold flex items-center justify-center ${tab === key ? 'bg-[#7C3AED] text-white' : 'bg-gray-100 text-gray-500'}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">📋</span>
          <p className="font-semibold text-gray-700">No hay reservas aquí</p>
          {tab === 'active' && (
            <Link href="/explore" className="mt-4 inline-block px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}>
              Explorar servicios
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex gap-4 p-4">
                <img src={b.listingImage} alt={b.listingName} className="h-20 w-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{b.listingName}</h3>
                    <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[b.status]}`}>
                      {STATUS_LABEL[b.status]}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(b.date + 'T12:00:00').toLocaleDateString('es-DO', { month: 'long', day: 'numeric', year: 'numeric' })}
                      {b.time && ` · ${b.time}`}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">DOP {b.totalAmount.toLocaleString()}</p>
                    {b.notes && <p className="text-xs text-gray-400 truncate max-w-[120px]">"{b.notes}"</p>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-3 flex gap-2">
                <Link
                  href={`/explore/${b.listingId}`}
                  className="flex items-center justify-center gap-1 flex-1 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Ver detalle
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                {b.status === 'completed' && (
                  <button className="flex items-center gap-1 flex-1 py-2 text-sm rounded-lg border border-yellow-300 text-yellow-600 hover:bg-yellow-50 transition-colors justify-center">
                    <Star className="h-3.5 w-3.5" />
                    Reseñar
                  </button>
                )}
                {(b.status === 'pending' || b.status === 'confirmed') && (
                  <Link
                    href={`/messages`}
                    className="flex items-center gap-1 flex-1 py-2 text-sm rounded-lg text-white justify-center"
                    style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
                  >
                    Mensaje
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

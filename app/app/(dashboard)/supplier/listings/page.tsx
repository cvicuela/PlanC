'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Eye, EyeOff, Star, BarChart3 } from 'lucide-react';
import { listings, CATEGORY_BADGE, CATEGORY_EMOJI } from '@/lib/mock-data';

// Show the first 4 listings as "owned by this supplier" for demo purposes
const myListings = listings.slice(0, 4);

export default function SupplierListingsPage() {
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>(
    Object.fromEntries(myListings.map((l) => [l.id, true]))
  );

  function toggleStatus(id: string) {
    setStatusMap((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis listings</h1>
          <p className="text-sm text-gray-500 mt-0.5">{myListings.length} servicios publicados</p>
        </div>
        <Link
          href="/supplier/listings/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
        >
          <PlusCircle className="h-4 w-4" />
          Nuevo listing
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Activos', value: Object.values(statusMap).filter(Boolean).length, color: 'text-green-600' },
          { label: 'Pausados', value: Object.values(statusMap).filter((v) => !v).length, color: 'text-gray-400' },
          { label: 'Total reservas', value: 23, color: 'text-[#7C3AED]' }
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-3 text-center">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Listings grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {myListings.map((l) => {
          const active = statusMap[l.id];
          return (
            <div
              key={l.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                active ? 'border-gray-200' : 'border-gray-200 opacity-70'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative">
                <img src={l.images[0]} alt={l.name} className="w-full h-36 object-cover" />
                <div className="absolute inset-0 bg-black/10" />
                <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_BADGE[l.category]}`}>
                  {CATEGORY_EMOJI[l.category]} {l.subcategory}
                </span>
                {/* Active toggle */}
                <button
                  onClick={() => toggleStatus(l.id)}
                  className={`absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow transition-colors ${
                    active ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  {active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {active ? 'Activo' : 'Pausado'}
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{l.name}</h3>
                <div className="mt-1.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{l.rating}</span>
                    <span className="text-gray-400">({l.reviewCount})</span>
                  </div>
                  <span className="font-bold text-gray-900">DOP {l.price.toLocaleString()}<span className="text-xs font-normal text-gray-400">/{l.priceUnit}</span></span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/explore/${l.id}`}
                    className="flex-1 text-center py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Ver público
                  </Link>
                  <button className="flex items-center justify-center gap-1.5 flex-1 py-2 text-sm rounded-lg border border-[#7C3AED] text-[#7C3AED] hover:bg-purple-50 transition-colors">
                    <BarChart3 className="h-3.5 w-3.5" />
                    Estadísticas
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

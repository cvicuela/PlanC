'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, X, List, Map } from 'lucide-react';
import dynamic from 'next/dynamic';
import { listings, Listing } from '@/lib/mock-data';
import ListingCard from '@/components/listings/ListingCard';

const MapView = dynamic(() => import('@/components/map/MapClient'), { ssr: false });

type Category = 'all' | 'talent' | 'space' | 'media';
type ViewMode = 'list' | 'map';

const TABS: { key: Category; label: string; emoji: string }[] = [
  { key: 'all', label: 'Todos', emoji: '✨' },
  { key: 'talent', label: 'Talentos', emoji: '🎭' },
  { key: 'space', label: 'Espacios', emoji: '🏢' },
  { key: 'media', label: 'Media', emoji: '📣' }
];

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('0');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo<Listing[]>(() => {
    return listings.filter((l) => {
      if (category !== 'all' && l.category !== category) return false;
      if (query && !l.name.toLowerCase().includes(query.toLowerCase()) && !l.subcategory.toLowerCase().includes(query.toLowerCase())) return false;
      if (location && !l.location.sector.toLowerCase().includes(location.toLowerCase())) return false;
      if (maxPrice && l.price > parseInt(maxPrice, 10)) return false;
      if (parseFloat(minRating) > 0 && l.rating < parseFloat(minRating)) return false;
      return true;
    });
  }, [category, query, location, maxPrice, minRating]);

  return (
    <div className="flex flex-col h-full">
      {/* ── Search & filters bar ── */}
      <div className="bg-white border-b border-gray-200 px-4 pt-4 pb-3 flex-shrink-0">
        {/* Search row */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar DJ, fotógrafo, salón..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
              showFilters ? 'border-[#7C3AED] text-[#7C3AED] bg-purple-50' : 'border-gray-200 text-gray-600'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 mt-3 overflow-x-auto scrollbar-hide">
          {TABS.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                category === key
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={category === key ? { background: 'linear-gradient(to right, #7C3AED, #F97316)' } : undefined}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[140px]">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Sector..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <input
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Precio máx (DOP)"
                type="number"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#7C3AED] transition-colors"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#7C3AED] transition-colors bg-white"
              >
                <option value="0">Rating mínimo</option>
                <option value="3">⭐ 3+</option>
                <option value="4">⭐ 4+</option>
                <option value="4.5">⭐ 4.5+</option>
              </select>
            </div>
            <button
              onClick={() => { setQuery(''); setLocation(''); setMaxPrice(''); setMinRating('0'); setCategory('all'); }}
              className="text-sm text-red-500 hover:text-red-700 font-medium"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile view toggle ── */}
      <div className="md:hidden flex border-b border-gray-200 bg-white flex-shrink-0">
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            viewMode === 'list' ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-gray-500'
          }`}
        >
          <List className="h-4 w-4" />
          Lista ({filtered.length})
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            viewMode === 'map' ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-gray-500'
          }`}
        >
          <Map className="h-4 w-4" />
          Mapa
        </button>
      </div>

      {/* ── Main content: list + map ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* List — 60% desktop, full on mobile when in list mode */}
        <div
          className={`${viewMode === 'map' ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-[60%] overflow-y-auto`}
        >
          {/* Result count */}
          <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{filtered.length}</span> resultados
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 text-center px-4">
              <span className="text-5xl mb-4">🔍</span>
              <p className="text-lg font-semibold text-gray-700">Sin resultados</p>
              <p className="text-sm text-gray-400 mt-1">Prueba con otros filtros o términos de búsqueda</p>
            </div>
          ) : (
            <div className="p-4 flex flex-col gap-3">
              {filtered.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>

        {/* Map — 40% desktop, full on mobile when in map mode */}
        <div
          className={`${viewMode === 'list' ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-[40%] relative border-l border-gray-200`}
        >
          {/* Legend */}
          <div className="absolute top-3 right-3 z-[1000] bg-white rounded-xl shadow-md border border-gray-100 px-3 py-2 flex flex-col gap-1.5">
            {[
              { color: '#7C3AED', label: 'Talentos' },
              { color: '#F97316', label: 'Espacios' },
              { color: '#3B82F6', label: 'Media' }
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-white shadow" style={{ background: color }} />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex-1">
            <MapView listings={filtered} center={[18.4861, -69.9312]} zoom={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

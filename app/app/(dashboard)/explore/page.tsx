'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, MapPin, SlidersHorizontal, X, List, Map, Locate, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { listings, Listing, CATEGORY_BADGE, CATEGORY_EMOJI } from '@/lib/mock-data';
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
  // Mobile defaults to map view
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [locatingUser, setLocatingUser] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([18.4861, -69.9312]);

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

  const handleLocateUser = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc);
        setMapCenter(loc);
        setLocatingUser(false);
      },
      () => setLocatingUser(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleSelectListing = useCallback((listing: Listing) => {
    setSelectedListing(listing);
    setShowBottomSheet(true);
  }, []);

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

      {/* ── Mobile view toggle (hidden on desktop) ── */}
      <div className="md:hidden flex border-b border-gray-200 bg-white flex-shrink-0">
        <button
          onClick={() => setViewMode('map')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            viewMode === 'map' ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-gray-500'
          }`}
        >
          <Map className="h-4 w-4" />
          Mapa
        </button>
        <button
          onClick={() => { setViewMode('list'); setShowBottomSheet(false); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border-b-2 transition-colors ${
            viewMode === 'list' ? 'border-[#7C3AED] text-[#7C3AED]' : 'border-transparent text-gray-500'
          }`}
        >
          <List className="h-4 w-4" />
          Lista ({filtered.length})
        </button>
      </div>

      {/* ── Main content: list + map ── */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* List — 60% desktop, full on mobile when in list mode */}
        <div
          className={`${viewMode === 'map' ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-[60%] overflow-y-auto touch-scroll`}
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

          {/* Mobile: Locate me button */}
          <button
            onClick={handleLocateUser}
            disabled={locatingUser}
            className="md:hidden absolute bottom-[calc(var(--bottom-nav-h)+1rem)] right-3 z-[1000] flex items-center gap-2 bg-white rounded-xl shadow-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50"
          >
            <Locate className={`h-4 w-4 text-[#7C3AED] ${locatingUser ? 'animate-pulse' : ''}`} />
            {locatingUser ? 'Buscando...' : 'Mi ubicación'}
          </button>

          {/* Mobile: FAB to switch views */}
          <button
            onClick={() => { setViewMode(viewMode === 'map' ? 'list' : 'map'); setShowBottomSheet(false); }}
            className="md:hidden absolute bottom-[calc(var(--bottom-nav-h)+4rem)] right-3 z-[1000] flex items-center gap-2 text-white rounded-xl shadow-lg px-4 py-3 text-sm font-semibold active:scale-95 transition-transform"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
          >
            {viewMode === 'map' ? (
              <>
                <List className="h-4 w-4" />
                Ver lista
              </>
            ) : (
              <>
                <Map className="h-4 w-4" />
                Ver mapa
              </>
            )}
          </button>

          <div className="flex-1">
            <MapView listings={filtered} center={mapCenter} zoom={13} />
          </div>
        </div>

        {/* ── Mobile Bottom Sheet (selected listing) ── */}
        {showBottomSheet && selectedListing && viewMode === 'map' && (
          <div className="md:hidden fixed bottom-[var(--bottom-nav-h)] left-0 right-0 z-[1001] bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 max-h-[60vh] overflow-hidden flex flex-col">
            {/* Drag handle */}
            <div className="flex justify-center py-2 flex-shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <button
              onClick={() => setShowBottomSheet(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-4 overflow-y-auto touch-scroll">
              <div className="flex gap-3">
                <img
                  src={selectedListing.images[0]}
                  alt={selectedListing.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_BADGE[selectedListing.category]}`}>
                    {CATEGORY_EMOJI[selectedListing.category]} {selectedListing.subcategory}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900 truncate">{selectedListing.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedListing.location.sector}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900">
                      DOP {selectedListing.price.toLocaleString()}
                      <span className="text-xs font-normal text-gray-400">/{selectedListing.priceUnit}</span>
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={`/explore/${selectedListing.id}`}
                className="mt-3 block w-full text-center py-2.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
              >
                Ver detalle
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

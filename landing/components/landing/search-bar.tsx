'use client';

import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

export default function SearchBar() {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // TODO: redirect to /search?category=&location=
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mt-8 flex flex-col sm:flex-row gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Category dropdown */}
      <div className="flex-1 flex items-center border-b sm:border-b-0 sm:border-r border-gray-200">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-5 py-4 text-gray-700 bg-transparent focus:outline-none cursor-pointer text-sm font-medium appearance-none"
        >
          <option value="">¿Qué buscas?</option>
          <option value="talento">🎭 Talento</option>
          <option value="espacio">🏢 Espacio</option>
          <option value="publicidad">📣 Publicidad</option>
        </select>
      </div>

      {/* Location input */}
      <div className="flex-1 flex items-center px-5">
        <MapPin className="h-5 w-5 text-[#7C3AED] mr-2 flex-shrink-0" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ubicación (ej. Santo Domingo)"
          className="w-full py-4 text-gray-700 bg-transparent focus:outline-none text-sm"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#7C3AED] to-[#F97316] text-white font-semibold hover:opacity-90 transition-opacity text-sm"
      >
        <Search className="h-4 w-4" />
        Buscar ahora
      </button>
    </form>
  );
}

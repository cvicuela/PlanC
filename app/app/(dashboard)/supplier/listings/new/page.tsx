'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Check, ArrowLeft, Upload, X, MapPin } from 'lucide-react';

const MapView = dynamic(() => import('@/components/map/MapClient'), { ssr: false });

const STEPS = ['Categoría', 'Información', 'Fotos', 'Ubicación', 'Publicar'];

type Category = 'talent' | 'space' | 'media' | '';

const CATEGORIES = [
  { key: 'talent' as Category, emoji: '🎭', label: 'Talento', desc: 'DJ, fotógrafo, chef, músico, animador...' },
  { key: 'space' as Category, emoji: '🏢', label: 'Espacio', desc: 'Salón, rooftop, cancha, estudio, villa...' },
  { key: 'media' as Category, emoji: '📣', label: 'Media', desc: 'Valla, periódico digital, podcast, radio...' }
];

const PRICE_UNITS = ['hora', 'evento', 'día', 'semana', 'mes'];

export default function NewListingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Form state
  const [category, setCategory] = useState<Category>('');
  const [title, setTitle] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState('evento');
  const [previews, setPreviews] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [sector, setSector] = useState('');
  const [pinLat, setPinLat] = useState(18.4861);
  const [pinLng, setPinLng] = useState(-69.9312);
  const [published, setPublished] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (ev) => setPreviews((prev) => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(f);
    });
  }

  function removeImage(i: number) {
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handlePublish() {
    setPublished(true);
  }

  function canAdvance() {
    if (step === 0) return category !== '';
    if (step === 1) return title.trim() !== '' && price.trim() !== '';
    if (step === 2) return previews.length > 0;
    if (step === 3) return address.trim() !== '';
    return true;
  }

  if (published) {
    return (
      <div className="min-h-full flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-sm">
          <div className="h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}>
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">¡Listing publicado!</h1>
          <p className="mt-2 text-gray-500">Tu servicio <strong>{title}</strong> ya está visible para los usuarios de TalentHub.</p>
          <div className="mt-6 flex flex-col gap-3">
            <button onClick={() => router.push('/supplier/listings')} className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}>
              Ver mis listings
            </button>
            <button onClick={() => { setPublished(false); setStep(0); setCategory(''); setTitle(''); }} className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">
              Crear otro listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-32 md:pb-10">
      {/* Back */}
      <button onClick={() => (step > 0 ? setStep(step - 1) : router.back())} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft className="h-4 w-4" />
        {step > 0 ? 'Paso anterior' : 'Mis listings'}
      </button>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step ? 'bg-green-500 text-white' : i === step ? 'text-white' : 'bg-gray-200 text-gray-500'
                }`}
                style={i === step ? { background: 'linear-gradient(135deg, #7C3AED, #F97316)' } : undefined}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`mt-1 text-[10px] font-medium text-center hidden sm:block ${i === step ? 'text-[#7C3AED]' : 'text-gray-400'}`}>{s}</span>
            </div>
          ))}
        </div>
        <div className="relative h-1.5 bg-gray-200 rounded-full">
          <div className="absolute h-full rounded-full transition-all" style={{ width: `${(step / (STEPS.length - 1)) * 100}%`, background: 'linear-gradient(to right, #7C3AED, #F97316)' }} />
        </div>
      </div>

      {/* ── Step 0: Category ── */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Tipo de servicio</h2>
          <p className="text-sm text-gray-500 mb-5">¿Qué tipo de servicio vas a ofrecer?</p>
          <div className="grid gap-3">
            {CATEGORIES.map(({ key, emoji, label, desc }) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                  category === key ? 'border-[#7C3AED] bg-purple-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <span className="text-4xl">{emoji}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-base">{label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                </div>
                {category === key && (
                  <div className="ml-auto h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#7C3AED' }}>
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 1: Basic info ── */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Información básica</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Título del servicio *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: DJ para bodas y eventos" className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED] transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subcategoría</label>
              <input value={subcategory} onChange={(e) => setSubcategory(e.target.value)} placeholder="Ej: DJ, Fotógrafo, Salón de eventos..." className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe tu servicio, experiencia, qué incluye..." rows={4} className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED] resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Precio (DOP) *</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="15000" className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Por</label>
                <select value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)} className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED] bg-white">
                  {PRICE_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Photos ── */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Fotos del servicio</h2>
          <p className="text-sm text-gray-500 mb-5">Agrega al menos 1 foto. Las mejores fotos atraen más clientes.</p>

          {/* Upload area */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-[#7C3AED] hover:bg-purple-50 transition-colors">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm font-medium text-gray-700">Haz clic para subir fotos</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP · Máx 10 MB cada una</p>
            <input type="file" accept="image/*" multiple className="sr-only" onChange={handleImageChange} />
          </label>

          {/* Preview grid */}
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {previews.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(i)} className="absolute top-1 right-1 h-6 w-6 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white">
                    <X className="h-3.5 w-3.5 text-gray-700" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-full">Principal</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Step 3: Location ── */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ubicación</h2>
          <p className="text-sm text-gray-500 mb-5">Indica la dirección y ajusta el pin en el mapa.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Dirección *</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ej: Av. Winston Churchill 55" className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Sector</label>
              <input value={sector} onChange={(e) => setSector(e.target.value)} placeholder="Ej: Naco, Piantini, Gazcue..." className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#7C3AED]" />
                Ubica el pin exacto en el mapa
              </label>
              <div className="h-64 rounded-xl overflow-hidden border border-gray-200">
                <MapView
                  singlePin={{ lat: pinLat, lng: pinLng, label: title || 'Mi servicio', color: '#7C3AED' }}
                  center={[pinLat, pinLng]}
                  zoom={14}
                  onMapClick={(lat, lng) => { setPinLat(lat); setPinLng(lng); }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                Pin en: {pinLat.toFixed(5)}, {pinLng.toFixed(5)} · Toca el mapa para moverlo
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 4: Review & publish ── */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Revisar y publicar</h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            {previews.length > 0 && (
              <img src={previews[0]} alt="" className="w-full h-48 object-cover" />
            )}
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{category}</p>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5">{title || '—'}</h3>
                {subcategory && <p className="text-sm text-gray-500">{subcategory}</p>}
              </div>
              {description && <p className="text-sm text-gray-600 line-clamp-3">{description}</p>}
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500">Precio</span>
                <span className="font-bold text-gray-900">DOP {parseInt(price || '0').toLocaleString()} <span className="text-xs font-normal text-gray-400">/{priceUnit}</span></span>
              </div>
              {address && (
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 text-[#7C3AED]" />
                  {address}{sector ? `, ${sector}` : ''}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
            ✅ Todo listo. Al publicar, tu servicio estará visible de inmediato para los usuarios de TalentHub.
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 md:static md:mt-8 md:border-0 md:p-0">
        <div className="max-w-2xl mx-auto flex gap-3">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50">
              Anterior
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(step + 1)} disabled={!canAdvance()} className="flex-1 py-3 rounded-xl text-white font-semibold disabled:opacity-40 transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}>
              Siguiente
            </button>
          ) : (
            <button onClick={handlePublish} className="flex-1 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}>
              ¡Publicar listing!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

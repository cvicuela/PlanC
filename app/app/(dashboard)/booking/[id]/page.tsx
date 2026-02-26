'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, ArrowLeft, Calendar, Clock, FileText, Star } from 'lucide-react';
import { listings } from '@/lib/mock-data';

const STEPS = ['Detalles', 'Fecha y hora', 'Confirmar'];

export default function BookingPage({ params }: { params: { id: string } }) {
  const listing = listings.find((l) => l.id === params.id);
  if (!listing) notFound();

  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const isMedia = listing.category === 'media';

  function handleConfirm() {
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="min-h-full flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-sm">
          <div
            className="h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
          >
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">¡Reserva confirmada!</h1>
          <p className="mt-2 text-gray-500">
            Tu reserva con <strong>{listing.name}</strong> ha sido enviada. El suplidor la confirmará pronto.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/orders"
              className="block w-full py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
            >
              Ver mis reservas
            </Link>
            <Link href="/explore" className="block w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Seguir explorando
            </Link>
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
        {step > 0 ? 'Paso anterior' : 'Volver'}
      </button>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i < step
                    ? 'bg-green-500 text-white'
                    : i === step
                      ? 'text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
                style={i === step ? { background: 'linear-gradient(135deg, #7C3AED, #F97316)' } : undefined}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`mt-1 text-xs font-medium ${i === step ? 'text-[#7C3AED]' : 'text-gray-400'}`}>{s}</span>
            </div>
          ))}
        </div>
        <div className="relative h-1.5 bg-gray-200 rounded-full mt-2">
          <div
            className="absolute h-full rounded-full transition-all"
            style={{ width: `${(step / (STEPS.length - 1)) * 100}%`, background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
          />
        </div>
      </div>

      {/* ── Step 1: Listing summary ── */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del servicio</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <img src={listing.images[0]} alt={listing.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-lg">{listing.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{listing.subcategory} · {listing.location.sector}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{listing.rating}</span>
                <span className="text-sm text-gray-400">({listing.reviewCount} reseñas)</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Precio</span>
                <span className="font-bold text-gray-900">DOP {listing.price.toLocaleString()} <span className="font-normal text-gray-400 text-sm">/{listing.priceUnit}</span></span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            💡 Revisa los detalles antes de continuar. En el siguiente paso podrás seleccionar la fecha.
          </p>
        </div>
      )}

      {/* ── Step 2: Date & time or media form ── */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isMedia ? 'Detalles de la campaña' : 'Selecciona fecha y hora'}
          </h2>

          {isMedia ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duración de la campaña</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED]"
                >
                  <option value="">Selecciona duración</option>
                  <option value="1-semana">1 semana</option>
                  <option value="2-semanas">2 semanas</option>
                  <option value="1-mes">1 mes</option>
                  <option value="3-meses">3 meses</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Presupuesto disponible (DOP)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ej: 50000"
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje al suplidor</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe tu producto/servicio, objetivo de la campaña..."
                  rows={4}
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#7C3AED]" />
                  Fecha del evento
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#7C3AED]" />
                  Hora de inicio
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['10:00', '12:00', '15:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        selectedTime === t
                          ? 'text-white border-[#7C3AED]'
                          : 'border-gray-200 text-gray-600 hover:border-[#7C3AED]'
                      }`}
                      style={selectedTime === t ? { background: 'linear-gradient(to right, #7C3AED, #F97316)' } : undefined}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {listing.availability.length > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                  ✅ Fechas disponibles próximamente:{' '}
                  {listing.availability.map(d => new Date(d + 'T12:00:00').toLocaleDateString('es-DO', { month: 'short', day: 'numeric' })).join(', ')}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Step 3: Summary + confirm ── */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmar reserva</h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <img src={listing.images[0]} alt={listing.name} className="h-16 w-16 rounded-xl object-cover" />
              <div>
                <p className="font-semibold text-gray-900">{listing.name}</p>
                <p className="text-sm text-gray-500">{listing.location.sector}</p>
              </div>
            </div>
            <hr className="border-gray-100" />
            {!isMedia && selectedDate && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1"><Calendar className="h-4 w-4" /> Fecha</span>
                <span className="font-medium">{new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-DO', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            )}
            {!isMedia && selectedTime && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1"><Clock className="h-4 w-4" /> Hora</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
            )}
            {isMedia && duration && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duración</span>
                <span className="font-medium">{duration.replace('-', ' ')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total estimado</span>
              <span className="font-bold text-gray-900">DOP {listing.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-[#7C3AED]" />
              Notas adicionales (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Instrucciones especiales, preguntas al suplidor..."
              rows={3}
              className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#7C3AED] resize-none"
            />
          </div>

          <p className="mt-3 text-xs text-gray-400 text-center">
            Al confirmar, el suplidor recibirá tu solicitud. No se realiza ningún cobro hasta que sea aceptada.
          </p>
        </div>
      )}

      {/* ── Footer actions ── */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 md:static md:mt-8 md:border-0 md:p-0">
        <div className="max-w-2xl mx-auto flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Anterior
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !isMedia && !selectedDate}
              className="flex-1 py-3 rounded-xl text-white font-semibold disabled:opacity-50 transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #7C3AED, #F97316)' }}
            >
              Confirmar reserva
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

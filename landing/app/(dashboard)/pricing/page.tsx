import { checkoutAction } from '@/lib/payments/actions';
import { Check } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';
import Link from 'next/link';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const suplidorPlan = products.find((p) => p.name === 'Suplidor');
  const proPlan = products.find((p) => p.name === 'Pro');

  const suplidorPrice = prices.find((p) => p.productId === suplidorPlan?.id);
  const proPrice = prices.find((p) => p.productId === proPlan?.id);

  return (
    <main className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Planes para todos
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Empieza gratis. Escala cuando estés listo.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            14 días de prueba gratis en planes de pago. Sin tarjeta de crédito.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto items-start">
          {/* Free plan */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gratis</h2>
              <p className="text-sm text-gray-500 mt-1">Para quienes buscan y reservan</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-gray-900">$0</span>
              <span className="text-sm text-gray-400">/mes</span>
            </div>
            <ul className="space-y-3 flex-1">
              {[
                'Búsqueda ilimitada',
                'Reservas instantáneas',
                'Chat con suplidores',
                'Pago seguro integrado',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#7C3AED]" />
                  <span className="text-sm text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sign-up"
              className="block text-center py-3 px-6 rounded-xl font-semibold text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            >
              Crear cuenta gratis
            </Link>
          </div>

          {/* Suplidor plan */}
          <div className="relative bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-3xl p-8 flex flex-col gap-6 shadow-2xl scale-105">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-xs font-bold px-4 py-1 rounded-full">
              MÁS POPULAR
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {suplidorPlan?.name ?? 'Suplidor'}
              </h2>
              <p className="text-sm text-white/70 mt-1">Para suplidores que inician</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-white">
                ${((suplidorPrice?.unitAmount ?? 2900) / 100).toFixed(0)}
              </span>
              <span className="text-sm text-white/60">
                /{suplidorPrice?.interval ?? 'mes'}
              </span>
            </div>
            <ul className="space-y-3 flex-1">
              {[
                'Hasta 3 listings activos',
                'Analytics básicos',
                'Perfil verificado',
                'Soporte por email',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#F97316]" />
                  <span className="text-sm text-white/90">{f}</span>
                </li>
              ))}
            </ul>
            <form action={checkoutAction}>
              <input type="hidden" name="priceId" value={suplidorPrice?.id} />
              <SubmitButton />
            </form>
          </div>

          {/* Pro plan */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {proPlan?.name ?? 'Pro'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Para suplidores que escalan</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-gray-900">
                ${((proPrice?.unitAmount ?? 7900) / 100).toFixed(0)}
              </span>
              <span className="text-sm text-gray-400">/{proPrice?.interval ?? 'mes'}</span>
            </div>
            <ul className="space-y-3 flex-1">
              {[
                'Listings ilimitados',
                'Posición destacada en búsquedas',
                'Analytics avanzados',
                'Soporte prioritario 24/7',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#7C3AED]" />
                  <span className="text-sm text-gray-700">{f}</span>
                </li>
              ))}
            </ul>
            <form action={checkoutAction}>
              <input type="hidden" name="priceId" value={proPrice?.id} />
              <SubmitButton />
            </form>
          </div>
        </div>

        {/* FAQ teaser */}
        <p className="text-center mt-12 text-sm text-gray-400">
          ¿Tienes dudas?{' '}
          <Link href="#contacto" className="text-[#7C3AED] hover:underline">
            Escríbenos
          </Link>{' '}
          y te ayudamos a elegir el plan adecuado.
        </p>
      </div>
    </main>
  );
}

'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, Star, Eye, Clock } from 'lucide-react';
import { mockBookings, weeklyRevenue } from '@/lib/mock-data';

const MapView = dynamic(() => import('@/components/map/MapClient'), { ssr: false });

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

export default function SupplierDashboardPage() {
  const upcomingBookings = mockBookings.filter((b) => b.status === 'pending' || b.status === 'confirmed');
  const monthlyRevenue = weeklyRevenue.reduce((s, d) => s + d.amount, 0);
  const activeBookings = upcomingBookings.length;
  const avgRating = 4.8;
  const profileViews = 342;

  const kpis = [
    {
      label: 'Ingresos del mes',
      value: `DOP ${monthlyRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: '#7C3AED',
      bg: '#EDE9FE'
    },
    {
      label: 'Reservas activas',
      value: activeBookings.toString(),
      icon: Users,
      color: '#F97316',
      bg: '#FFF7ED'
    },
    {
      label: 'Rating promedio',
      value: `⭐ ${avgRating}`,
      icon: Star,
      color: '#FBBF24',
      bg: '#FFFBEB'
    },
    {
      label: 'Vistas al perfil',
      value: profileViews.toString(),
      icon: Eye,
      color: '#3B82F6',
      bg: '#EFF6FF'
    }
  ];

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Resumen de tu actividad en TalentHub</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
              </div>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Ingresos — últimos 7 días</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyRevenue} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v: any) => [`DOP ${Number(v).toLocaleString()}`, 'Ingresos']}
                contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#7C3AED"
                strokeWidth={2.5}
                fill="url(#grad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Mapa */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Mi ubicación</h2>
          <div className="flex-1 min-h-[200px] rounded-xl overflow-hidden">
            <MapView
              singlePin={{ lat: 18.4861, lng: -69.9312, label: 'Mi negocio', color: '#7C3AED' }}
              center={[18.4861, -69.9312]}
              zoom={14}
            />
          </div>
        </div>
      </div>

      {/* Upcoming bookings */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Próximas reservas</h2>
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{upcomingBookings.length} activas</span>
        </div>
        {upcomingBookings.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tienes reservas próximas</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {upcomingBookings.map((b) => (
              <div key={b.id} className="px-5 py-4 flex items-center gap-4">
                <img src={b.clientAvatar} alt={b.clientName} className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{b.clientName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{b.listingName}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(b.date + 'T12:00:00').toLocaleDateString('es-DO', { month: 'short', day: 'numeric' })}
                    {b.time && ` · ${b.time}`}
                  </p>
                  <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[b.status]}`}>
                    {STATUS_LABEL[b.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

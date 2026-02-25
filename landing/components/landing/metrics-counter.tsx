'use client';

import { useEffect, useRef, useState } from 'react';

interface Metric {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const metrics: Metric[] = [
  {
    value: 2400,
    suffix: '+',
    label: 'Talentos registrados',
    description: 'Fotógrafos, músicos, chefs y más',
  },
  {
    value: 800,
    suffix: '+',
    label: 'Espacios disponibles',
    description: 'Salones, rooftops, estudios y más',
  },
  {
    value: 150,
    suffix: '+',
    label: 'Medios publicitarios',
    description: 'Vallas, digital, podcasts y más',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfacción',
    description: 'Clientes satisfechos',
  },
];

function useCountUp(target: number, duration = 2000, started = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

function MetricCard({ metric }: { metric: Metric }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(metric.value, 2000, started);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-5xl font-extrabold text-white tabular-nums">
        {count.toLocaleString('es-DO')}
        {metric.suffix}
      </div>
      <div className="mt-2 text-base font-semibold text-white/90">{metric.label}</div>
      <div className="mt-1 text-sm text-white/60">{metric.description}</div>
    </div>
  );
}

export default function MetricsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#7C3AED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">TalentHub en números</h2>
          <p className="mt-4 text-lg text-white/70">
            La plataforma líder de talento, espacios y publicidad en República Dominicana
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-8">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}

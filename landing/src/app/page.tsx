export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        TalentHub
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Conecta talento con oportunidades.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="#"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          Comenzar
        </a>
        <a
          href="#"
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
        >
          Saber más
        </a>
      </div>
    </main>
  );
}

export default function DashboardHome() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-sm flex flex-col p-6 gap-4">
        <h1 className="text-xl font-bold text-indigo-600">TalentHub</h1>
        <nav className="flex flex-col gap-2 mt-4">
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
            Dashboard
          </a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
            Usuarios
          </a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
            Suplidores
          </a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
            Reportes
          </a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">
            Configuración
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="mt-2 text-gray-500">Bienvenido al backoffice de TalentHub.</p>
      </main>
    </div>
  );
}

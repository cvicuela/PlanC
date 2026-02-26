import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import AppSidebar from '@/components/ui/AppNav/AppSidebar';
import BottomNav from '@/components/ui/AppNav/BottomNav';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const role: string = user.user_metadata?.role ?? 'user';

  return (
    <div className="flex h-dvh overflow-hidden bg-gray-50 text-gray-900 dashboard-root">
      <AppSidebar role={role} userEmail={user.email} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</main>
        <BottomNav role={role} />
      </div>
    </div>
  );
}

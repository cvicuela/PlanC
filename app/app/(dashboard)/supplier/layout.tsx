import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function SupplierLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect('/signin');

  const role = user.user_metadata?.role ?? 'user';
  if (role !== 'supplier') redirect('/explore');

  return <>{children}</>;
}

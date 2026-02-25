import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: unknown = body?.email;

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 });
    }

    const normalised = email.toLowerCase().trim();

    // Dynamic import so the build doesn't fail when DB isn't configured
    const { db } = await import('@/lib/db/drizzle');
    const { waitlist } = await import('@/lib/db/schema');

    await db.insert(waitlist).values({ email: normalised, source: 'landing' });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);

    // Duplicate email (Postgres unique violation code 23505)
    if (msg.includes('23505') || msg.toLowerCase().includes('unique')) {
      return NextResponse.json(
        { error: 'Este email ya está registrado.' },
        { status: 409 }
      );
    }

    console.error('[/api/waitlist]', msg);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}

import Link from 'next/link';
import { BookHeart } from 'lucide-react';

export default function TherapistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/therapist" className="flex items-center gap-2 font-semibold">
          <BookHeart className="h-6 w-6 text-primary" />
          <span className="">Yurnal Terapia - Portal de Terapeutas</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}

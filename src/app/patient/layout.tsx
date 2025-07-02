'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pencil, BookOpen, Sparkles, Lock, BookHeart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserNav } from '@/components/user-nav';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/patient/today', label: 'Hoy', icon: Pencil },
  { href: '/patient/journal', label: 'Diario', icon: BookOpen },
  { href: '/patient/reflections', label: 'Reflexiones', icon: Sparkles },
  { href: '/patient/my-therapist', label: 'Mi Terapeuta', icon: Users },
];

const pageTitles: { [key: string]: string } = {
  '/patient/today': 'Tu Entrada de Hoy',
  '/patient/journal': 'Tu Diario',
  '/patient/reflections': 'Tus Reflexiones',
  '/patient/my-therapist': 'Tu Terapeuta',
};

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || 'Yurnal Terapia';

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/patient/today" className="flex items-center gap-2 font-semibold">
            <BookHeart className="h-6 w-6 text-primary" />
            <span className="">Yurnal Terapia</span>
          </Link>
        </div>
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                { 'bg-muted text-primary': pathname === item.href }
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex-1" />
        <Separator className='mx-4' />
        <div className="p-4">
            <div className="flex items-center justify-center text-xs text-muted-foreground">
                <Lock className="mr-2 h-4 w-4" />
                <span>Encriptación de Extremo a Extremo</span>
            </div>
        </div>
      </aside>

      <div className="flex flex-col sm:pl-60">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <h1 className="flex-1 text-xl font-semibold">{pageTitle}</h1>
            <UserNav />
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

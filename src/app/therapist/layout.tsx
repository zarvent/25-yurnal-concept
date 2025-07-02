'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, Settings, BookHeart, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserNav } from '@/components/user-nav';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/therapist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/therapist/patients', label: 'Pacientes', icon: Users },
  { href: '/therapist/schedule', label: 'Agenda', icon: Calendar },
  { href: '/therapist/settings', label: 'Ajustes', icon: Settings },
];

const pageTitles: { [key: string]: string } = {
  '/therapist/dashboard': 'Dashboard',
  '/therapist/patients': 'Mis Pacientes',
  '/therapist/schedule': 'Mi Agenda',
  '/therapist/settings': 'Ajustes',
};

export default function TherapistLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || 'Portal de Terapeuta';

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/therapist/dashboard" className="flex items-center gap-2 font-semibold">
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
                { 'bg-muted text-primary': pathname.startsWith(item.href) }
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
            <div className="flex items-center justify-center text-center text-xs text-muted-foreground">
                <Lock className="mr-2 h-4 w-4 flex-shrink-0" />
                <span>Plataforma segura y profesional.</span>
            </div>
        </div>
      </aside>

      <div className="flex flex-col sm:pl-60">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <h1 className="flex-1 text-xl font-semibold">{pageTitle}</h1>
            <UserNav />
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
        <footer className="text-center p-4 text-xs text-muted-foreground border-t bg-background">
          <strong>Recurso Profesional:</strong> Esta plataforma es una herramienta de apoyo. En caso de una emergencia de un paciente, guíalo hacia los servicios de emergencia apropiados.
        </footer>
      </div>
    </div>
  );
}

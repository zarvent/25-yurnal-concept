'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Network, Library, BookUser, BookHeart, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserNav } from '@/components/user-nav';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/courses', label: 'Rutas de Aprendizaje', icon: Network },
  { href: '/student/library', label: 'Biblioteca', icon: Library },
  { href: '/student/my-journal', label: 'Mi Diario', icon: BookUser },
];

const pageTitles: { [key: string]: string } = {
  '/student/dashboard': 'Dashboard Académico',
  '/student/articles': 'Artículos de Divulgación',
  '/student/courses': 'Rutas de Aprendizaje',
  '/student/library': 'Biblioteca de Tesis y Papers',
  '/student/my-journal': 'Mi Diario Personal',
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || 'Yurnal Academic';

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/student/dashboard" className="flex items-center gap-2 font-semibold">
            <BookHeart className="h-6 w-6 text-primary" />
            <span className="">Yurnal Academic</span>
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
                <span>Potenciando el conocimiento en psicología.</span>
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
          <strong>Recurso Educativo:</strong> La información aquí presentada es para fines educativos y no debe ser usada para autodiagnóstico. Si necesitas apoyo, busca a un profesional de la salud mental calificado.
        </footer>
      </div>
    </div>
  );
}

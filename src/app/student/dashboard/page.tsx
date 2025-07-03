import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Library, Network, Newspaper, Search } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12 p-4 md:p-6 lg:p-8">
      <div className="col-span-12 flex flex-col gap-2 mb-2">
        <h1 className="h1 font-bold tracking-tight mb-1">Bienvenido a Yurnal Academic</h1>
        <p className="body text-neutral-medium">Tu centro de conocimiento psicológico. Empieza a explorar.</p>
      </div>
      <div className="col-span-12 relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-medium" />
        <Input placeholder="Busca en toda la biblioteca..." className="pl-10 text-lg h-12" />
      </div>
      <Card className="flex flex-col col-span-12 md:col-span-6 lg:col-span-4">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-md">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Psicología para Todos</CardTitle>
          </div>
          <CardDescription className="pt-2">
            Artículos y contenido de divulgación en lenguaje sencillo para el público general y aprendices curiosos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <div className="p-6 pt-0">
          <Button asChild className="w-full">
            <Link href="/student/articles">Explorar Artículos</Link>
          </Button>
        </div>
      </Card>
      <Card className="flex flex-col col-span-12 md:col-span-6 lg:col-span-4">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-md">
              <Library className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Biblioteca Académica</CardTitle>
          </div>
          <CardDescription className="pt-2">
            El núcleo freemium. Accede al repositorio de tesis, disertaciones y papers de acceso abierto.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <div className="p-6 pt-0">
          <Button asChild className="w-full">
            <Link href="/student/library">Ir a la Biblioteca</Link>
          </Button>
        </div>
      </Card>
      <Card className="flex flex-col col-span-12 md:col-span-6 lg:col-span-4">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-md">
              <Network className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Rutas de Aprendizaje</CardTitle>
          </div>
          <CardDescription className="pt-2">
            Sigue rutas de aprendizaje guiadas que combinan teoría y práctica para una formación integral.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow" />
        <div className="p-6 pt-0">
          <Button asChild className="w-full" variant="secondary">
            <Link href="/student/courses">Explorar Rutas</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

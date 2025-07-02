import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Newspaper, Library, School, Search } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido a Yurnal Academic</h1>
        <p className="text-muted-foreground">Tu centro de conocimiento psicológico. Empieza a explorar.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Busca en toda la biblioteca..." className="pl-10 text-lg h-12" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
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
          <CardContent className="flex-grow"/>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
                <Link href="/student/articles">Explorar Artículos</Link>
            </Button>
          </div>
        </Card>
        
        <Card className="flex flex-col">
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
          <CardContent className="flex-grow"/>
          <div className="p-6 pt-0">
            <Button asChild className="w-full">
                <Link href="/student/library">Ir a la Biblioteca</Link>
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-md">
                <School className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Formación Profesional</CardTitle>
            </div>
            <CardDescription className="pt-2">
              Cursos, workshops y rutas de certificación para profesionales que buscan especialización y desarrollo continuo.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow"/>
          <div className="p-6 pt-0">
            <Button asChild className="w-full" variant="secondary">
                <Link href="/student/courses">Ver Cursos</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookHeart, User, Stethoscope } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="flex flex-col items-center text-center mb-10">
        <BookHeart className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Bienvenido a Yurnal Terapia
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mt-4">
          El espacio seguro y colaborativo donde la introspección personal y la terapia profesional se encuentran para potenciar tu bienestar.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="flex flex-col">
          <CardHeader className="text-center">
            <User className="h-10 w-10 mx-auto text-primary mb-3" />
            <CardTitle className="text-2xl">Para Pacientes</CardTitle>
            <CardDescription>
              Continúa tu viaje de autoconocimiento con el apoyo de un profesional.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow text-center">
            <p className="mb-6 text-muted-foreground">
              Comparte tus reflexiones de forma segura y enriquece tus sesiones de terapia.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild size="lg" className="w-full">
              <Link href="/patient/today">Entrar a mi espacio</Link>
            </Button>
          </div>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="text-center">
            <Stethoscope className="h-10 w-10 mx-auto text-primary mb-3" />
            <CardTitle className="text-2xl">Para Terapeutas</CardTitle>
            <CardDescription>
              Optimiza tu práctica con insights valiosos de tus pacientes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow text-center">
            <p className="mb-6 text-muted-foreground">
              Gestiona citas, comunícate de forma segura y ofrece un cuidado más conectado.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/therapist/dashboard">Acceder a mi portal</Link>
            </Button>
          </div>
        </Card>
      </div>
      <footer className="absolute bottom-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Yurnal Terapia. Todos los derechos reservados.
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { BookHeart, User, GraduationCap, HeartHandshake, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const roles = [
    {
      icon: <User className="h-8 w-8 text-primary" />,
      title: 'Para uso personal',
      description: 'Un espacio seguro para la introspección y el crecimiento personal.',
      href: '/patient/onboarding',
      cta: 'Empezar mi viaje',
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: 'Como estudiante',
      description: 'Un recurso para conectar la teoría de la psicología con la práctica.',
      href: '/academic/onboarding',
      cta: 'Iniciar aprendizaje',
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-primary" />,
      title: 'Como terapeuta',
      description: 'Una plataforma para potenciar tu práctica clínica y apoyar a tus pacientes.',
      href: '/therapist/onboarding',
      cta: 'Acceder al portal',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 sm:p-8 animate-fade-in">
      <header className="text-center mb-10">
        <BookHeart className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Bienvenido a Yurnal
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-4">
          Un espacio seguro, diseñado para ti y conectar con tu bienestar.
        </p>
      </header>

      <main className="w-full max-w-5xl">
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">¿Qué camino eliges hoy?</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
            {roles.map((role) => (
              <Link href={role.href} key={role.title} passHref>
                <div className="p-6 rounded-lg border-2 border-transparent bg-card hover:border-primary/50 transition-all h-full flex flex-col text-center items-center cursor-pointer shadow-sm hover:shadow-md">
                  {role.icon}
                  <h3 className="font-semibold text-lg mt-4">{role.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 flex-grow">{role.description}</p>
                  <Button variant="link" className="mt-4 p-0 h-auto text-base">
                    {role.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </CardContent>
          <CardFooter className="flex-col items-center justify-center pt-4">
             <Button variant="ghost" asChild className="text-sm text-muted-foreground hover:bg-transparent">
                <Link href="/business">
                    ¿Buscas una solución para tu empresa?
                </Link>
             </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="mt-12 text-center text-xs text-muted-foreground">
        <p>© {year} Yurnal. Todos los derechos reservados.</p>
        <p>Zarvent Labs - Cesar Sebastian Zambrana Ventura</p>
      </footer>
    </div>
  );
}

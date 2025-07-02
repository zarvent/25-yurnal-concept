'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookHeart, User, Stethoscope, GraduationCap, Briefcase } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="flex flex-col items-center text-center mb-10">
        <BookHeart className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Bienvenido a Yurnal
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mt-4">
          Un ecosistema para el bienestar y el conocimiento. Conecta contigo mismo, con profesionales y con el saber de la psicología.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-screen-xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader className="text-center">
            <User className="h-10 w-10 mx-auto text-primary mb-3" />
            <CardTitle className="text-2xl">Para Pacientes</CardTitle>
            <CardDescription>
              Tu espacio seguro para la introspección y el crecimiento personal.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow text-center">
            <p className="mb-6 text-muted-foreground">
              Escribe en tu diario, descubre patrones y, si lo deseas, comparte tus reflexiones con tu terapeuta.
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
              Optimiza tu práctica con insights valiosos y herramientas digitales.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow text-center">
            <p className="mb-6 text-muted-foreground">
              Gestiona pacientes, comunícate de forma segura y ofrece un cuidado más conectado.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/therapist/dashboard">Acceder a mi portal</Link>
            </Button>
          </div>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="text-center">
            <GraduationCap className="h-10 w-10 mx-auto text-primary mb-3" />
            <CardTitle className="text-2xl">Para Estudiantes</CardTitle>
            <CardDescription>
              Democratizamos el acceso al conocimiento en psicología.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow text-center">
            <p className="mb-6 text-muted-foreground">
              Explora una vasta biblioteca de tesis, artículos y cursos para potenciar tu formación.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild size="lg" className="w-full">
              <Link href="/student/dashboard">Explorar Yurnal Academic</Link>
            </Button>
          </div>
        </Card>
         <Card className="flex flex-col">
          <CardHeader className="text-center">
            <Briefcase className="h-10 w-10 mx-auto text-primary mb-3" />
            <CardTitle className="text-2xl">Para Empresas</CardTitle>
            <CardDescription>
              Bienestar mental como beneficio corporativo. (Próximamente)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow text-center">
            <p className="mb-6 text-muted-foreground">
              Ofrece Yurnal a tu equipo y obtén insights anónimos para mejorar la salud organizacional.
            </p>
          </CardContent>
          <div className="p-6 pt-0">
            <Button asChild size="lg" variant="secondary" className="w-full">
              <Link href="/business">Conocer más</Link>
            </Button>
          </div>
        </Card>
      </div>
      <footer className="mt-12 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Yurnal. Todos los derechos reservados.
      </footer>
    </div>
  );
}

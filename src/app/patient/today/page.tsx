'use client';

import { JournalEditor } from '@/components/journal-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TodayPage() {
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState('');

  // Using useEffect to set dynamic content on the client-side to avoid hydration errors.
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Buenos días');
    } else if (hour < 19) {
      setGreeting('Buenas tardes');
    } else {
      setGreeting('Buenas noches');
    }

    const motivationalQuotes = [
      "La única persona que estás destinado a ser es la persona que decides ser.",
      "El autoconocimiento es el primer paso hacia la automejora.",
      "Cada día es una nueva oportunidad para cambiar tu vida.",
      "El cuidado personal es cómo recuperas tu poder.",
      "No tienes que ver toda la escalera, solo da el primer paso.",
      "Tu viaje interior es la aventura más importante que emprenderás."
    ];
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{greeting && `${greeting}, bienvenido a tu espacio.`}</h1>
        <p className="text-muted-foreground mt-1">{quote || ' '}</p>
      </div>

      <JournalEditor />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span>Análisis de Patrones</span>
            </CardTitle>
            <CardDescription>
              Descubre patrones y temas profundos en tus entradas con análisis de IA.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/patient/reflections">
                Generar Análisis <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <span>Biblioteca de Habilidades</span>
            </CardTitle>
            <CardDescription>
              Explora ejercicios prácticos para manejar tus emociones y pensamientos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="/patient/tools">
                Explorar Herramientas <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

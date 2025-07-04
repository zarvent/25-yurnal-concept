'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb, HeartPulse, Sparkles, Wand2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const intentions = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Entenderme mejor',
    description: 'Ordenar mis pensamientos y emociones.',
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: 'Manejar emociones',
    description: 'Aprender a navegar la ansiedad, el estrés o la tristeza.',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Desarrollar hábitos',
    description: 'Fomentar la gratitud, el mindfulness y el autocuidado.',
  },
  {
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    title: 'Solo estoy explorando',
    description: 'Descubrir qué puede ofrecerme Yurnal.',
  },
];

export default function PatientOnboardingPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 sm:p-8 animate-fade-in">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          ¿Qué te trae a tu santuario digital?
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Seleccionar tu intención principal nos ayuda a personalizar tu viaje.
        </p>
      </div>

      <main className="w-full max-w-4xl mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {intentions.map((item) => (
            <Card
              key={item.title}
              onClick={() => setSelected(item.title)}
              className={cn(
                'p-6 rounded-lg border-2 bg-card hover:bg-muted/50 transition-all cursor-pointer text-center shadow-sm hover:shadow-md',
                selected === item.title ? 'border-primary shadow-lg' : 'border-border'
              )}
            >
              <div className="flex flex-col items-center gap-4">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <footer className="mt-10 w-full max-w-4xl flex justify-end">
        <Button asChild size="lg" disabled={!selected}>
          <Link href="/patient/today">
            Continuar <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </footer>
    </div>
  );
}

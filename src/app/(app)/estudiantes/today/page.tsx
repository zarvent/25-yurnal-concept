import { JournalEditor } from '@/components/journal-editor';
import { ActionCard } from '@/components/patient/action-card';
import { GreetingSection } from '@/components/patient/greeting-section';
import { Lightbulb, Wrench } from 'lucide-react';

export default function TodayPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <GreetingSection />

      <JournalEditor />

      <div className="grid gap-6 md:grid-cols-2">
        <ActionCard
          icon={<Lightbulb className="h-5 w-5 text-primary" />}
          title="Análisis de Patrones"
          description="Descubre patrones y temas profundos en tus entradas con análisis de IA."
          link="/patient/reflections"
          linkText="Generar Análisis"
        />
        <ActionCard
          icon={<Wrench className="h-5 w-5 text-primary" />}
          title="Biblioteca de Habilidades"
          description="Explora ejercicios prácticos para manejar tus emociones y pensamientos."
          link="/patient/tools"
          linkText="Explorar Herramientas"
        />
      </div>
    </div>
  );
}

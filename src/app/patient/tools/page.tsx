'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckSquare,
  Target,
  MessageSquare,
  Hand,
  Wind,
  ClipboardList,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const initialTools = [
  {
    id: '1',
    title: 'Verificar los Hechos',
    description:
      'Separa los hechos de las interpretaciones para ver si tu emoción encaja con la realidad.',
    icon: <CheckSquare className="h-8 w-8 text-primary" />,
    framework: 'TDC',
    frameworkId: 'tdc',
    comingSoon: true,
  },
  {
    id: '2',
    title: 'Resolución de Problemas',
    description:
      'Define un problema, genera soluciones y crea un plan de acción concreto para resolverlo.',
    icon: <Target className="h-8 w-8 text-primary" />,
    framework: 'TCC',
    frameworkId: 'tcc',
    comingSoon: true,
  },
  {
    id: '3',
    title: 'Planificador DEAR MAN',
    description:
      'Estructura una conversación difícil para pedir lo que quieres o decir no de forma asertiva.',
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    framework: 'TDC',
    frameworkId: 'tdc',
    comingSoon: true,
  },
  {
    id: '4',
    title: 'Habilidad STOP',
    description:
      'Una pausa de emergencia para detenerte antes de actuar por un impulso que podrías lamentar.',
    icon: <Hand className="h-8 w-8 text-primary" />,
    framework: 'TDC',
    frameworkId: 'tdc',
    comingSoon: true,
  },
  {
    id: '5',
    title: 'Habilidad TIP',
    description:
      'Cambia tu fisiología corporal rápidamente para reducir el malestar extremo en momentos de crisis.',
    icon: <Wind className="h-8 w-8 text-primary" />,
    framework: 'TDC',
    frameworkId: 'tdc',
    comingSoon: true,
  },
  {
    id: '6',
    title: 'Registros de Habilidades',
    description:
      'Lleva un registro de la práctica de tus habilidades para monitorizar tu progreso y auto-conocimiento.',
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    framework: 'TDC',
    frameworkId: 'tdc',
    comingSoon: true,
  },
];

const frameworkInfo: {
  [key: string]: {
    name: string;
    title: string;
    coreIdea: string;
    analogy: string;
    mainBenefit: string;
  };
} = {
  tdc: {
    name: 'Terapia Dialéctico Conductual',
    title: '¿Qué es la TDC?',
    coreIdea:
      "Es como un entrenamiento para convertirte en un 'atleta emocional'. Te da habilidades prácticas para manejar emociones intensas, mejorar tus relaciones y construir una vida que sientas que vale la pena vivir.",
    analogy:
      'Imagina que tus emociones son como el clima: a veces hay tormentas. La TDC no te enseña a detener la lluvia, sino a construir un refugio sólido y a aprender a navegar la tormenta sin que te arrastre.',
    mainBenefit:
      'Aprenderás a calmarte en momentos de crisis, a comunicarte mejor para que te entiendan y a equilibrar la aceptación de quién eres con tus metas de cambio.',
  },
  tcc: {
    name: 'Terapia Cognitivo-Conductual',
    title: '¿Qué es la TCC?',
    coreIdea:
      'Es como aprender a ser un detective de tu propia mente. Se basa en la idea de que no son las situaciones las que te perturban, sino lo que piensas sobre ellas.',
    analogy:
      "Si usas unas gafas con el cristal manchado, verás el mundo borroso. La TCC te ayuda a limpiar esas 'gafas mentales' para ver las situaciones con más claridad, cambiando cómo te sientes y actúas.",
    mainBenefit:
      'Aprenderás a identificar y desafiar pensamientos automáticos que te causan malestar, rompiendo ciclos de ansiedad o tristeza y desarrollando formas de pensar más útiles y saludables.',
  },
};

type Tool = typeof initialTools[number];

function SortableToolCard({ tool }: { tool: Tool }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: tool.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const info = frameworkInfo[tool.frameworkId as keyof typeof frameworkInfo];

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card key={tool.title} className="flex flex-col h-full cursor-grab active:cursor-grabbing">
        <CardHeader>
          <div className="flex items-center justify-between">
            {tool.icon}
            {info ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                    {tool.framework}
                  </Badge>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{info.title}</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 space-y-4 text-sm">
                    <div>
                        <h3 className="font-semibold text-foreground">Idea Central</h3>
                        <p className="text-muted-foreground">{info.coreIdea}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Analogía</h3>
                        <p className="text-muted-foreground">{info.analogy}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Beneficio Principal</h3>
                        <p className="text-muted-foreground">{info.mainBenefit}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Badge variant="outline">{tool.framework}</Badge>
            )}
          </div>
          <CardTitle className="pt-4">{tool.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">
            {tool.description}
          </p>
        </CardContent>
        <CardFooter>
          <Button disabled={tool.comingSoon} className="w-full">
            {tool.comingSoon ? 'Próximamente' : 'Empezar'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function ToolsPage() {
  const [tools, setTools] = useState(initialTools);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      setTools((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Biblioteca de Habilidades
        </h1>
        <p className="text-muted-foreground">
          Una colección de ejercicios interactivos basados en marcos
          terapéuticos validados. Arrastra y suelta para organizar las herramientas según tu preferencia.
        </p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={tools.map(t => t.id)}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <SortableToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

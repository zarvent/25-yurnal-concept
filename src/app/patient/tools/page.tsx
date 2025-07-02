import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Target, MessageSquare, Hand, Wind, ClipboardList } from 'lucide-react';

const tools = [
  {
    title: 'Verificar los Hechos',
    description: 'Separa los hechos de las interpretaciones para ver si tu emoción encaja con la realidad.',
    icon: <CheckSquare className="h-8 w-8 text-primary" />,
    comingSoon: true,
  },
  {
    title: 'Resolución de Problemas',
    description: 'Define un problema, genera soluciones y crea un plan de acción concreto para resolverlo.',
    icon: <Target className="h-8 w-8 text-primary" />,
    comingSoon: true,
  },
  {
    title: 'Planificador DEAR MAN',
    description: 'Estructura una conversación difícil para pedir lo que quieres o decir no de forma asertiva.',
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    comingSoon: true,
  },
  {
    title: 'Habilidad STOP',
    description: 'Una pausa de emergencia para detenerte antes de actuar por un impulso que podrías lamentar.',
    icon: <Hand className="h-8 w-8 text-primary" />,
    comingSoon: true,
  },
  {
    title: 'Habilidad TIP',
    description: 'Cambia tu fisiología corporal rápidamente para reducir el malestar extremo en momentos de crisis.',
    icon: <Wind className="h-8 w-8 text-primary" />,
    comingSoon: true,
  },
  {
    title: 'Registros de Habilidades',
    description: 'Lleva un registro de la práctica de tus habilidades para monitorizar tu progreso y auto-conocimiento.',
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    comingSoon: true,
  },
];


export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Caja de Herramientas DBT</h1>
        <p className="text-muted-foreground">
          Una biblioteca de habilidades interactivas para entrenar tu mente y regular tus emociones.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
              {tool.icon}
              <div className="flex-1">
                <CardTitle>{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </CardContent>
            <CardFooter>
              <Button disabled={tool.comingSoon} className="w-full">
                {tool.comingSoon ? 'Próximamente' : 'Empezar'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

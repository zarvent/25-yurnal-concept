'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Bed,
  BrainCircuit,
  CheckSquare,
  Hand,
  HeartPulse,
  MessageSquare,
  Search,
  Smile,
  Wind
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

// Based on M1.1 Requerimientos Backend (Revisados)
const toolsData = [
  {
    id: '1',
    title: 'Verificar los Hechos',
    description: 'Separa los hechos de las interpretaciones para ver si tu emoción encaja con la realidad.',
    icon: CheckSquare,
    category: 'cbt',
    riskLevel: 'low',
    usageCount: 120,
    authorName: 'TerapiaDDC',
  },
  {
    id: '2',
    title: 'Respiración Diafragmática',
    description: 'Calma tu sistema nervioso en momentos de estrés agudo a través de la respiración profunda.',
    icon: Wind,
    category: 'anxiety',
    riskLevel: 'low',
    usageCount: 250,
    authorName: 'Yurnal Mente',
  },
  {
    id: '3',
    title: 'Planificador DEAR MAN',
    description: 'Estructura una conversación difícil para pedir lo que quieres o decir no de forma asertiva.',
    icon: MessageSquare,
    category: 'cbt',
    riskLevel: 'medium',
    usageCount: 85,
    authorName: 'TerapiaDDC',
  },
  {
    id: '4',
    title: 'Habilidad STOP',
    description: 'Una pausa de emergencia para detenerte antes de actuar por un impulso que podrías lamentar.',
    icon: Hand,
    category: 'stress-management',
    riskLevel: 'medium',
    usageCount: 150,
    authorName: 'TerapiaDDC',
  },
  {
    id: '5',
    title: 'Diario de Gratitud Guiado',
    description: 'Enfoca tu atención en lo positivo para mejorar tu estado de ánimo y perspectiva general.',
    icon: Smile,
    category: 'mindfulness',
    riskLevel: 'low',
    usageCount: 300,
    authorName: 'Yurnal Mente',
  },
  {
    id: '6',
    title: 'Reestructuración Cognitiva',
    description: 'Identifica y desafía pensamientos automáticos negativos para desarrollar una visión más equilibrada.',
    icon: BrainCircuit,
    category: 'cbt',
    riskLevel: 'high',
    usageCount: 95,
    authorName: 'Dr. Aaron Beck',
  },
  {
    id: '7',
    title: 'Escaneo Corporal',
    description: 'Una meditación guiada para conectar con tu cuerpo y liberar tensiones físicas.',
    icon: HeartPulse,
    category: 'mindfulness',
    riskLevel: 'low',
    usageCount: 180,
    authorName: 'Yurnal Mente',
  },
  {
    id: '8',
    title: 'Higiene del Sueño',
    description: 'Un checklist de hábitos para mejorar la calidad y la consistencia de tu descanso nocturno.',
    icon: Bed,
    category: 'sleep',
    riskLevel: 'low',
    usageCount: 110,
    authorName: 'Centro del Sueño',
  },
];

const categories = {
  all: 'Todas',
  mindfulness: 'Mindfulness',
  anxiety: 'Ansiedad',
  cbt: 'TCC',
  sleep: 'Sueño',
  'stress-management': 'Estrés',
};

type ToolCategory = keyof typeof categories;


function ToolCard({ tool }: { tool: (typeof toolsData)[number] }) {
  const riskStyles = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };
  const riskLabels = {
    low: 'Para todos',
    medium: 'Usar con guía',
    high: 'Avanzada',
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <tool.icon className="h-10 w-10 text-primary" />
          <Badge variant="secondary">{categories[tool.category as ToolCategory]}</Badge>
        </div>
        <CardTitle>{tool.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {tool.description}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <div className="flex justify-between w-full text-xs text-muted-foreground">
          <span>Por: {tool.authorName}</span>
          <Badge className={cn('text-xs', riskStyles[tool.riskLevel as keyof typeof riskStyles])} variant="outline">
            {riskLabels[tool.riskLevel as keyof typeof riskLabels]}
          </Badge>
        </div>
        <Button asChild className="w-full">
          <Link href={`/patient/tools/${tool.id}`}>
            Ver Herramienta <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');

  const filteredTools = useMemo(() => {
    return toolsData.filter(tool => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => b.usageCount - a.usageCount);
  }, [searchTerm, activeCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Marketplace de Herramientas
        </h1>
        <p className="text-muted-foreground">
          Explora, filtra y encuentra ejercicios prácticos para apoyar tu bienestar.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o descripción..."
            className="pl-10 text-base h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(categories) as ToolCategory[]).map(key => (
            <Button
              key={key}
              variant={activeCategory === key ? 'default' : 'outline'}
              onClick={() => setActiveCategory(key)}
            >
              {categories[key]}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-12">
            <p className="text-lg font-semibold">No se encontraron herramientas</p>
            <p className="text-muted-foreground">Intenta ajustar tu búsqueda o filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}

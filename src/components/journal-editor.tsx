'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useJournal } from '@/hooks/use-journal';
import { useToast } from '@/hooks/use-toast';
import { PartyPopper, Loader2 } from 'lucide-react';

const templates = [
  {
    name: 'Entrada Libre',
    prompt: '¿Qué tienes en mente?',
    content: '',
  },
  {
    name: 'Análisis de un Día Estresante',
    prompt: 'Describe un evento estresante y cómo te hizo sentir.',
    content: 'Hoy fue un día estresante.\n\nEl evento principal fue: \n\nMe sentí: \n\nCómo reaccioné: \n\nQué podría hacer diferente la próxima vez: ',
  },
  {
    name: 'Registro de Gratitud',
    prompt: 'Enumera tres cosas por las que estás agradecido hoy.',
    content: 'Hoy estoy agradecido por:\n\n1. \n2. \n3. \n\nEsto me hizo sentir: ',
  },
  {
    name: 'Técnica CBT (Terapia Cognitivo-Conductual)',
    prompt: 'Identifica un pensamiento negativo y reestructúralo.',
    content: 'Situación: \n\nPensamiento Automático Negativo: \n\nEmociones que sentí: \n\nEvidencia que apoya este pensamiento: \n\nEvidencia que contradice este pensamiento: \n\nPensamiento Alternativo y más equilibrado: ',
  },
  {
    name: 'Verificar los Hechos',
    prompt: 'Separa los hechos de las interpretaciones para ver si tu emoción encaja con la realidad.',
    content: 'Emoción que siento: \nIntensidad (0-100): \n\nEvento Desencadenante (objetivamente): \n\nMis Interpretaciones y Pensamientos: \n\nEvidencia que apoya mi emoción: \n\nEvidencia que NO apoya mi emoción: \n\nUna visión más equilibrada es: \n',
  },
  {
    name: 'Diario de Mindfulness',
    prompt: 'Registra tus prácticas de mindfulness, enfocándote en observar y describir sin juicio.',
    content: 'Actividad Específica:\n\n' +
             'Habilidad Enfocada (Observar/Describir/Ambas):\n\n' +
             'Observaciones (Qué noté: sentidos, pensamientos, emociones, cuerpo - descripción sin juicio):\n\n' +
             'Dificultad / Nivel de Juicio (0-5):\n\n' +
             'Notas/Aprendizajes:\n'
  },
  {
    name: 'Mi Ola Emocional',
    prompt: 'Analiza una emoción intensa para entenderla mejor, desde su origen hasta sus consecuencias.',
    content: 'Evento Desencadenante (¿Qué pasó?):\n\n' +
             'Interpretación (¿Qué pensé sobre el evento?):\n\n' +
             'Emoción Principal (Nombre e intensidad 0-100):\n\n' +
             'Sensaciones Físicas (¿Qué sentí en mi cuerpo?):\n\n' +
             'Impulso de Acción (¿Qué me urgía hacer?):\n\n' +
             'Mi Conducta (¿Qué hice finalmente?):\n\n' +
             'Consecuencias (¿Qué pasó después, a corto y largo plazo?):\n\n' +
             'Reflexión (¿Qué aprendí de esto?):\n'
  },
  {
    name: 'Acción Opuesta',
    prompt: 'Identifica una emoción intensa que no sea eficaz y planifica cómo actuar de forma opuesta para cambiarla.',
    content: 'Situación:\n\n' +
             'Emoción y su intensidad (0-100):\n\n' +
             '¿Está justificada por los hechos? (Sí/No):\n\n' +
             '¿Actuar según la emoción sería eficaz a largo plazo? (Sí/No):\n\n' +
             'Impulso de Acción (¿Qué me pide hacer la emoción?):\n\n' +
             'Acción Opuesta Identificada:\n\n' +
             'Plan detallado para la Acción Opuesta (cuerpo, palabras, pensamientos):\n'
  },
  {
    name: 'Mis Prioridades en la Interacción',
    prompt: 'Antes de una conversación importante, clarifica qué es lo más crucial para ti: el objetivo, la relación o tu autorespeto.',
    content: 'Situación (¿Con quién y sobre qué?):\n\n' +
             '1. Mi Objetivo (Importancia 0-5): \n   Descripción de mi objetivo: \n\n' +
             '2. La Relación (Importancia 0-5): \n   Cómo quiero que quede la relación: \n\n' +
             '3. Mi Autorespeto (Importancia 0-5): \n   Cómo quiero sentirme conmigo mismo/a: \n\n' +
             'Mi Prioridad Principal es: (OBJETIVO / RELACIÓN / AUTORESPETO)\n'
  },
  {
    name: 'Reflexión de Habilidad GIVE',
    prompt: 'Analiza una interacción reciente donde tu prioridad era cuidar la relación y evalúa cómo usaste la habilidad GIVE.',
    content: 'Situación:\n\n' +
             '¿Fui Gentil y respetuoso/a? (Sí/No/Cómo):\n\n' +
             '¿Mostré Interés y escuché? (Sí/No/Cómo):\n\n' +
             '¿Intenté Validar su perspectiva? (Sí/No/Cómo):\n\n' +
             '¿Usé un Tono Amable (Easy Manner)? (Sí/No/Cómo):\n\n' +
             '¿Qué funcionó bien y qué podría mejorar?:\n\n'
  },
  {
    name: 'Análisis de Pros y Contras en Crisis',
    prompt: 'Cuando sientas un impulso dañino, detente y analiza las consecuencias antes de actuar.',
    content: 'Impulso Problemático a Analizar:\n\n\n' +
             '--- PROS de ACTUAR según el impulso (beneficios a corto plazo) ---\n\n\n' +
             '--- CONTRAS de ACTUAR según el impulso (costes a corto y largo plazo) ---\n\n\n' +
             '--- PROS de RESISTIR el impulso (beneficios a largo plazo) ---\n\n\n' +
             '--- CONTRAS de RESISTIR el impulso (dificultades a corto plazo) ---\n'
  }
];

export function JournalEditor() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [content, setContent] = useState(templates[0].content);
  const [isSaving, setIsSaving] = useState(false);
  const { addEntry } = useJournal();
  const { toast } = useToast();

  const handleTemplateChange = (templateName: string) => {
    const template = templates.find((t) => t.name === templateName);
    if (template) {
      setSelectedTemplate(template);
      setContent(template.content);
    }
  };

  const handleSave = () => {
    if (content.trim() === '' || content.trim() === selectedTemplate.content.trim()) {
      toast({
        title: 'Entrada vacía',
        description: 'Por favor, escribe algo antes de guardar.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    // Simular una operación asíncrona para dar feedback visual
    setTimeout(() => {
      addEntry(content, selectedTemplate.name);
      toast({
          title: '¡Entrada Guardada!',
          description: 'Tu reflexión ha sido guardada de forma segura en tu santuario digital.',
          action: <PartyPopper className="h-5 w-5 text-primary" />,
        });
      setContent(selectedTemplate.content);
      setIsSaving(false);
    }, 500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedTemplate.name}</CardTitle>
        <CardDescription>{selectedTemplate.prompt}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={handleTemplateChange} defaultValue={templates[0].name}>
          <SelectTrigger className="w-full md:w-[300px]">
            <SelectValue placeholder="Elige una plantilla..." />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.name} value={template.name}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comienza a escribir aquí..."
          className="min-h-[300px] text-base"
          aria-label="Editor de diario"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isSaving} className="ml-auto">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            'Guardar Entrada'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

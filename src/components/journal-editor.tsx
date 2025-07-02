'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useJournal } from '@/hooks/use-journal';
import { useToast } from '@/hooks/use-toast';
import { PartyPopper } from 'lucide-react';

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
];

export function JournalEditor() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [content, setContent] = useState(templates[0].content);
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
    addEntry(content, selectedTemplate.name);
    toast({
        title: '¡Entrada Guardada!',
        description: 'Tu reflexión ha sido guardada de forma segura.',
        action: <PartyPopper className="h-5 w-5 text-primary" />,
      });
    setContent(selectedTemplate.content);
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
        <Button onClick={handleSave} className="ml-auto">
          Guardar Entrada
        </Button>
      </CardFooter>
    </Card>
  );
}

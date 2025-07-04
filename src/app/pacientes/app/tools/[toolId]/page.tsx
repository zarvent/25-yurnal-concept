import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

// In a real app, this data would be fetched from the backend.
const getToolDetails = (toolId: string) => {
  // Dummy data for demonstration, aligned with the marketplace data
  const tools: { [key: string]: any } = {
    '1': {
      id: '1',
      title: 'Verificar los Hechos',
      description: 'Esta es una habilidad fundamental de la Terapia Dialéctico Conductual (TDC) que te ayuda a reducir el sufrimiento emocional al examinar si tu reacción emocional se ajusta a los hechos de una situación.\n\n### Pasos:\n1.  **Identifica la emoción** que quieres trabajar.\n2.  **Describe el evento** que desencadenó la emoción de forma objetiva, como lo haría una cámara de video.\n3.  **Cuestiona tus interpretaciones**. ¿Qué historias te estás contando sobre el evento?\n4.  **Busca evidencia**. ¿Qué hechos apoyan tu emoción? ¿Qué hechos la contradicen?\n5.  **Considera la intensidad**. ¿La intensidad y duración de tu emoción se ajustan a la situación real?',
      riskLevel: 'low',
    },
    '2': {
      id: '2',
      title: 'Respiración Diafragmática',
      description: 'Una técnica simple pero poderosa para activar la respuesta de relajación del cuerpo.\n\n### Pasos:\n1.  **Ponte cómodo/a**, sentado o acostado.\n2.  **Coloca una mano** en tu pecho y la otra en tu abdomen.\n3.  **Inhala lentamente** por la nariz, sintiendo cómo tu abdomen se expande. El pecho debe moverse muy poco.\n4.  **Exhala lentamente** por la boca, sintiendo cómo tu abdomen se contrae.\n5.  **Repite** durante 3-5 minutos, enfocándote en el ritmo de tu respiración.',
      riskLevel: 'low',
    },
    '6': {
      id: '6',
      title: 'Reestructuración Cognitiva',
      description: 'Aprende a identificar, desafiar y reemplazar tus pensamientos automáticos negativos (PANs).\n\n### Pasos:\n1.  **Identifica la Situación:** ¿Qué estaba pasando cuando comenzaste a sentirte mal?\n2.  **Anota el Pensamiento Automático:** ¿Qué pasó por tu mente exactamente?\n3.  **Evalúa la Emoción:** ¿Qué emoción te provocó ese pensamiento y qué tan intensa fue (0-100)?\n4.  **Encuentra Evidencia en Contra:** ¿Qué hechos o experiencias pasadas contradicen tu pensamiento automático?\n5.  **Crea un Pensamiento Alternativo:** Formula un pensamiento más realista y equilibrado basado en la evidencia.',
      riskLevel: 'high',
    },
  };
  return tools[toolId] || null;
}

export default async function ToolDetailPage({ params }: { params: Promise<{ toolId: string }> }) {
  const resolvedParams = await params;
  const tool = getToolDetails(resolvedParams.toolId);

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h1 className="text-2xl font-bold">Herramienta no encontrada</h1>
        <p className="text-muted-foreground">La herramienta que buscas no existe o ha sido movida.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/patient/tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Marketplace
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Button asChild variant="ghost" className="-ml-4">
          <Link href="/patient/tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Marketplace
          </Link>
        </Button>
      </div>

      {tool.riskLevel === 'high' && (
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Herramienta de Nivel Avanzado</AlertTitle>
          <AlertDescription>
            Esta es una técnica avanzada. Se recomienda usarla bajo la guía de un profesional o si ya tienes experiencia con conceptos similares. Procede con autocompasión.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{tool.title}</CardTitle>
          <CardDescription>Una guía detallada para aplicar esta herramienta en tu vida diaria.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* NOTE: In a real app, this would be rendered from Markdown with a library like react-markdown + DOMPurify for security. */}
          <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
            {tool.description}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center gap-4">
          <Button size="lg" className="w-full">
            <CheckCircle className="mr-2 h-5 w-5" />
            He usado esta herramienta hoy
          </Button>
          <p className="text-xs text-muted-foreground">Marcar como usada ayuda a la IA a entender qué herramientas te son más útiles.</p>
        </CardFooter>
      </Card>
    </div>
  );
}

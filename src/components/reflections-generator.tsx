'use client';

import { useState } from 'react';
import { useJournal } from '@/hooks/use-journal';
import { generateInsights, GenerateInsightsOutput } from '@/ai/flows/generate-insights';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, AlertTriangle, Lightbulb, ThumbsUp, HelpCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function ReflectionsGenerator() {
  const { entries, getEntriesAsText, isLoaded } = useJournal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<GenerateInsightsOutput | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setInsights(null);

    try {
      const journalEntries = getEntriesAsText();
      if (!journalEntries.trim()) {
        setError('No hay suficientes entradas en el diario para generar una reflexión. Escribe un poco más y vuelve a intentarlo.');
        setIsLoading(false);
        return;
      }
      const result = await generateInsights({ journalEntries });
      setInsights(result);
    } catch (err) {
      console.error(err);
      setError('Hubo un error al generar tus reflexiones. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generador de Reflexiones</CardTitle>
        <CardDescription>
          Descubre patrones en tus entradas con la ayuda de nuestro asistente de IA.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 min-h-[250px]">
        <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Aviso Importante: Asistente Analítico</AlertTitle>
            <AlertDescription>
              Yurnal AI no es un terapeuta. Sus reflexiones son generadas por IA y no sustituyen el consejo profesional. Si necesitas ayuda, por favor contacta a un especialista.
            </AlertDescription>
        </Alert>
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Analizando tus reflexiones...</p>
          </div>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {insights && (
          <div className="space-y-6 animate-fade-in">
            {insights.crisisAlert && (
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Importante: Tu Bienestar es la Prioridad</AlertTitle>
                <AlertDescription>
                  Algunos de tus escritos sugieren que podrías estar pasando por un momento muy difícil. Recuerda que no estás solo/a.
                  <br />
                  <strong>Yurnal no es una herramienta de crisis.</strong> Por favor, considera contactar a un profesional de la salud mental o a una línea de ayuda. En Bolivia, puedes llamar a la línea gratuita de ayuda del SEDES (168).
                </AlertDescription>
              </Alert>
            )}

            {insights.themes?.length > 0 && (
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-3">
                  <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                  Nube de Temas y Emociones
                </h3>
                <div className="flex flex-wrap gap-2">
                  {insights.themes.map((theme, index) => (
                    <Badge key={index} variant="secondary" className="text-base px-3 py-1">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {insights.strengths?.length > 0 && (
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-3">
                  <ThumbsUp className="mr-2 h-5 w-5 text-muted-foreground" />
                  Fortalezas Identificadas
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                  {insights.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {insights.questions?.length > 0 && (
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-3">
                  <HelpCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                  Preguntas para la Reflexión
                </h3>
                 <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                  {insights.questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
         {!isLoading && !insights && !error && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center h-full">
                <h3 className="text-lg font-semibold">Listo para descubrir tus patrones</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                    Haz clic en el botón de abajo para generar tu nube de temas.
                </p>
            </div>
         )}
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={isLoading || !isLoaded || entries.length === 0} className="ml-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generar Reflexión
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmación de Análisis Seguro</AlertDialogTitle>
              <AlertDialogDescription>
                Para generar tu nube de temas, el contenido de tus entradas (ya descifrado en tu dispositivo) se enviará a nuestro sistema de IA para su análisis.
                <br /><br />
                <strong>Tu privacidad es nuestra prioridad:</strong> El texto se usa únicamente para este análisis y se descarta inmediatamente sin ser almacenado permanentemente en ningún servidor. ¿Estás de acuerdo con proceder?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleGenerate}>Continuar y Generar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

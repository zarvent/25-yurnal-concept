'use client';

import { useState } from 'react';
import { useJournal } from '@/hooks/use-journal';
import { generateInsights, GenerateInsightsOutput } from '@/ai/flows/generate-insights';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, AlertTriangle } from 'lucide-react';
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

  const themes = insights?.themes.split(',').map(theme => theme.trim()).filter(Boolean) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nube de Temas y Emociones</CardTitle>
        <CardDescription>
          Yurnal AI es un Asistente Analítico, no un terapeuta. Analiza tus entradas para generar una 'Nube de Temas y Emociones', ayudándote a visualizar lo que es importante para ti de forma privada y segura.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[200px]">
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
        {insights && themes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {themes.map((theme, index) => (
              <Badge key={index} variant="secondary" className="text-base px-3 py-1">
                {theme}
              </Badge>
            ))}
          </div>
        )}
         {!isLoading && !insights && !error && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center h-[200px]">
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

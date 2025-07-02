'use client';

import { useState } from 'react';
import { useJournal } from '@/hooks/use-journal';
import { generateInsights, GenerateInsightsOutput } from '@/ai/flows/generate-insights';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
          Nuestro asistente de IA analiza tus entradas para identificar patrones y temas recurrentes. Esto no es terapia, sino una herramienta para ayudarte a ver tu mundo interior con más claridad.
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
        <Button onClick={handleGenerate} disabled={isLoading || !isLoaded || entries.length === 0} className="ml-auto">
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
      </CardFooter>
    </Card>
  );
}

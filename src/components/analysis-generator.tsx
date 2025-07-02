'use client';

import { useState } from 'react';
import { useJournal } from '@/hooks/use-journal';
import { generateInsights, GenerateInsightsOutput } from '@/ai/flows/generate-insights';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Wand2, AlertTriangle, Lightbulb, ThumbsUp, HelpCircle, BarChart3 } from 'lucide-react';
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

interface AnalysisColumn {
  id: string;
  title: string;
  items: string[];
}

export function AnalysisGenerator() {
  const { entries, getEntriesAsText, isLoaded } = useJournal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<GenerateInsightsOutput | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [analysisColumns, setAnalysisColumns] = useState<AnalysisColumn[]>([]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setInsights(null);
    setSelectedItems(new Set());

    try {
      const journalEntries = getEntriesAsText();
      if (!journalEntries.trim()) {
        setError('No hay suficientes entradas en el diario para generar un análisis. Escribe un poco más y vuelve a intentarlo.');
        setIsLoading(false);
        return;
      }
      
      const result = await generateInsights({ journalEntries });
      setInsights(result);
      
      // Crear columnas de análisis basadas en los insights
      const columns: AnalysisColumn[] = [];
      
      if (result.themes?.length > 0) {
        columns.push({
          id: 'themes',
          title: 'Temas Centrales',
          items: result.themes
        });
      }
      
      if (result.strengths?.length > 0) {
        columns.push({
          id: 'strengths',
          title: 'Fortalezas',
          items: result.strengths
        });
      }
      
      if (result.questions?.length > 0) {
        columns.push({
          id: 'questions',
          title: 'Áreas de Reflexión',
          items: result.questions
        });
      }
      
      setAnalysisColumns(columns);
      
    } catch (err) {
      console.error(err);
      setError('Hubo un error al generar tu análisis. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemSelection = (item: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(item);
    } else {
      newSelected.delete(item);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = (columnId: string) => {
    const column = analysisColumns.find(col => col.id === columnId);
    if (column) {
      const newSelected = new Set(selectedItems);
      column.items.forEach(item => newSelected.add(item));
      setSelectedItems(newSelected);
    }
  };

  const handleDeselectAll = (columnId: string) => {
    const column = analysisColumns.find(col => col.id === columnId);
    if (column) {
      const newSelected = new Set(selectedItems);
      column.items.forEach(item => newSelected.delete(item));
      setSelectedItems(newSelected);
    }
  };

  return (
    <div className="space-y-6">
      {/* Generador Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Análisis de Patrones
          </CardTitle>
          <CardDescription>
            Descubre patrones profundos en tus entradas con análisis personalizado de IA.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 min-h-[200px]">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Aviso Importante: Asistente Analítico</AlertTitle>
            <AlertDescription>
              Yurnal AI no es un terapeuta. Sus análisis son generados por IA y no sustituyen el consejo profesional. Si necesitas ayuda, por favor contacta a un especialista.
            </AlertDescription>
          </Alert>
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Analizando tus patrones...</p>
            </div>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!isLoading && !insights && !error && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-12 text-center h-full">
              <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Listo para analizar tus patrones</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Genera un análisis detallado de tus entradas del diario.
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
                    Analizando...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generar Análisis
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmación de Análisis Seguro</AlertDialogTitle>
                <AlertDialogDescription>
                  Para generar tu análisis, el contenido de tus entradas (ya descifrado en tu dispositivo) se enviará a nuestro sistema de IA para su análisis.
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

      {/* Crisis Alert */}
      {insights?.crisisAlert && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Importante: Tu Bienestar es la Prioridad</AlertTitle>
          <AlertDescription>
            Algunos de tus escritos sugieren que podrías estar pasando por un momento muy difícil. Recuerda que no estás solo/a.
            <br />
            <strong>Yurnal no es una herramienta de crisis.</strong> Por favor, considera contactar a un profesional de la salud mental o a una línea de ayuda. En Bolivia, puedes llamar a la línea gratuita de ayuda del SEDES (168).
          </AlertDescription>
        </Alert>
      )}

      {/* Columnas de Análisis */}
      {analysisColumns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysisColumns.map((column) => (
            <Card key={column.id} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{column.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleSelectAll(column.id)}
                      className="text-xs"
                    >
                      Todos
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeselectAll(column.id)}
                      className="text-xs"
                    >
                      Ninguno
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {column.items.map((item, index) => (
                    <div key={`${column.id}-${index}`} className="flex items-start space-x-3">
                      <Checkbox
                        id={`${column.id}-${index}`}
                        checked={selectedItems.has(item)}
                        onCheckedChange={(checked) => handleItemSelection(item, checked as boolean)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={`${column.id}-${index}`}
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Panel de Elementos Seleccionados */}
      {selectedItems.size > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5" />
              Elementos Seleccionados ({selectedItems.size})
            </CardTitle>
            <CardDescription>
              Estos son los elementos que has seleccionado para análisis adicional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedItems).map((item, index) => (
                <Badge 
                  key={index} 
                  variant="default" 
                  className="text-sm px-3 py-1 cursor-pointer"
                  onClick={() => handleItemSelection(item, false)}
                >
                  {item} ✕
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => setSelectedItems(new Set())}
              variant="outline"
              size="sm"
            >
              Limpiar Selección
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

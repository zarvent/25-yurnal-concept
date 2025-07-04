'use client';

import { CrisisAlert } from '@/components/crisis-alert';
import { EditorActions } from '@/components/journal/editor-actions';
import { TemplateSelector } from '@/components/journal/template-selector';
import { TranscriptionControls } from '@/components/journal/transcription-controls';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { TranscriptionResult, VoiceTranscriptionService } from '@/lib/voice-transcription';
import { journalService } from '@/services/journal.service';
import { useJournalEditorStore } from '@/store/journal-editor.store';
import { Loader2 } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

export function JournalEditor() {
  const {
    entry,
    setEntry,
    isSaving,
    isSuccess,
    startSaving,
    finishSaving,
    resetState,
  } = useJournalEditorStore();

  const [transcriptionService, setTranscriptionService] = useState<VoiceTranscriptionService | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('¿Qué tienes en mente?');

  const { toast } = useToast();
  const finalTranscriptionRef = useRef('');

  const handleSelectTemplate = (content: string, prompt: string) => {
    setEntry(content);
    setCurrentPrompt(prompt);
  };

  const handleSaveEntry = async () => {
    startSaving();
    try {
      const detectedCrisis = await journalService.saveEntry({ content: entry });
      if (detectedCrisis) {
        setShowCrisisAlert(true);
      }
      toast({
        title: 'Entrada guardada',
        description: 'Tu entrada ha sido guardada de forma segura.',
        variant: 'default',
      });
      finishSaving(true);
    } catch (error) {
      toast({
        title: 'Error al guardar',
        description: 'No se pudo guardar la entrada. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
      finishSaving(false);
    }
  };

  const handleReset = () => {
    setEntry('');
    setCurrentPrompt('¿Qué tienes en mente?');
    resetState();
  };

  const initializeTranscriptionService = useCallback(() => {
    if (!transcriptionService) {
      const service = new VoiceTranscriptionService({
        language: 'es-ES',
        emotionalContextAnalysis: true,
        localProcessing: true,
        confidenceThreshold: 0.7
      });
      setTranscriptionService(service);
      return service;
    }
    return transcriptionService;
  }, [transcriptionService]);

  const startRecording = async () => {
    const service = initializeTranscriptionService();
    try {
      await service.startRecording();
      setIsRecording(true);
      toast({ title: 'Grabación iniciada', description: 'Habla ahora...' });
    } catch (error) {
      toast({ title: 'Error de micrófono', description: `No se pudo iniciar la grabación: ${error}` });
    }
  };

  const stopRecording = async () => {
    if (transcriptionService) {
      try {
        setIsRecording(false);
        setIsTranscribing(true);
        toast({ title: 'Procesando audio...', description: 'Transcribiendo tu grabación.' });

        const result = await transcriptionService.stopRecording();

        // Manejar el resultado de la transcripción
        if (result.text) {
          finalTranscriptionRef.current += result.text + ' ';
          setEntry(entry + result.text + ' ');
          setTranscriptionResult(result);
        }

        setIsTranscribing(false);
        toast({ title: 'Transcripción completada', description: 'El texto ha sido añadido a tu entrada.' });
      } catch (error) {
        setIsTranscribing(false);
        toast({ title: 'Error de transcripción', description: `No se pudo procesar el audio: ${error}` });
      }
    }
  };

  const attachFile = async (file: File) => {
    const service = initializeTranscriptionService();
    setIsTranscribing(true);
    setTranscriptionProgress(0);
    finalTranscriptionRef.current = '';
    try {
      // Por ahora, simulamos el procesamiento del archivo
      toast({ title: 'Procesando archivo...', description: 'Esta funcionalidad está en desarrollo.' });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular procesamiento
      toast({ title: 'Archivo procesado', description: 'La funcionalidad de archivos de audio será implementada pronto.' });
    } catch (error) {
      toast({ title: 'Error de transcripción', description: `No se pudo procesar el archivo: ${error}` });
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <Card className="w-full shadow-therapeutic-lg border-border/20">
      <CrisisAlert isVisible={showCrisisAlert} onClose={() => setShowCrisisAlert(false)} />
      <CardHeader>
        <CardTitle>Mi Diario</CardTitle>
        <CardDescription>{currentPrompt}</CardDescription>
        <div className="pt-4">
          <TemplateSelector onSelectTemplate={handleSelectTemplate} isDisabled={isSaving || isRecording || isTranscribing} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Comienza a escribir aquí..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows={15}
          className="resize-none focus:ring-primary/50 focus:border-primary/50 transition-shadow duration-200"
          disabled={isSaving || isTranscribing}
        />
        {(isTranscribing || isRecording) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {isRecording ? 'Grabando...' : isTranscribing ? 'Transcribiendo...' : ''}
              </p>
              {isTranscribing && <Loader2 className="h-4 w-4 animate-spin" />}
            </div>
            <Progress value={transcriptionProgress} className="w-full" />
            {transcriptionResult && transcriptionResult.text && (
              <p className="text-sm text-muted-foreground italic">{transcriptionResult.text}</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <TranscriptionControls
          isRecording={isRecording}
          isTranscribing={isTranscribing}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onAttachFile={attachFile}
        />
        <EditorActions isSaving={isSaving} isSuccess={isSuccess} onSave={handleSaveEntry} onReset={handleReset} />
      </CardFooter>
    </Card>
  );
}

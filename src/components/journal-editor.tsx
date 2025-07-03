'use client';

import { CrisisAlert } from '@/components/crisis-alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { TranscriptionResult, VoiceTranscriptionService } from '@/lib/voice-transcription';
import { journalService } from '@/services/journal.service';
import { useJournalUIStore } from '@/store/journal-ui.store';
import { Film, Loader2, Mic, MicOff, Paperclip, PartyPopper, X } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';

const templates = [
  {
    name: 'Entrada Libre',
    prompt: '¿Qué tienes en mente?',
    content: '',
  },
  {
    name: 'Análisis de un Día Estresante',
    prompt: 'Describe un evento estresante y cómo te hizo sentir.',
    content:
      'Hoy fue un día estresante.\n\nEl evento principal fue: \n\nMe sentí: \n\nCómo reaccioné: \n\nQué podría hacer diferente la próxima vez: ',
  },
  {
    name: 'Registro de Gratitud',
    prompt: 'Enumera tres cosas por las que estás agradecido hoy.',
    content: 'Hoy estoy agradecido por:\n\n1. \n2. \n3. \n\nEsto me hizo sentir: ',
  },
  {
    name: 'Técnica CBT (Terapia Cognitivo-Conductual)',
    prompt: 'Identifica un pensamiento negativo y reestructúralo.',
    content:
      'Situación: \n\nPensamiento Automático Negativo: \n\nEmociones que sentí: \n\nEvidencia que apoya este pensamiento: \n\nEvidencia que contradice este pensamiento: \n\nPensamiento Alternativo y más equilibrado: ',
  },
  {
    name: 'Verificar los Hechos',
    prompt: 'Separa los hechos de las interpretaciones para ver si tu emoción encaja con la realidad.',
    content:
      'Emoción que siento: \nIntensidad (0-100): \n\nEvento Desencadenante (objetivamente): \n\nMis Interpretaciones y Pensamientos: \n\nEvidencia que apoya mi emoción: \n\nEvidencia que NO apoya mi emoción: \n\nUna visión más equilibrada es: \n',
  },
  {
    name: 'Notas de Mindfulness',
    prompt: 'Registra tus prácticas de mindfulness, enfocándote en observar y describir sin juicio.',
    content:
      'Actividad Específica:\n\n' +
      'Habilidad Enfocada (Observar/Describir/Ambas):\n\n' +
      'Observaciones (Qué noté: sentidos, pensamientos, emociones, cuerpo - descripción sin juicio):\n\n' +
      'Dificultad / Nivel de Juicio (0-5):\n\n' +
      'Notas/Aprendizajes:\n',
  },
  {
    name: 'Mi Ola Emocional',
    prompt: 'Analiza una emoción intensa para entenderla mejor, desde su origen hasta sus consecuencias.',
    content:
      'Evento Desencadenante (¿Qué pasó?):\n\n' +
      'Interpretación (¿Qué pensé sobre el evento?):\n\n' +
      'Emoción Principal (Nombre e intensidad 0-100):\n\n' +
      'Sensaciones Físicas (¿Qué sentí en mi cuerpo?):\n\n' +
      'Impulso de Acción (¿Qué me urgía hacer?):\n\n' +
      'Mi Conducta (¿Qué hice finalmente?):\n\n' +
      'Consecuencias (¿Qué pasó después, a corto y largo plazo?):\n\n' +
      'Reflexión (¿Qué aprendí de esto?):\n',
  },
  {
    name: 'Acción Opuesta',
    prompt: 'Identifica una emoción intensa que no sea eficaz y planifica cómo actuar de forma opuesta para cambiarla.',
    content:
      'Situación:\n\n' +
      'Emoción y su intensidad (0-100):\n\n' +
      '¿Está justificada por los hechos? (Sí/No):\n\n' +
      '¿Actuar según la emoción sería eficaz a largo plazo? (Sí/No):\n\n' +
      'Impulso de Acción (¿Qué me pide hacer la emoción?):\n\n' +
      'Acción Opuesta Identificada:\n\n' +
      'Plan detallado para la Acción Opuesta (cuerpo, palabras, pensamientos):\n',
  },
  {
    name: 'Mis Prioridades en la Interacción',
    prompt: 'Antes de una conversación importante, clarifica qué es lo más crucial para ti: el objetivo, la relación o tu autorespeto.',
    content:
      'Situación (¿Con quién y sobre qué?):\n\n' +
      '1. Mi Objetivo (Importancia 0-5): \n   Descripción de mi objetivo: \n\n' +
      '2. La Relación (Importancia 0-5): \n   Cómo quiero que quede la relación: \n\n' +
      '3. Mi Autorespeto (Importancia 0-5): \n   Cómo quiero sentirme conmigo mismo/a: \n\n' +
      'Mi Prioridad Principal es: (OBJETIVO / RELACIÓN / AUTORESPETO)\n',
  },
  {
    name: 'Reflexión de Habilidad GIVE',
    prompt: 'Analiza una interacción reciente donde tu prioridad era cuidar la relación y evalúa cómo usaste la habilidad GIVE.',
    content:
      'Situación:\n\n' +
      '¿Fui Gentil y respetuoso/a? (Sí/No/Cómo):\n\n' +
      '¿Mostré Interés y escuché? (Sí/No/Cómo):\n\n' +
      '¿Intenté Validar su perspectiva? (Sí/No/Cómo):\n\n' +
      '¿Usé un Tono Amable (Easy Manner)? (Sí/No/Cómo):\n\n' +
      '¿Qué funcionó bien y qué podría mejorar?:\n\n',
  },
  {
    name: 'Análisis de Pros y Contras en Crisis',
    prompt: 'Cuando sientas un impulso dañino, detente y analiza las consecuencias antes de actuar.',
    content:
      'Impulso Problemático a Analizar:\n\n\n' +
      '--- PROS de ACTUAR según el impulso (beneficios a corto plazo) ---\n\n\n' +
      '--- CONTRAS de ACTUAR según el impulso (costes a corto y largo plazo) ---\n\n\n' +
      '--- PROS de RESISTIR el impulso (beneficios a largo plazo) ---\n\n\n' +
      '--- CONTRAS de RESISTIR el impulso (dificultades a corto plazo) ---\n',
  },
];

export function JournalEditor() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [content, setContent] = useState(templates[0].content);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { crisisDetected, clearCrisisAlert } = useJournalUIStore();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; type: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Estados para transcripción de voz
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const voiceServiceRef = useRef<VoiceTranscriptionService | null>(null);

  // Datos simulados del terapeuta (en producción vendrían del estado de sesión)
  const therapistContact = {
    name: 'Dr. García Martínez',
    phone: '+34 600 123 456',
    email: 'dr.garcia@yurnal.com',
  };

  // Funciones para transcripción de voz
  const startRecording = useCallback(async () => {
    try {
      // Verificar soporte del navegador
      if (!VoiceTranscriptionService.isSupported()) {
        toast({
          title: 'Función no soportada',
          description: 'Tu navegador no soporta la grabación de audio.',
          variant: 'destructive',
        });
        return;
      }

      // Inicializar el servicio de transcripción
      voiceServiceRef.current = new VoiceTranscriptionService({
        language: 'es-ES',
        emotionalContextAnalysis: true,
        localProcessing: true,
        confidenceThreshold: 0.7,
      });

      // Iniciar grabación
      await voiceServiceRef.current.startRecording();
      setIsRecording(true);
      setRecordingTime(0);

      // Iniciar contador de tiempo
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      setRecordingInterval(interval);

      toast({
        title: 'Grabación iniciada',
        description: 'Habla naturalmente, tu voz será transcrita a texto.',
      });
    } catch (error: any) {
      console.error('Error al iniciar grabación:', error);
      toast({
        title: 'Error de grabación',
        description: error.message || 'No se pudo acceder al micrófono.',
        variant: 'destructive',
      });
      setIsRecording(false);
      voiceServiceRef.current = null;
    }
  }, [toast]);

  const stopRecording = useCallback(async () => {
    if (!voiceServiceRef.current || !isRecording) return;

    try {
      setIsRecording(false);
      setIsTranscribing(true);

      // Detener contador de tiempo
      if (recordingInterval) {
        clearInterval(recordingInterval);
        setRecordingInterval(null);
      }

      // Obtener transcripción
      const result: TranscriptionResult = await voiceServiceRef.current.stopRecording();

      // Agregar la transcripción al contenido
      const timestamp = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const transcriptionText = `[Transcripción de voz - ${timestamp}]\n${result.text}\n`;

      const newContent = content.trim()
        ? `${content}\n\n${transcriptionText}`
        : `${selectedTemplate.content}\n\n${transcriptionText}`;

      setContent(newContent);
      setIsTranscribing(false);
      voiceServiceRef.current = null;

      // Mostrar feedback con información del análisis emocional si está disponible
      let description = 'Tu voz ha sido transcrita exitosamente.';
      if (result.emotionalMarkers) {
        description += ` Tono detectado: ${result.emotionalMarkers.tone}`;
      }

      toast({
        title: 'Transcripción completada',
        description,
      });
    } catch (error: any) {
      console.error('Error en transcripción:', error);
      setIsTranscribing(false);
      voiceServiceRef.current = null;

      toast({
        title: 'Error en transcripción',
        description: error.message || 'No se pudo transcribir el audio.',
        variant: 'destructive',
      });
    }
  }, [isRecording, recordingInterval, content, selectedTemplate.content, toast]);

  // Formatear tiempo de grabación
  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTemplateChange = (templateName: string) => {
    const template = templates.find((t) => t.name === templateName);
    if (template) {
      setSelectedTemplate(template);
      setContent(template.content);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadedFile(null);

      // Simulate upload progress. In a real app, this would be a real upload process.
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadedFile({ name: file.name, type: file.type });
            return 100;
          }
          return prev + 20;
        });
      }, 300);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (content.trim().length < 10) {
      toast({
        title: 'Contenido demasiado corto',
        description: 'Tu entrada debe tener al menos 10 caracteres.',
        variant: 'destructive',
      });
      return;
    }
    setIsSaving(true);
    try {
      await journalService.createNewEntry(content);

      toast({
        title: '¡Guardado!',
        description: (
          <div className="flex items-center">
            <PartyPopper className="mr-2 h-4 w-4 text-green-500" />
            <span>Tu entrada ha sido guardada de forma segura.</span>
          </div>
        ),
      });

      // Limpiar el editor
      setContent('');
      setSelectedTemplate(templates[0]);
    } catch (error) {
      toast({
        title: 'Error al guardar',
        description: 'No se pudo guardar tu entrada. Por favor, inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile({ name: file.name, type: file.type });
    }
  };

  return (
    <>
      <CrisisAlert
        isVisible={crisisDetected}
        onClose={clearCrisisAlert}
        userText={content}
        therapistContact={therapistContact}
      />
      <Card className="bg-white border border-neutral-light rounded-xl shadow-md max-w-2xl mx-auto mt-8">
        <CardHeader className="p-6">
          <CardTitle className="h2 mb-2">Editor de Notas</CardTitle>
          <CardDescription className="mb-4">Escribe tus pensamientos, reflexiones o usa una plantilla.</CardDescription>
          <div className="flex gap-4 items-center mb-2">
            <Select value={selectedTemplate.name} onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Selecciona una plantilla" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.name} value={template.name}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Barra de herramientas con tooltips */}
            <TooltipProvider>
              <div className="flex gap-2 ml-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <EnhancedButton size="icon" variant="ghost" aria-label="Adjuntar archivo" onClick={() => fileInputRef.current?.click()}>
                      <Paperclip className="w-5 h-5" />
                    </EnhancedButton>
                  </TooltipTrigger>
                  <TooltipContent>Adjuntar archivo</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <EnhancedButton size="icon" variant="ghost" aria-label="Grabar voz" onClick={isRecording ? stopRecording : startRecording}>
                      {isRecording ? <MicOff className="w-5 h-5 text-semantic-danger" /> : <Mic className="w-5 h-5" />}
                    </EnhancedButton>
                  </TooltipTrigger>
                  <TooltipContent>{isRecording ? 'Detener grabación' : 'Grabar voz'}</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <EnhancedButton size="icon" variant="ghost" aria-label="Insertar emoji" onClick={() => setContent(content + ' 😊')}>
                      <PartyPopper className="w-5 h-5" />
                    </EnhancedButton>
                  </TooltipTrigger>
                  <TooltipContent>Insertar emoji</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Textarea
            className="body bg-neutral-light rounded-lg min-h-[180px] p-5 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder={selectedTemplate.prompt}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="audio/*,video/*,image/*"
          />
        </CardContent>
        <CardFooter>
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center gap-2 flex-1">
              {isUploading && (
                <div className="flex items-center gap-2 flex-1">
                  <Progress value={uploadProgress} className="w-full" />
                  <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
                </div>
              )}

              {uploadedFile && (
                <div className="flex items-center justify-between rounded-md border p-2 bg-muted/50 flex-1">
                  <div className="flex items-center gap-2 truncate">
                    <Film className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground truncate">{uploadedFile.name}</span>
                  </div>
                  <EnhancedButton
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </EnhancedButton>
                </div>
              )}
            </div>

            <EnhancedButton
              onClick={handleSave}
              disabled={isSaving || isUploading || isRecording || isTranscribing}
              className="ml-auto"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Entrada'
              )}
            </EnhancedButton>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

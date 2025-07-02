'use client';

import { CrisisAlert } from '@/components/crisis-alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PremiumButton } from '@/components/ui/premium-button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useJournal } from '@/hooks/use-journal';
import { useToast } from '@/hooks/use-toast';
import { TranscriptionResult, VoiceTranscriptionService } from '@/lib/voice-transcription';
import { useJournalStore } from '@/store/journal-store';
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
    name: 'Diario de Mindfulness',
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
  const { addEntry } = useJournal();
  const { toast } = useToast();
  const { crisisDetected, clearCrisisAlert } = useJournalStore();

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
    email: 'dr.garcia@yurnal.com'
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
        confidenceThreshold: 0.7
      });

      // Iniciar grabación
      await voiceServiceRef.current.startRecording();
      setIsRecording(true);
      setRecordingTime(0);

      // Iniciar contador de tiempo
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
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
        minute: '2-digit'
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
      const attachments = uploadedFile ? [uploadedFile] : undefined;
      addEntry(content, selectedTemplate.name, attachments);
      toast({
        title: '¡Entrada Guardada!',
        description: 'Tu reflexión ha sido guardada de forma segura en tu santuario digital.',
        action: <PartyPopper className="h-5 w-5 text-primary" />,
      });
      setContent(selectedTemplate.content);
      setIsSaving(false);
      handleRemoveFile(); // Clear file after saving
    }, 500);
  };

  return (
    <>
      <CrisisAlert
        isVisible={crisisDetected}
        onClose={clearCrisisAlert}
        userText={content}
        therapistContact={therapistContact}
      />
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
              {!isUploading && !uploadedFile && !isRecording && !isTranscribing && (
                <>
                  <PremiumButton
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSaving}
                  >
                    <Paperclip className="mr-2 h-4 w-4" />
                    Adjuntar Archivo
                  </PremiumButton>

                  <PremiumButton
                    variant="outline"
                    size="sm"
                    onClick={startRecording}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200"
                  >
                    <Mic className="mr-2 h-4 w-4 text-blue-600" />
                    Transcribir Voz
                  </PremiumButton>
                </>
              )}

              {isRecording && (
                <div className="flex items-center gap-2">
                  <PremiumButton
                    variant="outline"
                    size="sm"
                    onClick={stopRecording}
                    className="animate-pulse border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <MicOff className="mr-2 h-4 w-4" />
                    Detener ({formatRecordingTime(recordingTime)})
                  </PremiumButton>
                  <span className="text-sm text-muted-foreground">Grabando...</span>
                </div>
              )}

              {isTranscribing && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-muted-foreground">Transcribiendo tu voz...</span>
                </div>
              )}

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
                  <PremiumButton
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 flex-shrink-0"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </PremiumButton>
                </div>
              )}
            </div>

            <PremiumButton
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
            </PremiumButton>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

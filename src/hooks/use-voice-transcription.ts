/**
 * HOOK PERSONALIZADO PARA TRANSCRIPCIÓN DE VOZ
 *
 * Hook de React que simplifica la integración de la transcripción de voz
 * en componentes, manejando estados, errores y efectos de limpieza.
 */

import {
  TranscriptionResult,
  VoiceTranscriptionConfig,
  VoiceTranscriptionError,
  VoiceTranscriptionService
} from '@/lib/voice-transcription';
import { developmentConfig } from '@/lib/voice-transcription-configs';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseVoiceTranscriptionOptions {
  config?: Partial<VoiceTranscriptionConfig>;
  onTranscriptionComplete?: (result: TranscriptionResult) => void;
  onError?: (error: VoiceTranscriptionError) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  autoCleanup?: boolean; // Limpiar automáticamente al desmontar el componente
}

export interface UseVoiceTranscriptionReturn {
  // Estados
  isRecording: boolean;
  isTranscribing: boolean;
  recordingTime: number;
  error: VoiceTranscriptionError | null;
  result: TranscriptionResult | null;
  isSupported: boolean;

  // Acciones
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  clearError: () => void;
  clearResult: () => void;

  // Información del servicio
  currentConfig: Partial<VoiceTranscriptionConfig>;
  updateConfig: (newConfig: Partial<VoiceTranscriptionConfig>) => void;
}

export function useVoiceTranscription(
  options: UseVoiceTranscriptionOptions = {}
): UseVoiceTranscriptionReturn {

  const {
    config = developmentConfig,
    onTranscriptionComplete,
    onError,
    onRecordingStart,
    onRecordingStop,
    autoCleanup = true
  } = options;

  // Estados
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<VoiceTranscriptionError | null>(null);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [currentConfig, setCurrentConfig] = useState<Partial<VoiceTranscriptionConfig>>(config);

  // Referencias
  const serviceRef = useRef<VoiceTranscriptionService | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Verificar soporte
  const isSupported = VoiceTranscriptionService.isSupported();

  // Limpiar contador de tiempo
  const clearRecordingTimer = useCallback(() => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  }, []);

  // Iniciar contador de tiempo
  const startRecordingTimer = useCallback(() => {
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  }, []);

  // Función para iniciar grabación
  const startRecording = useCallback(async () => {
    if (!isSupported) {
      const error: VoiceTranscriptionError = {
        type: 'service-unavailable',
        message: 'La transcripción de voz no está soportada en este navegador',
        recoverable: false,
        suggestions: ['Usa un navegador compatible como Chrome o Firefox']
      };
      setError(error);
      onError?.(error);
      return;
    }

    if (isRecording || isTranscribing) {
      return; // Ya hay una operación en curso
    }

    try {
      setError(null);
      setResult(null);

      // Crear nueva instancia del servicio
      serviceRef.current = new VoiceTranscriptionService(currentConfig);

      // Iniciar grabación
      await serviceRef.current.startRecording();

      setIsRecording(true);
      startRecordingTimer();
      onRecordingStart?.();

    } catch (error: any) {
      const transcriptionError: VoiceTranscriptionError = {
        type: error.type || 'service-unavailable',
        message: error.message || 'Error al iniciar la grabación',
        recoverable: error.recoverable || false,
        suggestions: error.suggestions || ['Verifica los permisos del micrófono']
      };

      setError(transcriptionError);
      onError?.(transcriptionError);

      // Limpiar estado
      setIsRecording(false);
      serviceRef.current = null;
    }
  }, [isSupported, isRecording, isTranscribing, currentConfig, onRecordingStart, onError, startRecordingTimer]);

  // Función para detener grabación
  const stopRecording = useCallback(async () => {
    if (!serviceRef.current || !isRecording) {
      return;
    }

    try {
      setIsRecording(false);
      setIsTranscribing(true);
      clearRecordingTimer();
      onRecordingStop?.();

      // Obtener resultado de transcripción
      const transcriptionResult = await serviceRef.current.stopRecording();

      setResult(transcriptionResult);
      setIsTranscribing(false);
      onTranscriptionComplete?.(transcriptionResult);

    } catch (error: any) {
      const transcriptionError: VoiceTranscriptionError = {
        type: error.type || 'service-unavailable',
        message: error.message || 'Error durante la transcripción',
        recoverable: error.recoverable || false,
        suggestions: error.suggestions || ['Intenta grabar nuevamente']
      };

      setError(transcriptionError);
      setIsTranscribing(false);
      onError?.(transcriptionError);
    } finally {
      serviceRef.current = null;
    }
  }, [isRecording, onRecordingStop, onTranscriptionComplete, onError, clearRecordingTimer]);

  // Funciones de utilidad
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<VoiceTranscriptionConfig>) => {
    setCurrentConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Cleanup automático al desmontar el componente
  useEffect(() => {
    return () => {
      if (autoCleanup) {
        clearRecordingTimer();
        if (serviceRef.current && isRecording) {
          // Intentar detener la grabación de forma segura
          serviceRef.current.stopRecording().catch(console.error);
        }
      }
    };
  }, [autoCleanup, isRecording, clearRecordingTimer]);

  // Formatear tiempo de grabación
  const formatRecordingTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    // Estados
    isRecording,
    isTranscribing,
    recordingTime,
    error,
    result,
    isSupported,

    // Acciones
    startRecording,
    stopRecording,
    clearError,
    clearResult,

    // Configuración
    currentConfig,
    updateConfig,

    // Utilidades (como bonus)
    formatRecordingTime: formatRecordingTime,
  };
}

/**
 * Hook especializado para uso en journal terapéutico
 * Incluye funcionalidades específicas para el contexto terapéutico
 */
export function useTherapeuticVoiceTranscription(
  onTextGenerated: (text: string) => void,
  options: Omit<UseVoiceTranscriptionOptions, 'onTranscriptionComplete'> = {}
) {

  const transcriptionOptions: UseVoiceTranscriptionOptions = {
    ...options,
    config: {
      emotionalContextAnalysis: true,
      pauseDetection: true,
      confidenceThreshold: 0.7,
      ...options.config
    },
    onTranscriptionComplete: (result: TranscriptionResult) => {
      // Formatear el texto para el journal
      const timestamp = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });

      let formattedText = `[Transcripción de voz - ${timestamp}]\n${result.text}`;

      // Agregar información emocional si está disponible
      if (result.emotionalMarkers) {
        const { tone, energy, pace } = result.emotionalMarkers;
        formattedText += `\n[Análisis emocional: Tono ${tone}, Energía ${energy}, Ritmo ${pace}]`;
      }

      onTextGenerated(formattedText);
    }
  };

  const voiceTranscription = useVoiceTranscription(transcriptionOptions);

  // Funciones adicionales específicas para terapia
  const analyzeEmotionalPatterns = useCallback(() => {
    if (!voiceTranscription.result) return null;

    // Aquí se podría integrar con TherapeuticSpeechAnalysis
    // return TherapeuticSpeechAnalysis.analyzeEmotionalPatterns(voiceTranscription.result.text);
    return null;
  }, [voiceTranscription.result]);

  const getTherapeuticInsights = useCallback(() => {
    const result = voiceTranscription.result;
    if (!result || !result.emotionalMarkers) return [];

    const insights: string[] = [];
    const { tone, energy, pace, clarity } = result.emotionalMarkers;

    if (tone === 'anxious' && energy === 'high') {
      insights.push('Detecté signos de ansiedad en tu voz. ¿Te gustaría practicar una técnica de relajación?');
    }

    if (pace === 'fast' && clarity < 0.7) {
      insights.push('Nota que hablas rápido. Tomarte un momento para respirar puede ayudarte a organizarte mejor.');
    }

    if (tone === 'sad' && energy === 'low') {
      insights.push('Percibo tristeza en tu voz. Recuerda que es válido sentir así y que tienes herramientas para procesarlo.');
    }

    return insights;
  }, [voiceTranscription.result]);

  return {
    ...voiceTranscription,
    analyzeEmotionalPatterns,
    getTherapeuticInsights
  };
}

/**
 * Hook para configuraciones predefinidas
 */
export function useVoiceTranscriptionWithPreset(
  preset: 'therapy' | 'research' | 'accessibility' | 'mobile' = 'therapy',
  options: UseVoiceTranscriptionOptions = {}
) {

  const presetConfigs = {
    therapy: {
      emotionalContextAnalysis: true,
      localProcessing: true,
      confidenceThreshold: 0.7,
      audioRetention: 'none' as const
    },
    research: {
      emotionalContextAnalysis: true,
      localProcessing: false,
      confidenceThreshold: 0.9,
      audioRetention: 'encrypted' as const
    },
    accessibility: {
      emotionalContextAnalysis: false,
      localProcessing: false,
      confidenceThreshold: 0.5,
      audioRetention: 'session' as const
    },
    mobile: {
      emotionalContextAnalysis: false,
      localProcessing: true,
      confidenceThreshold: 0.7,
      sampleRate: 16000
    }
  };

  const config = {
    ...presetConfigs[preset],
    ...options.config
  };

  return useVoiceTranscription({
    ...options,
    config
  });
}

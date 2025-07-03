/**
 * CONFIGURACIONES DE TRANSCRIPCIÓN DE VOZ PARA DIFERENTES ENTORNOS
 *
 * Este archivo proporciona configuraciones preestablecidas para diferentes
 * escenarios de uso de la funcionalidad de transcripción de voz.
 */

import { VoiceTranscriptionConfig } from './voice-transcription';

/**
 * Configuración para desarrollo local
 * Usa simulación para permitir desarrollo sin servicios externos
 */
export const developmentConfig: Partial<VoiceTranscriptionConfig> = {
  serviceProvider: 'web-speech-api', // Fallback a simulación si no está disponible
  language: 'es-ES',
  dialect: 'es-ES',
  emotionalContextAnalysis: true,
  pauseDetection: true,
  confidenceThreshold: 0.7,
  localProcessing: true,
  audioRetention: 'none',
  dataAnonymization: true,
  sampleRate: 16000, // Calidad estándar para desarrollo
  channels: 1,
  bitsPerSample: 16
};

/**
 * Configuración para producción con máxima privacidad
 * Prioriza el procesamiento local y la privacidad del usuario
 */
export const productionPrivacyConfig: Partial<VoiceTranscriptionConfig> = {
  serviceProvider: 'web-speech-api', // Solo APIs del navegador
  language: 'es-ES',
  emotionalContextAnalysis: false, // Deshabilitado por privacidad
  pauseDetection: true,
  confidenceThreshold: 0.8,
  localProcessing: true,
  audioRetention: 'none',
  dataAnonymization: true,
  sampleRate: 44100, // Alta calidad
  channels: 1,
  bitsPerSample: 16
};

/**
 * Configuración para producción con servicios en la nube
 * Usa servicios externos para máxima precisión
 */
export const productionCloudConfig: Partial<VoiceTranscriptionConfig> = {
  serviceProvider: 'openai-whisper', // Servicio más preciso
  language: 'es-ES',
  model: 'whisper-1',
  emotionalContextAnalysis: true,
  pauseDetection: true,
  confidenceThreshold: 0.85,
  localProcessing: false,
  audioRetention: 'session', // Solo durante la sesión
  dataAnonymization: true,
  sampleRate: 44100,
  channels: 1,
  bitsPerSample: 16
};

/**
 * Configuración para investigación terapéutica
 * Incluye análisis avanzado para fines de investigación (con consentimiento)
 */
export const researchConfig: Partial<VoiceTranscriptionConfig> = {
  serviceProvider: 'azure-speech',
  language: 'es-ES',
  emotionalContextAnalysis: true,
  pauseDetection: true,
  confidenceThreshold: 0.9,
  localProcessing: false,
  audioRetention: 'encrypted', // Encriptado para análisis posterior
  dataAnonymization: false, // Para correlaciones en investigación
  sampleRate: 48000, // Máxima calidad
  channels: 2, // Estéreo para análisis avanzado
  bitsPerSample: 24
};

/**
 * Configuración de emergencia/crisis
 * Configuración robusta para situaciones críticas
 */
export const emergencyConfig: Partial<VoiceTranscriptionConfig> = {
  serviceProvider: 'google-speech', // Servicio más confiable
  language: 'es-ES',
  emotionalContextAnalysis: true, // Importante para detectar crisis
  pauseDetection: true,
  confidenceThreshold: 0.6, // Más permisivo en emergencias
  localProcessing: false,
  audioRetention: 'session',
  dataAnonymization: false, // Para seguimiento en crisis
  sampleRate: 44100,
  channels: 1,
  bitsPerSample: 16
};

/**
 * Configuración para dispositivos móviles
 * Optimizada para menor consumo de batería y datos
 */
export const mobileConfig: Partial<VoiceTranscriptionConfig> = {
  serviceProvider: 'web-speech-api',
  language: 'es-ES',
  emotionalContextAnalysis: false, // Ahorra procesamiento
  pauseDetection: false,
  confidenceThreshold: 0.7,
  localProcessing: true,
  audioRetention: 'none',
  dataAnonymization: true,
  sampleRate: 16000, // Menor calidad para ahorrar datos
  channels: 1,
  bitsPerSample: 16
};

/**
 * Configuración para accesibilidad
 * Optimizada para usuarios con necesidades especiales
 */
export const accessibilityConfig: Partial<VoiceTranscriptionConfig> = {
  serviceProvider: 'azure-speech', // Mejor soporte para discapacidades del habla
  language: 'es-ES',
  emotionalContextAnalysis: true,
  pauseDetection: true,
  confidenceThreshold: 0.5, // Más permisivo para habla con dificultades
  localProcessing: false,
  audioRetention: 'session',
  dataAnonymization: true,
  sampleRate: 44100,
  channels: 1,
  bitsPerSample: 16
};

/**
 * Función para seleccionar configuración basada en el entorno
 */
export function getConfigForEnvironment(
  environment: 'development' | 'production' | 'research' | 'mobile' | 'accessibility',
  privacyLevel: 'high' | 'medium' | 'low' = 'high'
): Partial<VoiceTranscriptionConfig> {

  switch (environment) {
    case 'development':
      return developmentConfig;

    case 'production':
      return privacyLevel === 'high' ? productionPrivacyConfig : productionCloudConfig;

    case 'research':
      return researchConfig;

    case 'mobile':
      return mobileConfig;

    case 'accessibility':
      return accessibilityConfig;

    default:
      return developmentConfig;
  }
}

/**
 * Configuraciones específicas por región/idioma
 */
export const languageConfigs = {
  'es-ES': { // Español de España
    language: 'es-ES',
    dialect: 'es-ES',
    model: 'es-ES-Standard-A'
  },
  'es-MX': { // Español de México
    language: 'es-MX',
    dialect: 'es-MX',
    model: 'es-MX-Standard-A'
  },
  'es-AR': { // Español de Argentina
    language: 'es-AR',
    dialect: 'es-AR',
    model: 'es-AR-Standard-A'
  },
  'en-US': { // Inglés de Estados Unidos
    language: 'en-US',
    dialect: 'en-US',
    model: 'en-US-Standard-A'
  }
};

/**
 * Configuración específica para diferentes tipos de sesión terapéutica
 */
export const therapySessionConfigs = {
  // Sesión inicial - máxima precisión
  initial: {
    ...productionCloudConfig,
    confidenceThreshold: 0.9,
    emotionalContextAnalysis: true
  },

  // Sesión de seguimiento - balance entre privacidad y funcionalidad
  followup: {
    ...productionPrivacyConfig,
    emotionalContextAnalysis: true
  },

  // Sesión de crisis - procesamiento rápido y confiable
  crisis: {
    ...emergencyConfig,
    emotionalContextAnalysis: true,
    confidenceThreshold: 0.6
  },

  // Autojournal - máxima privacidad
  selfJournal: {
    ...productionPrivacyConfig,
    localProcessing: true,
    audioRetention: 'none'
  }
};

/**
 * Ejemplo de uso en el componente
 */
export function createVoiceServiceWithConfig(
  environment: string = 'development',
  sessionType: keyof typeof therapySessionConfigs = 'selfJournal'
) {
  // En el componente JournalEditor, se usaría así:
  /*
  const config = getConfigForEnvironment(environment as any);
  const sessionConfig = therapySessionConfigs[sessionType];
  const finalConfig = { ...config, ...sessionConfig };

  return new VoiceTranscriptionService(finalConfig);
  */
}

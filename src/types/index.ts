/**
 * @fileoverview Tipos de datos centralizados para la aplicación Yurnal
 * Define las interfaces y tipos compartidos entre frontend, backend y flujos de IA
 */

import { z } from 'zod';

// ===== ESQUEMAS DE VALIDACIÓN =====

export const JournalEntrySchema = z.object({
  id: z.string().uuid(),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
  mood: z.enum(['very-happy', 'happy', 'neutral', 'sad', 'very-sad']).optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  isPrivate: z.boolean().default(true),
});

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  displayName: z.string().min(1),
  role: z.enum(['patient', 'therapist', 'academic', 'student']),
  preferences: z.object({
    language: z.string().default('es'),
    timezone: z.string().default('Europe/Madrid'),
    notificationsEnabled: z.boolean().default(true),
  }),
  therapistId: z.string().uuid().optional(), // Para pacientes
  createdAt: z.date(),
  lastLoginAt: z.date().optional(),
});

export const InsightSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  themes: z.array(z.string()),
  strengths: z.array(z.string()),
  questions: z.array(z.string()),
  crisisAlert: z.boolean(),
  generatedAt: z.date(),
  journalEntriesIds: z.array(z.string().uuid()),
  reviewed: z.boolean().default(false),
  reviewedBy: z.string().uuid().optional(), // ID del terapeuta
});

export const TherapistPatientRelationSchema = z.object({
  id: z.string().uuid(),
  therapistId: z.string().uuid(),
  patientId: z.string().uuid(),
  status: z.enum(['active', 'inactive', 'pending']),
  startDate: z.date(),
  endDate: z.date().optional(),
  permissions: z.object({
    canViewJournal: z.boolean().default(false),
    canViewInsights: z.boolean().default(false),
    canReceiveCrisisAlerts: z.boolean().default(true),
  }),
});

// ===== TIPOS INFERIDOS =====

export type JournalEntry = z.infer<typeof JournalEntrySchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Insight = z.infer<typeof InsightSchema>;
export type TherapistPatientRelation = z.infer<typeof TherapistPatientRelationSchema>;

// ===== TIPOS DE ESTADO DE LA APLICACIÓN =====

export interface JournalState {
  entries: JournalEntry[];
  selectedEntries: Set<string>;
  currentEntry: Partial<JournalEntry> | null;
  isLoading: boolean;
  error: string | null;
  insights: Insight[];

  // Funciones para manipular el estado
  setEntries: (entries: JournalEntry[]) => void;
  addEntry: (entry: JournalEntry) => void;
  toggleEntrySelection: (id: string) => void;
  clearSelection: () => void;
  getSelectedEntriesContent: () => string;
}

export interface SessionState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  therapistRelation: TherapistPatientRelation | null;
}

// ===== TIPOS PARA APIs =====

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface CreateJournalEntryRequest {
  content: string;
  mood?: JournalEntry['mood'];
  tags?: string[];
}

export interface GenerateInsightsRequest {
  journalEntries: string; // Contenido concatenado de las entradas
  userId: string;
}

// ===== CONSTANTES DE APLICACIÓN =====

export const USER_ROLES = {
  PATIENT: 'patient',
  THERAPIST: 'therapist',
  ACADEMIC: 'academic',
  STUDENT: 'student',
} as const;

export const MOOD_LABELS = {
  'very-happy': '😊 Muy feliz',
  'happy': '🙂 Feliz',
  'neutral': '😐 Neutral',
  'sad': '😔 Triste',
  'very-sad': '😢 Muy triste',
} as const;

export const CRISIS_KEYWORDS = [
  'suicidio', 'matarme', 'no quiero vivir', 'acabar conmigo',
  'autolesión', 'cortarme', 'hacerme daño',
  'sobredosis', 'pastillas', 'veneno'
] as const;

// ===== UTILIDADES DE VALIDACIÓN =====

export function validateJournalEntry(data: unknown): JournalEntry {
  return JournalEntrySchema.parse(data);
}

export function validateUserProfile(data: unknown): UserProfile {
  return UserProfileSchema.parse(data);
}

export function isValidEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

/**
 * Detecta palabras clave de crisis en el texto
 * @param text - Texto del diario a analizar
 * @returns true si se detectan indicadores de crisis
 */
export function detectCrisisKeywords(text: string): boolean {
  const normalizedText = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => normalizedText.includes(keyword));
}

// ===== TIPOS DE HERRAMIENTAS =====

export interface Tool {
  id: string; // Identificador único
  name: string; // Nombre de la herramienta
  // Otros campos relevantes pueden ser añadidos aquí
}

'use client';

import { AccessPortal } from '@/components/marketing/access-portal';
import { EcosystemHero } from '@/components/marketing/ecosystem-hero';
import { FeatureShowcase } from '@/components/marketing/feature-showcase';
import {
    Brain,
    Calendar,
    FileText,
    HelpCircle,
    Shield,
    Stethoscope,
    Target,
    Users,
    Zap
} from 'lucide-react';

export default function TherapistLandingPage() {
    const heroData = {
        ecosystem: 'therapist' as const,
        title: 'Potencia tu Práctica Clínica',
        subtitle: 'Para Profesionales de la Salud Mental',
        description: 'Herramientas avanzadas de IA y transcripción que elevan tu práctica terapéutica y mejoran los resultados de tus pacientes.',
        ctaText: 'Explorar Herramientas Clínicas',
        ctaLink: '/therapist/dashboard',
        features: ['Transcripción Automática', 'Análisis de Sesiones', 'Gestión de Pacientes'],
        backgroundGradient: 'bg-gradient-to-br from-therapist via-therapist/90 to-primary',
        icon: <Stethoscope className="h-10 w-10 text-white" />
    };

    const features = [
        {
            icon: <FileText className="h-6 w-6 text-primary" />,
            title: 'Transcripción Automática de Sesiones',
            description: 'Transcripción precisa y confidencial de sesiones terapéuticas con tecnología de IA especializada en terminología clínica.',
            benefits: [
                'Transcripción en tiempo real o diferida',
                'Reconocimiento de terminología especializada',
                'Formato compatible con expedientes clínicos',
                'Cifrado extremo a extremo'
            ]
        },
        {
            icon: <Brain className="h-6 w-6 text-primary" />,
            title: 'Análisis Clínico Asistido por IA',
            description: 'Insights y patrones que apoyan tu criterio clínico sin reemplazar tu expertise profesional.',
            benefits: [
                'Identificación de patrones emocionales',
                'Sugerencias de intervenciones basadas en evidencia',
                'Seguimiento de progreso terapéutico',
                'Alertas de riesgo configurables'
            ]
        },
        {
            icon: <Users className="h-6 w-6 text-primary" />,
            title: 'Gestión Integral de Pacientes',
            description: 'Plataforma centralizada para el seguimiento completo del proceso terapéutico de cada paciente.',
            benefits: [
                'Expedientes clínicos digitales seguros',
                'Historial completo de sesiones',
                'Planes de tratamiento personalizados',
                'Comunicación segura con pacientes'
            ]
        },
        {
            icon: <Calendar className="h-6 w-6 text-primary" />,
            title: 'Agenda y Programación Inteligente',
            description: 'Sistema de citas que optimiza tu tiempo y mejora la experiencia de tus pacientes.',
            benefits: [
                'Programación automática inteligente',
                'Recordatorios para pacientes',
                'Gestión de cancelaciones',
                'Integración con calendarios personales'
            ]
        },
        {
            icon: <Target className="h-6 w-6 text-primary" />,
            title: 'Medición de Resultados',
            description: 'Herramientas de evaluación que documentan el progreso y efectividad de las intervenciones.',
            benefits: [
                'Escalas validadas integradas',
                'Reportes de progreso automáticos',
                'Métricas de efectividad terapéutica',
                'Evidencia para seguros y reportes'
            ]
        },
        {
            icon: <Shield className="h-6 w-6 text-primary" />,
            title: 'Cumplimiento Normativo Total',
            description: 'Diseñado para cumplir con todas las regulaciones de confidencialidad y práctica clínica.',
            benefits: [
                'Cumplimiento HIPAA completo',
                'Estándares internacionales de seguridad',
                'Auditorías y logs de acceso',
                'Backup y recuperación de datos'
            ]
        }
    ];

    const accessPortalData = {
        ecosystem: 'therapist' as const,
        title: 'Únete a la Nueva Era de la Terapia Digital',
        description: 'Miles de terapeutas ya utilizan Yurnal para mejorar sus resultados clínicos y optimizar su práctica.',
        appLink: '/therapist/dashboard',
        supportItems: [
            {
                icon: <HelpCircle className="h-6 w-6 text-primary" />,
                title: 'Soporte Clínico Especializado',
                description: 'Equipo de soporte con formación en salud mental para resolver cualquier duda técnica o clínica.'
            },
            {
                icon: <Zap className="h-6 w-6 text-primary" />,
                title: 'Implementación Rápida',
                description: 'Migra tu práctica en días, no meses. Proceso de onboarding diseñado por y para terapeutas.'
            },
            {
                icon: <Users className="h-6 w-6 text-primary" />,
                title: 'Comunidad Profesional',
                description: 'Acceso a foros, webinars y recursos exclusivos de la comunidad de terapeutas Yurnal.'
            }
        ]
    };

    return (
        <div className="flex flex-col items-center bg-background text-foreground">
            <EcosystemHero {...heroData} />
            <FeatureShowcase
                ecosystem="therapist"
                title="Herramientas Clínicas de Última Generación"
                subtitle="Tecnología diseñada específicamente para potenciar tu expertise profesional y mejorar los resultados de tus pacientes."
                features={features}
            />
            <AccessPortal {...accessPortalData} />
        </div>
    );
}

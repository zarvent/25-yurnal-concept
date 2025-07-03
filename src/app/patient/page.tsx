'use client';

import { AccessPortal } from '@/components/ecosystem-landing/access-portal';
import { EcosystemHero } from '@/components/ecosystem-landing/ecosystem-hero';
import { FeatureShowcase } from '@/components/ecosystem-landing/feature-showcase';
import {
    Activity,
    BookOpen,
    Brain,
    Calendar,
    Heart,
    MessageCircle,
    Shield,
    Smartphone,
    Target,
    Users
} from 'lucide-react';

export default function PatientLandingPage() {
    const heroData = {
        ecosystem: 'patient' as const,
        title: 'Tu Espacio de Sanación',
        subtitle: 'Diseñado para Pacientes',
        description: 'Herramientas terapéuticas personalizadas que te acompañan en tu proceso de crecimiento personal y bienestar emocional.',
        ctaText: 'Comenzar mi Viaje',
        ctaLink: '/patient/today',
        features: ['Diario Terapéutico', 'Análisis de Patrones', 'Herramientas de Afrontamiento'],
        backgroundGradient: 'bg-gradient-to-br from-patient via-patient/90 to-primary',
        icon: <Heart className="h-10 w-10 text-white" />
    };

    const features = [
        {
            icon: <BookOpen className="h-6 w-6 text-primary" />,
            title: 'Diario Terapéutico Inteligente',
            description: 'Registra tus pensamientos y emociones con plantillas especializadas basadas en CBT, DBT y Mindfulness.',
            benefits: [
                'Plantillas de CBT y DBT validadas científicamente',
                'Transcripción de voz a texto en tiempo real',
                'Análisis de patrones emocionales automático',
                'Recordatorios personalizables para escribir'
            ]
        },
        {
            icon: <Brain className="h-6 w-6 text-primary" />,
            title: 'Análisis de Patrones',
            description: 'IA avanzada identifica patrones en tus entradas para generar insights personalizados sobre tu progreso.',
            benefits: [
                'Detección de tendencias emocionales',
                'Identificación de triggers y factores protectores',
                'Sugerencias de habilidades específicas',
                'Reportes de progreso visuales'
            ]
        },
        {
            icon: <Target className="h-6 w-6 text-primary" />,
            title: 'Biblioteca de Habilidades',
            description: 'Ejercicios prácticos y técnicas terapéuticas para manejar situaciones difíciles del día a día.',
            benefits: [
                'Técnicas de regulación emocional',
                'Ejercicios de mindfulness guiados',
                'Estrategias de afrontamiento personalizadas',
                'Videos y audio instruccionales'
            ]
        },
        {
            icon: <Activity className="h-6 w-6 text-primary" />,
            title: 'Seguimiento del Estado de Ánimo',
            description: 'Monitorea tu bienestar emocional con herramientas visuales intuitivas y fáciles de usar.',
            benefits: [
                'Check-ins diarios rápidos',
                'Gráficos de tendencias emocionales',
                'Alertas de crisis automáticas',
                'Integración con wearables'
            ]
        },
        {
            icon: <MessageCircle className="h-6 w-6 text-primary" />,
            title: 'Conexión con tu Terapeuta',
            description: 'Comparte insights y progreso de forma segura con tu equipo de apoyo profesional.',
            benefits: [
                'Compartir reportes de progreso',
                'Notas colaborativas seguras',
                'Preparación para sesiones terapéuticas',
                'Comunicación cifrada extremo a extremo'
            ]
        },
        {
            icon: <Calendar className="h-6 w-6 text-primary" />,
            title: 'Planificación de Bienestar',
            description: 'Organiza tu rutina de autocuidado con recordatorios y metas personalizadas.',
            benefits: [
                'Rutinas de autocuidado personalizadas',
                'Recordatorios para medicación',
                'Planificación de actividades placenteras',
                'Seguimiento de hábitos saludables'
            ]
        }
    ];

    const accessPortalData = {
        ecosystem: 'patient' as const,
        title: 'Comienza tu Proceso de Sanación Hoy',
        description: 'Únete a miles de personas que ya están transformando su bienestar emocional con Yurnal.',
        appLink: '/patient/today',
        demoLink: '/demo/patient',
        supportItems: [
            {
                icon: <Smartphone className="h-6 w-6 text-primary" />,
                title: 'Acceso Multiplataforma',
                description: 'Disponible en web, iOS y Android para que tengas tus herramientas siempre contigo.'
            },
            {
                icon: <Shield className="h-6 w-6 text-primary" />,
                title: 'Privacidad Garantizada',
                description: 'Tus datos están protegidos con los más altos estándares de seguridad y confidencialidad.'
            },
            {
                icon: <Users className="h-6 w-6 text-primary" />,
                title: 'Soporte 24/7',
                description: 'Nuestro equipo especializado está disponible para ayudarte en cualquier momento.'
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background">
            <EcosystemHero {...heroData} />

            <FeatureShowcase
                ecosystem="patient"
                title="Herramientas Diseñadas para tu Bienestar"
                subtitle="Cada característica ha sido desarrollada con base en evidencia científica y la experiencia de profesionales de la salud mental."
                features={features}
            />

            <AccessPortal {...accessPortalData} />

            {/* Footer */}
            <footer className="border-t bg-muted/10 px-4 py-12 sm:px-8 lg:px-16">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <p className="text-therapeutic-caption text-muted-foreground">
                            © 2025 Yurnal. Transformando vidas a través de la tecnología terapéutica.
                        </p>
                        <div className="mt-4 flex justify-center gap-6 text-xs text-muted-foreground">
                            <a href="/privacy" className="hover:text-foreground transition-colors">Privacidad</a>
                            <a href="/terms" className="hover:text-foreground transition-colors">Términos</a>
                            <a href="/support" className="hover:text-foreground transition-colors">Soporte</a>
                            <a href="/about" className="hover:text-foreground transition-colors">Acerca de</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

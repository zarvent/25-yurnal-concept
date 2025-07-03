'use client';

import { AccessPortal } from '@/components/ecosystem-landing/access-portal';
import { EcosystemHero } from '@/components/ecosystem-landing/ecosystem-hero';
import { FeatureShowcase } from '@/components/ecosystem-landing/feature-showcase';
import {
    BookOpen,
    Brain,
    Calendar,
    Coffee,
    GraduationCap,
    Heart,
    Target,
    Trophy,
    Users,
    Zap
} from 'lucide-react';

export default function StudentLandingPage() {
    const heroData = {
        ecosystem: 'student' as const,
        title: 'Tu Compañero de Estudios',
        subtitle: 'Diseñado para Estudiantes',
        description: 'Herramientas especializadas para manejar el estrés académico, mejorar el bienestar estudiantil y optimizar tu rendimiento académico.',
        ctaText: 'Comenzar mi Jornada',
        ctaLink: '/student/dashboard',
        features: ['Manejo de Estrés', 'Bienestar Estudiantil', 'Rendimiento Académico'],
        backgroundGradient: 'bg-gradient-to-br from-student via-student/90 to-primary',
        icon: <GraduationCap className="h-10 w-10 text-white" />
    };

    const features = [
        {
            icon: <Brain className="h-6 w-6 text-primary" />,
            title: 'Manejo de Estrés Académico',
            description: 'Herramientas especializadas para lidiar con la presión académica, ansiedad de exámenes y deadlines.',
            benefits: [
                'Técnicas de relajación para épocas de exámenes',
                'Manejo de ansiedad académica',
                'Estrategias de afrontamiento para deadlines',
                'Ejercicios de respiración y mindfulness'
            ]
        },
        {
            icon: <Calendar className="h-6 w-6 text-primary" />,
            title: 'Planificación Académica',
            description: 'Organiza tu semestre, proyectos y exámenes con herramientas diseñadas para estudiantes.',
            benefits: [
                'Calendario académico inteligente',
                'Recordatorios de deadlines y exámenes',
                'Planificación de horarios de estudio',
                'Seguimiento de progreso en materias'
            ]
        },
        {
            icon: <Users className="h-6 w-6 text-primary" />,
            title: 'Comunidad Estudiantil',
            description: 'Conecta con otros estudiantes que enfrentan desafíos similares en un ambiente seguro y de apoyo.',
            benefits: [
                'Grupos de apoyo por carrera o universidad',
                'Sesiones de estudio grupales virtuales',
                'Mentoring peer-to-peer',
                'Foros temáticos anónimos'
            ]
        },
        {
            icon: <Target className="h-6 w-6 text-primary" />,
            title: 'Metas y Motivación',
            description: 'Sistema de objetivos y gamificación para mantener tu motivación y celebrar tus logros.',
            benefits: [
                'Establecimiento de metas SMART',
                'Sistema de recompensas y logros',
                'Tracking de hábitos de estudio',
                'Celebración de milestones académicos'
            ]
        },
        {
            icon: <Coffee className="h-6 w-6 text-primary" />,
            title: 'Equilibrio Vida-Estudio',
            description: 'Aprende a balancear responsabilidades académicas con bienestar personal y vida social.',
            benefits: [
                'Horarios de estudio optimizados',
                'Recordatorios de breaks y descanso',
                'Actividades de autocuidado estudiantil',
                'Gestión de tiempo efectiva'
            ]
        },
        {
            icon: <Zap className="h-6 w-6 text-primary" />,
            title: 'Boost de Rendimiento',
            description: 'Técnicas basadas en neurociencia para mejorar concentración, memoria y productividad.',
            benefits: [
                'Técnicas de estudio basadas en evidencia',
                'Ejercicios de concentración y focus',
                'Optimización de sesiones de estudio',
                'Preparación mental para exámenes'
            ]
        }
    ];

    const accessPortalData = {
        ecosystem: 'student' as const,
        title: 'Transforma tu Experiencia Universitaria',
        description: 'Únete a miles de estudiantes que están mejorando su bienestar y rendimiento académico.',
        appLink: '/student/dashboard',
        demoLink: '/demo/student',
        supportItems: [
            {
                icon: <Heart className="h-6 w-6 text-primary" />,
                title: 'Soporte 24/7',
                description: 'Crisis support y recursos de emergencia disponibles en cualquier momento.'
            },
            {
                icon: <Trophy className="h-6 w-6 text-primary" />,
                title: 'Precio Estudiantil',
                description: 'Descuentos especiales y planes accesibles diseñados para presupuestos estudiantiles.'
            },
            {
                icon: <BookOpen className="h-6 w-6 text-primary" />,
                title: 'Recursos Educativos',
                description: 'Biblioteca de recursos sobre salud mental y bienestar estudiantil.'
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background">
            <EcosystemHero {...heroData} />

            <FeatureShowcase
                ecosystem="student"
                title="Herramientas para tu Éxito Académico y Personal"
                subtitle="Desarrollado específicamente para las necesidades únicas de estudiantes universitarios y de posgrado."
                features={features}
            />

            <AccessPortal {...accessPortalData} />

            {/* Student Success Stats */}
            <section className="py-16 bg-muted/10">
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-6">
                            Éxito Estudiantil Comprobado
                        </h3>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">85%</div>
                                <p className="text-sm text-muted-foreground">Reducción de Ansiedad</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">92%</div>
                                <p className="text-sm text-muted-foreground">Mejora en Organización</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">78%</div>
                                <p className="text-sm text-muted-foreground">Incremento en GPA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

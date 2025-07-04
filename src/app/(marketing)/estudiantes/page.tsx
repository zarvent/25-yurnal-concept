import { AccessPortal } from '@/components/marketing/access-portal';
import { EcosystemHero } from '@/components/marketing/ecosystem-hero';
import { FeatureShowcase } from '@/components/marketing/feature-showcase';
import {
    BookOpen,
    Brain,
    Calendar,
    Coffee,
    GraduationCap,
    HelpCircle,
    ShieldCheck,
    Target,
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
        ctaLink: '/academic/dashboard',
        features: ['Manejo de Estrés', 'Bienestar Estudiantil', 'Rendimiento Académico'],
        backgroundGradient: 'bg-gradient-to-br from-student via-student/90 to-primary',
        icon: <GraduationCap className="h-10 w-10 text-white" />
    };

    const features = [
        {
            icon: <Brain className="h-6 w-6 text-primary" />,
            title: 'Manejo de Estrés Académico',
            description: 'Herramientas especiales para lidiar con la presión académica, ansiedad de exámenes y deadlines.',
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
        title: 'Portal del Estudiante',
        description: 'Accede a tus herramientas, cursos y comunidad. Tu centro de mando para el éxito académico y personal.',
        appLink: '/academic/dashboard',
        supportItems: [
            {
                icon: <HelpCircle className="h-6 w-6 text-primary" />,
                title: 'Soporte Técnico',
                description: 'Nuestro equipo está listo para ayudarte con cualquier problema técnico que encuentres.'
            },
            {
                icon: <BookOpen className="h-6 w-6 text-primary" />,
                title: 'Guías y Tutoriales',
                description: 'Explora nuestra base de conocimientos para sacar el máximo provecho de la plataforma.'
            },
            {
                icon: <ShieldCheck className="h-6 w-6 text-primary" />,
                title: 'Seguridad y Privacidad',
                description: 'Tu información está segura con nosotros. Conoce más sobre nuestras políticas.'
            }
        ]
    };

    return (
        <div className="flex flex-col items-center bg-background text-foreground">
            <EcosystemHero {...heroData} />
            <FeatureShowcase
                ecosystem="student"
                title="Un Ecosistema de Herramientas para tu Éxito"
                subtitle="Todo lo que necesitas para prosperar en tu vida académica y personal, integrado en un solo lugar."
                features={features}
            />
            <AccessPortal {...accessPortalData} />
        </div>
    );
}

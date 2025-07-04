'use client';

import { AccessPortal } from '@/components/marketing/access-portal';
import { EcosystemHero } from '@/components/marketing/ecosystem-hero';
import { FeatureShowcase } from '@/components/marketing/feature-showcase';
import {
    BookOpen,
    Database,
    FileText,
    GraduationCap,
    LineChart,
    Microscope,
    Presentation,
    Search,
    Shield,
    Users
} from 'lucide-react';

export default function AcademicLandingPage() {
    const heroData = {
        ecosystem: 'academic' as const,
        title: 'Investigación Avanzada',
        subtitle: 'Para Académicos e Investigadores',
        description: 'Plataforma de investigación con análisis de datos masivos, herramientas de publicación y colaboración académica internacional.',
        ctaText: 'Explorar Investigación',
        ctaLink: '/academic/dashboard',
        features: ['Análisis de Datos', 'Publicaciones', 'Colaboración Global'],
        backgroundGradient: 'bg-gradient-to-br from-academic via-academic/90 to-primary',
        icon: <GraduationCap className="h-10 w-10 text-white" />
    };

    const features = [
        {
            icon: <Database className="h-6 w-6 text-primary" />,
            title: 'Conjunto de Datos Anonimizados',
            description: 'Acceso a la mayor base de datos de salud mental del mundo, completamente anonimizada y GDPR-compliant.',
            benefits: [
                'Más de 1M de entradas de diario analizadas',
                'Datos demográficos y clínicos correlacionados',
                'APIs para análisis estadístico avanzado',
                'Compliance total con regulaciones éticas'
            ]
        },
        {
            icon: <LineChart className="h-6 w-6 text-primary" />,
            title: 'Herramientas de Análisis',
            description: 'Suite completa de herramientas estadísticas y de machine learning para investigación rigurosa.',
            benefits: [
                'Análisis de series temporales de estados de ánimo',
                'Modelos predictivos de outcomes terapéuticos',
                'Análisis de texto con NLP avanzado',
                'Visualizaciones interactivas personalizables'
            ]
        },
        {
            icon: <FileText className="h-6 w-6 text-primary" />,
            title: 'Plataforma de Publicación',
            description: 'Herramientas integradas para redacción, revisión por pares y publicación de investigaciones.',
            benefits: [
                'Editor colaborativo con LaTeX integrado',
                'Sistema de revisión por pares transparente',
                'Integración con bases de datos académicas',
                'Métricas de impacto en tiempo real'
            ]
        },
        {
            icon: <Users className="h-6 w-6 text-primary" />,
            title: 'Red de Colaboración',
            description: 'Conecta con investigadores globales y forma equipos multidisciplinarios.',
            benefits: [
                'Matching automático por áreas de investigación',
                'Espacios de trabajo colaborativos',
                'Comunicación segura entre instituciones',
                'Gestión de proyectos multi-institucionales'
            ]
        },
        {
            icon: <Presentation className="h-6 w-6 text-primary" />,
            title: 'Diseminación de Conocimiento',
            description: 'Herramientas para presentar y compartir hallazgos con la comunidad científica global.',
            benefits: [
                'Conferencias virtuales integradas',
                'Posters interactivos digitales',
                'Webinars con capacidad ilimitada',
                'Métricas de engagement académico'
            ]
        },
        {
            icon: <Microscope className="h-6 w-6 text-primary" />,
            title: 'Laboratorio Virtual',
            description: 'Ambiente controlado para experimentos de psicología digital y terapias experimentales.',
            benefits: [
                'Ensayos clínicos randomizados digitales',
                'A/B testing de intervenciones terapéuticas',
                'Simulaciones de escenarios clínicos',
                'Protocolos de investigación estandarizados'
            ]
        }
    ];

    const accessPortalData = {
        ecosystem: 'academic' as const,
        title: 'Impulsa tu Investigación al Siguiente Nivel',
        description: 'Únete a la comunidad académica más grande del mundo en salud mental digital.',
        appLink: '/academic/dashboard',
        demoLink: '/demo/academic',
        supportItems: [
            {
                icon: <BookOpen className="h-6 w-6 text-primary" />,
                title: 'Biblioteca Académica',
                description: 'Acceso completo a la literatura científica más relevante y actualizada.'
            },
            {
                icon: <Shield className="h-6 w-6 text-primary" />,
                title: 'Ética en Investigación',
                description: 'Todas las investigaciones siguen los más altos estándares éticos internacionales.'
            },
            {
                icon: <Search className="h-6 w-6 text-primary" />,
                title: 'Descubrimiento de Insights',
                description: 'IA especializada ayuda a identificar patrones y correlaciones no evidentes.'
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background">
            <EcosystemHero {...heroData} />

            <FeatureShowcase
                ecosystem="academic"
                title="Investigación que Transforma el Campo"
                subtitle="Herramientas de investigación de vanguardia respaldadas por la mayor base de datos de salud mental del mundo."
                features={features}
            />

            <AccessPortal {...accessPortalData} />

            {/* Research Impact Section */}
            <section className="py-16 bg-muted/10">
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-6">
                            Impacto en la Investigación Global
                        </h3>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">150+</div>
                                <p className="text-sm text-muted-foreground">Universidades Colaboradoras</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">500+</div>
                                <p className="text-sm text-muted-foreground">Publicaciones Generadas</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">50M+</div>
                                <p className="text-sm text-muted-foreground">Puntos de Datos Analizados</p>
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
